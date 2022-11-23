<template>
  <div class="prevzem">
      <h3 class="fw-bold pb-3 pt-3 pl-3">Podatki o avtomobilu</h3>
      
      <form class="needs-validation" novalidate :class="{'was-validated': store.state.validatedTabs.avtomobil }">
        <div class="row g-3">
          

          <div class="col-md-8">
            <div class="row g-3">
              <div class="col-12">
                <div class="card">
              <div class="card-header">
                Velikost avtomobila
              </div>
              <div class="card-body pb-4">
                <div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="velikostAvtomobila" id="inlineRadio1" value="option1" :checked="velikostAvtomobila === 'majhna'" @click="setCarSize('majhna')" required>
                    <label class="form-check-label" for="inlineRadio1"  @click="setCarSize('majhna')">Majhna (20€/dan)</label>
                    <div class="invalid-feedback" style="position:absolute">Izberi velikost avtomobila.</div>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="velikostAvtomobila" id="inlineRadio2" value="option2" :checked="velikostAvtomobila === 'srednja'" @click="setCarSize('srednja')" required>
                    <label class="form-check-label" for="inlineRadio2"  @click="setCarSize('srednja')">Srednja (40€/dan)</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="velikostAvtomobila" id="inlineRadio3" value="option3" :checked="velikostAvtomobila === 'velika'" @click="setCarSize('velika')" required>
                    <label class="form-check-label" for="inlineRadio3" @click="setCarSize('velika')">Velika (60€/dan)</label>
                </div>
                
                </div>


              </div>
              </div>
              </div>
                <div class="col-12">
                  <div class="card">
                <div class="card-header">
                  Avtomobil
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-6">
                      <select class="form-select" size="8" v-model="avtomobil" required>
                        <option v-for="car in activeCarsInSelectComponent" :key="car.name" :value="car.name">{{car.name}}</option>
                      </select>
                      <div class="invalid-feedback">Izberi avtomobil.</div>
                    </div>
                    <div class="col-6" align="center">
                      <img :src="carFilepath" class="img-fluid">
                      <br/>
                      <h5 class="mt-3">{{avtomobil}}</h5>
                      
                    </div>
                  </div>
                </div>
              </div>
              </div>
              
            </div>
            
            
          </div>
          <div class="col-md-4">
            <div class="row g-3 flex-column">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    Menjalnik
                  </div>
                  <div class="card-body pb-4">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="menjalnik" id="inlineRadio4" value="option1" :checked="menjalnik === 'Samodejni'" @click="setCarShifter('Samodejni')" required>
                      <label class="form-check-label" for="inlineRadio4"  @click="setCarShifter('Samodejni')">Samodejni</label>
                    <div class="invalid-feedback" style="position:absolute">Izberi vrsto menjalnika.</div>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="menjalnik" id="inlineRadio5" value="option2" :checked="menjalnik === 'Ročni'" @click="setCarShifter('Ročni')" required>
                      <label class="form-check-label" for="inlineRadio5"  @click="setCarShifter('Ročni')">Ročni</label>
                    </div>

                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    Motor
                  </div>
                  <div class="card-body pb-4">
                      <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="motor" id="inlineRadio6" value="option1" :checked="motor === 'Diesel'" @click="setCarMotor('Diesel')" required>
                      <label class="form-check-label" for="inlineRadio6"  @click="setCarMotor('Diesel')">Diesel</label>
                    <div class="invalid-feedback" style="position:absolute">Izberi vrsto motorja.</div>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="motor" id="inlineRadio7" value="option2" :checked="motor === 'Bencin'" @click="setCarMotor('Bencin')" required>
                      <label class="form-check-label" for="inlineRainlineRadio7dio5"  @click="setCarMotor('Bencin')">Bencin</label>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </form>
      <div class="row g-3">
        <div class="col">
          <div class="row justify-content-center align-items-center">
            <div class="col fs-3 text-center"><h5 class="m-4 fw-bold">Št. dni: {{steviloDni}}, Znesek: {{koncnaCena}}€</h5></div>
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
import { computed, onMounted } from 'vue'

