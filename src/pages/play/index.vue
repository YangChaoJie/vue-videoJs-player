<template>
  <div>3423542352345
        <button @click="onTest">asfasfasf</button>
  </div>
</template>

<script>
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
  data() {
    return {
      
    }
  },
  mounted() { 
      console.log('iii', this.$route.query);
      alert(this.$route.query.refer);
      alert(getUrlParam('code'));
      // window.location.href = 'https://zw.czbanbantong.com/index';
  },
  methods: {
      onTest () {
      // const source = [
      //       {
      //       src: 'https://rsszw.czbanbantong.com//localpath/servicecenter/20150821/20150821074214500203966723014/%E5%84%BF%E6%AD%8C%E6%AC%A3%E8%B5%8F%EF%BC%9A%E5%BF%AB%E5%BF%AB%E4%B9%90%E4%B9%90%E4%B8%8A%E5%AD%A6%E6%A0%A1_128k.mp3',
      //       type: 'audio/mp3',
      //       name: '测试音频2'
      //     }
      // ]
      // Vue.set(this.audioOptions, 'sources', source)
      window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwOTQ3NzU0Mw==&scene=124&uin=&key=&devicetype=Windows+10+x64&version=63030532&lang=zh_CN&a8scene=7&fontgear=2?time=' + ((new Date()).getTime());
    }
  }
}
</script>
