document.addEventListener('DOMContentLoaded', function() {

    // --- Toggle Menú Móvil ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('.nav-link'); // Obtener todos los enlaces del menú

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Para animar la hamburguesa

            // Accesibilidad: Actualizar aria-expanded
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // --- Cerrar menú al hacer clic en un enlace (para SPA-like behavior) ---
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

         // --- Cerrar menú si se hace clic fuera de él ---
         document.addEventListener('click', (event) => {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                 navMenu.classList.remove('active');
                 menuToggle.classList.remove('active');
                 menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Opcional: Smooth Scroll para todos los enlaces internos ---
    // (Asegúrate de que el `scroll-behavior: smooth;` en CSS esté funcionando,
    // esto es un fallback o para mayor control si es necesario)
    /*
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Considerar altura del header fijo si tienes uno
                const headerOffset = document.querySelector('.header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Cerrar menú móvil si está abierto después del scroll (ligero retraso)
                setTimeout(() => {
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }, 300); // Ajusta el tiempo si es necesario
            }
        });
    });
    */

    // --- Opcional: Validación simple del formulario de contacto ---
    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            let errors = [];

            if (name === '') {
                isValid = false;
                errors.push('El nombre es obligatorio.');
                // Podrías añadir una clase de error al input aquí
            }
            if (email === '' || !/^\S+@\S+\.\S+$/.test(email)) {
                isValid = false;
                errors.push('Por favor, introduce un correo electrónico válido.');
                // Podrías añadir una clase de error al input aquí
            }
             if (subject === '') {
                isValid = false;
                errors.push('El asunto es obligatorio.');
            }
            if (message === '') {
                isValid = false;
                errors.push('El mensaje no puede estar vacío.');
                // Podrías añadir una clase de error al input aquí
            }

            if (!isValid) {
                e.preventDefault(); // Prevenir el envío del formulario
                alert('Por favor, corrija los siguientes errores:\n\n' + errors.join('\n'));
                // Aquí podrías mostrar los errores de forma más elegante en la UI
            }
            // Si es válido, el formulario se enviará normalmente al 'action' especificado.
            // Necesitarás un script en el servidor (procesar_formulario.php) para manejar los datos.
        });
    }

    // --- Opcional: Resaltar enlace de navegación activo al hacer scroll ---
    // (Este es un ejemplo básico, puede requerir ajustes)
    const sections = document.querySelectorAll('main section[id]');
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

    function setActiveLink() {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + headerHeight + 50; // Añade un offset para activar antes

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Quita la clase active de todos
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${currentSectionId}`) {
                link.classList.add('active'); // Añade active al enlace correspondiente
            }
        });

         // Caso especial para el inicio si está muy arriba
         if (window.pageYOffset < sections[0].offsetTop - headerHeight - 50) {
             navLinks.forEach(link => link.classList.remove('active'));
             const homeLink = document.querySelector('.nav-link[href="#inicio"]');
             if(homeLink) homeLink.classList.add('active');
         }
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Llama una vez al cargar la página


}); // Fin DOMContentLoaded
