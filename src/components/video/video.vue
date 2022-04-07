<template>
  <div class="vcom-video">
    <video
      controls
      preload="none"
      webkit-playsinline="true"
      playsinline="true"
      x5-video-play-type="h5-page"
      ref="videoPlayer"
      :autoplay="true"
      class="video-js vjs-big-play-centered"
    ></video>
  </div>
</template>

<script setup lang="ts">
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './video.scss'
import 'videojs-landscape-fullscreen'
import './resolution-switcher/index.js'
import { reactive, watchEffect, ref } from 'vue-demi'
const DEFAULT_EVENTS = [
  'loadstart',
  'loadeddata',
  'canplay',
  'canplaythrough',
  'play',
  'timeupdate',
  'pause',
  'waiting',
  'playing',
  'ended',
  'error'
]

const props = defineProps<{
  options: object
}>()

const emit = defineEmits(DEFAULT_EVENTS)

const defaultConfig = reactive({
  controls: true,
  autoplay: true,
  playbackRate: [1, 1.5, 2],
  muted: false,
  poster: 'none',
  plugins: {
    videoJsResolutionSwitcher: {
      default: 'high',
      ui: true,
      dynamicLabel: true
    }
  },
  videoOptions: {}
})

let videoOptions = {};

watchEffect(() => {
  videoOptions = {
    ...defaultConfig,
    ...props.options
  }
})
const videoPlayer = ref<HTMLElement | null>(null)
let player: videojs.Player
function initialize() {
  const emitPlayerSate = (event: string) => {
    if (event) {
      switch (event) {
        case 'loadstart':
          // this.decodeHls()
          break;
        case 'error':
          // this.onPlayError()
          break;
        default:
          break;
      }
    }
    emit(event)
  }

  player = videojs(videoPlayer.value ?? '', videoOptions, function onPlayReady() {
    const events = DEFAULT_EVENTS
    for (let i = 0; i < events.length; i++) {
      if (typeof events[i] === 'string') {
        (event => {
          this.on(event, () => {
            emitPlayerSate(event)
          })
        })(events[i])
      }
    }
  })

  videojs.use('video/mp4', (player) => {
    console.log('正在播放');
    return {
      setSource(srcObj, next) {
        next(null, srcObj)
      },
      setVolume(val: number) {
        console.log('val----', val);
        return 0.2
      }
    }
  })
}

function newButtonToggle() {
  // 隐藏掉 画中画
  player?.getChild('ControlBar')?.removeChild(player?.getChild('pictureInPictureToggle')!)
}

</script>

<!-- <script lang="ts">
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './video.scss'
import 'videojs-landscape-fullscreen'
import './resolution-switcher/index.js'

const DEFAULT_EVENTS = [
  'loadstart',
  'loadeddata',
  'canplay',
  'canplaythrough',
  'play',
  'timeupdate',
  'pause',
  'waiting',
  'playing',
  'ended',
  'error'
]

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      player: null,
      defaultConfig: {
        controls: true,
        autoplay: true,
        playbackRate: [1, 1.5, 2],
        muted: false,
        poster: 'none',
        plugins: {
          videoJsResolutionSwitcher: {
            default: 'high',
            ui: true,
            dynamicLabel: true
          }
        },
        videoOptions: {}
      }
    }
  },
  watch: {
    options: {
      handler(val) {
        this.videoOptions = {
          ...this.defaultConfig,
          ...val
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.initialize();
    // this.player.videoJsResolutionSwitcher(this.options)

    this.player.updateSrc(this.options.sources)

    this.player.on('resolutionchange', () => {
      console.info('Source changed to %s', this.player.src())
    })
    this.player.landscapeFullscreen({
      fullscreen: {
        enterOnRotate: true,
        alwaysInLandscapeMode: true,
        iOS: false
      }
    })
    // this.player.ready(() => {
    //     this.player.play(); // 自动播放
    // });
    this.newButtonToggle()
  },
  methods: {
    initialize() {
      const that = this;
      // emit event
      const emitPlayerSate = (event) => {
        if (event) {
          switch (event) {
            case 'loadstart':
              this.decodeHls()
              break;
            case 'error':
              this.onPlayError()
              break;
            default:
              break;
          }
        }
        this.$emit(event, this.player)
      }

      this.player = videojs(
        this.$refs.videoPlayer,
        this.videoOptions,
        function onPlayReady() {
          const events = DEFAULT_EVENTS
          for (let i = 0; i < events.length; i++) {
            if (typeof events[i] === 'string') {
              (event => {
                this.on(event, () => {
                  emitPlayerSate(event)
                })
              })(events[i])
            }
          }
        }
      )

      videojs.use('video/mp4', (player) => {
        console.log('正在播放');
        return {
          setSource(srcObj, next) {
            next(null, srcObj)
          },
          setVolume(val) {
            console.log('val----', val);
            return 0.2
          }
        }
      })

      this.decodeHls();
    },

    // AES 解密
    decodeHls() {
      if (!this.player.tech() ||  !this.player.tech().xhr) {
        return
      }
      let prefix = 'key://'
      let urlTpl = 'https://domain.com/path/{key}'

      this.player.tech().vhs.xhr.beforeRequest = function (options) {
        console.log('tech---laod', options);
        // required for detecting only the key requests
        if (!options.uri.startsWith(prefix)) { return; }
        options.headers = options.headers || {};
        optopns.headers["Custom-Header"] = "value";
        options.uri = urlTpl.replace("{key}", options.uri.substring(prefix.length));
      }
    },
    newButtonToggle() {
      // 隐藏掉 画中画
      this.player.getChild('ControlBar').removeChild('pictureInPictureToggle')
    },
    onPlayError() {
      document.getElementsByClassName('vjs-modal-dialog-content')[0].textContent = '视频加载失败'
    },
    test() {
      this.$nextTick(() => {
        this.player.requestFullscreen();
        window.screen.orientation.lock("landscape")
      })
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>

<style>
</style> -->
