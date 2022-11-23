import { createStore } from 'vuex'


const getDefaultState = () => {
  return {
    izposojaActiveWindow: 'prevzem',
    izposoja: {
      'poslovalnicaPrevzem': '',
      'poslovalnicaVracilo': '',
      datumPrevzema:'',
      datumVracila: '',
      casPrevzema:'',
      casVracila: '',
      velikostAvtomobila: '',
      avtomobil: '',
      avtomobilFilepath: '',
      menjalnik: '',
      motor: '',
      zavarovanje: false,
      sedez: false,
      narocnik: {
        ime: '',
        priimek: '',
        ulica: '',
        mesto: '',
        postnaStevilka: '',
        email: '',
        telefon: '',
        dialCode: '',
        starost: null,
        starostIzpita: null,
        cardNumber: '',
        cardDate: '',
        cardCVV: '',
      }
    },
    lockedTabs: {
      avtomobil: true,
      dodatki: true,
      narocnik: true,
      pregledPlacilo: true,
    },
    validatedTabs: {
      prevzem: false,
      avtomobil: false,
      dodatki: false,
      narocnik: false,
      pregledPlacilo: false,
    },
  }
}

export default createStore({
  state: getDefaultState(),
  getters: {
    koncnaCena (state, getters) {
      var cenaAvtomobila = 0
      if(state.izposoja.avtomobil){
        if(state.izposoja.velikostAvtomobila === "majhna") {
          cenaAvtomobila = 20
        } else if (state.izposoja.velikostAvtomobila === "srednja") {
          cenaAvtomobila = 40
        } else {
          cenaAvtomobila = 60
        }
      }
      var zavarovanje = state.izposoja.zavarovanje ? getters.numberOfDays*2 : 0
      
      return cenaAvtomobila * getters.numberOfDays + zavarovanje
    },
    numberOfDays(state){
      var numberOfDays = 0
      if(state.izposoja.datumVracila && state.izposoja.datumPrevzema) {
        let diff = new Date(state.izposoja.datumVracila).getTime() - new Date(state.izposoja.datumPrevzema).getTime()
        numberOfDays = Math.ceil(diff / (1000 * 3600 * 24));
        numberOfDays = numberOfDays === 0 ? 1:numberOfDays
      }
      return numberOfDays
    }
  },
  mutations: {
    changeActiveWindow(state, newWindow) {
      state.izposojaActiveWindow = newWindow
    },
    updateIzposoja (state, { property, value}) {
      state.izposoja[property] = value
    },
    updateNarocnik (state, { property, value}) {
      state.izposoja.narocnik[property] = value
    },
    updateLockedTabs (state, { property, value}) {
      state.lockedTabs[property] = value
    },
    updateValidatedTabs (state, { property, value}) {
      state.validatedTabs[property] = value
    },
    resetState (state) {
      // Merge rather than replace so we don't lose observers
      // https://github.com/vuejs/vuex/issues/1118
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
    changeActiveWindow (context, newWindow) {
      context.commit('changeActiveWindow', newWindow)
    },
  },
  modules: {
  }
})
