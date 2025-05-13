window.addEventListener("DOMContentLoaded", () => {
const modal = document.getElementById("modalEncuesta");

if (!sessionStorage.getItem("modalSatisfaccionMostrado")) {
setTimeout(() => {
modal.style.display = "block";
sessionStorage.setItem("modalSatisfaccionMostrado", "true");
}, 3000);
}

document.getElementById("formEncuesta").addEventListener("submit", function (e) {
e.preventDefault();
Swal.fire({
icon: "success",
title: "¡Gracias!",
text: "Tu opinión nos ayuda a mejorar.",
confirmButtonColor: "#0d6efd"
});
cerrarModal();
});
});

function cerrarModal() {
document.getElementById("modalEncuesta").style.display = "none";
}

