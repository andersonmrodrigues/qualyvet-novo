/* Qualyvet — main.js */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky header shadow ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Nav hamburger toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    // Close on link click
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // --- Article filter (artigos/index.html) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card[data-cat]');
  if (filterBtns.length && articleCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        articleCards.forEach(card => {
          card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

  // --- FAQ Accordion ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isActive = item.classList.contains('active');
        
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // --- Calculator (if exists) ---
  const calcBtn = document.getElementById('calc-btn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const employees = parseInt(document.getElementById('employees').value) || 0;
      const nonConformities = parseInt(document.getElementById('nonConformities').value) || 0;
      const avgCost = parseInt(document.getElementById('avgCost').value) || 0;
      
      const totalCost = nonConformities * avgCost * 12;
      const savingsWith76Reduction = totalCost * 0.76;
      
      document.getElementById('calc-result').innerHTML = `
        <div class="calc-result-value">R$ ${savingsWith76Reduction.toLocaleString('pt-BR')}</div>
        <div class="calc-result-label">Economia anual potencial com redução de 76% em não conformidades</div>
        <p style="margin-top:16px;font-size:14px;opacity:0.9;">
          Custo atual estimado: R$ ${totalCost.toLocaleString('pt-BR')}/ano<br>
          Com nossa consultoria: R$ ${(totalCost - savingsWith76Reduction).toLocaleString('pt-BR')}/ano
        </p>
        <a href="https://wa.me/5551998658690?text=Olá! Fiz a calculadora de ROI e quero saber mais." class="btn btn-whatsapp" style="margin-top:24px;">
          <i class="fab fa-whatsapp"></i> Solicitar proposta personalizada
        </a>
      `;
    });
  }

  // --- Quiz (if exists) ---
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizSubmit = document.getElementById('quiz-submit');
  let quizAnswers = [];
  
  if (quizOptions.length) {
    quizOptions.forEach(option => {
      option.addEventListener('click', () => {
        const question = option.closest('.quiz-question-group');
        question.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        const questionId = question.dataset.question;
        const answer = option.dataset.value === 'yes';
        quizAnswers[questionId] = answer;
      });
    });
  }
  
  if (quizSubmit) {
    quizSubmit.addEventListener('click', () => {
      const score = quizAnswers.filter(a => a === true).length;
      const total = quizAnswers.length;
      const percentage = Math.round((score / total) * 100);
      
      let recommendation = '';
      let color = '';
      
      if (percentage >= 80) {
        recommendation = '<strong>Excelente!</strong> Seu estabelecimento está bem preparado. Considere nosso acompanhamento preventivo para manter o padrão.';
        color = 'var(--color-primary)';
      } else if (percentage >= 50) {
        recommendation = '<strong>Atenção!</strong> Há pontos críticos que precisam de ajuste urgente. Recomendamos diagnóstico completo.';
        color = '#f59e0b';
      } else {
        recommendation = '<strong>Risco alto!</strong> Seu estabelecimento pode ser autuado. Agende consultoria emergencial imediatamente.';
        color = '#dc2626';
      }
      
      document.getElementById('quiz-result').innerHTML = `
        <div class="calc-result-value" style="background:${color};">${percentage}%</div>
        <div class="calc-result-label">Prontidão para auditoria MAPA</div>
        <p style="margin-top:16px;font-size:14px;opacity:0.9;">
          ${recommendation}
        </p>
        <a href="https://wa.me/5551998658690?text=Olá! Fiz o quiz de prontidão e meu score foi ${percentage}%. Preciso de ajuda!" class="btn btn-whatsapp" style="margin-top:24px;">
          <i class="fab fa-whatsapp"></i> Falar com especialista
        </a>
      `;
      document.getElementById('quiz-result').style.background = color;
    });
  }

});
