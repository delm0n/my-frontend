var allGoods = JSON.parse(document.body.getAttribute("data-goods"));

function getIdModel(o, e) {
  var t = 0;
  switch (o) {
    case "classic":
      "13l" === e && (t = goods.l13),
        "18l" === e && (t = goods.l18),
        "25l" === e && (t = goods.l25),
        "32l" === e && (t = goods.l32);
      break;
    case "ten":
      "13l" === e && (t = goods.l13t),
        "18l" === e && (t = goods.l18t),
        "25l" === e && (t = goods.l25t),
        "32l" === e && (t = goods.l32t);
      break;
    case "ten_by":
      "13l" === e && (t = goods.l13tby),
        "18l" === e && (t = goods.l18tby),
        "25l" === e && (t = goods.l25tby),
        "32l" === e && (t = goods.l32tby);
  }
  return t;
}

function animationCart() {
  document.querySelectorAll(".header-cart").forEach((element) => {
    element.style.transform = "scale(1.1)";
    setTimeout(function () {
      element.style.transform = "scale(1)";
    }, 400);
  });
}

//
// хранилище
//

const store = new Vuex.Store({
  state: {
    credit: false,
    models: {
      [goods.l13]: {
        img: "model-1",
        id: [goods.l13],
        name: "Автоклав Булат, 13 л",
        price: allGoods[goods.l13].price,
        oldPrice: allGoods[goods.l13].oldPrice,
        count: 1,
      },
      [goods.l18]: {
        img: "model-2",
        id: [goods.l18],
        name: "Автоклав Булат, 18 л",
        price: allGoods[goods.l18].price,
        oldPrice: allGoods[goods.l18].oldPrice,
        count: 1,
      },

      [goods.l25]: {
        img: "model-3",
        id: [goods.l25],
        name: "Автоклав Булат, 25 л",
        price: allGoods[goods.l25].price,
        oldPrice: allGoods[goods.l25].oldPrice,
        count: 1,
      },

      [goods.l32]: {
        img: "model-4",
        id: [goods.l32],
        name: "Автоклав Булат, 32 л",
        price: allGoods[goods.l32].price,
        oldPrice: allGoods[goods.l32].oldPrice,
        count: 1,
      },

      [goods.l13t]: {
        img: "model-1t",
        id: [goods.l13t],
        name: "Автоклав Булат, 13 л с ТЭН",
        price: allGoods[goods.l13t].price,
        oldPrice: allGoods[goods.l13t].oldPrice,
        count: 1,
      },

      [goods.l18t]: {
        img: "model-2t",
        id: [goods.l18t],
        name: "Автоклав Булат, 18 л с ТЭН",
        price: allGoods[goods.l18t].price,
        oldPrice: allGoods[goods.l18t].oldPrice,
        count: 1,
      },

      [goods.l25t]: {
        img: "model-3t",
        id: [goods.l25t],
        name: "Автоклав Булат, 25 л с ТЭН",
        price: allGoods[goods.l25t].price,
        oldPrice: allGoods[goods.l25t].oldPrice,
        count: 1,
      },

      [goods.l32t]: {
        img: "model-4t",
        id: [goods.l32t],
        name: "Автоклав Булат, 32 л с ТЭН",
        price: allGoods[goods.l32t].price,
        oldPrice: allGoods[goods.l32t].oldPrice,
        count: 1,
      },

      [goods.l13tby]: {
        img: "model-1tby",
        id: [goods.l13tby],
        name: "Автоклав Булат, 13 л с ТЭН + БУ",
        price: allGoods[goods.l13tby].price,
        oldPrice: allGoods[goods.l13tby].oldPrice,
        count: 1,
      },

      [goods.l18tby]: {
        img: "model-2tby",
        id: [goods.l18tby],
        name: "Автоклав Булат, 18 л с ТЭН + БУ",
        price: allGoods[goods.l18tby].price,
        oldPrice: allGoods[goods.l18tby].oldPrice,
        count: 1,
      },

      [goods.l25tby]: {
        img: "model-3tby",
        id: [goods.l25tby],
        name: "Автоклав Булат, 25 л с ТЭН + БУ",
        price: allGoods[goods.l25tby].price,
        oldPrice: allGoods[goods.l25tby].oldPrice,
        count: 1,
      },

      [goods.l32tby]: {
        img: "model-4tby",
        id: [goods.l32tby],
        name: "Автоклав Булат, 32 л с ТЭН + БУ",
        price: allGoods[goods.l32tby].price,
        oldPrice: allGoods[goods.l32tby].oldPrice,
        count: 1,
      },
    },
    cartMain:
      null != JSON.parse(localStorage.getItem("cartMainProductStorage"))
        ? JSON.parse(localStorage.getItem("cartMainProductStorage"))
        : [],

    dops:
      null != JSON.parse(localStorage.getItem("cartDopProductStorage"))
        ? JSON.parse(localStorage.getItem("cartDopProductStorage"))
        : [
            {
              id: dops.nasadka,
              name: "Насадка-дистиллятор",
              price: allGoods[dops.nasadka].price,
              oldPrice: allGoods[dops.nasadka].oldPrice,
              select: false,
            },
            {
              id: dops.kopt,
              name: "Набор для копчения",
              price: allGoods[dops.kopt].price,
              oldPrice: allGoods[dops.kopt].oldPrice,
              select: false,
            },
            {
              id: dops.zazhim,
              name: "Зажимы для крышек",
              price: allGoods[dops.zazhim].price,
              oldPrice: allGoods[dops.zazhim].oldPrice,
              select: false,
            },
            {
              id: dops.colonna,
              name: "Колонна«Союз» на 1,5 дюйма ",
              price: allGoods[dops.colonna].price,
              oldPrice: allGoods[dops.colonna].oldPrice,
              select: false,
            },
          ],
  },
  mutations: {
    synhMainSession(state) {
      // синхронизация с сессией
      localStorage.setItem(
        "cartMainProductStorage",
        JSON.stringify(state.cartMain)
      );
    },

    synhDopSession(state) {
      // синхронизация с сессией
      localStorage.setItem("cartDopProductStorage", JSON.stringify(state.dops));
    },

    updateCredit(state, credit) {
      state.credit = credit;
      // localStorage.setItem("cartCreditStorage", JSON.stringify(state.credit));
      // console.log(1);
    },

    addToCart(state, id) {
      model = state.cartMain.find(function (e) {
        return e.id == id;
      });

      // если model уже есть, то увеличиваем количество, иначе добавляем в корзину
      null != model
        ? (model.count = model.count + 1)
        : state.cartMain.push(state.models[id]);
    },

    dopInCart(state, model) {
      state.dops.find((e) => e.id == model.id).select = model.bool;
    },

    removeFromCart(state, id) {
      var index = state.cartMain.findIndex(function (e) {
        return e.id == id;
      });

      -1 !== index &&
        state.cartMain.length > 1 &&
        state.cartMain.splice(index, 1);
    },

    increment(state, id) {
      var model = state.cartMain.find(function (e) {
        return e.id == id;
      });

      model.count = model.count + 1;
    },

    decrement(state, id) {
      var model = state.cartMain.find(function (e) {
        return e.id == id;
      });
      model.count = model.count - 1;
    },
  },

  actions: {
    addToCart(context, id) {
      context.commit("addToCart", id);
      context.commit("synhMainSession");
    },

    dopInCart(context, model) {
      context.commit("dopInCart", model);
      context.commit("synhDopSession");
    },

    removeFromCart(context, id) {
      context.commit("removeFromCart", id);
      context.commit("synhMainSession");
    },

    increment(context, id) {
      context.commit("increment", id);
      context.commit("synhMainSession");
    },

    decrement(context, id) {
      context.commit("decrement", id);
      context.commit("synhMainSession");
    },
  },
});

