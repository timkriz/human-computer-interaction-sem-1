<template>
  <div class="prevzem">
      <h3 class="fw-bold pb-3 pt-3 pl-3" >Pregled vnešenih podatkov & plačilo</h3>
      
      <div class="row g-3 p-3">
      <div class="col-md-6">
        <div class="row g-3 ">
          <div class="col-12">
            <div class="card av-card-body">
              <div class="card-header">
                Osebni podatki
              </div>
              <div class="card-body">
                <dl class="row">
                  <dt class="col-sm-3">Ime</dt>
                  <dd class="col-sm-9">{{narocnik.ime}}</dd>

                  <dt class="col-sm-3">Priimek</dt>
                  <dd class="col-sm-9">{{narocnik.priimek}}</dd>
                  
                  <dt class="col-sm-3">Naslov</dt>
                  <dd class="col-sm-9">{{narocnik.ulica}} <span v-if="narocnik.ulica">,</span>{{narocnik.postnaStevilka}} {{narocnik.mesto}}</dd>

                  <dt class="col-sm-3">E-mail</dt>
                  <dd class="col-sm-9">{{narocnik.email}}</dd>

                  <dt class="col-sm-3">Telefon</dt>
                  <dd class="col-sm-9"><span v-if="narocnik.dialCode">+</span>{{narocnik.dialCode}} {{narocnik.telefon}}</dd>

                </dl>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card av-card-body">
              <div class="card-header">
                Izposoja avtomobila
              </div>
              <div class="card-body">
                <dl class="row">
                  <dt class="col-sm-3">Prevzem</dt>
                  <dd class="col-sm-9">{{izposoja.poslovalnicaPrevzem}} {{izposoja.datumPrevzema}} {{izposoja.casPrevzema}}</dd>
                  
                  <dt class="col-sm-3">Vračilo</dt>
                  <dd class="col-sm-9">{{izposoja.poslovalnicaVracilo}} {{izposoja.datumVracila}} {{izposoja.casVracila}}</dd>

                  <dt class="col-sm-3">Avtomobil</dt>
                  <dd class="col-sm-9">{{izposoja.avtomobil}} {{izposoja.menjalnik}} {{izposoja.motor}}</dd>

                  <dt class="col-sm-3">Zavarovanje</dt>
                  <dd class="col-sm-9"><span v-if="izposoja.zavarovanje">Da (2€/dan)</span><span v-else>Ne</span></dd>
                  <dt class="col-sm-3">Otroški sedež</dt>
                  <dd class="col-sm-9"><span v-if="izposoja.sedez">Da</span><span v-else>Ne</span></dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="row g-3">
        
        <div class="col-12">
          <div class="card av-card-body">
                <div class="card-header">
                  Plačilo
                </div>
                <div class="card-body">
                  
                <form class="needs-validation" novalidate :class="{'was-validated': store.state.validatedTabs.pregledPlacilo }">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="placilo" id="placiloKartica" value="option1" @click="setPayment('card')" required>
                      <label class="form-check-label" for="placiloKartica" @click="setPayment('card')">Kartica</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="placilo" id="placiloGotovina" value="option2" @click="setPayment('cash')" required>
                      <label class="form-check-label" for="placiloGotovina" @click="setPayment('cash')">Gotovina</label>
                    </div>

                  

                  <div v-if="payment==='card'">
                    <hr/>
                    <div class="row g-3">
                      <div class="col-12">
                        <div class="row">
                          <div class="col-6">
                            <label for="cardNumber" class="form-label">Številka kartice</label>
                          </div>
                          <div class="col-6 text-end">
                            <small id="cardNumberHelp" class="form-text text-muted">XXXX-XXXX-XXXX-XXXX</small>
                          </div>
                        </div>
                        <input type="text" class="form-control" id="cardNumber" name="cardNumber" maxlength="19" v-model="cardNumber" required>
                        <div class="invalid-feedback">
                          Vnesite številko kreditne kartice.
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-8">
                            <label for="cardDate" class="form-label">Datum veljavnosti</label>
                          </div>
                          <div class="col-4 text-end">
                            <small id="cardNumberHelp" class="form-text text-muted">MM/YYYY</small>
                          </div>
                        </div>

                        <input type="text" class="form-control" id="cardDate" name="cardDate" @keyup="formatCardDateInput" required>
                        <div class="invalid-feedback">
                          Vnesite datum veljavnosti kreditne kartice.
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-8">
                            <label for="cardCVC" class="form-label">CVC/CVV</label>
                          </div>
                          <div class="col-4 text-end">
                            <a href="#" @click="toggleCCVTooltipVisibility">
                              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256" style="fill:#BEBEBE;">
                                <g fill="#bebebe" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(9.84615,9.84615)"><path d="M13,0c-7.17969,0 -13,5.14844 -13,11.5c0,3.25781 1.53516,6.19141 3.99609,8.28516c-0.67578,2.86328 -4.09766,4.04297 -3.875,4.85547c2.16797,1.24609 7.99219,-1.12891 9.88672,-1.96094c0.96094,0.20313 1.96094,0.32031 2.99219,0.32031c7.17969,0 13,-5.14844 13,-11.5c0,-6.35156 -5.82031,-11.5 -13,-11.5zM14.92578,17.41406c-0.48828,0.20313 -1.625,0.72656 -2.67187,0.72656c-0.96875,0 -2.28906,-0.44531 -2.28906,-1.875c0,-1.65625 1.17188,-4.01562 1.17188,-5.38281c0,-1.52344 -1.98047,-0.69922 -2.125,-0.64453l0.19922,-0.8125c0.48828,-0.19922 1.64844,-0.72656 2.67578,-0.72656c0.83203,0 2.25,0.30078 2.25,1.875c0,1.58203 -1.17187,4.11328 -1.17187,5.38281c0,0.35156 -0.04687,0.90625 1.04688,0.90625c0.42578,0 1.01172,-0.21484 1.11719,-0.26172zM13.53906,7.19531c-0.70703,0 -1.78125,-0.48437 -1.78125,-1.65625c0,-1.1875 1.14453,-1.66797 1.78125,-1.66797c0.75391,0 1.77734,0.55078 1.77734,1.66797c0,0.67578 -0.53125,1.65625 -1.77734,1.65625z"></path></g></g>
                              </svg>
                            </a>
                          </div>
                        </div>
                    
                        <input type="text" class="form-control" name="cardCVV" id="cardCVV" v-model="cardCVV" required>
                        <div class="invalid-feedback">
                          Vnesite CVC/CVV kreditne kartice.
                        </div>
                        <small v-show="ccvTooltipVisible" id="CCVnumberHelp" class="form-text text-muted">CVV je 3-mestna številka na vaši kreditni ali debetni kartici, ki je poleg številke vaše kreditne kartice in datuma poteka veljavnosti.</small>
                      </div>

                    </div>
                  </div>

                  <div v-if="payment==='cash'" class="div">
                    
                  </div>

                  <div v-if="true" class="div">
                    <hr/>
                    <div class="row">
                      <div class="col-3"><h5>Končni znesek</h5></div>
                      <div class="col fs-2 fw-bold" id="koncna-cena">{{koncnaCena}}€</div>
                    </div>
                  </div>

                  <div class="col-12 d-flex justify-content-center pt-4">
                    <button type="button" class="btn btn-primary w-50" :disabled="buttonDisabled" @click="onSubmitClick">Plačaj & končaj</button>
                  </div>

                  <div v-if="loadingPaymentVisible" class="col-12 d-flex justify-content-center pt-4">
                    <div class="spinner-border text-secondary mr-4" role="status">
                    </div>
                    <div style="padding-left:10px">
                      <p>Izvajanje plačila. Prosim, počakajte.</p>
                    </div>
                  </div>
                </form>

                </div>
          </div>
        </div>
        

        </div>
      </div>
      </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import router from '../router/index'

