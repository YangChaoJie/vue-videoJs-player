<template>
  <div id="app">
    <div>
      <video-player :options="videoOptions" />
      <!-- <video-player-2></video-player-2> -->
      <!-- <audio-player :options="audioOptions"></audio-player> -->
    </div>
  </div>
</template>

<script>
import VideoPlayer from './components/video.vue'
import VideoPlayer2 from './components/video2.vue'
import AudioPlayer from './components/audio.vue'
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
    VideoPlayer,
    VideoPlayer2,
    AudioPlayer
  },
  data () {
    return {
      videoOptions: {
        code: '',
        autoplay: true,
        controls: true,
        muted: false,
        controlBar: {
          // fullscreenToggle: true
        },
        sources: [
          {
            src: 'https://rsszw.czbanbantong.com//localpath/servicecenter/20210401/20210401130614879709195799766/%E3%80%90English_Singsing%E3%80%91Phonics_Rap_Ah264_720x576_800k.mp4',
            //'http://192.168.144.53:3000/480P_megaproject.mp4',
            // 'http://ivi.bupt.edu.cn/hls/cctv1.m3u8',
            type: 'video/mp4',
          },
        ],
      },
      audioOptions: {
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
  },
  methods: {
    getWxCode(){
				if (isWechat()) {
					let appid = "wxa16190e252fb8b16"; //为测试号id
					let code = getUrlParam("code"); //是否存在code
					let local = window.location.href + '?url=henan'; // 配置回调地址
					// let local = 'http://h5.x*****o.com/'		//测试路径
					if (code == null || code === "") {				
						//不存在就打开上面的地址进行授权
						window.location.href =
							`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;				
					}else{
						this.code = code
            alert(window.location.href)
            alert(this.code)
					}
				}
			}
  },
}
</script>

