<template>
  <div class="audio-control-bar">
    <div class="left" @click="switchMode">
      <img :src="getModeImg" />
      <div>{{ getModeName }}</div>
    </div>
    <div class="center">
      <div class="left" @click="onPre">
        <img :src="getSrc('player_pre')" />
      </div>
      <div class="center" @click="onPlaying">
        <img :src="getPlayImg" />
      </div>
      <div class="right" @click="onNext">
        <img :src="getSrc('player_next')" />
      </div>
    </div>
    <div class="right" @click="onShowPlayList">
      <img :src="getSrc('player_list')" />
      <div>播放列表</div>
    </div>
  </div>
</template>

<script>
import '../audio.scss'
export default {
  data() {
    return {
      switchOrderBtn: '../assets/player/player_switch.png',
      switchLoopBtn: '../assets/player/player_switch.png',
      nextBtn: '../assets/player/player_next.png',
      preBtn: '../assets/player/player_pre.png',
      playBtn: '../assets/player/player_play.png',
      listBtn: '../assets/player/player_list.png',
      state: '2', // 1 播放 2 暂停
      mode: '1' // 2. 循环播放 1. 顺序播放
    }
  },
  methods: {
    getSrc(name) {
      const path = `/src/assets/player/${name}.png`;
      const modules = import.meta.globEager("/src/assets/player/*.png");
      return modules[path].default;
    },
    switchMode() {
      this.$emit('switchMode', this.mode);
      if (this.mode === '1') {
        this.mode = '2';
      } else {
        this.mode = '1';
      }
    },
    showList() {
      this.$emit('showList');
    },
    // 播放
    onPlaying() {
      if (this.state === '1') {
        this.state = '2';
      } else {
        this.state = '1';
      }
      this.$emit('onPlay', this.state);
    },
    hanldlePause() {
      this.state = '2';
    },
    hanldlePlay() {
      this.state = '1';
    },
    // 上一曲
    onPre() {
      this.$emit('onPre');
    },
    // 下一曲
    onNext() {
      this.$emit('onNext');
    },
    onShowPlayList() {
      this.$emit('showList');
    }
  },
  computed: {
    getModeName() {
      return this.mode === '1' ? '顺序播放' : '循环播放'
    },
    getModeImg() {
      return this.mode === '1' ? this.getSrc('player_switch') : this.getSrc('player_loop')
    },
    getPlayImg() {
      return this.state === '1' ? this.getSrc('player_playing') : this.getSrc('player_play')
    }
  }
}
</script>

<style lang="scss">
</style>