//
// хранилище
//

//
// миксины
//

var dops = {
  methods: {
    dopInCart: function (id, bool) {
      model = {
        id: id,
        bool: bool,
      };

      store.dispatch("dopInCart", model);
      if (store.state.cartMain.length < 1) {
        store.dispatch("addToCart", goods.l13);
      }
      animationCart();
    },
  },
};

var creditCart = {
  methods: {
    creditCart: function (bool) {
      store.commit("updateCredit", bool);
      if (store.state.cartMain.length < 1) {
        store.dispatch("addToCart", goods.l13);
      }
    },
  },
};

//
// миксины
//

//
// Header
//

var Header = {
  store,
  mixins: [creditCart],
  data: function () {
    return {};
  },

  computed: {
    // появление иконки
    cart: function () {
      return store.state.cartMain.length > 0;
    },

    // вывод количества моделей в корзине
    cartCount: function () {
      return (
        store.state.cartMain.reduce((acc, num) => acc + num.count, 0) +
        store.state.dops.filter((dop) => dop.select == true).length
      );
    },
  },
  methods: {
    // добавление в корзину
    addToCart: function () {
      var id = getIdModel(
        $(".row__item__active").data("model"),
        $(".row2__item__active").data("model")
      );

      store.dispatch("addToCart", id);
      animationCart();
    },
  },
};
Vue.createApp(Header).use(store).mount("#header-block");