export default {
  name: 'IzposojaPregled',
  components: {
    
  },
  setup() {
    const store = useStore()
    const izposoja = computed(() => store.state.izposoja)
    const narocnik = computed(() => store.state.izposoja.narocnik)
    const koncnaCena = computed(() => store.getters.koncnaCena)
    const payment = ref('')
    const ccvTooltipVisible = ref(false)
    const buttonDisabled = ref(false)
    const loadingPaymentVisible = ref(false)
    var form

    const cardNumber = computed({
      get() {
        return store.state.izposoja.narocnik.cardNumber
      },
      set(value) {
        let cardNumberInput = document.getElementsByName("cardNumber")[0]
        var index = cardNumberInput.value.lastIndexOf('-');
        var test = cardNumberInput.value.substr(index + 1);
        if (test.length === 4 && value.length<16){
          value = value + '-';
        }
        

        if(!validateCardNumber(value)) {
          cardNumberInput.setCustomValidity("Vnesena številka kartice ni ustreznega formata")
        } else {
          cardNumberInput.setCustomValidity("")
        }
        store.commit('updateNarocnik', { property:'cardNumber', value })
      }
    })

    const cardDate = computed({
      get() {
        return store.state.izposoja.narocnik.cardDate
      },
      set(value) {
        let cardDateInput = document.getElementsByName("cardDate")[0]
        if(!value) {
          cardDateInput.setCustomValidity("Vnesen datum ni ustreznega formata")
        } else {
          cardDateInput.setCustomValidity("")
        }
        store.commit('updateNarocnik', { property:'cardDate', value })
      }
    })

    const cardCVV = computed({
      get() {
        return store.state.izposoja.narocnik.cardCVV
      },
      set(value) {
        let cardCVVInput = document.getElementsByName("cardCVV")[0]
        if(!validateCCV(value)) {
          cardCVVInput.setCustomValidity("Vnesena številka CVC/CVV ni ustreznega formata")
        } else {
          cardCVVInput.setCustomValidity("")
        }
        store.commit('updateNarocnik', { property:'cardCVV', value })
      }
    })

    function onSubmitClick() {

      

      if (!form.checkValidity()) {
        if(document.getElementById('placiloGotovina').checked) {
          buttonDisabled.value = true
          loadingPaymentVisible.value= true
          setTimeout(() => router.push('/success'), 5000);

        } else {
          form.classList.add('was-validated')
        }
      } else {
        buttonDisabled.value = true
        form.classList.add('was-validated')
        loadingPaymentVisible.value= true
        setTimeout(() => router.push('/success'), 5000);
      }
    }

    function toggleCCVTooltipVisibility() {
      ccvTooltipVisible.value = !ccvTooltipVisible.value
    }

    onMounted(() => {
      form = document.querySelectorAll('.needs-validation')[0]

     
    })

    function setPayment(newPayment) {
      payment.value = newPayment
    }

    function formatCardDateInput(e) {
      //var inputChar = String.fromCharCode(e.keyCode);
      var code = e.keyCode;
      var allowedKeys = [8];
      if (allowedKeys.indexOf(code) !== -1) {
        return;
      }

      e.target.value = e.target.value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
      ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
      ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
      ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
      ).replace(
        /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
      ).replace(
        // eslint-disable-next-line
        /[^\d\/]|^[\/]*$/g, ''
      ).replace(
        /\/\//g, '/' // Prevent entering more than 1 `/`
      );
    }
    
    return {
      onSubmitClick,
      setPayment,
      payment,
      narocnik,
      izposoja,
      formatCardDateInput,
      ccvTooltipVisible,
      toggleCCVTooltipVisibility,
      cardCVV,
      cardNumber,
      cardDate,
      store,
      buttonDisabled,
      loadingPaymentVisible,
      koncnaCena,
    }

    function validateCCV(input_str) {
      var re = /^\d{3}$/;

      return re.test(input_str);
    }

    function validateCardNumber() {
      return true;
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input::-webkit-calendar-picker-indicator{
    display: none;
}

input[type="month"]::-webkit-input-placeholder{ 
    visibility: hidden !important;
}

#koncna-cena {
  color: var(--background-blue);
}

</style>
