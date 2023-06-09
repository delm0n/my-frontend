$(document).ready(function () {
  // преобразование select в ul/li
  var selects = [];
  $("body")
    .find(".custom-list")
    .each(function () {
      selects.push($(this));
    });

  selects.forEach(function (item, i, selects) {
    // Элемент select, который будет замещаться:
    var select = item;

    var selectBoxContainer = $("<div>", {
      class: "custom-select",
      html: '<div class="selectBox"></div>',
    });

    var dropDown = $("<ul>", { class: "dropDown" });
    var selectBox = selectBoxContainer.find(".selectBox");

    // Цикл по оригинальному элементу select
    select.find("option").each(function (i) {
      var option = $(this);

      if (i == 0) {
        selectBox.html(option.text());
        //return true;
      }

      // Создаем выпадающий пункт в соответствии с данными select:
      var li = $("<li>", {
        html: option.text(),
      });

      li.on("click touchstart", function () {
        selectBox.html(option.text());
        dropDown.trigger("hide");

        // Когда происходит событие click, мы также отражаем изменения в оригинальном элементе select:
        select.val(option.val());

        return false;
      });

      dropDown.append(li);
    });

    selectBoxContainer.append(dropDown.hide());
    select.hide().after(selectBoxContainer);

    // Привязываем пользовательские события show и hide к элементу dropDown:
    dropDown
      .bind("show", function () {
        if (dropDown.is(":animated")) {
          return false;
        }

        selectBox.addClass("expanded");
        dropDown.slideDown();
      })
      .bind("hide", function () {
        if (dropDown.is(":animated")) {
          return false;
        }

        selectBox.removeClass("expanded");
        dropDown.slideUp();
      })
      .bind("toggle", function () {
        if (selectBox.hasClass("expanded")) {
          dropDown.trigger("hide");
        } else dropDown.trigger("show");
      });

    selectBox.on("click touchstart", function () {
      dropDown.trigger("toggle");
      return false;
    });

    // Если нажать кнопку мыши где-нибудь на странице при открытом элементе dropDown, он будет спрятан:
    $(document).on("click touchstart", function () {
      dropDown.trigger("hide");
    });
  });

  // GTM события
  function addEvent(event) {
    window.dataLayer.push({ event: event });
    console.log("Добавлено событие: " + event);
  }

  const clickTargets = {
    // Верхнее меню
    click_top_menu_link_1: '.header-hide__list [href="#reasons"]',
    click_top_menu_link_2: '.header-hide__list [href="#feedback"]',
    click_top_menu_link_3: '.header-hide__list [href="#proizvoditel"]',
    click_top_menu_link_4: '.header-hide__list [href="#delivery"]',
    click_top_zakaz_zvonka_1: '.header-hide__call[href="#callme"]',
    click_top_zakaz_zvonka_2: '#callme [type="submit"]',
    // Главный экран
    click_header_sobrat_bulat: '#top-form [href="/soberi-bulat"]',
    click_header_zakazat: '#top-form [href="#order-modal"]',
    // Преимущества автоклава «Булат»
    click_zazhimy: "#reasons .button-start-video",
    // Модели Автоклава «Булат»
    click_models_no_ten: "#models .no_ten",
    click_models_with_ten: "#models .with_ten",
    click_models_13l: '#models [data-model="1"]',
    click_models_18l: '#models [data-model="2"]',
    click_models_25l: '#models [data-model="3"]',
    click_models_32l: '#models [data-model="4"]',
    click_models_13l_ten: '#models [data-model="5"]',
    click_models_18l_ten: '#models [data-model="6"]',
    click_models_25l_ten: '#models [data-model="7"]',
    click_models_32l_ten: '#models [data-model="8"]',
    // Выбирайте то, что нужно
    click_dop_zazhimy: '#dop [data-name="dop_zk"]',
    click_dop_nasadka: '#dop [data-name="dop_sa"]',
    click_dop_nabor: '#dop [data-name="dop_kopt"]',
    click_dop_zakat: '#dop [data-name="dop_zkt"]',
    // Участвуйте в акции до...
    click_zakazat_po_akcii: '#sale [type="submit"]',
    // Доставка и оплата
    click_rasschitat: '#delivery [href="#order-modal"]',
    // Остались вопросы?
    click_bottom_zakaz_zvonka: '#call-modal [type="submit"]',
  };

  $.each(clickTargets, function (i) {
    $(clickTargets[i]).on("click", function () {
      addEvent(i);
    });
  });

  // всплывающее окно в steps
  $(".step__info").on("click", function () {
    let container = $(this)
      .closest(".step")
      .find(".img-container")
      .toggleClass("opened");
  });

  // навигация в models
  $(".models-nav_ten button").on("click touchstart", function () {
    if (!$(this).hasClass("active")) {
      $(".models-nav_ten button.active").removeClass("active");
      $(this).addClass("active");

      if ($(this).hasClass("with_ten")) {
        // с теном
        $("#models .model__img_1").hide();
        $("#models .model__img_2").show();
        $("#models .model__img_3").hide();

        $("#models .not-ten").hide();
        $("#models .ten_by").hide();
        $("#models .ten").show(200);
      } else if ($(this).hasClass("no_ten")) {
        // без тена
        $("#models .model__img_1").show();
        $("#models .model__img_2").hide();
        $("#models .model__img_3").hide();

        $("#models .not-ten").show(200);
        $("#models .ten").hide();
        $("#models .ten_by").hide();
      } else if ($(this).hasClass("with_ten_by")) {
        // с теном и блоком управления
        $("#models .model__img_1").hide();
        $("#models .model__img_2").hide();
        $("#models .model__img_3").show();

        $("#models .not-ten").hide();
        $("#models .ten").hide();
        $("#models .ten_by").show(200);
      }
    }
  });

  // навигация в models для мобилок
  $(".models-nav_mobile button").on("click", function () {
    let current_btn = $(this);
    let model = current_btn.data("model");
    if (!current_btn.hasClass("active")) {
      $(".models-nav_mobile button.active").removeClass("active");
      current_btn.addClass("active");

      $("#models .model.active").removeClass("active");
      $("#models .model." + model).addClass("active");
    }
  });

  // всплывающее окно
  $(".fancybox").fancybox({
    touch: false,
  });

  $(".fancybox-cart").fancybox({
    touch: false,
  });

  //test
  $(".row__item").click(function (e) {
    $(".row__item").removeClass("row__item__active");
    $(this).addClass("row__item__active");
  });

  $(".row2__item").click(function (e) {
    $(".row2__item").removeClass("row2__item__active");
    $(this).addClass("row2__item__active");
  });

  function switch_case_for_new_form(t, v) {
    var model = 0;

    switch (t) {
      case "classic":
        if (v === "13l") {
          model = 1;
        }
        if (v === "18l") {
          model = 2;
        }
        if (v === "25l") {
          model = 3;
        }
        if (v === "32l") {
          model = 4;
        }
        break;
      case "ten":
        if (v === "13l") {
          model = 5;
        }
        if (v === "18l") {
          model = 6;
        }
        if (v === "25l") {
          model = 7;
        }
        if (v === "32l") {
          model = 8;
        }
        break;
      case "ten_by":
        if (v === "13l") {
          model = 9;
        }
        if (v === "18l") {
          model = 10;
        }
        if (v === "25l") {
          model = 11;
        }
        if (v === "32l") {
          model = 12;
        }
        break;
    }

    return model;
  }

  $(".row__item__click").click(function (e) {
    var type = $(".row__item__active").data("model");
    var volume = $(".row2__item__active").data("model");

    var model = switch_case_for_new_form(type, volume);
    // $(".old_price-test span").text($(".hidden-select select ").find('[data-model=' + model + ']').data("oldprice"));
    // $(".new_price-test span").text($(".hidden-select select ").find('[data-model=' + model + ']').data("price"));

    var oldPrice = new CountUp(
      "oldPriceCount", // id
      parseInt($(".old_price-test span").text().replace(/\s+/g, "")), // начальное число
      parseInt(
        $(".hidden-select select ")
          .find("[data-model=" + model + "]")
          .data("oldprice")
          .replace(/\s+/g, "")
      ), // конечное число
      0, // количество цифр после запятой
      0.5 // продолжительность анимации в секундах
    );
    var newPrice = new CountUp(
      "newPriceCount", // id
      parseInt($(".new_price-test span").text().replace(/\s+/g, "")),
      parseInt(
        $(".hidden-select select ")
          .find("[data-model=" + model + "]")
          .data("price")
          .replace(/\s+/g, "")
      ),
      0,
      0.5
    );
    oldPrice.start();
    newPrice.start();
  });

  $(".btn-test").click(function (e) {
    var type = $(".row__item__active").data("model");
    var volume = $(".row2__item__active").data("model");

    var mydata = $(this).data();

    mydata.model = switch_case_for_new_form(type, volume);
  });

  // определение модели/допа/статуса доставки при вызове модального окна
  $('[href="#order-modal"]').on("click", function () {
    var dop = $(this).data("name") ? $(this).data("name") : null;
    var model = $(this).data("model") ? $(this).data("model") : null;
    var delivery = $(this).data("delivery") ? $(this).data("delivery") : null;

    if (model) {
      $("#order-modal .custom-select li:nth-child(" + model + ")").click();
    } else if (dop) {
      $("#order-modal .custom-select li:first").click();
      $('#order-modal .custom-checkbox-js[data-name="' + dop + '"]').click();
    } else {
      $("#order-modal .custom-select li:first").click();
    }

    delivery
      ? $("#order-modal form").prepend(
          '<input type="hidden" class="delivery" name="statePanel" value="calcDelivery">'
        )
      : $("#order-modal .delivery").remove();
  });

  $('[href="#order-modal-recomendation"]').on("click", function () {
    var dop = $(this).data("name") ? $(this).data("name") : null;
    var model = $(this).data("model") ? $(this).data("model") : null;
    var delivery = $(this).data("delivery") ? $(this).data("delivery") : null;

    if (model) {
      $(
        "#order-modal-recomendation .custom-select li:nth-child(" + model + ")"
      ).click();
    } else if (dop) {
      $("#order-modal-recomendation .custom-select li:first").click();
      $(
        '#order-modal-recomendation .custom-checkbox-js[data-name="' +
          dop +
          '"]'
      ).click();
    } else {
      $("#order-modal-recomendation .custom-select li:first").click();
    }

    delivery
      ? $("#order-modal-recomendation form").prepend(
          '<input type="hidden" class="delivery" name="statePanel" value="calcDelivery">'
        )
      : $("#order-modal-recomendation .delivery").remove();
  });

  // меняем цены на форме в зависимости от модели
  $(".custom-select li").on("click touchstart", function () {
    let container = $(this).closest(".columns");
    let id = $(this).closest("form").find(".custom-list").val();
    let model = $(this)
      .closest("form")
      .find("option[value=" + id + "]");
    let img = model.data("img");
    let oldprice = model.data("oldprice");
    let price = model.data("price");
    let discount = model.data("discount");

    // сброс чекбоксов для отображения корректной цены
    container.find(".custom-checkbox-js").each(function () {
      if ($(this).is(":checked")) {
        $(this).click();
      }
    });

    $("#order-modal img").attr("src", img);
    container.find(".discount").text(discount);
    container.find(".old-price span").text(oldprice);
    container.find(".new-price span").text(price);
    container.find(".main_product_q").attr("name", "quantity[" + id + "]");
  });

  if (document.documentElement.clientWidth < 768) {
    init_slider();
  }

  $(window).resize(function () {
    if (document.documentElement.clientWidth < 768) {
      if (!$(".mobile-slider").hasClass("slick-slider")) {
        init_slider();
      }
    } else {
      if ($(".mobile-slider").hasClass("slick-slider")) {
        $(".mobile-slider").slick("unslick");
      }
    }
  });

  // slider
  $(".feedback-slider__slider").slick({
    nextArrow: ".feedback-slider__control_next",
    prevArrow: ".feedback-slider__control_prev",
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // слайдер для мобилок
  function init_slider() {
    $(".mobile-slider").slick({
      infinite: true,
      arrows: true,
      dots: false,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }

  // меню на мобильных
  $(
    ".header-hide__wrapper .header-hide__list li a:not(.header__link_active)"
  ).on("click touchstart", function () {
    $(".header-hide__wrapper .header-hide__list").toggleClass(
      "header-hide_visible"
    );

    setTimeout(function () {
      $(".header-hide__wrapper .header-hide__list").toggleClass(
        "opacity__animation"
      );
      $(".header-hide__wrapper .header-hide__menu").toggleClass(
        "header-hide__menu_open"
      );
    }, 10);

    var scroll_el = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(scroll_el).offset().top }, 500);
    return false;
  });

  $(".header-hide__wrapper .header-hide__menu .relative__close").on(
    "click",
    function () {
      $(".header-hide__wrapper .header-hide__list").toggleClass(
        "header-hide_visible"
      );

      setTimeout(function () {
        $(".header-hide__wrapper .header-hide__list").toggleClass(
          "opacity__animation"
        );
        $(".header-hide__wrapper .header-hide__menu").toggleClass(
          "header-hide__menu_open"
        );
      }, 10);
    }
  );

  //скролл у баннеру с подарком
  $(".terka__block a").on("click touchstart", function () {
    var scroll_el = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(scroll_el).offset().top }, 500);
  });

  function scrolling(upSelector) {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 1000) {
        $(upSelector).fadeIn(1000);
      } else {
        $(upSelector).fadeOut(1000);
      }
    });
    $(upSelector).click(function () {
      $("body, html").animate({ scrollTop: 0 }, 800);
    });
  }
  scrolling(".button-up");

  //цена для рассрочки
  const priceFormat = (num) => new Intl.NumberFormat("ru-RU").format(num);
  const priceRassrochka = $("#tinkoff-block .new-price span");
  const fullPriceRassrochka = $("#tinkoff-block .old-price span")
    .text()
    .replace(/\s+/g, "");
  priceRassrochka.text(
    priceFormat(Math.floor(Number(fullPriceRassrochka) / 4))
  );

  // slider
  $(".review-slider__slider").slick({
    nextArrow: ".review-slider__control_next",
    prevArrow: ".review-slider__control_prev",
    slidesToShow: 3,
    slidesToScroll: 1,

    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // slider
  $(".text-feedback-slider__slider").slick({
    nextArrow: ".text-feedback-slider__control_next",
    prevArrow: ".text-feedback-slider__control_prev",
    slidesToShow: 3,
    slidesToScroll: 1,

    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  //slider compare-v3
  $("#compare-v3 .compare-wrapper").slick({
    nextArrow: ".compare-wrapper__control-next",
    prevArrow: ".compare-wrapper__control-prev",
    slidesToShow: 2,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    infinite: false,
    dots: false,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  //slider tby-bulat
  $("#tby-bulat .tby-bulat__easyslider").on(
    "afterChange",
    function (event, slick, currentSlide) {
      var total = $("#tby-bulat .tby-bulat__easyslider").find(
        ".tby-bulat__easyslider-item"
      ).length;
      var slides = $("#tby-bulat .tby-bulat__easyslider").slick(
        "slickGetOption",
        "slidesToShow"
      );
      $(".tby-bulat__easyslider__control-count .view").text(currentSlide + 1);
      $(".tby-bulat__easyslider__control-count .all").text(total - slides + 1);
    }
  );

  $("#tby-bulat .tby-bulat__easyslider").slick({
    nextArrow: ".tby-bulat__easyslider__control-next",
    prevArrow: ".tby-bulat__easyslider__control-prev",
    slidesToShow: 5,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    infinite: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
        },
      },

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $("#tby-bulat .tby-bulat__easyslider__control-prev").trigger("click");

  //review animation
  $(".review .text-feedback-slider__item ").on("click", function () {
    if (event.target.classList.value == "hidden-detali-button") {
      if ($(this).find(".hidden-detali").hasClass("hidden-detali-visible")) {
        $(this).find(".hidden-detali").removeClass("hidden-detali-visible");
        for (
          var i = 0;
          i < document.querySelectorAll(".hidden-detali").length;
          i++
        ) {
          document
            .querySelectorAll(".hidden-detali")
            [i].classList.remove("hidden-detali-visible");
          document.querySelectorAll(".hidden-detali-button")[i].textContent =
            "Подробнее";
        }
      } else {
        for (
          var i = 0;
          i < document.querySelectorAll(".hidden-detali").length;
          i++
        ) {
          document
            .querySelectorAll(".hidden-detali")
            [i].classList.remove("hidden-detali-visible");
          document.querySelectorAll(".hidden-detali-button")[i].textContent =
            "Подробнее";
        }

        $(this).find(".hidden-detali").addClass("hidden-detali-visible");
        $(this).find(".hidden-detali-button").text("Скрыть");
      }
    }
  });

  //upload files
  const uploadArea = document.querySelector("#uploadArea");
  const dropZoon = document.querySelector("#dropZoon");
  const fileInput = document.querySelector("#fileInput");
  const img_container = document.querySelector("#dropZoon__img-container");
  const uploadedFileInfo_container =
    document.querySelector("#uploadedFileInfo");
  const fileDetails = document.querySelector("#fileDetails");
  const uploadedFile = document.querySelector("#uploadedFile");

  const imagesTypes = ["jpeg", "jpg", "bmp", "png", "svg", "gif"];

  dropZoon.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropZoon.classList.add("drop-zoon--over");
  });

  dropZoon.addEventListener("dragleave", function (event) {
    dropZoon.classList.remove("drop-zoon--over");
  });

  dropZoon.addEventListener("drop", function (event) {
    event.preventDefault();
    dropZoon.classList.remove("drop-zoon--over");
    const file = event.dataTransfer.files[0];
    uploadFile(file);
  });

  dropZoon.addEventListener("click", function (event) {
    fileInput.click();
  });

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    uploadFile(file);
  });

  function closeImg(a) {
    if (img_container.children.length - 1 > 0) {
      document.querySelectorAll(".previewImage_container")[a].remove();
      document.querySelectorAll(".uploaded-file__info-row")[a].remove();
    } else {
      document.querySelectorAll(".previewImage_container")[a].remove();
      document.querySelectorAll(".uploaded-file__info-row")[a].remove();

      dropZoon.classList.remove("drop-zoon--Uploaded");
      uploadedFile.classList.remove("uploaded-file--open");
      fileDetails.classList.remove("file-details--open");
    }

    rewriteDataNum();
  }

  function rewriteDataNum() {
    for (
      var i = 0;
      i < document.querySelectorAll(".uploaded-file__close").length;
      i++
    ) {
      document.querySelectorAll(".uploaded-file__close")[i].dataset.num = i;
    }
  }

  function uploadFile(file) {
    const fileReader = new FileReader();
    const fileType = file.type;
    const fileSize = file.size;

    if (fileValidate(fileType, fileSize) && img_container.children.length < 5) {
      var previewImage_container = document.createElement("div");
      previewImage_container.classList.add("previewImage_container");

      var previewImageEl = document.createElement("img");
      previewImageEl.classList.add("drop-zoon__preview-image");

      dropZoon.classList.add("drop-zoon--Uploaded");

      previewImageEl.style.display = "none";
      uploadedFile.classList.remove("uploaded-file--open");

      fileReader.addEventListener("load", function () {
        setTimeout(function () {
          uploadArea.classList.add("upload-area--open");
          previewImageEl.style.display = "block";

          fileDetails.classList.add("file-details--open");
          uploadedFile.classList.add("uploaded-file--open");
        }, 500);

        previewImageEl.setAttribute("src", fileReader.result);

        var fileInfoEl = document.createElement("div");
        fileInfoEl.classList.add("uploaded-file__info-row");

        var fileInfoEl_name = document.createElement("p");
        fileInfoEl_name.textContent = file.name;
        fileInfoEl_name.classList.add("uploaded-file__name");

        var fileInfoEl_close = document.createElement("p");
        fileInfoEl_close.textContent = "x";
        fileInfoEl_close.classList.add("uploaded-file__close");
        fileInfoEl_close.dataset.num = document.querySelectorAll(
          ".uploaded-file__close"
        ).length;
        fileInfoEl_close.onclick = function () {
          closeImg(fileInfoEl_close.dataset.num);
        };

        fileInfoEl.appendChild(fileInfoEl_name);
        fileInfoEl.appendChild(fileInfoEl_close);
        uploadedFileInfo_container.appendChild(fileInfoEl);
      });

      fileReader.readAsDataURL(file);

      previewImage_container.appendChild(previewImageEl);
      img_container.appendChild(previewImage_container);
    } else {
      this;
    }
  }

  function fileValidate(fileType, fileSize) {
    let isImage = imagesTypes.filter(
      (type) => fileType.indexOf(`image/${type}`) !== -1
    );

    if (isImage.length !== 0) {
      if (fileSize <= 512000) {
        return true;
      } else {
        return alert("Файл слишком большой");
      }
    } else {
      return alert("Неизвестный формат файла");
    }
  }

  var validationReview = false;
  // всплывающее окно
  $(".fancybox-review").fancybox({
    touch: false,
    closeExisting: true,
    afterClose: function () {
      if (validationReview) {
        $.fancybox.open({
          src: "#review-modal-success",
          type: "inline",
        });
        validationReview = false;
      }
      clearInputReview();
    },
  });

  $("#review-modal .review-modal-button button").click(function (e) {
    e.preventDefault();

    var isOk = true;

    for (
      var i = 0;
      i < document.querySelectorAll(".review-modal-input--input").length;
      i++
    ) {
      if (
        document.querySelectorAll(".review-modal-input--input")[i].value == ""
      ) {
        document
          .querySelectorAll(".review-modal-input--input")
          [i].classList.add("unvalid");
        isOk = false;
      } else {
        document
          .querySelectorAll(".review-modal-input--input")
          [i].classList.remove("unvalid");
        isOk = true;
      }
    }

    if (isOk) {
      validationReview = true;
      $("#review-modal .fancybox-button.fancybox-close-small").trigger("click");

      clearInputReview();
      $(
        '#review .text-feedback-slider__button a[href$="#review-modal"]'
      ).addClass("btn-test_unactive");
      $('#review .text-feedback-slider__button a[href$="#review-modal"]').text(
        "Отзыв отправлен"
      );
      $('#review .text-feedback-slider__button a[href$="#review-modal"]').attr(
        "href",
        "#review-modal-success"
      );
    }
  });

  function clearInputReview() {
    for (
      var i = 0;
      i < document.querySelectorAll(".review-modal-input--input").length;
      i++
    ) {
      document.querySelectorAll(".review-modal-input--input")[i].value = "";
      document
        .querySelectorAll(".review-modal-input--input")
        [i].classList.remove("unvalid");
    }

    img_container.replaceChildren();
    uploadedFileInfo_container.replaceChildren();

    dropZoon.classList.remove("drop-zoon--Uploaded");
    uploadedFile.classList.remove("uploaded-file--open");
    fileDetails.classList.remove("file-details--open");
  }

  for (
    var i = 0;
    i < document.querySelectorAll(".review-modal-input--input").length;
    i++
  ) {
    document
      .querySelectorAll(".review-modal-input--input")
      [i].addEventListener("change", function () {
        console.log(this);
        this.classList.remove("unvalid");
      });
  }
  /*запрет ввода букв в промокод*/
  $(".promocode-input").on("change keyup input click", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
});
