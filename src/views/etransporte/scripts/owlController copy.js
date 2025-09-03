$(document).ready(function () {
  $(".style1").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayHoverPause: true,
    loop: true,
    dots: true,
    nav: false,
    rewind: true,
    margin: 16,
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
        items: 3,
      },
      1440: {
        items: 3,
      },
    },
  });
});
