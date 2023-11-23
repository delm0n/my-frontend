import { mapGetters, mapMutations } from "vuex";
import { Collapse } from "vue-collapsed";

let Model = {
  data() {
    return {
      window1200: window.innerWidth > 1200,
    };
  },
  computed: mapGetters(["getMain"]),
  components: {
    Collapse,
  },
  methods: {
    ...mapMutations(["selectMain"]),
  },
  mounted() {
    const windowbreakpoint1200 = window.matchMedia("(max-width: 1200px)");
    const breakpointChecker1200 = () => {
      if (!windowbreakpoint1200.matches) {
        this.window1200 = true;
      } else {
        this.window1200 = false;
      }
    };
    windowbreakpoint1200.addListener(breakpointChecker1200);
    breakpointChecker1200();
  },
  template: `
  <div class="container-models">
      <p class="title">
        Выберите свой гриндер «УДАЧНЫЙ»
      </p>

      <div class="model-wrapper">
        <div v-for="(item, index) in getMain" :key="index" class="model-item">
          <div class="model-item__img">
          
            <div class="img-wrap">
                <picture>
                    <source
                    type="image/webp"
                    srcset="'/new-site-vue/build/images/model/'+ item.img +'.webp'"
                    />
                    <img
                    :alt="item.name"
                    :src="'/new-site-vue/build/images/model/'+ item.img +'.png'"
                    />
                </picture>
            </div>

            <h3 v-html="item.name.replace('«', '').replace('»', '')"></h3>
          </div>

          <div class="model-item__text">
            <p class="decr">
              <span>Габариты станка — </span>
              <b v-html="item.size"></b>
            </p>

            <p class="decr">
              <span>Вес — </span>
              <b v-html="item.weight"></b>
            </p>

            <p class="decr">
              <span>Диапазон горизонтальной регулировки&nbsp;—&nbsp;</span>
              <b v-html="item.upor.rangeV"></b>
            </p>

            <p class="decr">
              <span>Диапазон горизонтальной регулировки&nbsp;—&nbsp;</span>
              <b v-html="item.upor.rangeG"></b>
            </p>

            <collapse :when="item.showMoreModel || window1200">
              <div class="complectation">
                <p class="decr">
                  <b> Комплектация</b>: гриндер, 3 абразивные ленты (Р60, P100,
                  Р180), гарантийный талон, инструкция
                </p>
              </div>
            </collapse>

            <collapse :when="item.showMoreModel">
              <div class="complectation">
                <p v-for="(li, idx) in item.charList" :key="idx" class="decr">
                  <span v-html="li[0]"></span> —
                  <b v-html="li[1]"></b>
                </p>
              </div>
            </collapse>

            <p
              @click="item.showMoreModel = !item.showMoreModel"
              class="show-more-button"
            >
              {{
                item.showMoreModel
                  ? "Скрыть дополнительные характеристики"
                  : "Дополнительные характеристики"
              }}
            </p>
          </div>

          <div class="model-item__offer">
            <div class="price">
              <div class="sale" v-html="item.sale"></div>
              <p class="new" v-html="item.price.toLocaleString() + ' РУБ.'"></p>
              <p
                class="old"
                v-html="item.oldPrice.toLocaleString() + ' РУБ.'"
              ></p>
            </div>
            <a @click="selectMain(item.id)" href="#order-model" data-touch="false" class="button fancybox" >Заказать</a>
          </div>
        </div>
      </div>
    </div>
  `,
};

export default Model;
