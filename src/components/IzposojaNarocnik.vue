<template>
  <div class="prevzem">
      <h3 class="fw-bold pb-3 pt-3 pl-3">Podatki o naročniku</h3>
      
      <form class="needs-validation" novalidate :class="{'was-validated': store.state.validatedTabs.narocnik }">
      <div class="row g-3">
        
        <div class="col-12 d-flex justify-content-center">
            <div class="card av-card-body">
              <div class="card-body pb-5">
        <div class="row g-3 ml-5 mr-5">
            <div class="col-12">
              <label for="name" class="form-label">Ime</label>
              <input type="text" class="form-control" id="name" v-model="ime" required>
              <div class="invalid-feedback">
                Vnesite ime.
              </div>
            </div>
            <div class="col-12">
              <label for="surname" class="form-label">Priimek</label>
              <input type="text" class="form-control" id="surname" v-model="priimek" required>
              <div class="invalid-feedback">
                Vnesite priimek.
              </div>
            </div>
            <div class="col-12">
              <label for="street" class="form-label">Ulica in hišna št.</label>
              <input type="text" class="form-control" id="street" v-model="ulica" required>
              <div class="invalid-feedback">
                Vnesite ulico in hišno številko.
              </div>
            </div>
            <div class="col-md-8">
              <label for="city" class="form-label">Mesto</label>
              <input type="text" class="form-control" id="city" v-model="mesto" required>
              <div class="invalid-feedback">
                Vnesite mesto ali kraj.
              </div>
            </div>
            <div class="col-md-4">
              <label for="postalCode" class="form-label">Poštna številka</label>
              <input type="number" class="form-control" id="postalCode" v-model="postnaStevilka" required>
              <div class="invalid-feedback">
               Vnesite poštno številko.
              </div>
            </div>
            <div class="col-12">
            <label for="email" class="form-label">E-mail</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend">@</span>
              <input type="text" class="form-control" name="email" id="email" v-model="email" required>
              <div class="invalid-feedback">
                {{emailInvalidFeedback}}
              </div>
            </div>
          </div>
          
            <div class="col-12">
              <label for="phone" class="form-label">Telefon</label>
              <input type="tel" id="phone" name="phone" class="form-control" v-model="telefon" required>
              <div class="invalid-feedback">
                Vnesite telefonsko številko.
              </div>
            </div>

            <div class="col-12">
              <div class="col-md-6">
                <label for="age" class="form-label">Starost</label>
                <input type="number" id="age" min="18" max="75" step="1" class="form-control" v-model="starost" required/>
              </div>
            </div>
            <!--<div class="col-12">
              <div class="col-md-6">
                <label for="validationCustom04" class="form-label">Starost vozniškega izpita</label>
                <input type="number" id="licenceAge" min="0" max="100" step="1" class="form-control"/>
                <div class="invalid-feedback">
                  Please select a valid state.
                </div>
              </div>
            </div>-->

      </div>
      
      </div>
      </div>


      </div>

          <div class="col-12 d-flex justify-content-center">
            <div class="card av-card-body">
              <div class="card-body pb-5">
                <div class="col-12">
                  <div class="col-md-6">
                    <label for="validationCustom04" class="form-label">Koliko let imate vozniški izpit?</label>
                    <input type="number" id="licenceAge" min="0" max="100" step="1" class="form-control" v-model="starostIzpita" required/>
                  </div>
                </div>
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
      
      </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref} from 'vue'
import intlTelInput from 'intl-tel-input'
import $ from 'jquery'
import jQuery from 'jquery'

