// import Promocode from "../components/Promocode";
import Droplist from "../components/Droplist";

import { mapGetters, mapMutations } from "vuex";

let OrderModal = {
  data: function () {
    return {
      // price: 0,
      // elemQuery: "#header-main-test-with-form",
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

    document
      .querySelectorAll(
        "#header-main-test-with-form .dropdown-list .dropdown-item"
      )
      .forEach((element) => {
        element.addEventListener("click", () => {
          let refer = this.getMain.find(
            (el) => el.name == element.textContent
          ).img;

          let referNOT = this.getMain.filter(
            (el) => el.name != element.textContent
          );

          console.log(referNOT);

          this.$refs[refer].style = "display: block";

          referNOT.forEach((el) => {
            this.$refs[el.img].style = "display: none";
          });
        });
      });
  },
  computed: mapGetters([
    "getMain",
    "getDops",
    "getLastPrice",
    "getLastOldPrice",
  ]),
  components: {
    // Promocode,
    Droplist,
  },
};
export default OrderModal;