//
// Header
//

//
// Cart
//

var Cart = {
  store,
  mixins: [creditCart],
  data: function () {
    return {};
  },

  computed: {
    // итоговая сумма
    lastprice: function () {
      var sum = 0;
      return (
        store.state.cartMain.forEach(function (e) {
          sum += e.price * e.count;
        }),
        store.state.dops.forEach(function (e) {
          e.select && (sum += e.price);
        }),
        sum.toLocaleString()
      );
    },
  },
  methods: {
    // удалить, если в корзине есть хотя бы один элемент
    removeFromCart: function (id) {
      store.dispatch("removeFromCart", id);
    },

    // добавить
    increment: function (id) {
      store.dispatch("increment", id);
    },

    // отнять
    decrement: function (id) {
      store.state.cartMain.find(function (e) {
        return e.id == id;
      }).count > 1
        ? store.dispatch("decrement", id)
        : store.dispatch("removeFromCart", id);
    },

    // анимация при удалении и добавлении
    afterEnter: function (o) {
      o.style.height = "auto";
    },
    leave: function (o) {
      var e = getComputedStyle(o).height;
      (o.style.height = e),
        getComputedStyle(o).height,
        requestAnimationFrame(function () {
          o.style.height = 0;
        });
    },
    // анимация при удалении и добавлении
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("cartMainProductStorage")) == null) {
      store.dispatch("addToCart", 482133);
      animationCart();
    }
  },
};
Vue.createApp(Cart).use(store).mount("#cart-modal");

//
// Cart
//

//
// tby-bulat
//

var tbyBulat = {
  data: function () {
    return {
      dontdoits: [
        {
          img: "dontdoit-1",
          decr: "Стоять у плиты, контролируя уровень нагрева по термометру",
        },
        {
          img: "dontdoit-2",
          decr: "Переживать, что продукты разварятся или не дойдут до готовности",
        },
        {
          img: "dontdoit-3",
          decr: "До минуты высчитывать время, когда блюдо будет готово",
        },
      ],
      easyslides: [
        {
          img: "easyslider-1",
          decr: "Устанавливаем банки в бак",
        },

        {
          img: "easyslider-2",
          decr: "Заполняем автоклав водой ",
        },

        {
          img: "easyslider-3",
          decr: "Закрываем крышку, подключаем к сети",
        },

        {
          img: "easyslider-4",
          decr: "На блоке управления подбираем температуру и время",
        },

        {
          img: "easyslider-5",
          decr: "После приготовления система подаст звуковой сигнал",
        },
      ],
    };
  },
};
Vue.createApp(tbyBulat).use(store).mount("#tby-bulat");

//
// tby-bulat
//
