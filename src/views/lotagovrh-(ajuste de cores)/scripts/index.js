$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();

    const elementP = [...document.querySelectorAll('.perguntas p')];

    elementP.forEach(value => {
        value.addEventListener('click', function (event) {
            const targetClass = event.target.getAttribute('data-pergunta');

            const elementR = [...document.querySelectorAll('.respostas p')];

            elementP.forEach((value) => {
                value.style.background = 'var(--background-page)';
                value.style.color = 'var(--primary-color)';
            })

            elementR.forEach((value) => {
                value.style.display = 'none';

            })

            document.querySelector(`[data-resposta='${targetClass}']`).style.display = 'block';
            document.querySelector(`[data-pergunta='${targetClass}']`).style.color = 'var(--seccondary-color)';
            document.querySelector(`[data-pergunta='${targetClass}']`).style.background = 'var(--primary-color)';
            document.querySelector(`[data-pergunta='${targetClass}']`).style.borderRadius = 'var(--curve)'
            document.querySelector(`[data-pergunta='${targetClass}']`).style.padding = '16px'
        })
    })

    function mostrarPosicaoDeRolagem() {
        var div = document.querySelector('.main_content');
        var separators = div.querySelectorAll('.arejamento');

        var divHeight = div.clientHeight;
        var divScrollTop = div.scrollTop;

        if (div.offsetWidth > 1024) {
            

            for (var i = 0; i < separators.length; i++) {
                var separatorTop = separators[i].getBoundingClientRect().top;
                if (separatorTop < divHeight && separatorTop > 0) {
                    separators[i].classList.add('active');
                }
            }
            
        } else {
            separators.forEach(function (elemento) {
                elemento.classList.add('active');
            });
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



});
