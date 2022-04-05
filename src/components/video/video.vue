<template>
  <div class="vcom-video">
    <video
      controls
      preload="none"
      webkit-playsinline="true"
      playsinline="true"
      x5-video-play-type="h5-page"
      ref="videoPlayer"
      class="video-js vjs-big-play-centered"
    ></video>
    <!-- <video-js id="vid1" width="600" height="300" class="vjs-default-skin" controls>
      <source src="https://example.com/index.m3u8" type="application/x-mpegURL" />
    </video-js> -->
  </div>
</template>

<script lang="js">
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './video.scss'
import 'videojs-landscape-fullscreen'
import './resolution-switcher/index.js'

const DEFAULT_EVENTS = [
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
        autoplay: false,
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
    // this.player.ready(function(){
    //     var myPlayer = this;
    //     myPlayer.play(); // 自动播放
    // });
    this.newButtonToggle()
    document.addEventListener('pause', function () {
      console.log('hahahahah');
    });
  },
  methods: {
    initialize() {
      const that = this;
      // emit event
      const emitPlayerSate = (event) => {
        if (event) {
          switch (event) {
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
</style>
