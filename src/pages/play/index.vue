<template>
  <div>3423542352345</div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() { 
      console.log('iii', this.$route.query);
      alert(this.$route.query.refer)
      window.location.href = 'https://zw.czbanbantong.com/index';
  }
}
</script>
