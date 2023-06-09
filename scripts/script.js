gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".container .item",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    onComplete: () => {
      document.querySelectorAll(".container .item").forEach((element) => {
        element.style = "";
      });
    },
  }
);
