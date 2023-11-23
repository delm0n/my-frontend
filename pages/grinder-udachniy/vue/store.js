import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      credit: false,
      test: testVersion,

      main: [
        {
          id: goods.grinder,
          price: goodsJson[goods.grinder].price,
          oldPrice: goodsJson[goods.grinder].oldPrice,

          selected: true,
          nameModel: "«Удачный»",
          img: "udachniy",
          name: "Гриндер «Удачный»",

          sale: "-35%",

          size: "365 х 371 х 239 мм",
          weight: "14,30 кг",

          upor: {
            have: "Нет",
            rangeV: "50°",
            rangeG: "отсутствует",
          },

          showMoreModel: false,

          charList: [
            ["Длина ленты", "610 мм"],
            ["Ширина ленты", "50 мм"],
            ["Диаметр приводного шкифа", "95 мм"],
            ["Диаметр роликов", "32 мм"],
            ["Размеры опорного столика", "166 х 70 мм"],
            ["Мощность двигателя", "1,1 кВт"],
          ],
        },

        {
          id: goods.grinder_plus,
          price: goodsJson[goods.grinder_plus].price,
          oldPrice: goodsJson[goods.grinder_plus].oldPrice,

          selected: false,
          nameModel: "Удачный Плюс",
          img: "udachniy_plus",
          name: "Гриндер «Удачный Плюс»",

          sale: "-45%",

          size: "365 х 371 х 239 мм",
          weight: "14,45 кг",

          upor: {
            have: "Да",
            rangeV: "50°",
            rangeG: "75°",
          },

          showMoreModel: false,

          charList: [
            ["Длина ленты", "610 мм"],
            ["Ширина ленты", "50 мм"],
            ["Диаметр приводного шкифа", "95 мм"],
            ["Диаметр роликов", "32 мм"],
            ["Размеры опорного столика", "166 х 70 мм"],
            ["Мощность двигателя", "1,1 кВт"],
          ],
        },
      ],

      webpSupport: webp,

      dops: [
        {
          id: goods.ugol,
          price: goodsJson[goods.ugol].price,
          oldPrice: goodsJson[goods.ugol].oldPrice,

          selected: false,
          name: "Магнитный угол для сварки",
          class: "ugol",
        },

        {
          id: goods.lenta_dop,
          price: goodsJson[goods.lenta_dop].price,
          oldPrice: goodsJson[goods.lenta_dop].oldPrice,

          selected: false,
          name: "Набор запасных лент",
          class: "lenta_dop",
        },

        {
          id: goods.goniometer,
          price: goodsJson[goods.goniometer].price,
          oldPrice: goodsJson[goods.goniometer].oldPrice,

          selected: false,
          name: "Угломер электронный",
          class: "goniometer",
        },
      ],

      testDop: {
        id: goods.dop_pencil,
        price: goodsJson[goods.dop_pencil].price,
        oldPrice: goodsJson[goods.dop_pencil].oldPrice,

        selected: false,
        name: "Чистящий карандаш",
        class: "dop_pencil",
      },

      promocode: {
        message: "",
        status: "",
        coupon: "",
        id: 0,
        price: 0,
      },
    };
  },

  mutations: {
    setPromocode(state, json) {
      if (json.status === "success") {
        state.promocode.message = "Промокод применён";
        state.promocode.status = json.status;
        state.promocode.coupon = json.coupon;
        state.promocode.id = json.id;
        state.promocode.price = json.price;
      } else {
        state.promocode.message = "Промокод недействителен";
        state.promocode.status = json.status;
        state.promocode.coupon = "";
        state.promocode.id = 0;
        state.promocode.price = 0;
      }
    },

    updateCredit(state, credit) {
      state.credit = credit;
    },

    selectMain(state, id) {
      state.main.forEach((element) => {
        element.id == id
          ? (element.selected = true)
          : (element.selected = false);
      });
    },

    selectOneDop(state, id) {
      state.dops.forEach((element) => {
        element.id == id
          ? (element.selected = true)
          : (element.selected = false);
      });
    },
  },

  getters: {
    // промокод
    getPromocode(state) {
      return state.promocode;
    },
    getWebp(state) {
      return state.webpSupport;
    },
    getMain(state) {
      return state.main;
    },

    getDops(state) {
      if (state.test) {
        state.dops.push(state.testDop);
      }

      return state.dops;
    },

    getLastPrice(state) {
      return state.dops.reduce(function (sum, dop) {
        return dop.selected ? sum + dop.price : sum;
      }, state.main.find((el) => el.selected).price);
    },

    getLastOldPrice(state) {
      return state.dops.reduce(function (sum, dop) {
        return dop.selected ? sum + dop.oldPrice : sum;
      }, state.main.find((el) => el.selected).oldPrice);
    },
  },
});
