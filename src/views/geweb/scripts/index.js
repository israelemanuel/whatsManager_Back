$(document).ready(function () {
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.collapsible').collapsible();

  const elementP = [...document.querySelectorAll('.perguntas p')];

  elementP.forEach(value => {
    value.addEventListener('click', function (event) {
      const targetClass = event.target.getAttribute('data-pergunta');

      const elementR = [...document.querySelectorAll('.respostas p')];

      elementP.forEach((value) => {
        value.style.background = 'var(--seccondary-color)';
        value.style.color = 'var(--positive-color)';
      });

      elementR.forEach((value) => {
        value.style.display = 'none';
      });

      const respostaElement = document.querySelector(`[data-resposta='${targetClass}']`);
      const perguntaElement = document.querySelector(`[data-pergunta='${targetClass}']`);

      if (respostaElement && perguntaElement) {
        respostaElement.style.display = 'block';
        perguntaElement.style.color = 'var(--primary-color)';
        perguntaElement.style.background = 'var(--positive-color)';
        perguntaElement.style.borderRadius = 'var(--curve)';
        perguntaElement.style.padding = '16px';
      }
    });
  });

  const cookieBanner = document.getElementById('cookie-banner');
  const cookieBannerBtn = document.getElementById('cookie-banner-btn');
  const sangria = document.getElementById("sangria");

  // Verifica se o usuário já aceitou o uso de cookies
  if (localStorage.getItem('cookies-accepted') === 'true') {
    if (cookieBanner) cookieBanner.style.display = 'none';
    if (sangria) sangria.style.marginBottom = '0px';
  }

  // Grava a resposta do usuário em local storage
  if (cookieBannerBtn) {
    cookieBannerBtn.addEventListener('click', function () {
      localStorage.setItem('cookies-accepted', 'true');
      if (cookieBanner) cookieBanner.style.display = 'none';
    });
  }
});

function mostrarPosicaoDeRolagem() {
  const div = document.querySelector('.main_content');
  if (!div) return;

  const position = div.scrollTop + div.clientHeight;
  const fabTop = document.querySelector('#fab_top');
  if (!fabTop) return;

  if (position < 1999) {
    fabTop.style.opacity = '0';
  } else if (position > 2000 && position < 2899) {
    fabTop.style.opacity = '100';
    fabTop.style.background = 'var(--primary-color)';
    fabTop.style.color = '#ffffff';
  } else if (position > 3000) {
    fabTop.style.opacity = '100';
    fabTop.style.background = '#ffffff';
    fabTop.style.color = 'var(--primary-color)';
  }
}