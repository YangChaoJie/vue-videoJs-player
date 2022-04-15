<template>
  <div>
    <div class="tt">
      <video-player :options="videoOptions"  @timeupdate="onTimeupdate"/>
      <!-- <audio-player
        @timeupdate="onTimeupdate"
        :options="audioOptions"
      >
          <template v-slot:middle v-if="audioOptions.fullScreen === false">
            <span>Here might be a page title</span>
          </template>
      </audio-player>-->
    </div>
  </div>
</template>

<script lang="js">
import 'video.js/dist/video-js.css'
import audioPlayer from '@/components/audio/audio.vue'
import videoPlayer from '@/components/video/video.vue'
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
  data() {
    return {
      videoOptions: {
        poster: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Flarge%2F547f46d9ly4gsqmhfbuf1j20u00g2whd.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631348141&t=9a2d66a6d2bc463b9d5b69fdb2207e61',
        controlBar: {
          // fullscreenToggle: true
        },
        sources: [
          // {
          //   src: 'http://media.xiph.org/mango/tears_of_steel_1080p.webm',
          //   type: 'video/webm',
          //   label: 'SD',
          //   res: '360'
          // },
          // //
          // {
          //   src: 'https://vjs.zencdn.net/v/oceans.mp4?HD',
          //   type: 'video/mp4',
          //   label: 'HD',
          //   res: '720'
          // },
            {
            src: 'http://192.168.144.53:80/ocean/playlist.m3u8',
            type: 'application/x-mpegURL',
            label: 'HGD',
            res: '900'
          },
          {
            // src: ' https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
            src: 'http://192.168.144.53:80/tmp/1234567890.m3u8',
            type: 'application/x-mpegURL',
            withCredentials: true,
            label: 'm3u8',
            res: '1080'
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
  mounted() {
    // this.getWxCode();
    // document.addEventListener('pause', function () {
    //   console.log('hahahahah');
    //   alert('hhhh');
    // });

    // document.addEventListener("visibilitychange", () => {
    //   alert('hhhh1234154');
    //   if (document.hidden) {
    //     // 页面被挂起
    //   }
    //   else {
    //     // 页面呼出
    //   }
    // });
    // alert(`34334------${this.$route.query.code}`)
    // window.location.href = `https://zw.czbanbantong.com/index?code=${this.$route.query.code}`;
  },
  methods: {
    getWxCode() {
      if (isWechat()) {
        let appid = "wxa16190e252fb8b16"; //为测试号id
        let code = getUrlParam("code"); //是否存在co？
        let local = window.location.origin + '/play?refer=zw';
        //  
        // 'https://www.baidu.com'
        // window.location.href + '?url=henan'; // 配置回调地址
        // let local = 'http://h5.x*****o.com/'		//测试路径
        if (code == null || code === "") {
          //不存在就打开上面的地址进行授权
          window.location.href =
            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
        } else {
          this.code = code
          // window.location.href = 
          alert(window.location.href)
          // alert(this.code)
        }
      }
    },
    onTimeupdate(player) {
      console.log('监听事件', player.currentTime(), player.duration());
        this.$root.$emit('audioPause');
    },
    onTest() {
      // const source = [
      //       {
      //       src: 'https://rsszw.czbanbantong.com//localpath/servicecenter/20150821/20150821074214500203966723014/%E5%84%BF%E6%AD%8C%E6%AC%A3%E8%B5%8F%EF%BC%9A%E5%BF%AB%E5%BF%AB%E4%B9%90%E4%B9%90%E4%B8%8A%E5%AD%A6%E6%A0%A1_128k.mp3',
      //       type: 'audio/mp3',
      //       name: '测试音频2'
      //     }
      // ]
      // Vue.set(this.audioOptions, 'sources', source)
      window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3NTY3ODg2Mg==#wechat_redirect';
    },

    onChange(val) {

    }
  }
}
</script>

<style lang="scss">
.tt {
  height: 60px;
}
.vcom-video {
  .video-js {
    height: 230px;
  }
}
</style>
