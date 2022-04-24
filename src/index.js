import _videojs from 'video.js'
import videoPlayer from './components/video/video.vue';
import audioPlayer from './components/audio/audio.vue';
const videojs = window.videojs || _videojs
const install = function (Vue, config) {
  if (config) {
    if (config.options) {
      videoPlayer.props.globalOptions.default = () => config.options
    }
    if (config.events) {
      videoPlayer.props.globalEvents.default = () => config.events
    }
  }
  Vue.component(audioPlayer.name, audioPlayer);
  Vue.component(videoPlayer.name, videoPlayer);
}

const VueVideoPlayer = { videojs, videoPlayer, audioPlayer,install }
export default VueVideoPlayer
export { videojs, videoPlayer, audioPlayer, install }
