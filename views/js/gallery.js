document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector(".slider");

    // Función para cargar las imágenes desde el endpoint
    function loadImages() {
        fetch('https://mimitos.onrender.com/gallery')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar las imágenes');
                }
                return response.json();
            })
            .then(data => {
                // Limpiamos el slider actual
                slider.innerHTML = '';

                // Recorremos las imágenes recibidas y las agregamos al slider
                data.forEach(image => {
                    const slide = document.createElement('div');
                    slide.className = 'slide';   // testing

                    const img = document.createElement('img');
                    img.src = image.img;
                    img.alt = image.imagetype;

                    slide.appendChild(img);
                    slider.appendChild(slide);
                });

                // Inicializamos el slider después de cargar las imágenes
                initSlider();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Función para inicializar el slider
    function initSlider() {
        const slides = document.querySelectorAll(".slide");
        let index = 0;

        function nextSlide() {
            index++;
            if (index === slides.length) {
                index = 0;
            }
            updateSlidePosition();
        }

        function updateSlidePosition() {
            const slideWidth = slides[index].clientWidth;
            slider.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        setInterval(nextSlide, 5000); // Cambia de slide cada 3 segundos
    }

    // Cargar las imágenes al inicio
    loadImages();
});