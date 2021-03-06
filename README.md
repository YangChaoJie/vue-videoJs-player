# videoJs-custom
videoJs custom audio and video skin and component with vue&&vite


## install
```
yarn add vcom-video-player
```

### How To Use

```
import { videoPlayer, audioPlayer } from 'vcom-video-player'

<template>
  <div id="app">
    <div>
      <video-player :options="videoOptions" />
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
```
#### audio config
```
 audioOptions: {
        // poster: './music_bg.png',
        // autoplay: true,
        controls: true,
        controlBar: {
          fullscreenToggle: false,
          // durationDisplay: false,
          // currentTimeDisplay: false
        },
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

    const videoObj = this.options.sources[0];
    this.player.audioPlayer({
      artist: '',
      track: videoObj.name
    });  
```

#### video config
```
 videoOptions: {
        code: '',
        autoplay: false,
        controls: true,
        // muted: true,
        controlBar: {
          fullscreenToggle: true
        },
        sources: [
          {
            src: 'https://rsszw.czbanbantong.com//localpath/servicecenter/20210401/20210401130614879709195799766/%E3%80%90English_Singsing%E3%80%91Phonics_Rap_Ah264_720x576_800k.mp4',
            //'http://192.168.31.181:80:3000/480P_megaproject.mp4',
            // 'http://ivi.bupt.edu.cn/hls/cctv1.m3u8',
            type: 'video/mp4',
          },
        ],
      }


 this.player = videojs(
      this.$refs.videoPlayer,
      this.options
 )     
```

#### 更多配置 可以参考 videojs 官网配置
[videojs官网](https://videojs.com/)
#### demo dislpay

![](./screenImg/1.png)

<br>
<br>

![](./screenImg/2.png)

<br>
<br>

![](./screenImg/3.png)

<br>
<br>
