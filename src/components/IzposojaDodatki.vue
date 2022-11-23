<template>
  <div class="prevzem">
      <h3 class="fw-bold pb-3 pt-3 pl-3">Dodatna Oprema</h3>
      
      <form class="needs-validation" novalidate>
        <div class="row g-3">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault1" v-model="zavarovanje">
                  <label class="form-check-label" for="flexSwitchCheckDefault1">Avtomobilsko zavarovanje (2€/dan)</label>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault2" v-model="sedez">
                  <label class="form-check-label" for="flexSwitchCheckDefault2">Otroški sedež</label>
                </div>

              </div>
            </div>
          </div>
        </div>
      </form>
      
      <div class="row g-3">
        <div class="col">
          <div class="row justify-content-center align-items-center">
            <div class="col fs-3 text-center"><h5 class="m-4 fw-bold">Št. dni: {{steviloDni}}, Znesek : {{koncnaCena}}€</h5></div>
          </div>
        </div>
      </div>

      <div class="row g-3 p-2 align-items-center">
        <div class="col-6">
          <button class="btn btn-primary ml-4" @click="onBackClick">Nazaj</button>
        </div>
        <div class="col-6">
          <button class="btn btn-primary float-end mr-4" @click="onSubmitClick">Naprej</button>
        </div>
      </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted,  } from 'vue'

export default {
  name: 'IzposojaDodatki',
  setup() {
    const store = useStore()
    const koncnaCena = computed(() => store.getters.koncnaCena)
    const steviloDni = computed(() => store.getters.numberOfDays)
    //var form

    const zavarovanje = computed({
      get() {
        return store.state.izposoja.zavarovanje
      },
      set(value) {
        store.commit('updateIzposoja', { property:'zavarovanje', value })
      }
    })

    const sedez = computed({
      get() {
        return store.state.izposoja.sedez
      },
      set(value) {
        store.commit('updateIzposoja', { property:'sedez', value })
      }
    })


    function onSubmitClick() {
      store.commit('updateLockedTabs', { property:'narocnik', value: false })
      store.commit('updateValidatedTabs', { property:'dodatki', value: true })
      store.dispatch('changeActiveWindow', 'narocnik')
      /*if (!form.checkValidity()) {
        form.classList.add('was-validated')
      } else {
        form.classList.add('was-validated')
        store.dispatch('changeActiveWindow', 'narocnik')
      }*/
    }

    function onBackClick() {
      store.dispatch('changeActiveWindow', 'avtomobil')
    }

    onMounted(() => {
      //form = document.querySelectorAll('.needs-validation')[0]
    })
    
    
    return {
      onSubmitClick,
      onBackClick,
      zavarovanje,
      sedez,
      koncnaCena,
      steviloDni,
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
