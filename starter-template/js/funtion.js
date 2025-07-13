// ================== INICIALIZACIÓN DE COMPONENTES ==================

// Inicializa carrusel y autoplay
$(document).ready(function () {
    $('.carousel').carousel();
    setInterval(function () {
        $('.carousel').carousel('next');
    }, 1000);

    // Inicializa parallax de Materialize
    $('.parallax').parallax();

    // Quita la clase 'oculto' al primer parallax-container si existe
    var parallaxCont = document.querySelector('.parallax-container');
    if (parallaxCont) parallaxCont.classList.remove('oculto');
});

// ================== FUNCIONES DE INTERACCIÓN ==================

// Alterna la visibilidad de un texto ocultable
function toggleText(id) {
    var text = document.getElementById(id);
    if (text) text.classList.toggle('visible');
}

// Muestra u oculta un parallax-container por ID
function mostrarParallax(id) {
    var contenedor = document.getElementById(id);
    if (contenedor) contenedor.classList.toggle('oculto');
}

// Animación para el botón "Ver más"
function animarVerMas(element) {
    element.classList.add('ver-mas-animado');
    setTimeout(function () {
        element.classList.remove('ver-mas-animado');
    }, 300);
}

const datosBarras = {
    labels: ['Acuerdo', 'De acuerdo', 'Totalmente acuerdo', 'Totalmente desacuerdo', 'Confiable', 'Importante'],
    datasets: [{
        label: 'Eficiencia',
        data: [6, 7, 9, 5, 3, 8],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }, {
        label: 'Ineficiencia',
        data: [4, 3, 7, 6, 5, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

const datosCircular = {
    labels: ['Ineficiencia', 'Eficiencia'],
    datasets: [{
        data: [30, 70], // Puedes ajustar estos valores como quieras
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',   // Color para Producto A
            'rgba(54, 162, 235, 0.8)'    // Color para Producto B
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 2
    }]
};


// Configuración de los gráficos
const configBarras = {
    type: 'bar',
    data: datosBarras,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Comparación Mensual'
            },
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                enabled: false // 🔴 Esto desactiva el tooltip
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 1,
                max: 10,
                ticks: {
                    stepSize: 1 // para que muestre 1, 2, 3... hasta 10
                }
            }
        }

    },
    plugins: [/* tu plugin de afterDatasetsDraw */]
};


const configCircular = {
    type: 'pie',
    data: datosCircular,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Porcentaje de encuesta.'
            },
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.label + ': ' + context.parsed + '%';
                    }
                }
            }
        }
    }
};

// Variables para almacenar los gráficos
let chartBarras, chartCircular, chartBarras2, chartCircular2;

// Función para mostrar gráficos
function mostrarGrafico(tipo) {
    // Ocultar todos los contenedores
    document.getElementById('contenedor-barras').classList.remove('activo');
    document.getElementById('contenedor-circular').classList.remove('activo');
    document.getElementById('contenedor-ambos').classList.remove('activo');

    // Mostrar el contenedor seleccionado
    if (tipo === 'barras') {
        document.getElementById('contenedor-barras').classList.add('activo');
        if (!chartBarras) {
            chartBarras = new Chart(document.getElementById('graficoBarras'), configBarras);
        }
    } else if (tipo === 'circular') {
        document.getElementById('contenedor-circular').classList.add('activo');
        if (!chartCircular) {
            chartCircular = new Chart(document.getElementById('graficoCircular'), configCircular);
        }
    } else if (tipo === 'ambos') {
        document.getElementById('contenedor-ambos').classList.add('activo');
        if (!chartBarras2) {
            chartBarras2 = new Chart(document.getElementById('graficoBarras2'), configBarras);
        }
        if (!chartCircular2) {
            chartCircular2 = new Chart(document.getElementById('graficoCircular2'), configCircular);
        }
    }
}

// Mostrar gráfico de barras por defecto
window.onload = function () {
    mostrarGrafico('barras');
};