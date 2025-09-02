$(document).ready(function () {
    $(".banner_carousel").owlCarousel({
        items: 1,
        autoplay: true,
        autoplayHoverPause: true,
        nav:true,
        loop: false,
        dots: true,
        margin: 16
    });
    
    $(".style1").owlCarousel({
        nav: false,


        responsive: {
            0: {
                items: 1,
                autoplay: true,
                autoplayHoverPause: true,
                loop: true,
                dots: false,
                margin: 16
            },
            320: {
                items: 1,
                autoplay: true,
                autoplayHoverPause: true,
                loop: true,
                dots: false,
                margin: 16
            },
            375: {
                items: 1,
                autoplay: true,
                autoplayHoverPause: true,
                loop: true,
                dots: false,
                margin: 16
            },
            768: {
                items: 3,
                autoplay: true,
                autoplayHoverPause: true,
                loop: true,
                dots: false,
                margin: 16
            },
            1024: {
                items: 2,
                autoplay: true,
                autoplayHoverPause: true,
                loop: false,
                dots: false,
                margin: 16
            },
            1366: {
                items: 3,
                autoplay: true,
                autoplayHoverPause: true,
                loop: false,
                dots: false,
                margin: 16
            },
        }

    });
});