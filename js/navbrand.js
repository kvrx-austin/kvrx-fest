var firstH2 = document.getElementsByTagName("h2")[0];
var navbarBrand = $('.navbar-brand');
$(document).scroll(function() {
    var y = $(this).scrollTop();
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (y > firstH2.offsetTop && w <= 768) {
        navbarBrand.fadeIn();
    } else {
        navbarBrand.fadeOut();
    }
  });