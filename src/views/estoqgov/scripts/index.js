$(document).ready(function () {

  $('.sidenav').sidenav();
  $('.tabs').tabs({
    'swipeable': true
  });
  $('.collapsible').collapsible();

  lowLight();
  highLight();
});

function mostrarPosicaoDeRolagem() {
  var div = document.querySelector('.main_content');
  var position = div.scrollTop + div.clientHeight;

  if (position < 1999) {
    document.querySelector('#fab_top').style.opacity = '0';
  } else if (position > 2000 && position < 2899) {
    document.querySelector('#fab_top').style.opacity = '100';
    document.querySelector('#fab_top').style.background = 'var(--alm-sec_color)';
    document.querySelector('#fab_top').style.color = '#ffffff';
  } else if (position > 3000) {
    document.querySelector('#fab_top').style.opacity = '100';
    document.querySelector('#fab_top').style.background = '#ffffff';
    document.querySelector('#fab_top').style.color = 'var(--alm-sec_color)';
  }
}



function lowLight() {

  const el = document.querySelectorAll("#islow")


  if (document.documentElement.clientWidth >= 1025) {
    for (let index = 0; index < el.length; index++) {
      let element = el[index].classList.add('lowlight');
    }
  }

}

function highLight() {
  let el = document.querySelectorAll("#highlight")
  if (document.documentElement.clientWidth >= 1025) {
    for (let index = 0; index < el.length; index++) {
      const element = el[index].classList.add('highlight');

    }
  }

}



function Flip(number) {
  let el = document.getElementById("alm_card_" + number);
  el.classList.add('flip-sideways');

};

function Flipback(number) {
  let el = document.getElementById("alm_card_" + number);
  el.classList.remove('flip-sideways');
};

function FlipAbove(number) {
  let el = document.getElementById("alm_card_" + number)
  el.classList.add('flip-verticaly')


};

function FlipBellow(number) {
  let el = document.getElementById("alm_card_" + number)
  el.classList.remove('flip-verticaly')
};

document.addEventListener('DOMContentLoaded', () => {
  const elementP = [...document.querySelectorAll('.perguntas p')];

  elementP.forEach(value => {
    value.addEventListener('click', function (event) {
      const targetClass = event.target.getAttribute('data-pergunta');

      const elementR = [...document.querySelectorAll('.respostas p')];

      elementP.forEach((value) => {
        value.style.background = 'transparent';
        value.style.color = 'var(--alm-sec_color)';
      });

      elementR.forEach((value) => {
        value.style.display = 'none';
      });

      const respostaElement = document.querySelector(`[data-resposta='${targetClass}']`);
      const perguntaElement = document.querySelector(`[data-pergunta='${targetClass}']`);

      if (respostaElement && perguntaElement) {
        respostaElement.style.display = 'block';
        perguntaElement.style.color = 'white';
        perguntaElement.style.background = '#FF8200';
        perguntaElement.style.borderRadius = 'var(--curve)';
        perguntaElement.style.padding = '16px';
      }
    });
  });
});