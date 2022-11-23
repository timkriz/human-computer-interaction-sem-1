<template>
  <div class="header">
      <nav class="navbar navbar-light">
          <div class="col-md-2">
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <img alt="Vue logo" src="../assets/avtek-logo-hor.png" width="150" >
            </button>
            

            <!--<router-link to="/" class="navbar-brand">
              <img alt="Vue logo" src="../assets/avtek-logo.png" width="80" >
            </router-link>-->
          </div>
          <div class="col-md-10">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
              <ol class="breadcrumb justify-content-end">
                <li class="breadcrumb-item active" @click="switchWindow('prevzem')">
                  <svg  v-if="validatedTabs.prevzem" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256" style="fill:#000000;">
                    <g fill="#33ad3b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(9.84615,9.84615)"><path d="M13,1c-6.61719,0 -12,5.38281 -12,12c0,6.61719 5.38281,12 12,12c6.61719,0 12,-5.38281 12,-12c0,-6.61719 -5.38281,-12 -12,-12zM13,3c5.53516,0 10,4.46484 10,10c0,5.53516 -4.46484,10 -10,10c-5.53516,0 -10,-4.46484 -10,-10c0,-5.53516 4.46484,-10 10,-10zM17.1875,7.0625c-0.14844,0.02344 -0.27344,0.10156 -0.375,0.25l-4.90625,7.28125l-2.3125,-2.28125c-0.19922,-0.30078 -0.58203,-0.32422 -0.78125,-0.125l-0.90625,0.90625c-0.19922,0.30078 -0.19922,0.70703 0,0.90625l3.5,3.5c0.19922,0.10156 0.48047,0.3125 0.78125,0.3125c0.19922,0 0.51953,-0.10547 0.71875,-0.40625l6,-8.8125c0.19922,-0.30078 0.08594,-0.58203 -0.3125,-0.78125l-1,-0.71875c-0.10156,-0.05078 -0.25781,-0.05469 -0.40625,-0.03125z"></path></g></g>
                  </svg>
                  <a href="#" class= "btn btn-link fw-bold" :class="{ disabled: false }">1. Prevzem</a>
                </li>
                <li class="breadcrumb-item active" @click="switchWindow('avtomobil')">

                  <svg  v-if="validatedTabs.avtomobil" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256" style="fill:#000000;">
                    <g fill="#33ad3b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(9.84615,9.84615)"><path d="M13,1c-6.61719,0 -12,5.38281 -12,12c0,6.61719 5.38281,12 12,12c6.61719,0 12,-5.38281 12,-12c0,-6.61719 -5.38281,-12 -12,-12zM13,3c5.53516,0 10,4.46484 10,10c0,5.53516 -4.46484,10 -10,10c-5.53516,0 -10,-4.46484 -10,-10c0,-5.53516 4.46484,-10 10,-10zM17.1875,7.0625c-0.14844,0.02344 -0.27344,0.10156 -0.375,0.25l-4.90625,7.28125l-2.3125,-2.28125c-0.19922,-0.30078 -0.58203,-0.32422 -0.78125,-0.125l-0.90625,0.90625c-0.19922,0.30078 -0.19922,0.70703 0,0.90625l3.5,3.5c0.19922,0.10156 0.48047,0.3125 0.78125,0.3125c0.19922,0 0.51953,-0.10547 0.71875,-0.40625l6,-8.8125c0.19922,-0.30078 0.08594,-0.58203 -0.3125,-0.78125l-1,-0.71875c-0.10156,-0.05078 -0.25781,-0.05469 -0.40625,-0.03125z"></path></g></g>
                  </svg>

                  <a href="#" class= "btn btn-link fw-bold" :class="{ disabled: lockedTabs.avtomobil }">2. Avtomobil</a>
                  </li>
                <li class="breadcrumb-item" @click="switchWindow('dodatki')">
                  <svg  v-if="validatedTabs.dodatki" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256" style="fill:#000000;">
                    <g fill="#33ad3b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(9.84615,9.84615)"><path d="M13,1c-6.61719,0 -12,5.38281 -12,12c0,6.61719 5.38281,12 12,12c6.61719,0 12,-5.38281 12,-12c0,-6.61719 -5.38281,-12 -12,-12zM13,3c5.53516,0 10,4.46484 10,10c0,5.53516 -4.46484,10 -10,10c-5.53516,0 -10,-4.46484 -10,-10c0,-5.53516 4.46484,-10 10,-10zM17.1875,7.0625c-0.14844,0.02344 -0.27344,0.10156 -0.375,0.25l-4.90625,7.28125l-2.3125,-2.28125c-0.19922,-0.30078 -0.58203,-0.32422 -0.78125,-0.125l-0.90625,0.90625c-0.19922,0.30078 -0.19922,0.70703 0,0.90625l3.5,3.5c0.19922,0.10156 0.48047,0.3125 0.78125,0.3125c0.19922,0 0.51953,-0.10547 0.71875,-0.40625l6,-8.8125c0.19922,-0.30078 0.08594,-0.58203 -0.3125,-0.78125l-1,-0.71875c-0.10156,-0.05078 -0.25781,-0.05469 -0.40625,-0.03125z"></path></g></g>
                  </svg>
                  <a href="#" class= "btn btn-link fw-bold" :class="{ disabled: lockedTabs.dodatki }">3. Dodatki</a>
                  </li>
                <li class="breadcrumb-item" @click="switchWindow('narocnik')">
                  <svg  v-if="validatedTabs.narocnik" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256" style="fill:#000000;">
                    <g fill="#33ad3b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(9.84615,9.84615)"><path d="M13,1c-6.61719,0 -12,5.38281 -12,12c0,6.61719 5.38281,12 12,12c6.61719,0 12,-5.38281 12,-12c0,-6.61719 -5.38281,-12 -12,-12zM13,3c5.53516,0 10,4.46484 10,10c0,5.53516 -4.46484,10 -10,10c-5.53516,0 -10,-4.46484 -10,-10c0,-5.53516 4.46484,-10 10,-10zM17.1875,7.0625c-0.14844,0.02344 -0.27344,0.10156 -0.375,0.25l-4.90625,7.28125l-2.3125,-2.28125c-0.19922,-0.30078 -0.58203,-0.32422 -0.78125,-0.125l-0.90625,0.90625c-0.19922,0.30078 -0.19922,0.70703 0,0.90625l3.5,3.5c0.19922,0.10156 0.48047,0.3125 0.78125,0.3125c0.19922,0 0.51953,-0.10547 0.71875,-0.40625l6,-8.8125c0.19922,-0.30078 0.08594,-0.58203 -0.3125,-0.78125l-1,-0.71875c-0.10156,-0.05078 -0.25781,-0.05469 -0.40625,-0.03125z"></path></g></g>
                  </svg>
                  <a href="#" class= "btn btn-link fw-bold" :class="{ disabled: lockedTabs.narocnik }">4. Naročnik</a>
                  </li>
                <li class="breadcrumb-item" @click="switchWindow('pregledPlacilo')">
                  <svg  v-if="validatedTabs.pregledPlacilo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256" style="fill:#000000;">
                    <g fill="#33ad3b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(9.84615,9.84615)"><path d="M13,1c-6.61719,0 -12,5.38281 -12,12c0,6.61719 5.38281,12 12,12c6.61719,0 12,-5.38281 12,-12c0,-6.61719 -5.38281,-12 -12,-12zM13,3c5.53516,0 10,4.46484 10,10c0,5.53516 -4.46484,10 -10,10c-5.53516,0 -10,-4.46484 -10,-10c0,-5.53516 4.46484,-10 10,-10zM17.1875,7.0625c-0.14844,0.02344 -0.27344,0.10156 -0.375,0.25l-4.90625,7.28125l-2.3125,-2.28125c-0.19922,-0.30078 -0.58203,-0.32422 -0.78125,-0.125l-0.90625,0.90625c-0.19922,0.30078 -0.19922,0.70703 0,0.90625l3.5,3.5c0.19922,0.10156 0.48047,0.3125 0.78125,0.3125c0.19922,0 0.51953,-0.10547 0.71875,-0.40625l6,-8.8125c0.19922,-0.30078 0.08594,-0.58203 -0.3125,-0.78125l-1,-0.71875c-0.10156,-0.05078 -0.25781,-0.05469 -0.40625,-0.03125z"></path></g></g>
                  </svg>
                  <a href="#" class= "btn btn-link fw-bold" :class="{ disabled: lockedTabs.pregledPlacilo }">5. Pregled & plačilo</a>
                </li>
              </ol>
            </nav>
          </div>
      </nav>


      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Domov</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Z nadaljevanjem boste izgubili vnešene podatke.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zapri</button>
              
              <router-link to="/" class="navbar-brand">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Nadaljuj</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'IzposojaHeader',
  props: {
    msg: String
  },
  setup() {
    const store = useStore()
    const activeWindow = computed(() => store.state.izposojaActiveWindow)
    const lockedTabs = computed(() => store.state.lockedTabs)
    const validatedTabs = computed(() => store.state.validatedTabs)

    function switchWindow(newWindow) {
      if(store.state.lockedTabs[newWindow]) return
      store.dispatch('changeActiveWindow', newWindow)
    }
    return {
      activeWindow,
      switchWindow,
      lockedTabs,
      validatedTabs,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#enter-button {
  background-color: var(--background-blue);
  border: none;
}

img {
  pointer-events: none;
}
a {
  user-select: none;
  -webkit-user-drag: none;
}

nav a {
    text-decoration: none !important;
    font-weight: 100;
    padding-left:4px
}

.breadcrumb-item::before {
  padding-top: 6px;
}
.btn-link {
  color: #4F4686 !important;
}

.btn-link:hover {
  color: var(--background-blue) !important;
}

</style>
