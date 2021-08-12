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
    <audio-control-bar
      @onPre="onPre"
      @onPlay="onPlay"
      @switchMode="switchMode"
      @onNext="onNext"
      @showList="onShowList"
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
          this.$emit(event, this.player)
        }
      }

      this.player = videojs(
        this.$refs.audioPlayer,
        this.audioOptions,
        function onPlayerReady () {
          console.log('onPlayerReady', this)
          this.on("loadstart", function () {
            console.log("开始请求数据 ");
          })
          this.on("progress", function () {
            console.log("正在请求数据 ");
          })
          this.on("loadedmetadata", function () {
            console.log("获取资源长度完成 ")
          })
          this.on("canplaythrough", function () {
            console.log("视频源数据加载完成")
          })
          this.on("waiting", function () {
            console.log("等待数据")
          });
          this.on("play", function () {
            console.log("视频开始播放")
          });
          this.on("playing", function () {
            console.log("视频播放中")
          });
          this.on("pause", function () {
            console.log("视频暂停播放")
          });
          this.on("ended", function () {
            console.log("视频播放结束", that.playState);
            if (that.playState === '2') {
              that.i++;
              if (that.i >= that.options.sources.length) {
                that.i = 0;
              }
              this.currentPlay();
            } else {
              this.play();
            }
          });
          this.on("error", function () {
            console.log("加载错误")
          });
          this.on("seeking", function () {
            console.log("视频跳转中");
          })
          this.on("seeked", function () {
            console.log("视频跳转结束");
          })
          this.on("ratechange", function () {
            console.log("播放速率改变")
          });
          this.on("timeupdate", function () {
            console.log("播放时长改变", that.playState);
          })
          this.on("volumechange", function () {
            console.log("音量改变");
          })
          this.on("stalled", function () {
            console.log("网速异常");
          })
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
    switchMode (state) {
      console.log('iii', state);
      this.playState = state;
    },
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
