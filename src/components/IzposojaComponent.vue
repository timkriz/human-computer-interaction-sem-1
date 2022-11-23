<template>
  <div class="hello">
    <div class="container-fluid h-100 ">
        <IzposojaHeader/>
        <IzposojaPrevzem v-if="activeWindow === 'prevzem'" />
        <IzposojaAvtomobil v-if="activeWindow === 'avtomobil'" />
        <IzposojaDodatki v-if="activeWindow === 'dodatki'" />
        <IzposojaNarocnik v-if="activeWindow === 'narocnik'" />
        <IzposojaPregled v-if="activeWindow === 'pregledPlacilo'" />

    </div>
  </div>
</template>

<script>
import IzposojaHeader from './IzposojaHeader.vue'
import IzposojaPrevzem from './IzposojaPrevzem.vue'
import IzposojaAvtomobil from './IzposojaAvtomobil.vue'
import IzposojaDodatki from './IzposojaDodatki.vue'
import IzposojaNarocnik from './IzposojaNarocnik.vue'
import IzposojaPregled from './IzposojaPregled.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'IzposojaComponent',
  props: {
    msg: String
  },
  components: {
    IzposojaHeader, IzposojaPrevzem, IzposojaAvtomobil, IzposojaDodatki, IzposojaNarocnik, IzposojaPregled,
  },
  setup() {
    const store = useStore()
    const activeWindow = computed(() => store.state.izposojaActiveWindow)
    return {
      activeWindow,
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  color: #2c3e50;
  height: 100%;
}

#enter-button {
  background-color: var(--background-blue);
  border: none;
}

.av-container {
    margin: 0px 10px;
}

</style>
