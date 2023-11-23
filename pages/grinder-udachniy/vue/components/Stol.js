import { Swiper, Navigation } from "swiper";
import uuidv4 from "../mixins/uuidv4";
import { mapGetters } from "vuex";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.config({ nullTargetWarn: false });

let Stol = {
  computed: mapGetters(["getWebp"]),

  data() {
    return {
      img: false,
      id: null,
    };
  },
  mixins: [uuidv4],
  mounted() {
    this.id = this.uuidv4();

    if (this.img == false) {
      gsap.timeline({
        delay: 4,
        scrollTrigger: {
          id: this.id,
          once: true,
          trigger: "#table",
          start: "-60% bottom",
          onEnter: this.loadVideo,
          onEnterBack: this.loadVideo,
        },
      });
    }

    let myTenSwiper;
    const TenSwiper = () => {
      myTenSwiper = new Swiper(".table-wrapper__slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        navigation: {
          nextEl: ".table-next",
          prevEl: ".table-prev",
        },
        loop: true,
        modules: [Navigation],
        breakpoints: {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 20,
            slidesOffsetAfter: 20,
            slidesOffsetBefore: 20,
            loop: false,
          },
          769: {
            slidesOffsetAfter: 0,
            slidesOffsetBefore: 0,
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
          },
        },
      });
    };

    TenSwiper();
  },
  methods: {
    loadVideo() {
      let video = this.$refs.video;
      let source = video.querySelector("source");

      source.src = source.dataset.lazy;
      video.load();
      video.classList.add("video-lazy--loaded");
      video.play();

      source.removeAttribute("data-lazy");
      ScrollTrigger.getById(this.id).kill(true);
      gsap.timeline().kill(true);
    },
  },
  template: `
  <section id="table">
    <div class="container">
      <div class="table-wrapper">
        <div class="table-wrapper__container">
          <div class="table-wrapper__slider">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <video
                  ref="video"
                  preload="none"
                  loop
                  :poster="
                    'images/structure/structure-1-1.png'
                  "
                  muted
                  class="video-lazy"
                >
                  <source
                    data-lazy="video/structure-1.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div class="swiper-slide">
                <picture
                  ><source
                    type="image/webp"
                    srcset="
                      images/structure/structure-1-3.webp
                    " />
                  <img
                    alt="#"
                    src="images/structure/structure-1-3.png"
                /></picture>
              </div>
              <div class="swiper-slide">
                <picture
                  ><source
                    type="image/webp"
                    srcset="
                      images/structure/structure-1-2.webp
                    " />
                  <img
                    alt="#"
                    src="images/structure/structure-1-2.png"
                /></picture>
              </div>

            </div>

            <div class="table-prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="30"
                viewBox="0 0 23 30"
                fill="none"
              >
                <path d="M23 0H14L0 15L14 30H23L9 15L23 0Z" fill="#646464" />
              </svg>
            </div>

            <div class="table-next">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="30"
                viewBox="0 0 23 30"
                fill="none"
              >
                <path d="M0 0H9L23 15L9 30H0L14 15L0 0Z" fill="#646464" />
              </svg>
            </div>
          </div>
        </div>
        <div class="table-wrapper__title">
          <h2>Столик с горизонтальной регулировкой</h2>
        </div>
        <div class="table-wrapper__content">
          <p class="decr">
            С моделью «Удачный Плюс» вы сможете менять угол наклона заготовки по
            отношению к ленте. Опорный столик, на который выкладывается деталь,
            закреплён на основании гриндера. Настраивать его можно прямо во
            время работы. Установить оптимальное расстояние между лентой и
            столиком поможет специальная пластина в комплекте. Столик особо
            прочный, химически оксидированный.
          </p>
          <br />

          <p class="decr decr-title"><span> Характеристики:</span>:</p>

          <ul>
            <li>Размер опорной пластины: <span> 70х166 мм</span></li>
            <li>Толщина:<span> 5 мм</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  `,
};

export default Stol;
