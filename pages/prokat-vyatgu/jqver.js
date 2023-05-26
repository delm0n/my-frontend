
$(function() {

    //плавная работа ссылок
    $("a.menu-link").on("click", function(e){
        e.preventDefault();
        var anchor = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top - 200
        }, 800);


        $(".menu__body").removeClass("menu__body_active");
        $(".click__menu").removeClass("openmenu");
        $('body').removeClass("body_hidd ");
        $(".user_rotate_personal").removeClass("rotateMyUser");
    }); 

    $("a.nav-link").on("click", function(e){
        e.preventDefault();
        var anchor = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top - 100
        }, 800);
    }); 
        

    //плавный скролл наверх
    $("a.btn__upHead").on("click", function(e){
        e.preventDefault();
        var anchor = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: 200
        }, 800);


    }); 


    //остановка при наведении
    $(".hiden__page2").each(function(elem, target){
        var swp = target.swiper;
        $(this).hover(function() {
            swp.autoplay.stop();
        }, function() {
            swp.autoplay.start();
        });
    });
});

