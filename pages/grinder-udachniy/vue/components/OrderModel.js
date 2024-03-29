// import Promocode from "../components/Promocode";
import Droplist from "../components/Droplist";

import { mapGetters, mapMutations } from "vuex";

let OrderModel = {
  data: function () {
    return {
      // price: 0,
      // elemQuery: "#order-model",
    };
  },
  methods: {
    actionDroplist(id) {
      this.selectMain(id);
    },
    ...mapMutations(["selectMain"]),
  },

  mounted() {
    // var target = document.querySelector(this.elemQuery + " .priceWatcher");
    // this.price = Number(target.innerText.replace(/ /g, ""));
    // var context = this;
    // var observer = new MutationObserver(function (mutations) {
    //   mutations.forEach(function () {
    //     context.price = Number(
    //       document
    //         .querySelector(context.elemQuery + " .priceWatcher")
    //         .innerText.replace(/ /g, "")
    //     );
    //   });
    // });
    // observer.observe(target, {
    //   attributes: true,
    //   childList: true,
    //   characterData: true,
    // });
  },
  computed: mapGetters(["getMain", "getDops", "getLastPrice"]),

  components: {
    // Promocode,
    Droplist,
  },
};
export default OrderModel;