export default {
  name: 'IzposojaNarocnik',
  components: {
    
  },
  setup() {
    const store = useStore()
    const activeWindow = computed(() => store.state.izposojaActiveWindow)
    const emailInvalidFeedback = ref('Vnesite e-poštni naslov.')
    const phoneInvalidFeedbackVisible = ref(true)
    const phoneValidInput = ref(false)
    //const ageInvalidFeedbackVisible = ref(false)
    var telNumberInput
    var form
    
    const ime = computed({
      get() {
        return store.state.izposoja.narocnik.ime
      },
      set(value) {
        store.commit('updateNarocnik', { property:'ime', value })
      }
    })

    const priimek = computed({
      get() {
        return store.state.izposoja.narocnik.priimek
      },
      set(value) {
        store.commit('updateNarocnik', { property:'priimek', value })
      }
    })

    const ulica = computed({
      get() {
        return store.state.izposoja.narocnik.ulica
      },
      set(value) {
        store.commit('updateNarocnik', { property:'ulica', value })
      }
    })

    const mesto = computed({
      get() {
        return store.state.izposoja.narocnik.mesto
      },
      set(value) {
        store.commit('updateNarocnik', { property:'mesto', value })
      }
    })

    const postnaStevilka = computed({
      get() {
        return store.state.izposoja.narocnik.postnaStevilka
      },
      set(value) {
        store.commit('updateNarocnik', { property:'postnaStevilka', value })
      }
    })

    const email = computed({
      get() {
        return store.state.izposoja.narocnik.email
      },
      set(value) {
        let emailInput = document.getElementsByName("email")[0]
        if(!validateEmail(value)) {
          emailInput.setCustomValidity("Vnesen e-poštni naslov ni ustreznega formata")
          emailInvalidFeedback.value = "Vnesen e-poštni naslov ni ustreznega formata"
        } else {
          emailInput.setCustomValidity("")
        }
        store.commit('updateNarocnik', { property:'email', value })

      }
    })

    const telefon = computed({
      get() {
        return store.state.izposoja.narocnik.telefon
      },
      set(value) {
        var itiFlagContainer = document.getElementsByClassName("iti__flag-container")[0]
        let phoneInput = document.getElementsByName("phone")[0]
        if(!validatePhoneNumber(value)) {
          phoneValidInput.value = true
          itiFlagContainer.style.bottom = '22px'
          phoneInput.setCustomValidity("Vnesena telefonska številka ni ustreznega formata")
          document.getElementsByClassName("email-invalid-feedback").innerHTML = "Vnesena telefonska številka ni ustreznega formata"
        } else {
          phoneValidInput.value = false
          itiFlagContainer.style.bottom = '0px'
          phoneInput.setCustomValidity("")
        }
        store.commit('updateNarocnik', { property:'telefon', value })
      }
    })

    const starost = computed({
      get() {
        return store.state.izposoja.narocnik.starost
      },
      set(value) {
        store.commit('updateNarocnik', { property:'starost', value })
      }
    })

    const starostIzpita = computed({
      get() {
        return store.state.izposoja.narocnik.starostIzpita
      },
      set(value) {
        store.commit('updateNarocnik', { property:'starostIzpita', value })
      }
    })




    function onSubmitClick(event) {
      event.preventDefault()
      event.stopPropagation()
      var itiFlagContainer = document.getElementsByClassName("iti__flag-container")[0]

      store.commit('updateValidatedTabs', { property:'narocnik', value: true })

      if (!form.checkValidity()) {
        form.classList.add('was-validated')
        if(phoneValidInput.value){
          itiFlagContainer.style.bottom = '0px'
        } else {
          itiFlagContainer.style.bottom = '22px'
        }
      } else {
        form.classList.add('was-validated')
        store.commit('updateLockedTabs', { property:'pregledPlacilo', value: false })
        store.dispatch('changeActiveWindow', 'pregledPlacilo')
      }
    }

    function onBackClick() {
      store.dispatch('changeActiveWindow', 'dodatki')
    }

    onMounted(() => {
      form = document.querySelectorAll('.needs-validation')[0]
      telNumberInput = document.querySelector("#phone");
      intlTelInput(telNumberInput, {
          initialCountry: "si",
          separateDialCode: true,
          formatOnDisplay: true,
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js",
          autoPlaceholder: "off"
      }); 

      telNumberInput.addEventListener('input', function() {
        var countryData = window.intlTelInputGlobals.getInstance(telNumberInput).getSelectedCountryData();
        store.commit('updateNarocnik', { property:'dialCode', value: countryData.dialCode })
      });
      
      if($(".btn-minus").length == 0) {
        $("#age").inputSpinner();
        $("#licenceAge").inputSpinner();
      }

      //Workaround Fix invalid feedbacklabels bind to input tags -PHONE
      var itiElement = document.getElementsByClassName("iti--allow-dropdown")[0]
      itiElement.classList.add("flex-column")
      if(form.classList.contains('was-validated')) {
          document.getElementsByClassName("iti__flag-container")[0].style.bottom = '22px'
      } else {
          document.getElementsByClassName("iti__flag-container")[0].style.bottom = '0px'
      }


      var customInvalidFeedback = document.createElement('div')
      customInvalidFeedback.innerHTML = "Vnesite telefonsko številko."
      customInvalidFeedback.classList.add("invalid-feedback")
      customInvalidFeedback.classList.add("email-invalid-feedback")
      if(document.getElementsByClassName("email-invalid-feedback").length === 0) {
        itiElement.appendChild(customInvalidFeedback)
      }

       //Workaround Fix invalid feedbacklabels bind to input tags -AGE
      var ageSpinnerInput = document.getElementById("age_MP_cBdLN29i2")
      var customInvalidFeedbackAge = document.createElement('div')
      customInvalidFeedbackAge.classList.add("invalid-feedback")
      customInvalidFeedbackAge.innerHTML = "Vnesite starost."
      customInvalidFeedbackAge.style.position = 'absolute'
      customInvalidFeedbackAge.style.top = '38px'
      ageSpinnerInput.parentNode.insertBefore(customInvalidFeedbackAge, ageSpinnerInput.nextSibling);

      var licenceAgeSpinnerInput = document.getElementById("licenceAge_MP_cBdLN29i2")
      var customInvalidFeedbackLicenceAge = document.createElement('div')
      customInvalidFeedbackLicenceAge.classList.add("invalid-feedback")
      customInvalidFeedbackLicenceAge.innerHTML = "Vnesite starost vašega izpita v letih."
      customInvalidFeedbackLicenceAge.style.position = 'absolute'
      customInvalidFeedbackLicenceAge.style.top = '38px'
      licenceAgeSpinnerInput.parentNode.insertBefore(customInvalidFeedbackLicenceAge, licenceAgeSpinnerInput.nextSibling);

    })

    /*onUnmounted(() => {
      $("#age").inputSpinner("destroy");
      $("#licenceAge").inputSpinner("destroy");
    })*/
    
    
    return {
      activeWindow,
      onSubmitClick,
      ime,
      priimek,
      ulica,
      mesto,
      postnaStevilka,
      email,
      telefon,
      starost,
      starostIzpita,
      store,
      emailInvalidFeedback,
      phoneInvalidFeedbackVisible,
      onBackClick,
    }

    function validateEmail(input) {

      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (input.match(validRegex)) {
        return true;
      } else {
        return false;
      }
    }

    function validatePhoneNumber(input_str) {
      var re = /\d{8,}/;

      return re.test(input_str);
    }
  }
}
































































