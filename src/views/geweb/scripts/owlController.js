$(document).ready(function () {
    $(".style1").owlCarousel({
        items: 1,
        autoplay: false,
        dots: true,
        autoplayHoverPause: true,
        loop: false,
    });



    $(".style2").owlCarousel({


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
                items: 4,
                autoplay: true,
                autoplayHoverPause: true,
                loop: true,
                dots: false,
                margin: 16
            },
            1440: {
                items: 4,
                autoplay: true,
                autoplayHoverPause: true,
                loop: true,
                dots: false,
                margin: 16
            },
        }

    });

    $(".escola").owlCarousel({
        loop: false,
        dots: true,
        responsive: {
            1: {
                items: 1,
                nav: false,
                margin: 0,
            },
            600: {
                items: 1,
                nav: false,
                margin: 0,
            },
            768: {
                items: 1,
                nav: true,
                margin: 16,
                navText: [
                    '<span class="material-symbols-outlined">arrow_back</span>',
                    '<span class="material-symbols-outlined">arrow_forward</span >'
                ],
            },

            1024: {
                items: 1,
                nav: true,
                margin: 16,
                navText: [
                    '<span class="material-symbols-outlined">arrow_back</span>',
                    '<span class="material-symbols-outlined">arrow_forward</span >'
                ],
            },
            1440: {
                items: 1,
                nav: true,
                margin: 16,
                navText: [
                    '<span class="material-symbols-outlined">arrow_back</span>',
                    '<span class="material-symbols-outlined">arrow_forward</span >'
                    
                ],
            }
        },
        autoplayHoverPause: true,
        autoplay: false,

    });
});