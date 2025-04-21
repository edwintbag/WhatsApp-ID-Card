    // 3D tilt effect
    const card = document.getElementById('card');
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      card.style.transform = `perspective(1000px) rotateY(${x/20}deg) rotateX(${-y/20}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
    // QR & barcode renderer
    function renderCodes(text) {
      document.getElementById('qrcode').innerHTML = '';
      new QRCode(document.getElementById('qrcode'), {
        text: text,
        width: 90,
        height: 90,
        colorLight: "#075E54",
        colorDark: "#fff",
      });
      JsBarcode("#barcode", text.replace(/\D/g,''), {
        format: "CODE128",
        lineColor: "#fff",
        width: 2,
        height: 50,
        displayValue: false
      });
    }
    renderCodes("https://wa.me/525943156733");
    document.getElementById('updateBtn').onclick = () => {
      const newNum = prompt("Enter new WhatsApp URL or number","https://wa.me/525943156733");
      if(newNum) renderCodes(newNum);
    };