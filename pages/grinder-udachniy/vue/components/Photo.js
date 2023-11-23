import { mapGetters } from "vuex";
import { Swiper, Pagination } from "swiper";
import uuidv4 from "../mixins/uuidv4";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.config({ nullTargetWarn: false });

let Photo = {
  computed: mapGetters(["getWebp"]),
  data() {
    return {
      img: false,
      id: null,
      mobile: window.innerWidth < 769,
      photoList: [
        {
          href: "photo-1__modal",
          src: "photo-1",
          asprat: "1/1",
        },

        {
          href: "photo-2__modal",
          src: "photo-2",
          asprat: "1/1",
        },

        {
          href: "photo-3__modal",
          src: "photo-3",
          asprat: "1/1",
        },

        {
          href: "photo-4__modal",
          src: "photo-4",
          asprat: "439/205",
        },

        {
          href: "photo-5__modal",
          src: "photo-5",
          asprat: "1/1",
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
          trigger: "#photo",
          start: "-60% bottom",
          onEnter: this.loadImg,
          onEnterBack: this.loadImg,
        },
      });
    }

    let myPhotoSwiper;
    const photoSwiper = () => {
      myPhotoSwiper = new Swiper(".photo-slider", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        pagination: {
          el: ".photo-slider-pagination",
          type: "bullets",
          clickable: true,
        },
        modules: [Pagination],
      });
    };

    const photoSwiperbreakpoint = window.matchMedia("(min-width: 769px)");
    const breakpointChecker = () => {
      if (!photoSwiperbreakpoint.matches) {
        this.mobile = true;
        setTimeout(() => {
          return photoSwiper();
        }, 20);
      } else {
        this.mobile = false;

        setTimeout(() => {
          if (myPhotoSwiper) {
            return myPhotoSwiper.destroy(true, true);
          }
        }, 20);
      }
    };

    photoSwiperbreakpoint.addListener(breakpointChecker);
    breakpointChecker();
  },
  methods: {
    loadImg() {
      this.img = true;
      this.loadVideo();
    },

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
  <section id="photo">
    <div class="container">
      <p class="title">Реальные фото гриндера</p>

      <div class="photo-wrapper">
        <div v-if="!mobile" class="photo-grid">
          <a
            v-for="(photo, index) in photoList"
            :key="index"
            class="photo-grid__item"
            :href="
              'images/photo/' +
              photo.href +
              (getWebp === 'webp' ? '.webp' : '.png')
            "
            data-fancybox="gallery"
          >
            <picture>
              <source
                :srcset="
                  img
                    ? 'images/photo/' + photo.src + '.webp'
                    : ''
                "
                type="image/webp"
              />
              <img
                :style="'aspect-ratio: ' + photo.asprat"
                :src="
                  img
                    ? 'images/photo/' + photo.src + '.png'
                    : ''
                "
                alt="Фото гриндера"
              />
            </picture>
          </a>
        </div>

        <div v-if="mobile" class="photo-slider">
          <div class="swiper-wrapper">
            <div
              v-for="(slide, index) in photoList"
              :key="index"
              class="swiper-slide"
            >
              <a
                :href="
                  'images/photo/' +
                  slide.href +
                  (getWebp === 'webp' ? '.webp' : '.png')
                "
                data-fancybox="gallery"
                class="photo-wrapper__img"
              >
                <picture>
                  <source
                    :srcset="
                      'images/photo/' +
                      slide.src +
                      '@05x.webp'
                    "
                    type="image/webp"
                  />
                  <img
                    :src="
                      'images/photo/' +
                      slide.src +
                      '@05x.png'
                    "
                    alt="Фото гриндера"
                  />
                </picture>
              </a>
            </div>
          </div>
          <div class="photo-slider-pagination"></div>
        </div>

        <div class="photo-video">
          <video
            ref="video"
            preload="none"
            loop
            :poster="'images/photo/video.png'"
            muted
            class="video-lazy"
          >
            <source
              :data-lazy="'video/photo-video.mp4'"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  </section>
  `,
};

export default Photo;
