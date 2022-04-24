// import videojs from './../../lib/video.js/dist/video.es.js';
import videojs, { VideoJsPlayerOptions } from './../../types/video.js';
// import { VideoJsPlayerOptions } from 'video.js';
import { reactive, watchEffect, ref, onMounted, onBeforeUnmount, defineComponent, PropType, Ref } from 'vue-demi'
// import  { VideoJsPlayerOptions} from '../../types/video.js';

const DEFAULT_EVENTS: string[] = [
  'loadstart',
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

export default interface VideoOptions extends VideoJsPlayerOptions {
  controls?: boolean
  autoplay?: boolean
  mute?: boolean
  poster?: string
  controlBar?: object,
  plugins?: any[]
  sources?: videojs.Tech.SourceObject[] | undefined
}
/**
 * HLS (HTTP Live Streaming)是Apple的动态码率自适应技术。主要用于PC和Apple终端的音视频服务。包括一个m3u(8)的索引文件，TS媒体分片文件和key加密串文件
 */
/**
 * DASH协议
基于HTTP的动态自适应流（英语：Dynamic Adaptive Streaming over HTTP，缩写DASH，也称MPEG-DASH）是一种自适应比特率流技术，使高质量流媒体可以通过传统的HTTP网络服务器以互联网传递。

类似苹果公司的HTTP Live Streaming（HLS）方案，MPEG-DASH会将内容分解成一系列小型的基于HTTP的文件片段，每个片段包含很短长度的可播放内容，而内容总长度可能长达数小时（例如电影或体育赛事直播）。内容将被制成多种比特率的备选片段，以提供多种比特率的版本供选用。当内容被MPEG-DASH客户端回放时，客户端将根据当前网络条件自动选择下载和播放哪一个备选方案。客户端将选择可及时下载的最高比特率片段进行播放，从而避免播放卡顿或重新缓冲事件。也因如此，MPEG-DASH客户端可以无缝适应不断变化的网络条件并提供高质量的播放体验，拥有更少的卡顿与重新缓冲发生率。

MPEG-DASH是首个基于HTTP的自适应比特率流解决方案，它也是一项国际标准。[1]MPEG-DASH不应该与传输协议混淆——MPEG-DASH使用TCP传输协议。
MPEG-DASH使用现有的HTTP网络服务器基础设施。它允许如互联网电视、电视机顶盒、台式计算机、智能手机、平板电脑等设备消费通过互联网传送的多媒体内容（如视频、电视、广播等），并可应对变动的互联网接收条件。自适应流解决方案的标准化是为向市场提供信心，使该解决方案可以用于通用部署，抗衡类似但更专有的解决方案，如微软Smooth Streaming与Adobe的HDS。

不同于HLS、HDS和Smooth Streaming，DASH不关心编解码器，因此它可以接受任何编码格式编码的内容，如H.265、H.264、VP9等。

HLS协议
HTTP Live Streaming（缩写是HLS）是一个由苹果公司提出的基于HTTP的流媒体网络传输协议。是苹果公司QuickTime X和iPhone软件系统的一部分。它的工作原理是把整个流分成一个个小的基于HTTP的文件来下载，每次只下载一些。当媒体流正在播放时，客户端可以选择从许多不同的备用源中以不同的速率下载同样的资源，允许流媒体会话适应不同的数据速率。在开始一个流媒体会话时，客户端会下载一个包含元数据的extended M3U (m3u8)playlist文件，用于寻找可用的媒体流。

HLS只请求基本的HTTP报文，与实时传输协议（RTP)不同，HLS可以穿过任何允许HTTP数据通过的防火墙或者代理服务器。它也很容易使用内容分发网络来传输媒体流。

HLS协议本身实现了码率自适应，不同带宽的设备可以自动切换到最适合自己码率的视频播放。
————————————————
 */
type VideoSourceType = {
  src: string
  type: string
}

export const UseVideoComponent = defineComponent({
  props: {
    options: Object as PropType<VideoOptions>
  },

  emits: DEFAULT_EVENTS,
  setup(props, { emit }) {
    const videoPlayer = ref<HTMLElement | null>(null)
    useVideo(props.options, emit, videoPlayer)
  }
})

/**
 * 
 * @param options 播放配置
 * @param emit  
 * @param refValue dom
 */
export function useVideo<P extends VideoJsPlayerOptions, Name extends string>(options?: P, emit?: (name: Name, ...args: any[]) => void, refValue?: Ref<HTMLElement | null>) {
  const defaultConfig = reactive({
    controls: true,
    autoplay: true,
    playbackRate: [1, 1.5, 2],
    muted: false,
    poster: 'none',
    controlBar: {
      fullscreenToggle: false,
      pictureInPictureToggle: true,
    },
    html5: {
      vhs: {
        withCredentials: false
        // handlePartialData: true
        // handleManifestRedirects: true
      },
      hls: {
        smoothQualityChange: true
      }
    },
    plugins: {
      videoJsResolutionSwitcher: {
        default: 'high',
        ui: true,
        dynamicLabel: true
      }
    }
    // videoOptions: {}
  })

  let videoOptions = {};
  let videoPlayer = ref<HTMLElement | null>(null)
  let player: videojs.Player

  // watchEffect(() => {
  //   videoOptions = {
  //     ...defaultConfig,
  //     ...options
  //   }
  // })

  onMounted(() => {
    initialize()
  })

  onBeforeUnmount(() => {
    if (player) {
      player.dispose()
    }
  })

  function initialize() {
    videoOptions = {
      ...defaultConfig,
      ...options
    }
    console.log('videoOptions', videoOptions);
    
    const emitPlayerSate = (event: Name) => {
      if (event) {
        switch (event) {
          case 'loadstart':
            decodeHls()
            break;
          case 'error':
            onPlayError()
            break;
          default:
            break;
        }
      }
      emit?.(event, player)
    }
    // videoPlayer = refValue!
    player = videojs(refValue?.value ?? '', videoOptions, function onPlayReady() {
      const events = DEFAULT_EVENTS
      for (let i = 0; i < events.length; i++) {
        if (typeof events[i] === 'string') {
          (event => {
            this.on(event, () => {
              emitPlayerSate(event as Name)
            })
          })(events[i])
        }
      }
    })
    const p = player as any
    p.updateSrc(options?.sources)

    player.on('resolutionchange', () => {
      console.info('Source changed to %s', player.src())
    })
    // p.landscapeFullscreen({
    //   fullscreen: {
    //     enterOnRotate: true,
    //     alwaysInLandscapeMode: true,
    //     iOS: false
    //   }
    // })

    videojs.use('video/mp4', (player) => {
      console.log('正在播放');
      return {
        setSource(srcObj, next) {
          next(null, srcObj)
        },
        setVolume(val: number) {
          console.log('val----', val);
          return 0.2
        }
      }
    })

    // player.on('ready', () => {
    //   player.tech().on('usage', (e) => {
    //     console.log(e);
    //   });
    // });

    newButtonToggle()
  }

  function newButtonToggle() {
    // 隐藏掉 画中画
    player?.getChild('ControlBar')?.removeChild(player?.getChild('ControlBar')?.getChild('pictureInPictureToggle')!)
  }

  function onPlayError() {
    document.getElementsByClassName('vjs-modal-dialog-content')[0].textContent = '视频加载失败'
  }

  // AES 解密
  function decodeHls() {
    const tech = player.tech() as any
    if (!player.tech() || !tech.vhs) {
      return
    }
    // let prefix = 'pt.key'
    // //'_enc.key'
    // let urlTpl = 'http://192.168.31.181:80:80/tt.key'

    let prefix = '_enc.key'
    //'_enc.key'
    let urlTpl = 'http://192.168.31.181:80/tt3.key'
    // 'https://domain.com/path/{key}'

    tech.vhs.xhr.beforeRequest = function (options: any) {
      console.log('tech---laod', options);
      // required for detecting only the key requests
      if (options.uri.search(prefix) === -1) { return; }
      // console.log('222');
      options.headers = options.headers || {};
      // options.headers["Custom-Header"] = "value";
      options.headers['Accept-Ranges'] = 'bytes';
      options.headers['Content-Type'] = 'application/octet-stream';
      // let s = '544cbbb9dfcb291c725623c43f8b8ee1'
      // console.log(hexStringToUint8Array(s));
      options.uri = urlTpl;
      // urlTpl.replace("544cbbb9dfcb291c725623c43f8b8ee1", options.uri.substring(prefix.length));
    }

    tech.on('vhs-aes', (e: any) => {
      console.log('uuuuuuuuuuuuuuuuuuuuuuu====================',e);
    });
  }

 function hexStringToUint8Array(hexString: string){
    if (hexString.length % 2 !== 0){
      throw "Invalid hexString";
    }/*from  w w w.  j  av a 2s  . c  o  m*/
    var arrayBuffer = new Uint8Array(hexString.length / 2);
  
    for (var i = 0; i < hexString.length; i += 2) {
      var byteValue = parseInt(hexString.substr(i, 2), 16);
      if (isNaN(byteValue)){
        throw "Invalid hexString";
      }
      arrayBuffer[i/2] = byteValue;
    }
  
    return arrayBuffer;
  }
  
}
