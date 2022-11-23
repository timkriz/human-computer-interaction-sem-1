<template>
  <div class="prevzem">
      <h3 class="fw-bold pb-3 pt-3 pl-3">Hitra izposoja avtomobilov. Gremo na pot!</h3>
      <form class="needs-validation" :class="{'was-validated': store.state.validatedTabs.prevzem }" novalidate>
      <div class="row">
        <div class="col-sm-6">
          <div class="card mb-3">
            <div class="card-header">
              Prevzem
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-12">

                  <label for="validationCustom04" class="form-label">Poslovalnica</label>
                  <select class="form-select" id="validationCustom01" v-model="poslovalnicaPrevzem" required>
                    <option selected disabled value="">Izberi poslovalnico...</option>
                    <option v-for="c in poslovalnice" :value="c.label" :key="c.key">{{c.label}}</option>
                  </select>

                  <div class="invalid-feedback">
                    Izberite poslovalnico iz seznama.
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label for="datumPrevzema" class="form-label">Datum prevzema</label>
                  <input type="date" class="form-control" id="datumPrevzema" name="datumPrevzema" v-model="datumPrevzema" required>
                  <div class="invalid-feedback">
                    {{datumPrevzemaInvalidFeedback}}
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="validationCustom05" class="form-label">Čas prevzema</label>
                  <input type="time" class="form-control" id="validationCustom05" v-model="casPrevzema" required>
                  <div class="invalid-feedback">
                    Vnesite čas prevzema.
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-header">
              Vračilo
            </div>
            <div class="card-body">
              <div class="row g-3" >
                <div class="col-md-12">


                  <label for="validationCustom04" class="form-label">Poslovalnica</label>
                   <select class="form-select" id="validationCustom01" v-model="poslovalnicaVracilo" required>
                    <option selected disabled value="">Izberi poslovalnico...</option>
                    <option v-for="c in poslovalnice" :value="c.label" :key="c.key">{{c.label}}</option>
                  </select>

                  <div class="invalid-feedback">
                    Izberite poslovalnico iz seznama.
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label for="datumVracila" class="form-label">Datum vračila</label>
                  <input type="date" class="form-control" id="datumVracila" name="datumVracila" v-model="datumVracila" required>
                  <div class="invalid-feedback">
                    {{datumPrevzemaInvalidFeedback}}
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="validationCustom05" class="form-label">Čas vračila</label>
                  <input type="time" class="form-control" id="validationCustom05" v-model="casVracila" required>
                  <div class="invalid-feedback">
                    Vnesite čas vračila.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      </form>
      
      <div class="col-12">
        <button class="btn btn-primary float-end m-1" @click="onSubmitClick">Naprej</button>
      </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'

export default {
  name: 'IzposojaPrevzem',
  components: {
    
  },
  setup() {
    const store = useStore()
    const activeWindow = computed(() => store.state.izposojaActiveWindow)
    const datumPrevzemaInvalidFeedback = ref('Vnesite datum prevzema.')
    const poslovalnicaPrevzem = computed({
      get() {
        return store.state.izposoja.poslovalnicaPrevzem
      },
      set(value) {
        store.commit('updateIzposoja', { property:'poslovalnicaPrevzem', value })
      }
    })

    const poslovalnicaVracilo = computed({
      get() {
        return store.state.izposoja.poslovalnicaVracilo
      },
      set(value) {
        store.commit('updateIzposoja', { property:'poslovalnicaVracilo', value })
      }
    })

    var form
    const poslovalnice = ref([
      { id: 1, label: 'Ljubljana'},
      { id: 2, label: 'Maribor'},
      { id: 3, label: 'Celje'},
      { id: 4, label: 'Kranj'},
      { id: 5, label: 'Velenje'},
      { id: 6, label: 'Koper'},
      { id: 7, label: 'Novo Mesto'},
      { id: 8, label: 'Murska Sobota'},
      { id: 9, label: 'Jesenice'},
      { id: 10, label: 'Portorož'},
      { id: 11, label: 'Letališče Brnik'},
      { id: 12, label: 'Letališče Maribor'},
    ])

    function onSubmitClick() {
      /* Custom validation */
      if(datumVracila.value && datumPrevzema.value && new Date(datumPrevzema.value) > new Date(datumVracila.value)) {
        datumPrevzemaInvalidFeedback.value = "Čas prevzema ne mora biti pred časom vračila."
        document.getElementsByName("datumPrevzema")[0].setCustomValidity("Invalid field.")
        document.getElementsByName("datumVracila")[0].setCustomValidity("Invalid field.")
      }
      else {
        document.getElementsByName("datumPrevzema")[0].setCustomValidity("")
        document.getElementsByName("datumVracila")[0].setCustomValidity("")
      }

      if (!form.checkValidity()) {
        form.classList.add('was-validated')
        //store.commit('updateValidatedTabs', { property:'prevzem', value: false })
      } else {
        form.classList.add('was-validated')
        store.commit('updateValidatedTabs', { property:'prevzem', value: true })
        store.commit('updateLockedTabs', { property:'avtomobil', value: false })
        store.dispatch('changeActiveWindow', 'avtomobil')
      }
    }

    const datumPrevzema = computed({
      get() {
        return store.state.izposoja.datumPrevzema
      },
      set(value) {
        if(datumVracila.value && new Date(value) > new Date(datumVracila.value)) {
          datumPrevzemaInvalidFeedback.value = "Čas prevzema ne mora biti pred časom vračila."
        }
        store.commit('updateIzposoja', { property:'datumPrevzema', value })
      }
    })

    const casPrevzema = computed({
      get() {
        return store.state.izposoja.casPrevzema
      },
      set(value) {
        store.commit('updateIzposoja', { property:'casPrevzema', value })
      }
    })

    const datumVracila = computed({
      get() {
        return store.state.izposoja.datumVracila
      },
      set(value) {
        if(datumPrevzema.value && new Date(value) > new Date(datumPrevzema.value)) {
          datumPrevzemaInvalidFeedback.value = "Čas prevzema ne mora biti pred časom vračila."
        }
        store.commit('updateIzposoja', { property:'datumVracila', value })
      }
    })
    
    const casVracila = computed({
      get() {
        return store.state.izposoja.casVracila
      },
      set(value) {
        store.commit('updateIzposoja', { property:'casVracila', value })
      }
    })

    onMounted(() => {
      form = document.querySelectorAll('.needs-validation')[0]

      var today = new Date().toISOString().split('T')[0];
      document.getElementsByName("datumPrevzema")[0].setAttribute('min', today);
      document.getElementsByName("datumVracila")[0].setAttribute('min', today);
    })
    
    
    return {
      store,
      poslovalnice,
      poslovalnicaPrevzem,
      poslovalnicaVracilo,
      activeWindow,
      onSubmitClick,
      datumPrevzema,
      casPrevzema,
      datumVracila,
      casVracila,
      datumPrevzemaInvalidFeedback,
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
