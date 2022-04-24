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
// import 'video.js/dist/video-js.css'
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
