<template>
  <div class="vcom-video">
    <video
      controls
      preload="none"
      webkit-playsinline="true"
      playsinline="true"
      data-setup='{ "playbackRates": [1, 1.5, 2] }'
      ref="videoPlayer"
      class="video-js vjs-big-play-centered"
    ></video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { QualityMenuItem, QualityMenuItemChild } from './common.js';
import './SettingMenu/SettingMenuButton';
import './video.scss'
import 'videojs-landscape-fullscreen'

export default {
  name: 'VideoPlayer',
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
    const that = this;
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
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
          // that.test();
        });
        this.on("pause", function () {
          console.log(that);
          // debugger;
          console.log("视频暂停播放")
        });
        this.on("ended", function () {
          console.log("视频播放结束");
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
          console.log("播放时长改变");
        })
        this.on("volumechange", function () {
          console.log("音量改变");
        })
        this.on("stalled", function () {
          console.log("网速异常");
        })
      }
    )
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
  },
  methods: {
    newButtonToggle () {
      // var button = videojs.getComponent('Button')
      // var closeButton = videojs.extend(button, {
      //   constructor: function () {
      //     button.apply(this, arguments)
      //     this.controlText('AA')
      //     this.addClass('vjs-icon-circle');
      //     this.addClass('vjs-btn-test');
      //   },
      //   handleClick: function () {
      //     alert('hehe')
      //   },
      // })

      // videojs.registerComponent('closeButton', closeButton)
      // videojs.registerComponent('QualityMenuItem', QualityMenuItem);
      // videojs.registerComponent('QualityMenuItemChild', QualityMenuItemChild);
      // videojs.registerComponent('myButton', myButton);
      // this.player.addChild('closeButton', {});
      // this.player.getChild('ControlBar').addChild('closeButton', {})
      // this.player.addChild('closeButton', {})

      // 隐藏掉 画中画
      this.player.getChild('ControlBar').removeChild('pictureInPictureToggle')
      // videojs
      //   .getComponent('SettingMenuButton')
      //   .prototype.options_.entries.push('QualityMenuItem');

    },
    test () {
      this.$nextTick(() => {
        this.player.requestFullscreen();
        window.screen.orientation.lock("landscape")
      })
    }
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>

<style>
</style>
