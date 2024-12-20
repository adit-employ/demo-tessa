const JustDigits = {
    directives: {
        digitsonly: {
            bind(el) {

            // console.log(el, binding);

            // this two prevent from copy&paste non-number text, including "e".
            // need to have both together to take effect.
            el.type = 'number';
            el.addEventListener('input', () => {
                // console.log('input', e);
                // console.log(el.validity);
                return el.validity.valid || (el.value = '');
            });

            // this prevents from typing non-number text, including "e".
            el.addEventListener('keypress', (e) => {
                let charCode = (e.which) ? e.which : e.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                e.preventDefault();
                } else {
                return true;
                }
            });
            }
        }
    },
};

// const JustDigits = () => {
//     Vue.directive('digitsonly', (el, binding) => {
//       if (/[\d\.]+/i.test(el.value)) {
//         console.log('ok');
//       } else {
//         let newValue = el.value.replace(/[a-zA-Z]+/ig, '');
//         el.value = newValue;
//         console.log('should fix', newValue);
//         binding.value = el.value;
//       }
//     });
//   };

export { JustDigits }