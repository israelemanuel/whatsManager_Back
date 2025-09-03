$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();

    const elementP = [...document.querySelectorAll('.perguntas p')];

    elementP.forEach(value => {
        value.addEventListener('click', function (event) {
            const targetClass = event.target.getAttribute('data-pergunta');

            const elementR = [...document.querySelectorAll('.respostas p')];

            elementP.forEach((value) => {
                value.style.background = '#f3effb';
                value.style.color = '#6A40D5';
            })

            elementR.forEach((value) => {
                value.style.display = 'none';

            })

            document.querySelector(`[data-resposta='${targetClass}']`).style.display = 'block';
            document.querySelector(`[data-pergunta='${targetClass}']`).style.color = '#FFD643';
            document.querySelector(`[data-pergunta='${targetClass}']`).style.background = '#6A40D5';
            document.querySelector(`[data-pergunta='${targetClass}']`).style.borderRadius = '32px'
            document.querySelector(`[data-pergunta='${targetClass}']`).style.padding = '16px'
        })
    })



    window.addEventListener('scroll', reveal);

    function reveal() {

        var div = document.querySelector('.section_separator');
        var position = div.scrollTop + div.clientHeight;

        for (var i = 0; i < position.length; i++) {
            var windowheight = window.innerHeight;
            var revealtop = position[i].getBoundingClientRect().top;
            var revealpoint = 150;

            if (revealtop < windowheight - revealpoint) {
                position[i].classList.add('active');
            }
        }
    }

    function mostrarPosicaoDeRolagem() {
        var div = document.querySelector('.main_content');
        var separators = div.querySelectorAll('.section_separator');

        var divHeight = div.clientHeight;
        var divScrollTop = div.scrollTop;

        for (var i = 0; i < separators.length; i++) {
            var separatorTop = separators[i].getBoundingClientRect().top;

            if (separatorTop < divHeight && separatorTop > 0) {
                separators[i].classList.add('active');
            }
        }
    }

    var div = document.querySelector('.main_content');
    div.onscroll = mostrarPosicaoDeRolagem;





    const cookieBanner = document.getElementById('cookie-banner');
    const cookieBannerBtn = document.getElementById('cookie-banner-btn');
    const sangria = document.getElementById("sangria")

    // Verifica se o usuário já aceitou o uso de cookies
    if (localStorage.getItem('cookies-accepted') === 'true') {
        cookieBanner.style.display = 'none';
        sangria.style.marginBottom = '0px'
    }

    // Grava a resposta do usuário em local storage
    cookieBannerBtn.addEventListener('click', function () {
        localStorage.setItem('cookies-accepted', 'true');
        cookieBanner.style.display = 'none';
    });


})