<template>
  <div>{{a}} {{data.message}}
       <div>{{ bar }} {{foo}} </div>
  </div>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<script lang="js">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent , ref, reactive, toRefs} from 'vue-demi'
// import Hello from './components/Hello.vue'
// import Test from "./components/test.vue"
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  });
  // 操作 state 的逻辑
  // 返回时转换为ref
  return toRefs(state);
}
export default defineComponent ({
  name: 'HelloWorld',
  components: {
  },
  setup () {
    const a = ref(1);
    const data = reactive({
      message: '阿瑞'
    })
    // 可以在不失去响应性的情况下解构
    const { foo, bar } = useFeatureX();
    return {
      a,
      data,
      foo,
      bar
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
