$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".collapsible").collapsible();

  // Detectar o navegador atual
  var userAgent = window.navigator.userAgent;
  var isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  console.log(isSafari);

  // Adicionar a classe "safarinone" se o navegador não for o Safari

  var elements = document.querySelectorAll("#scale");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("scale");
  }

  if (!isSafari) {
    var fluxes = document.querySelectorAll(".fluxes");
    for (var i = 0; i < fluxes.length; i++) {
      fluxes[i].classList.add("scale");
    }
  }

  function mostrarPosicaoDeRolagem() {
    var div = document.querySelector(".main_content");
    var position = div.scrollTop + div.clientHeight;

    if (position < 1999) {
      document.querySelector("#fab_top").style.opacity = "0";
    } else if (position > 2000 && position < 2899) {
      document.querySelector("#fab_top").style.opacity = "100";
      document.querySelector("#fab_top").style.background =
        "var(--alm-sec_color)";
      document.querySelector("#fab_top").style.color = "#ffffff";
    } else if (position > 3000) {
      document.querySelector("#fab_top").style.opacity = "100";
      document.querySelector("#fab_top").style.background = "#ffffff";
      document.querySelector("#fab_top").style.color = "var(--alm-sec_color)";
    }
  }

  const elementP = [...document.querySelectorAll(".perguntas p")];

  elementP.forEach((value) => {
    value.addEventListener("click", function (event) {
      const targetClass = event.target.getAttribute("data-pergunta");

      const elementR = [...document.querySelectorAll(".respostas p")];

      elementP.forEach((value) => {
        value.style.background = "#EFEADC";
        value.style.color = "#214E48";
      });

      elementR.forEach((value) => {
        value.style.display = "none";
      });

      document.querySelector(`[data-resposta='${targetClass}']`).style.display =
        "block";
      document.querySelector(`[data-pergunta='${targetClass}']`).style.color =
        "#F7CD5F";
      document.querySelector(
        `[data-pergunta='${targetClass}']`
      ).style.background = "#214E48";
      document.querySelector(
        `[data-pergunta='${targetClass}']`
      ).style.borderRadius = "32px";
      document.querySelector(`[data-pergunta='${targetClass}']`).style.padding =
        "16px";
    });
  });

  function mostrarPosicaoDeRolagem() {
    var div = document.querySelector(".main_content");
    var separators = div.querySelectorAll(".section_separator");

    var divHeight = div.clientHeight;
    var divScrollTop = div.scrollTop;

    for (var i = 0; i < separators.length; i++) {
      var separatorTop = separators[i].getBoundingClientRect().top;

      if (separatorTop < divHeight && separatorTop > 0) {
        separators[i].classList.add("active");
      }
    }
  }

  var div = document.querySelector(".main_content");
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

function slideUp(number) {
  let el = document.getElementById("alm_flux_" + number);
  el.classList.add("slideUp");
}

function slideDown(number) {
  let el = document.getElementById("alm_flux_" + number);
  el.classList.remove("slideUp");
}
