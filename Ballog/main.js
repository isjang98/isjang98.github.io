// main.js

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Drag to scroll for the gallery section
  const slider = document.querySelector('.drag-scroll');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
      isDown = false;
    });
    
    slider.addEventListener('mouseup', () => {
      isDown = false;
    });
    
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast multiplier
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  // Add click ripple effect to buttons
  const buttons = document.querySelectorAll('.ripple');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;

      let ripples = document.createElement('span');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      ripples.style.position = 'absolute';
      ripples.style.transform = 'translate(-50%, -50%)';
      ripples.style.pointerEvents = 'none';
      ripples.style.borderRadius = '50%';
      ripples.style.animation = 'animateRipple 0.6s linear';
      ripples.style.background = 'rgba(255, 255, 255, 0.3)';
      
      this.appendChild(ripples);

      // Add keyframes dynamically if not exists
      if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.innerHTML = `
          @keyframes animateRipple {
            0% { width: 0px; height: 0px; opacity: 0.5; }
            100% { width: 500px; height: 500px; opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      setTimeout(() => {
        ripples.remove();
      }, 600);
    });
  });
});