export default {
  name: 'IzposojaAvtomobil',
  components: {
    
  },
  setup() {
    const store = useStore()
    var form
    const koncnaCena = computed(() => store.getters.koncnaCena)
    const steviloDni = computed(() => store.getters.numberOfDays)

    const velikostAvtomobila = computed(() => store.state.izposoja.velikostAvtomobila)
    const menjalnik = computed(() => store.state.izposoja.menjalnik)
    const motor = computed(() => store.state.izposoja.motor)

    const majhniAvtomobili = [
      {
        name: 'VW Up!',
        filepath: require('../assets/cars/vwup.jpg')
      },
      {
        name: 'VW Polo',
        filepath: require('../assets/cars/vwpolo.jpg')
      },
      {
        name: 'Hyundai i20',
        filepath: require('../assets/cars/hyundaii20.jpg')
      },
      {
        name: 'Opel Corsa',
        filepath: require('../assets/cars/opelcorsa.jpg')
      },
      {
        name: 'Fiat 500',
        filepath: require('../assets/cars/fiat500.jpg')
      },
      {
        name: 'Ford Fiesta',
        filepath: require('../assets/cars/fordfiesta.jpg')
      }]
    const srednjiAvtomobili = [{
        name: 'Ford Focus',
        filepath: require('../assets/cars/fordfocus.jpg')
      },
      {
        name: 'BMW 3 Series',
        filepath: require('../assets/cars/bmw3series.jpg')
      },
      {
        name: 'VW Golf',
        filepath: require('../assets/cars/vwgolf.jpg')
      },
      {
        name: 'Mercedes B-Class',
        filepath: require('../assets/cars/mercedesbclass.jpg')
      },
      {
        name: 'Škoda Octavia',
        filepath: require('../assets/cars/skodaoctavia.jpg')
      },
      {
        name: 'Kia Picanto',
        filepath: require('../assets/cars/kiapicanto.jpg')
      }]
    const velikiAvtomobili = [{
        name: 'Seat Leon Station Wagon',
        filepath: require('../assets/cars/seatleon.jpg')
      },
      {
        name: 'Citroen C4 Grand Picasso',
        filepath: require('../assets/cars/citroenc4.jpg')
      },
      {
        name: 'BMW X5',
        filepath: require('../assets/cars/bmwx5.jpg')
      },
      ]
    const activeCarsInSelectComponent = computed(() => {
      if (velikostAvtomobila.value === 'majhna') {
        return majhniAvtomobili
      } else if (velikostAvtomobila.value === 'srednja') {
        return srednjiAvtomobili
      } else if (velikostAvtomobila.value === 'velika') {
        return velikiAvtomobili
      } else return []
    } )
    const carFilepath = computed(() => store.state.izposoja.avtomobilFilepath)


    const avtomobil = computed({
      get() {
        return store.state.izposoja.avtomobil
      },
      set(value) {
        //activeCarsInSelectComponent.value.find(car => car.name === value)
        store.commit('updateIzposoja', { property:'avtomobilFilepath', value: activeCarsInSelectComponent.value.find(car => car.name === value).filepath})
        store.commit('updateIzposoja', { property:'avtomobil', value })
      }
    })

    function onSubmitClick() {
      store.dispatch('changeActiveWindow', 'avtomobil')
      if (!form.checkValidity()) {
        form.classList.add('was-validated')
      } else {
        form.classList.add('was-validated')
        store.commit('updateValidatedTabs', { property:'avtomobil', value: true })
        store.commit('updateLockedTabs', { property:'dodatki', value: false })
        store.dispatch('changeActiveWindow', 'dodatki')
      }
    }

    function onBackClick() {
      store.dispatch('changeActiveWindow', 'prevzem')
    }

    function setCarSize(newCarSize){
      store.commit('updateIzposoja', { property:'velikostAvtomobila', value: newCarSize })
    }

    function setCarShifter(newShifter) {
      store.commit('updateIzposoja', { property:'menjalnik', value: newShifter })
    }

    function setCarMotor(newMotor) {
      store.commit('updateIzposoja', { property:'motor', value: newMotor })
    }

    onMounted(() => {
      form = document.querySelectorAll('.needs-validation')[0]
    })
    
    
    return {
      store,
      velikostAvtomobila,
      activeCarsInSelectComponent,
      onSubmitClick,
      onBackClick,
      setCarSize,
      setCarShifter,
      setCarMotor,
      avtomobil,
      menjalnik,
      motor,
      koncnaCena,
      steviloDni,
      carFilepath,
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
