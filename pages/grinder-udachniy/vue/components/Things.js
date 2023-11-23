import { mapGetters } from "vuex";
import { Swiper, Pagination } from "swiper";
import uuidv4 from "../mixins/uuidv4";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.config({ nullTargetWarn: false });

let Things = {
  computed: mapGetters(["getWebp"]),
  data() {
    return {
      img: false,
      id: null,
      mobile: window.innerWidth < 769,
      photoList: [
        {
          up: {
            src: "photo-1",
            asprat: "453/466",
          },

          down: {
            src: "photo-4",
            asprat: "453/371",
          },
        },

        {
          up: {
            src: "photo-2",
            asprat: "227/150",
          },

          down: {
            src: "photo-5",
            asprat: "227/270",
          },
        },

        {
          up: {
            src: "photo-3",
            asprat: "151/180",
          },

          down: {
            src: "photo-6",
            asprat: "453/293",
          },
        },
      ],
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
          trigger: "#things",
          start: "-60% bottom",
          onEnter: this.loadImg,
          onEnterBack: this.loadImg,
        },
      });
    }

    let myPhotoSwiper;
    const photoSwiper = () => {
      myPhotoSwiper = new Swiper(".things-slider", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        pagination: {
          el: ".things-slider-pagination",
          type: "bullets",
          clickable: true,
        },

        breakpoints: {
          0: {
            slidesPerView: 1.3,
            spaceBetween: 20,
            loop: false,
            slidesOffsetAfter: 20,
            slidesOffsetBefore: 20,
          },

          577: {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            slidesOffsetAfter: 0,
            slidesOffsetBefore: 0,
          },
        },

        modules: [Pagination],
      });
    };

    const photoSwiperbreakpoint = window.matchMedia("(min-width: 769px)");
    const breakpointChecker = () => {
      if (photoSwiperbreakpoint.matches) {
        this.mobile = false;

        setTimeout(() => {
          if (myPhotoSwiper) {
            return myPhotoSwiper.destroy(true, true);
          }
        }, 10);
      } else {
        this.mobile = true;

        setTimeout(() => {
          return photoSwiper();
        }, 20);
      }
    };

    photoSwiperbreakpoint.addListener(breakpointChecker);
    breakpointChecker();
  },
  methods: {
    loadImg() {
      this.img = true;
    },
  },

  template: `
  <div class="container">
  <div class="title"><h2> Откройте для себя <br> профессиональный станок </h2><p class="subtitle">Который позволит вам за считанные минуты:</p></div>
  
  <div class="things-wrapper">
  <div v-if="!mobile" class="photo-grid">
    <div
      class="photo-grid__column"
      v-for="(photo, index) in photoList"
      :key="index"
    >
      <div class="photo-grid__item">
        <picture>
          <source
            :srcset="
              img
                ? 'images/things/' +
                  photo.up.src +
                  '.webp'
                : ''
            "
            type="image/webp"
          />
          <img
            :style="'aspect-ratio: ' + photo.up.asprat"
            :src="
              img
                ? 'images/things/' +
                  photo.up.src +
                  '.png'
                : ''
            "
            alt="Фото гриндера"
          />
        </picture>
      </div>

      <div class="photo-grid__item">
        <picture>
          <source
            :srcset="
              img
                ? 'images/things/' +
                  photo.down.src +
                  '.webp'
                : ''
            "
            type="image/webp"
          />
          <img
            :style="'aspect-ratio: ' + photo.down.asprat"
            :src="
              img
                ? 'images/things/' +
                  photo.down.src +
                  '.png'
                : ''
            "
            alt="Фото гриндера"
          />
        </picture>
      </div>
    </div>
  </div>

  <div v-if="mobile" class="things-slider">
    <div class="swiper-wrapper">
      <div
        v-for="(slide, index) in photoList"
        :key="index"
        class="swiper-slide"
      >
        <div class="photo-wrapper__img">
          <picture>
            <source
              :srcset="
                'images/things/' +
                slide.up.src +
                '@05x.webp'
              "
              type="image/webp"
            />
            <img
              style="aspect-ratio: 1/1"
              :src="
                'images/things/' +
                slide.up.src +
                '@05x.png'
              "
              alt="Фото гриндера"
            />
          </picture>
        </div>
      </div>

      <div
        v-for="(slide, index) in photoList"
        :key="index"
        class="swiper-slide"
      >
        <div class="photo-wrapper__img">
          <picture>
            <source
              :srcset="
                'images/things/' +
                slide.down.src +
                '@05x.webp'
              "
              type="image/webp"
            />
            <img
              style="aspect-ratio: 1/1"
              :src="
                'images/things/' +
                slide.down.src +
                '@05x.png'
              "
              alt="Фото гриндера"
            />
          </picture>
        </div>
      </div>
    </div>
    <div class="things-slider-pagination"></div>
  </div>
</div>
</div>
  `,
};

export default Things;
