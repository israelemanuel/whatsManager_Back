$(document).ready(function () {
  $(".style1").owlCarousel({
    items: 1,
    autoplay: true,
    autoplayHoverPause: true,
    loop: false,
    nav: false,
    dots: true,
    navText: [
      '<span class="material-symbols-outlined">arrow_back</span>',
      '<span class="material-symbols-outlined">arrow_forward</span >',
    ],
  });

  $(".style2").owlCarousel({
    autoplay: false,
    autoplayHoverPause: true,
    loop: false,
    dots: false,
    margin: 16,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1024: {
        items: 3,
      },
      1600: {
        items: 4,
      },
      1440: {
        items: 4,
      },
    },
  });
});
