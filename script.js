// Entrance observer
    const container = document.getElementById('cardContainer');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) container.classList.add('in-view');
      });
    }, { threshold: 0.1 });
    observer.observe(container);

    // Theme toggle
    const toggle = document.getElementById('themeToggle');
    const sunIcon = '<i class="fas fa-sun"></i>';
    const moonIcon = '<i class="fas fa-moon"></i>';
    toggle.addEventListener('click', () => {
      const root = document.documentElement;
      const isLight = root.getAttribute('data-theme') === 'light';
      root.setAttribute('data-theme', isLight ? 'dark' : 'light');
      toggle.innerHTML = isLight ? moonIcon : sunIcon;
    });

    // 3D tilt effect
    const card = document.getElementById('cardInner');
    container.addEventListener('mousemove', e => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      card.style.transform = `rotateY(${x/20}deg) rotateX(${-y/20}deg)` + (card.classList.contains('flipped') ? ' rotateY(180deg)' : '');
    });
    container.addEventListener('mouseleave', () => {
      if(!card.classList.contains('flipped')) card.style.transform = 'rotateY(0) rotateX(0)';
    });

    // QR & barcode renderer
    function renderCodes(text) {
      document.getElementById('qrcode').innerHTML = '';
      new QRCode(document.getElementById('qrcode'), { text, width:90, height:90, colorLight:"#075E54", colorDark:"#fff" });
      JsBarcode("#barcode", text.replace(/\D/g,''), { format:"CODE128", lineColor:"#fff", width:2, height:50, displayValue:false });
    }
    renderCodes("https://wa.me/525943156733");
    document.getElementById('updateBtn').onclick = () => {
      const newVal = prompt("Enter new WhatsApp URL or number","https://wa.me/525943156733");
      if(newVal) renderCodes(newVal);
    };

    // Flip controls
    const moreInfo = document.getElementById('moreInfoBtn');
    const backBtn = document.getElementById('backBtn');
    const inner = document.getElementById('cardInner');
    moreInfo.onclick = () => inner.classList.add('flipped');
    backBtn.onclick = () => inner.classList.remove('flipped');

    // Accessibility: allow Enter on focus
    [toggle, moreInfo, backBtn].forEach(el => el.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') el.click();
    }));
