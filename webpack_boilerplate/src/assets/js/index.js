//import './style/style.scss';
import '../stylesheets/scss/main.scss';

import 'bootstrap';

import '../../../node_modules/superfish/dist/js/hoverIntent.js';
import '../../../node_modules/superfish/dist/js/superfish.js';

/*class Car {
    manufacturer(car){
        document.write(`I am have a ${car}`)
    }
}

const bmw = new Car;

bmw.manufacturer('audi');*/

//document.body.innerHTML = '<i class="fa fa-fw fa-question"></i>';

(function($){ //create closure so we can safely use $ as alias for jQuery
  $(document).ready(function(){
    
    var exampleOptions = {
        delay: 700,
        speed: 'fast',
		speedOut: 'fast'
    }
    // initialise plugin
    var example = $('.sf-menu').superfish(exampleOptions);
  });
})(jQuery);