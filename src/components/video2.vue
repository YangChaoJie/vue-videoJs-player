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
       el:document.querySelector('#mse'),
      url: 'https://rsszw.czbanbantong.com//localpath/servicecenter/20210401/20210401130614879709195799766/%E3%80%90English_Singsing%E3%80%91Phonics_Rap_Ah264_720x576_800k.mp4',
      width: '100vw',
      height: 300,
      // rotateFullscreen: true,
       cssFullscreen: true
    })
  },
  methods: {
  }
}
</script>

<style>
</style>