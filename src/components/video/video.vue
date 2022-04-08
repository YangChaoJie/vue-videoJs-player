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
import videojs, { VideoJsPlayerOptions } from 'video.js'
import { useVideo } from '.';
import { ref } from 'vue';
import 'video.js/dist/video-js.css'
import './video.scss'
import 'videojs-landscape-fullscreen'
import './resolution-switcher/index.js'
const props = defineProps<{
  options: VideoJsPlayerOptions
}>()

const emit = defineEmits<{
  (event: string, player: videojs.Player): void
}>()

const videoPlayer = ref<HTMLElement | null>(null)

useVideo(props.options, emit, videoPlayer)
</script>
<!-- <script setup lang="ts">
import videojs, { VideoJsPlayerOptions } from 'video.js'
import 'video.js/dist/video-js.css'
import './video.scss'
import 'videojs-landscape-fullscreen'
import './resolution-switcher/index.js'
import { reactive, watchEffect, ref, onMounted, onBeforeUnmount } from 'vue-demi'
const DEFAULT_EVENTS: string[] = [
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
  options: VideoJsPlayerOptions
}>()

const emit = defineEmits<{
  (event: string, player: videojs.Player): void
}>()

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
const videoPlayer = ref<HTMLElement | null>(null)
let player: videojs.Player

watchEffect(() => {
  videoOptions = {
    ...defaultConfig,
    ...props.options
  }
})

onMounted(() => {
  initialize()
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
  }
})

function initialize() {
  const emitPlayerSate = (event: string) => {
    if (event) {
      switch (event) {
        case 'loadstart':
          decodeHls()
          break;
        case 'error':
          onPlayError()
          break;
        default:
          break;
      }
    }
    emit(event, player)
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
  const p = player as any
  p.updateSrc(props.options.sources)

  player.on('resolutionchange', () => {
    console.info('Source changed to %s', player.src())
  })
  p.landscapeFullscreen({
    fullscreen: {
      enterOnRotate: true,
      alwaysInLandscapeMode: true,
      iOS: false
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
  newButtonToggle()
}

function newButtonToggle() {
  // 隐藏掉 画中画
  player?.getChild('ControlBar')?.removeChild(player?.getChild('ControlBar')?.getChild('pictureInPictureToggle')!)
}

function onPlayError() {
  document.getElementsByClassName('vjs-modal-dialog-content')[0].textContent = '视频加载失败'
}

// AES 解密
function decodeHls() {
  const tech = player.tech() as any
  if (!player.tech() || !tech.vhs) {
    return
  }
  let prefix = 'key://'
  let urlTpl = 'https://domain.com/path/{key}'

  tech.vhs.xhr.beforeRequest = function (options: any) {
    console.log('tech---laod', options);
    // required for detecting only the key requests
    if (!options.uri.startsWith(prefix)) { return; }
    options.headers = options.headers || {};
    options.headers["Custom-Header"] = "value";
    options.uri = urlTpl.replace("{key}", options.uri.substring(prefix.length));
  }
}

</script> -->
