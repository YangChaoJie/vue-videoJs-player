<template>
  <div>
    <div id="mse"></div>
  </div>
</template>

<script>
import Player from 'xgplayer';
export default {
  name: 'VideoPlayer2',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  data () {
    return {
      player: null,
    }
  },
  mounted () {
    const player = new Player({
      id: 'mse',
      url: 'http://ivi.bupt.edu.cn/hls/cctv1.m3u8',
      width: 375,
      height: 300
    })
  },
  methods: {
  }
}
</script>

<style>
</style>