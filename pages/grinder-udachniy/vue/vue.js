// import { createApp } from "vue";
import { createApp } from "vue/dist/vue.esm-bundler";

//хранилище
import store from "./store";

// import "~swiper/scss";
// import "~swiper/scss/navigation";
// import "~swiper/scss/pagination";

//компоненты
import OrderModal from "./components/OrderModal";
import Tinkoff from "./components/Tinkoff";
import CalcDelivery from "./components/CalcDelivery";
import OrderModel from "./components/OrderModel";
import Dops from "./components/Dops";
import Photo from "./components/Photo";
import Model from "./components/Model";
import Stol from "./components/Stol";
import Things from "./components/Things";

//регистрация компонента
// createApp(OrderModal).use(store).mount("#header-main-test-with-form");
// createApp(OrderModel).use(store).mount("#order-model");
// createApp(Model).use(store).mount("#models");
// createApp(CalcDelivery).use(store).mount("#calc-delivery");
// createApp(Tinkoff).use(store).mount("#tinkoff-block");
// createApp(Dops).use(store).mount("#kit");
createApp(Photo).use(store).mount("#product-photo");
createApp(Stol).use(store).mount("#stol");
createApp(Things).use(store).mount("#things");
