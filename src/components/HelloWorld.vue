<template>
  <div class="hello">
    <div class="container h-100">
      <div class="d-flex justify-content-center align-items-center flex-column h-100">
        <div class="image">
        <img alt="Vue logo" src="../assets/avtek-logo.png">
        </div>
      <router-link to="/izposoja">
        <button href="src/izposoja.html" type="button" class="btn btn-primary btn-lg btn-block mt-5" id="enter-button" role="button" @click="onButtonClick">Izposoja avtomobila</button>
      </router-link>
      </div>


    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
//import { computed, onMounted } from 'vue'

export default {
  name: 'HelloWorld',
  setup(){
    const store = useStore()
    function onButtonClick(){
      store.commit('resetState')
      store.dispatch('changeActiveWindow', 'prevzem')
    }
    return {
      onButtonClick
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#enter-button {
  background-color: var(--background-blue);
  border: none;
}
</style>
