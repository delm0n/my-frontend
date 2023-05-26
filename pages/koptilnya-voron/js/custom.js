$(document).ready(function () {
  // меняем цены на форме в зависимости от модели
  $(".custom-select li").on("click touchstart", function () {
    var id = $(this).closest("form").find(".custom-list").val();
    var model = $(this)
      .closest("form")
      .find("option[value=" + id + "]");
    var price = model.data("price");
    var old_price = model.data("oldprice");
    $(this)
      .closest(".form-container")
      .find(".oldPrice")
      .text(old_price)
      .closest(".form-container")
      .find(".newPrice")
      .text(price)
      .closest(".form-container")
      .find(".main_product")
      .attr("name", `quantity[${id}]`);
  });

  //header-v3
  //header-v3
  //header-v3

  $("header .header-top__burger").on("click", function () {
    $("header .header-top__nav").fadeToggle(600);
    $(this).toggleClass("header-top__burger--active");
  });

  $("header .volume-tabs .volume-tab").on("click", function () {
    $(this)
      .parent()
      .children()
      .each(function (index, val) {
        $(val).removeClass("volume-tab--active");
      });
    $(this).addClass("volume-tab--active");

    calcPrice();
  });

  function calcPrice() {
    var active = $("header .volume-tabs .volume-tab--active");

    var oldPrice = $("header .offer .old-price span"),
      oldPrice__value = $("header .offer .old-price span")
        .text()
        .split(" ")
        .join("");

    var newPrice = $("header .offer .new-price span"),
      newPrice__value = $("header .offer .old-price span")
        .text()
        .split(" ")
        .join("");

    // изменение значений скрытых полей
    $("header .header-main__form-content .main_product-id").val(
      active.data("id")
    );

    $("header .header-main__form-content .main_product").attr(
      "name",
      "quantity[" + active.data("id") + "]"
    );

    // анимация изменения цены
    oldPrice.spincrement({
      from: oldPrice__value,
      to: active.data("oldprice"),
      duration: 1000,
      thousandSeparator: " ",
    });
    newPrice.spincrement({
      from: newPrice__value,
      to: active.data("newprice"),
      duration: 1000,
      thousandSeparator: " ",
    });
  }

  //header-v3
  //header-v3
  //header-v3
});
