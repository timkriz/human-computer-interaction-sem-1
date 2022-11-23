<template>
  <div class="container-fluid h-100 ">
    <div class="h-100 d-flex align-items-center justify-content-center">
      <div style="color:green">
        <h2 class="fw-bold">Rezervacija uspešna!</h2>
        <p class="fw-bold">Avtomobil {{avtomobil}} vas bo čakal na mestu {{poslovalnicaPrevzem}} na {{datumPrevzema}} ob {{casPrevzema}}</p>
        <router-link to="/">
          <button href="" type="button" class="btn btn-primary btn-lg btn-block mt-5" id="enter-button" role="button">Domov</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'SuccessView',
  components: {
    
  },
  setup() {
    const store = useStore()
    
    const avtomobil = computed(() => {
      return store.state.izposoja.avtomobil
    })
    const datumPrevzema = computed(() => new Date(store.state.izposoja.datumPrevzema).toLocaleDateString())
    const casPrevzema = computed(() => store.state.izposoja.casPrevzema)
    const poslovalnicaPrevzem = computed(() => store.state.izposoja.poslovalnicaPrevzem)

    return {
      avtomobil,
      datumPrevzema,
      casPrevzema,
      poslovalnicaPrevzem,
    }
  }
}
</script>
