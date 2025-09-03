$(document).ready(function () {

    $(".style1").owlCarousel({
        items: 1,
        autoplay: true,
        autoplayHoverPause: true,
        loop: false,
        nav: false,
        dots:true,
        navText: [
            '<span class="material-symbols-outlined">arrow_back</span>',
             '<span class="material-symbols-outlined">arrow_forward</span >'],

    });
    $(".style2").owlCarousel({
        loop: false,
        dots: true,
        responsive: {
            320: {
                items: 1,
                nav: false,
                margin: 0,
            },
            600: {
                items: 1,
                nav: false,
                margin: 0,
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
    $(".style3").owlCarousel({
        margin: 16,
        dots: false,
        autoplayHoverPause: true,
        loop: false,
        responsive: {
            320: {
                items: 1,
                autoplay: true,
            },
            600: {
                items: 2,
                autoplay: true,
            },
            1024: {
                items: 3,
                autoplay: true,
            },
            1366:{
                items: 4,
                autoplay: false
            }

        }
    });

});