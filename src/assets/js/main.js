$( function() {
    // The DOM is ready!
    // The rest of the code goes here

    /*Do smth that doesn't require DOM to be ready*/

  });


//MENU MOBILE
$(document).ready(function () {
  $('.navbar-toggler.collapsed').click(function () {
    $('body').toggleClass('u-overflow-hidden');
  });
  $('.navbar-toggler-icon').click(function () {
    $('.navbar-toggler-icon').toggleClass('navbar-toggler-icon--cerrar');
  });

  $('.js-iframe-link').click(function(ev) {
    ev.preventDefault();
    var id=$(this).attr('href');
    $(id).removeClass('d-none').addClass('scale-up-ver-top').addClass('c-product--list__item__z-index');

  });

  $('.js-close').click(function() {
    var id=$(this).parent().attr('id');
    $('#'+id).removeClass('scale-up-ver-top').addClass('d-none').removeClass('c-product--list__item__z-index');
  })

  $('.arrow-top').click(function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});


// NAVBAR SCROLL
$(window).scroll(function(e) {
  var scroll = $(window).scrollTop();
  if (scroll >= 150) {
      $('.c-header').addClass("c-header--scroll");
  } else {
      $('.c-header').removeClass("c-header--scroll");
  }
});