/**** INPUT NUMBER SPINNER - COULD NOT IMPORT ****/
/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/bootstrap-input-spinner
 * License: MIT, see file 'LICENSE'
 */
;(function ($) {
    "use strict"

    // the default editor for parsing and rendering
    var I18nEditor = function (props, element) {
        var locale = props.locale || "en-US"

        this.parse = function (customFormat) {
            var numberFormat = new Intl.NumberFormat(locale)
            var thousandSeparator = numberFormat.format(11111).replace(/1/g, '') || '.'
            var decimalSeparator = numberFormat.format(1.1).replace(/1/g, '')
            return parseFloat(customFormat
                .replace(new RegExp(' ', 'g'), '')
                .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
                .replace(new RegExp('\\' + decimalSeparator), '.')
            )
        }

        this.render = function (number) {
            var decimals = parseInt(element.getAttribute("data-decimals")) || 0
            var digitGrouping = !(element.getAttribute("data-digit-grouping") === "false")
            var numberFormat = new Intl.NumberFormat(locale, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
                useGrouping: digitGrouping
            })
            return numberFormat.format(number)
        }
    }

    var triggerKeyPressed = false
    var originalVal = $.fn.val
    $.fn.val = function (value) {
        if (arguments.length >= 1) {
            for (var i = 0; i < this.length; i++) {
                if (this[i]["bootstrap-input-spinner"] && this[i].setValue) {
                    var element = this[i];
                    setTimeout(function () {
                        element.setValue(value)
                    })
                }
            }
        }
        return originalVal.apply(this, arguments)
    }

    $.fn.inputSpinner = function (methodOrProps) {

        if (methodOrProps === "destroy") {
            this.each(function () {
                if (this["bootstrap-input-spinner"]) {
                    this.destroyInputSpinner()
                } else {
                    console.warn("element", this, "is no bootstrap-input-spinner")
                }
            })
            return this
        }

        var props = {
            decrementButton: "<strong>&minus;</strong>", // button text
            incrementButton: "<strong>&plus;</strong>", // ..
            groupClass: "", // css class of the resulting input-group
            buttonsClass: "btn-outline-secondary",
            buttonsWidth: "2.5rem",
            textAlign: "center", // alignment of the entered number
            autoDelay: 500, // ms threshold before auto value change
            autoInterval: 50, // speed of auto value change, set to `undefined` to disable auto-change
            buttonsOnly: false, // set this `true` to disable the possibility to enter or paste the number via keyboard
            keyboardStepping: true, // set this to `false` to disallow the use of the up and down arrow keys to step
            locale: navigator.language, // the locale, per default detected automatically from the browser
            editor: I18nEditor, // the editor (parsing and rendering of the input)
            template: // the template of the input
                '<div class="input-group ${groupClass}">' +
                '<button style="z-index:0; min-width: ${buttonsWidth}" class="btn btn-decrement ${buttonsClass} btn-minus" type="button">${decrementButton}</button>' +
                '<input type="text" inputmode="decimal" style="z-index:0; text-align: ${textAlign}" class="form-control form-control-text-input"/>' +
                '<button style="z-index:0; min-width: ${buttonsWidth}" class="btn btn-increment ${buttonsClass} btn-plus" type="button">${incrementButton}</button>' +
                '</div>'
        }

        for (var option in methodOrProps) {
            // noinspection JSUnfilteredForInLoop
            props[option] = methodOrProps[option]
        }

        var html = props.template
            .replace(/\${groupClass}/g, props.groupClass)
            .replace(/\${buttonsWidth}/g, props.buttonsWidth)
            .replace(/\${buttonsClass}/g, props.buttonsClass)
            .replace(/\${decrementButton}/g, props.decrementButton)
            .replace(/\${incrementButton}/g, props.incrementButton)
            .replace(/\${textAlign}/g, props.textAlign)

        this.each(function () {

            if (this["bootstrap-input-spinner"]) {
                console.warn("element", this, "is already a bootstrap-input-spinner")
            } else {

                var $original = $(this)
                $original[0]["bootstrap-input-spinner"] = true
                $original.hide()
                $original[0].inputSpinnerEditor = new props.editor(props, this)

                var autoDelayHandler = null
                var autoIntervalHandler = null

                var $inputGroup = $(html)
                var $buttonDecrement = $inputGroup.find(".btn-decrement")
                var $buttonIncrement = $inputGroup.find(".btn-increment")
                var $input = $inputGroup.find("input")
                var $label = $("label[for='" + $original.attr("id") + "']")
                if (!$label[0]) {
                    $label = $original.closest("label")
                }

                var min = null
                var max = null
                var step = null

                updateAttributes()

                var value = parseFloat($original[0].value)
                var pointerState = false

                var prefix = $original.attr("data-prefix") || ""
                var suffix = $original.attr("data-suffix") || ""

                if (prefix) {
                    var prefixElement = $('<span class="input-group-text">' + prefix + '</span>')
                    $inputGroup.find("input").before(prefixElement)
                }
                if (suffix) {
                    var suffixElement = $('<span class="input-group-text">' + suffix + '</span>')
                    $inputGroup.find("input").after(suffixElement)
                }

                $original[0].setValue = function (newValue) {
                    setValue(newValue)
                }
                $original[0].destroyInputSpinner = function () {
                    destroy()
                }

                var observer = new MutationObserver(function () {
                    updateAttributes()
                    setValue(value, true)
                })
                observer.observe($original[0], {attributes: true})

                $original.after($inputGroup)

                setValue(value)

                $input.on("paste input change focusout", function (event) {
                    var newValue = $input[0].value
                    var focusOut = event.type === "focusout"
                    newValue = $original[0].inputSpinnerEditor.parse(newValue)
                    setValue(newValue, focusOut)
                    dispatchEvent($original, event.type)
                    if (props.keyboardStepping && focusOut) { // stop stepping
                        resetTimer()
                    }
                }).on("keydown", function (event) {
                    if (props.keyboardStepping) {
                        if (event.which === 38) { // up arrow pressed
                            event.preventDefault()
                            if (!$buttonDecrement.prop("disabled")) {
                                stepHandling(step)
                            }
                        } else if (event.which === 40) { // down arrow pressed
                            event.preventDefault()
                            if (!$buttonIncrement.prop("disabled")) {
                                stepHandling(-step)
                            }
                        }
                    }
                }).on("keyup", function (event) {
                    // up/down arrow released
                    if (props.keyboardStepping && (event.which === 38 || event.which === 40)) {
                        event.preventDefault()
                        resetTimer()
                    }
                })

                // decrement button
                onPointerDown($buttonDecrement[0], function () {
                    if (!$buttonDecrement.prop("disabled")) {
                        pointerState = true
                        stepHandling(-step)
                    }
                })
                // increment button
                onPointerDown($buttonIncrement[0], function () {
                    if (!$buttonIncrement.prop("disabled")) {
                        pointerState = true
                        stepHandling(step)
                    }
                })
                onPointerUp(document.body, function () {
                    if(pointerState === true) {
                        resetTimer()
                        dispatchEvent($original, "change")
                        pointerState = false
                    }
                })
            }

            function setValue(newValue, updateInput) {
                if (updateInput === undefined) {
                    updateInput = true
                }
                if (isNaN(newValue) || newValue === "") {
                    $original[0].value = ""
                    if (updateInput) {
                        $input[0].value = ""
                    }
                    value = NaN
                } else {
                    newValue = parseFloat(newValue)
                    newValue = Math.min(Math.max(newValue, min), max)
                    $original[0].value = newValue
                    if (updateInput) {
                        $input[0].value = $original[0].inputSpinnerEditor.render(newValue)
                    }
                    value = newValue
                }
            }

            function destroy() {
                $original.prop("required", $input.prop("required"))
                observer.disconnect()
                resetTimer()
                $input.off("paste input change focusout")
                $inputGroup.remove()
                $original.show()
                $original[0]["bootstrap-input-spinner"] = undefined
                if ($label[0]) {
                    $label.attr("for", $original.attr("id"))
                }
            }

            function dispatchEvent($element, type) {
                if (type) {
                    setTimeout(function () {
                        var event
                        if (typeof (Event) === 'function') {
                            event = new Event(type, {bubbles: true})
                        } else { // IE
                            event = document.createEvent('Event')
                            event.initEvent(type, true, true)
                        }
                        $element[0].dispatchEvent(event)
                    })
                }
            }

            function stepHandling(step) {
                calcStep(step)
                resetTimer()
                if(props.autoInterval !== undefined) {
                    autoDelayHandler = setTimeout(function () {
                        autoIntervalHandler = setInterval(function () {
                            calcStep(step)
                        }, props.autoInterval)
                    }, props.autoDelay)
                }
            }

            function calcStep(step) {
                if (isNaN(value)) {
                    value = 0
                }
                setValue(Math.round(value / step) * step + step)
                dispatchEvent($original, "input")
            }

            function resetTimer() {
                clearTimeout(autoDelayHandler)
                clearTimeout(autoIntervalHandler)
            }

            function updateAttributes() {
                // copy properties from original to the new input
                if ($original.prop("required")) {
                    $input.prop("required", $original.prop("required"))
                    $original.removeAttr('required')
                }
                $input.prop("placeholder", $original.prop("placeholder"))
                $input.attr("inputmode", $original.attr("inputmode") || "decimal")
                var disabled = $original.prop("disabled")
                var readonly = $original.prop("readonly")
                $input.prop("disabled", disabled)
                $input.prop("readonly", readonly || props.buttonsOnly)
                $buttonIncrement.prop("disabled", disabled || readonly)
                $buttonDecrement.prop("disabled", disabled || readonly)
                if (disabled || readonly) {
                    resetTimer()
                }
                var originalClass = $original.prop("class")
                var groupClass = ""
                // sizing
                if (/form-control-sm/g.test(originalClass)) {
                    groupClass = "input-group-sm"
                } else if (/form-control-lg/g.test(originalClass)) {
                    groupClass = "input-group-lg"
                }
                var inputClass = originalClass.replace(/form-control(-(sm|lg))?/g, "")
                $inputGroup.prop("class", "input-group " + groupClass + " " + props.groupClass)
                $input.prop("class", "form-control " + inputClass)

                // update the main attributes
                min = isNaN($original.prop("min")) || $original.prop("min") === "" ? -Infinity : parseFloat($original.prop("min"))
                max = isNaN($original.prop("max")) || $original.prop("max") === "" ? Infinity : parseFloat($original.prop("max"))
                step = parseFloat($original.prop("step")) || 1
                if ($original.attr("hidden")) {
                    $inputGroup.attr("hidden", $original.attr("hidden"))
                } else {
                    $inputGroup.removeAttr("hidden")
                }
                if ($original.attr("id")) {
                    $input.attr("id", $original.attr("id") + "_MP_cBdLN29i2")
                    if ($label[0]) {
                        $label.attr("for", $input.attr("id"))
                    }
                }
            }
        })

        return this
    }

    function onPointerUp(element, callback) {
        element.addEventListener("mouseup", function (e) {
            callback(e)
        })
        element.addEventListener("touchend", function (e) {
            callback(e)
        })
        element.addEventListener("keyup", function (e) {
            if ((e.keyCode === 32 || e.keyCode === 13)) {
                triggerKeyPressed = false
                callback(e)
            }
        })
    }

    function onPointerDown(element, callback) {
        element.addEventListener("mousedown", function (e) {
            if (e.button === 0) {
                e.preventDefault()
                callback(e)
            }
        })
        element.addEventListener("touchstart", function (e) {
            if (e.cancelable) {
                e.preventDefault()
            }
            callback(e)
        })
        element.addEventListener("keydown", function (e) {
            if ((e.keyCode === 32 || e.keyCode === 13) && !triggerKeyPressed) {
                triggerKeyPressed = true
                callback(e)
            }
        })
    }

}(jQuery))

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.av-card-body {
  width: 50%
}

.intl-tel-input {
  display: table-cell;
}
.intl-tel-input .selected-flag {
  z-index: 4;
}
.intl-tel-input .country-list {
  z-index: 5;
}
.input-group .intl-tel-input .form-control {
  border-top-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

button {
  z-index: 0 !important;
}
</style>
