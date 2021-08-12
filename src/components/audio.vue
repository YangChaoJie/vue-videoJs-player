<template>
  <div class="vcom-audio">
    <video
      controls
      preload="none"
      webkit-playsinline="true"
      playsinline="true"
      data-setup="{ }"
      ref="audioPlayer"
      class="video-js vjs-big-play-centered"
    ></video>
      <slot name="middle"></slot>
    <audio-control-bar
      @onPre="onPre"
      @onPlay="onPlay"
      @switchMode="switchMode"
      @onNext="onNext"
      @showList="onShowList"
      ref="audioControlBar"
    ></audio-control-bar>

    <van-popup
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="header">播放列表</div>

      <div
        class="list"
        @click="onPlayAtIndex(index)"
        :class="{ active: index === i }"
        v-for="(item, index) in options.sources"
        :key="index"
      >
        {{ item.name }}
      </div>
    </van-popup>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './SettingMenu/SettingMenuButton';
import './video.scss'
import './audio/audio.scss'
import './audio/audio.js'
import AudioControlBar from './audioControlBar.vue'

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
  name: 'audio',
  components: {
    AudioControlBar
  },
  props: {
    // 音频播放页面的配置
    options: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  watch: {
    options: {// fullScreen
      handler (val) {
        this.audioOptions = {
          ...this.defaultConfig,
          ...val
        };
        console.log('audioOptions', this.audioOptions);
      },
      immediate: true
    }
  },
  data () {
    return {
      player: null,
      i: 0,
      playState: '2',
      show: false,
      defaultConfig: {
        // poster: './music_bg.png',
        // autoplay: true,
        controls: true,
        inactivityTimeout: 0, // 一直显示 control bar
        controlBar: {
          fullscreenToggle: false,
          // durationDisplay: false,
          // currentTimeDisplay: false
        },
        fullScreen: true // 是否全屏
      },
      // 播放的配置项
      audioOptions: {
      }
    }
  },
  mounted () {
    this.initialize();
  },
  methods: {
    initialize () {
      const that = this;
      // emit event
      const emitPlayerState = (event) => {
        if (event) {
          // console.log('监听事件', event,this.player.currentTime(), this.player.duration(),this.player);
          switch (event) {
            case 'ended':
              this.onPlayEnd();
              break;
            case 'pause':
              this.doPause();  
            default:
              break;
          }
          this.$emit(event, this.player)
        }
      }

      this.player = videojs(
        this.$refs.audioPlayer,
        this.audioOptions,
        function onPlayerReady () {
          // events
          const events = DEFAULT_EVENTS;
          for (let i = 0; i < events.length; i++) {
            if (typeof events[i] === 'string') {
              (event => {
                this.on(event, () => {
                  emitPlayerState(event)
                })
              })(events[i])
            }
          }
        }
      )
      const videoObj = this.options.sources[0];
      this.player.audioPlayer({
        artist: '',
        track: videoObj.name
      });
      this.setConfigStyle();
    },
    setConfigStyle () {
      console.log('aa', this.audioOptions);
      if (this.audioOptions.fullScreen && this.audioOptions.fullScreen === true) {
        console.log('ss');
        document.getElementsByClassName('vjs-tech')[0].style.backgroundSize = '100vw calc(100vh - 100px)';
        document.getElementsByClassName('vjs-tech')[0].style.backgroundImage = "url(src/assets/player/fullScreen_bg.png)";
        document.getElementsByClassName('video-js')[0].style.height = 'calc(100vh - 100px)';
      }
    },
    // 点击播放
    onPlay (state) {
      if (state === '1') {
        this.player.play();
      } else {
        this.player.pause();
      }
    },
    doPause () {
      this.$refs.audioControlBar.hanldlePause();
    },
    switchMode (state) {
      console.log('iii', state);
      this.playState = state;
    },
    // 播放结束切换
    onPlayEnd () {
      if (this.playState === '2') {
        this.i++;
        if (this.i >= this.options.sources.length) {
          this.i = 0;
        }
        this.currentPlay();
      } else {
        this.player.play();
      }
    },
    // 上一曲
    onPre () {
      if (this.playState === '1') {
        this.currentPlay();
        return;
      }

      this.i--;
      if (this.i <= 0) {
        this.i = 0;
      }
      this.currentPlay();
    },
    // 下一曲
    onNext () {
      if (this.playState === '1') {
        this.currentPlay();
        return;
      }
      this.i++;
      if (this.i >= this.options.sources.length) {
        this.i = 0;
      }
      this.currentPlay();
    },
    changeAudioName (name) {
      const tag = document.getElementsByClassName('vjs-ap-track-truncated')[0];
      console.log('-----', tag.textContent);
      tag.textContent = name;
    },
    onPlayAtIndex (index) {
      this.i = index;
      this.show = false;
      this.currentPlay();
    },
    currentPlay () {
      const videoObj = this.options.sources[this.i];
      this.player.src({ type: videoObj.type, src: videoObj.src });
      this.player.play();
      this.changeAudioName(videoObj.name);
    },
    onShowList () {
      this.show = true;
    }
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>

<style lang="scss">
.vcom-audio {
  .header {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: bold;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    line-height: 66px;
    text-align: center;
    height: 66px;
  }
  .list {
    padding: 5px 20px;
  }
  .active {
    color: #0c90f8;
  }
}
</style>
