//'use strict';
$(document).ready(function () {
  // header-test модальное окно
  $(".header-top-block .menu-icon-container").click(function () {
    $(this).find(".menu-icon").toggleClass("menu-icon-active");
    $(".header-top-block .header-top-block__nav").fadeToggle(400);
  });
});
