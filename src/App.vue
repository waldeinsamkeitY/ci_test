<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ref,onMounted} from 'vue'
const li =Array.from({length: 5}, (v, i) => i)
const item = ref(null)
console.log('item2', item.value)
onMounted(()=>{
  console.log('item ', item.value)
})
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      <div v-for="(v,i) in li" :key="i" ref="item">{{v}}</div>
    </a>
  </div>
  <HelloWorld msg="Vite + Vue + github + build + 1 + 2 + 3" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
