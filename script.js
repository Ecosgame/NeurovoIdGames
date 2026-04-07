const openBtn = document.getElementById('openVideoBtn');
const modal = document.getElementById('videoModal');
const closeBtn = document.getElementById('closeBtn');
const video = modal.querySelector('video');

const whatsappBtn = document.getElementById('whatsappBtn');

// Video modal logic (Retained)
openBtn.addEventListener('click', function () {
  modal.classList.add('active');
  video.currentTime = 0;
  video.play();
});

function cerrarVideo() {
  video.pause();
  modal.classList.remove('active');
}

closeBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  cerrarVideo();
});

modal.addEventListener('click', function (e) {
  if (e.target === modal) {
    cerrarVideo();
  }
});

// Close video modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    cerrarVideo();
  }
});

// WhatsApp logic (Retained)
function abrirWhatsApp() {
  const numero = "5215551234567";
  const mensaje = "Hola Neurovoid Games, me interesa su juego ECOS!👾";
  const url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}

whatsappBtn.addEventListener("click", abrirWhatsApp);
// ... busca la configuración de paypal.Buttons en tu script.js ...

paypal.Buttons({
  style: {
    layout: 'horizontal', // Cambiado a horizontal para mejor manejo de campos
    color: 'gold',
    shape: 'pill',
    label: 'paypal',
    height: 48,
    tagline: false // Desactiva el texto extra de PayPal para ahorrar espacio
  },
  
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "MXN",
          value: "100.00"
        }
      }]
    });
  },
  
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('Transacción completada por ' + details.payer.name.given_name + '. ¡Gracias por tu apoyo!');
    });
  }
}).render('#paypal-button-container');