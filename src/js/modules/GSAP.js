import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export function InitImageScrollAnimation() {
  const columns = document.querySelectorAll('.im-audiences__list-col');
  if (!columns.length) return;

  ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
      columns.forEach((col, index) => {
        const pos = index + 1;
        let offsetAdjustment = 0;

        if (pos % 4 === 2) offsetAdjustment = 60;
        else if (pos % 4 === 3) offsetAdjustment = 120;
        else if (pos % 4 === 0) offsetAdjustment = 180;
        else return;

        gsap.to(col, {
          y: -offsetAdjustment,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: col,
            start: "top bottom",
            end: "top 70%",
            scrub: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },

    "(max-width: 768px)": function () {
    },
  });
}