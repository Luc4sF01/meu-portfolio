document.addEventListener("DOMContentLoaded", () => {
    // Efeito de digitação para a hero (caso exista)
    const typingText = document.querySelector(".typing-text");
    if (typingText) {
      const textArray = ["Lucas Filipe.", "Desenvolvedor Backend.", "Apaixonado por Tecnologia."];
      let textIndex = 0, charIndex = 0, isDeleting = false;
      function typeEffect() {
        const currentText = textArray[textIndex];
        if (isDeleting) {
          typingText.textContent = currentText.substring(0, charIndex--);
        } else {
          typingText.textContent = currentText.substring(0, charIndex++);
        }
        if (!isDeleting && charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % textArray.length;
          setTimeout(typeEffect, 500);
        } else {
          setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
      }
      typeEffect();
    }
    
    // Alterar header ao rolar
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.style.background = "rgba(0, 0, 0, 0.9)";
        header.style.boxShadow = "0 4px 10px rgba(0, 255, 255, 0.3)";
      } else {
        header.style.background = "rgba(0, 0, 0, 0.8)";
        header.style.boxShadow = "none";
      }
    });
    
    // Efeito parallax na seção hero (caso exista)
    const hero = document.querySelector('.hero');
    if (hero) {
      document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) * 0.02;
        const moveY = (clientY - centerY) * 0.02;
        hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }
    
    // Fundo de partículas interativas
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 100;
    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvasSize();
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() * 1) - 0.5;
        this.speedY = (Math.random() * 1) - 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => {
      setCanvasSize();
      initParticles();
    });
    
    // Intersection Observer para revelar elementos
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
    
    // Modal functionality para a página de Projetos
    const modal = document.getElementById('modal');
    if (modal) {
      const modalTitle = document.getElementById('modal-title');
      const modalDesc = document.getElementById('modal-desc');
      const closeModalBtn = document.querySelector('.close-modal');
      const openModalButtons = document.querySelectorAll('.open-modal');
      openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const projectCard = e.target.closest('.project-card');
          const title = projectCard.getAttribute('data-title');
          const desc = projectCard.getAttribute('data-desc');
          modalTitle.textContent = title;
          modalDesc.textContent = desc;
          modal.classList.add('active');
        });
      });
      if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
          modal.classList.remove('active');
        });
      }
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
    
    // Formulário de Contato
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        if (name === "" || email === "" || message === "") {
          alert("Por favor, preencha todos os campos.");
          return;
        }
        if (!validateEmail(email)) {
          alert("Por favor, insira um e-mail válido.");
          return;
        }
        alert("Mensagem enviada com sucesso! 🚀");
        contactForm.reset();
      });
    }
    function validateEmail(email) {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email);
    }
  });
  