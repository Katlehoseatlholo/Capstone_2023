document.addEventListener('DOMContentLoaded', function () {
    var olvidado = document.getElementById('olvidado');
    var acceso = document.getElementById('acceso');
    var formOlvidado = document.getElementById('form-olvidado');

    function toggleFormOlvidado() {
        if (formOlvidado.style.display === 'block') {
            formOlvidado.style.display = 'none';
        } else {
            formOlvidado.style.display = 'block';
        }
    }

    olvidado.addEventListener('click', function (e) {
        e.preventDefault();
        toggleFormOlvidado();
    });

    acceso.addEventListener('click', function (e) {
        e.preventDefault();
        toggleFormOlvidado();
    });
});