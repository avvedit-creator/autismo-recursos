/* CONFIGURACIÓN DE DONACIONES
   Completar UNA de las dos opciones cuando exista la cuenta de PayPal.
   - paypalMe: el nombre de usuario de PayPal.Me, ej. "Ceautismo"  -> https://www.paypal.me/Ceautismo
   - hostedButtonId: el ID del botón "Donar" creado en PayPal      -> https://www.paypal.com/donate/?hosted_button_id=...
   Mientras ambos estén vacíos, el botón "Donar" del menú y la sección de donaciones permanecen ocultos. */
var DONACIONES = { paypalMe: "", hostedButtonId: "" };

function initDonar(cfg) {
  var url = "";
  if (/^[A-Za-z0-9]{2,60}$/.test(cfg.hostedButtonId || "")) {
    url = "https://www.paypal.com/donate/?hosted_button_id=" + cfg.hostedButtonId;
  } else if (/^[A-Za-z0-9]{2,20}$/.test(cfg.paypalMe || "")) {
    url = "https://www.paypal.me/" + cfg.paypalMe;
  }
  var sec = document.getElementById("donar");
  var nav = document.getElementById("nav-donar");
  var btn = document.getElementById("donar-btn");
  if (nav) nav.hidden = !url;
  if (sec) sec.hidden = !url;
  if (btn && url) btn.href = url;
  return !!url;
}
initDonar(DONACIONES);
