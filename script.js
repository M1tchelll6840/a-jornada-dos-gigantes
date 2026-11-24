/* ============================================================================
   CHECKOUT — único lugar dos links da Kiwify.
   Troque cada '#' pelo URL completo do produto quando ele existir.
   Exemplo: livro1: 'https://pay.kiwify.com.br/xxxxxxxx'
   Os botões (data-checkout="livro1|livro2|livro3|combo") leem somente daqui.
   Não espalhe links no HTML.
   ============================================================================ */
const CHECKOUT = {
  livro1: '#', // O Reino da Carne — R$ 29,90
  livro2: '#', // O Reino da Alma — R$ 27,90
  livro3: '#', // O Reino do Espírito — R$ 27,90
  combo: '#'   // Trilogia completa — R$ 59,90
};

(function () {
  // Entrada suave. Sem JS, o <noscript> no HTML mantém o texto visível.
  var els = document.querySelectorAll('.reveal,.stagger');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Barra fixa no celular: some sobre o bloco de compra do topo, o combo e o CTA final.
  var sticky = document.getElementById('sticky');
  var watch = ['hero-buy', 'combo', 'cta'].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  if (sticky && watch.length && 'IntersectionObserver' in window) {
    var visible = {};
    var update = function () {
      var any = watch.some(function (el) { return visible[el.id]; });
      var show = !any;
      sticky.classList.toggle('show', show);
      sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
      sticky.tabIndex = show ? 0 : -1;
    };
    watch.forEach(function (el) {
      visible[el.id] = false;
      new IntersectionObserver(function (entries) {
        visible[el.id] = entries[0].isIntersecting;
        update();
      }, { threshold: 0.2 }).observe(el);
    });
  }

  // Compra: href vem do CHECKOUT. InitiateCheckout leva valor e moeda.
  // Não disparar Purchase nesta página — a compra acontece no checkout da Kiwify.
  document.querySelectorAll('[data-checkout]').forEach(function (link) {
    var key = link.getAttribute('data-checkout');
    var url = (CHECKOUT && CHECKOUT[key]) || '#';
    if (url && url !== '#') {
      link.setAttribute('href', url);
    }
    link.addEventListener('click', function (event) {
      var value = parseFloat(link.getAttribute('data-value'));
      var name = link.getAttribute('data-name') || key;
      if (window.fbq && !isNaN(value)) {
        fbq('track', 'InitiateCheckout', {
          value: value,
          currency: 'BRL',
          content_name: name
        });
      }
      if (!url || url === '#') event.preventDefault();
    });
  });
})();
