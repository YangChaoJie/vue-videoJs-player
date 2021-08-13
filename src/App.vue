<template>
  <div id="app">
    <div>
      <!-- <video-player :options="videoOptions" /> -->
      <audio-player
        @timeupdate="onTimeupdate"
        :options="audioOptions"
      >
          <template v-slot:middle v-if="audioOptions.fullScreen === false">
            <span>Here might be a page title</span>
          </template>
      </audio-player>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
// import './style.css'
// import './components/audio/audio.scss'
// import 'vcom-video-player/dist/style.css'
import { videoPlayer } from 'vcom-video-player'
// import videoPlayer from './components/video.vue'
import audioPlayer from './components/audio.vue'
// import { audioPlayer } from 'vcom-video-player'
// 判断是否为公众号模拟器环境
const isWechat = () => {
  return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
}

// 判断公众号截取code
const getUrlParam = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
export default {
  components: {
    videoPlayer,
    audioPlayer
  },
  data () {
    return {
      videoOptions: {
        code: '',
        controls: true,
        autoplay: false,
        muted: false,
        poster: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F547f46d9ly4gsqmhfbuf1j20u00g2whd.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631348141&t=9a2d66a6d2bc463b9d5b69fdb2207e61',
        controlBar: {
          // fullscreenToggle: true
        },
        sources: [
          {
            src: 'https://rsszw.czbanbantong.com//localpath/servicecenter/20210401/20210401130614879709195799766/%E3%80%90English_Singsing%E3%80%91Phonics_Rap_Ah264_720x576_800k.mp4',
            type: 'video/mp4',
          },
        ],
      },
      audioOptions: {
        fullScreen: false,
        sources: [
          {
            src: 'https://storezw.czbanbantong.com:443/docum/rms/nrms/20210713/1626158362062_rcode.mp3',
            type: 'audio/mp3',
            name: '测试音频1'
          },
          {
            src: 'https://rsszw.czbanbantong.com//localpath/servicecenter/20150821/20150821074214500203966723014/%E5%84%BF%E6%AD%8C%E6%AC%A3%E8%B5%8F%EF%BC%9A%E5%BF%AB%E5%BF%AB%E4%B9%90%E4%B9%90%E4%B8%8A%E5%AD%A6%E6%A0%A1_128k.mp3',
            type: 'audio/mp3',
            name: '测试音频2'
          }
        ]
      }
    }
  },
  mounted () {
    // this.getWxCode();
  },
  methods: {
    getWxCode () {
      if (isWechat()) {
        let appid = "wxa16190e252fb8b16"; //为测试号id
        let code = getUrlParam("code"); //是否存在code
        let local = window.location.href + '?url=henan'; // 配置回调地址
        // let local = 'http://h5.x*****o.com/'		//测试路径
        if (code == null || code === "") {
          //不存在就打开上面的地址进行授权
          window.location.href =
            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
        } else {
          this.code = code
          alert(window.location.href)
          alert(this.code)
        }
      }
    },
    onTimeupdate (player) {
      console.log('监听事件', player.currentTime(), player.duration());
      if (Math.ceil(player.currentTime()) >= 30) {
        this.$dialog.alert({
          message: '请关注公众账号',
        });
        player.pause();
        this.$root.$emit('audioPause');
      }
    }
  }
}
</script>

<style lang="scss">
.vcom-video {
  .video-js {
    height: 230px;
  }
}
</style>