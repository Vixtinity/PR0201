const range = document.getElementById('valorar');
const valor = document.getElementById('valor-range');

range.addEventListener('input', () => {
    valor.textContent = range.value;
});

function validaciones() {
    const contra = document.getElementById('contraseña').value;
    const confirmar = document.getElementById('confirmarcontra').value;
    const confirmada = document.getElementById('confirmada');

    if (contra === confirmar) {
        confirmada.textContent = "CONTRASEÑA CORRECTA";
        confirmada.style.color = "green";
    } else {
        confirmada.textContent = "LAS CONTRASEÑAS NO COINCIDEN";
        confirmada.style.color = "red";
    }

}
