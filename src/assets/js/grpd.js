$(document).ready(function() {
    (function($) {
      $(function() {
        $(document).euCookieLawPopup().init({
            cookiePolicyUrl : 'https://asesoramiento.selfbank.es/',
            popupPosition : 'bottomright',
            colorStyle : 'default',
            compactStyle : false,
            popupTitle : '¿¡Galletita!?',
            popupText : 'Utilizamos cookies para tener estadisticas sobre las visitas.',
            buttonContinueTitle : 'Acepto',
            buttonLearnmoreTitle : 'Más información',
            buttonLearnmoreOpenInNewWindow : true,
            agreementExpiresInDays : 30,
            autoAcceptCookiePolicy : false,
            htmlMarkup : $('.eupopup-container')
          });
      });

    }(jQuery));
  });
