gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

["#container-1", "#container-2", "#container-3"].forEach((element) => {
  ScrollTrigger.create({
    trigger: element,
    once: true,
    onEnter: () => {
      gsap.fromTo(
        element + " .item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.35,
        }
      );
    },
  });
});

let posX = 0,
  posY = 0;

let mouseX = 0,
  mouseY = 0;

gsap.to(".cursor", {
  duration: 0.018,
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / 8;
    posY += (mouseY - posY) / 8;

    gsap.set(".cursor", {
      css: {
        left: posX - 20,
        top: posY - 20,
      },
    });
  },
});

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

var items = document.querySelectorAll(".item");
var cursor = document.querySelector(".cursor");

items.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  element.addEventListener("mouseleave", () => {
    if (cursor.classList.contains("hover")) {
      cursor.classList.remove("hover");
    }
  });
});

function scrollToSelector(selector) {
  gsap.to(window, {
    duration: 1.3,
    scrollTo: selector,
  });
}
