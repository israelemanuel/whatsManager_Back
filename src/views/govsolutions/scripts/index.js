$(document).ready(function () {
  


  function updateCounter(counter, incrementSpeed) {
    counter.innerText = '0';

    const target = +counter.getAttribute('data-target');
    const increment = target / 100;

    const update = () => {
      const current = +counter.innerHTML;
      if (current < target) {
        counter.innerHTML = `${Math.ceil(current + increment)}`;
        setTimeout(update, incrementSpeed);
      }
    };

    update();
  }


  const slowerCounters = document.querySelectorAll('#slowerCounters');
  const fastCounters = document.querySelectorAll('#fastCounters');

  slowerCounters.forEach((counter) => updateCounter(counter, 80));
  fastCounters.forEach((counter) => updateCounter(counter, 10));

  document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(element => {
      observer.observe(element);
    });
  });
});