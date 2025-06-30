// ===============================================================
//       SCRIPT PARA FUNCIONALIDADES ADICIONALES Y MEJORAS
// ===============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ===========================================================
    // 1. Funcionalidad de FAQ (Expandir/Contraer preguntas)
    // ===========================================================
    const faqItems = document.querySelectorAll('.faq-item h3');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const faqContent = item.nextElementSibling; // El párrafo que sigue al h3
            const faqItemContainer = item.parentElement; // El div del faq-item

            // Cierra todos los demás FAQs (para que solo uno esté abierto a la vez)
            document.querySelectorAll('.faq-item').forEach(otherFaq => {
                if (otherFaq !== faqItemContainer) {
                    otherFaq.classList.remove('active');
                    const otherContent = otherFaq.querySelector('p');
                    otherContent.style.maxHeight = null;
                    otherContent.style.paddingTop = null;
                }
            });

            // Alterna la clase 'active' para este FAQ
            faqItemContainer.classList.toggle('active');

            // Ajusta la altura máxima del contenido para la animación de slide
            if (faqItemContainer.classList.contains('active')) {
                faqContent.style.maxHeight = faqContent.scrollHeight + "px";
                faqContent.style.paddingTop = "15px";
            } else {
                faqContent.style.maxHeight = null;
                faqContent.style.paddingTop = "0";
            }
        });
    });

    // ===========================================================
    // 2. Funcionalidad de Modales (Productos y Negocio)
    // ===========================================================

    // Referencias a los modales y botones de cierre
    const productModal = document.getElementById('productModal');
    const businessModal = document.getElementById('businessModal');
    const closeButtons = document.querySelectorAll('.modal .close-button, .modal .close-button-bottom');

    // Botones para abrir modales
    const openProductModalButtons = document.querySelectorAll('.open-product-modal');
    const openBusinessModalButton = document.querySelector('.open-business-modal');

    // Elementos del modal de producto para rellenar
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductTitle = document.getElementById('modal-product-title');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductBenefits = document.getElementById('modal-product-benefits');
    const modalProductImages = document.getElementById('modal-product-ingredients');
    const modalProductWhatsapp = document.getElementById('modal-product-whatsapp');

    // Datos de los productos (puedes expandir esto con más detalles)
    const productsData = {
        xigray: {
            image: 'imag/xigray_resized_280x200.jpg',
            title: 'Xi Gray',
            description: 'Xi Gray es una deliciosa bebida funcional formulada para promover una digestión saludable y un tránsito intestinal regular. Sus ingredientes naturales te ayudan a sentirte ligero y revitalizado.',
            benefits: 'Beneficios clave: Mejora la digestión, apoya el tránsito intestinal, contribuye a la eliminación de toxinas.',
            ingredients: 'Ingredientes principales: Extracto de kiwi, fibra prebiótica, mix de vitaminas.',
            whatsapp: 'https://wa.me/51922836879?text=Hola%2C%20me%20interesa%20el%20producto%20Xi%20Gray.'
        },
        onplus: {
            image: 'imag/onplus_resized_280x200.jpg',
            title: 'On+',
            description: 'On+ es la bebida energética natural que necesitas para potenciar tu día. Su combinación de ingredientes te brinda energía sostenida sin los efectos indeseados de las bebidas artificiales.',
            benefits: 'Beneficios clave: Aumento de energía y vitalidad, mejora del enfoque y concentración, reducción de la fatiga.',
            ingredients: 'Ingredientes principales: Guaraná, extracto de té verde, vitaminas del complejo B.',
            whatsapp: 'https://wa.me/51922836879?text=Hola%2C%20me%20interesa%20el%20producto%20On%2B.'
        },
        vitaxtrat: {
            image: 'imag/vitaxtrat_resized_280x200.jpg',
            title: 'Vita XTRA-T',
            description: 'Vita XTRA-T es tu aliado para fortalecer el sistema inmunológico y mantenerte con vitalidad. Una potente mezcla de vitaminas, minerales y extractos naturales para tu defensa diaria.',
            benefits: 'Beneficios clave: Fortalece defensas, aumenta la energía, mejora el bienestar general.',
            ingredients: 'Ingredientes principales: Vitamina C, Zinc, extracto de acerola, resveratrol.',
            whatsapp: 'https://wa.me/51922836879?text=Hola%2C%20me%20interesa%20el%20producto%20Vita%20XTRA-T.'
        },
        bioprotect: {
            image: 'imag/bioprotect_resized_280x200.jpg',
            title: 'Bioprotect',
            description: 'Bioprotect es una proteína de alto valor biológico que apoya el sistema inmunológico y la regeneración celular. Ideal para mantener la masa muscular y nutrir tu cuerpo a profundidad.',
            benefits: 'Beneficios clave: Fortalece el sistema inmune, ayuda a la recuperación muscular, promueve la salud ósea.',
            ingredients: 'Ingredientes principales: Proteína de suero lácteo, calostro bovino, aminoácidos.',
            whatsapp: 'https://wa.me/51922836879?text=Hola%2C%20me%20interesa%20el%20producto%20Bioprotect.'
        },
        termot3: {
            image: 'imag/termot3_resized_280x200.jpg',
            title: 'Termo T3',
            description: 'Termo T3 es un termogénico natural diseñado para ayudarte en el control de peso. Activa tu metabolismo y contribuye a la quema de grasa de forma efectiva.',
            benefits: 'Beneficios clave: Ayuda a quemar grasa, acelera el metabolismo, contribuye al control de peso.',
            ingredients: 'Ingredientes principales: Extracto de té verde, té rojo, cetonas de frambuesa, L-carnitina.',
            whatsapp: 'https://wa.me/51922836879?text=Hola%2C%20me%20interesa%20el%20producto%20Termo%20T3.'
        },
        floraliv: {
            image: 'imag/floraliv_resized_280x200.jpg',
            title: 'Flora Liv',
            description: 'Flora Liv es una bebida probiótica que ayuda a restaurar y mantener el equilibrio de tu flora intestinal. Esencial para una digestión óptima y la absorción de nutrientes.',
            benefits: 'Beneficios clave: Mejora la salud intestinal, fortalece el sistema inmune, optimiza la digestión.',
            ingredients: 'Ingredientes principales: Probióticos (Lactobacillus, Bifidobacterium), fibra prebiótica, mix de vitaminas.',
            whatsapp: 'https://wa.me/51922836879?text=Hola%2C%20me%20interesa%20el%20producto%20Flora%20Liv.'
        }
        // Agrega más productos aquí si es necesario
    };

    // Función para abrir un modal específico
    function openModal(modalElement, productID = null) {
        if (productID && productsData[productID]) {
            const data = productsData[productID];
            modalProductImage.src = data.image;
            modalProductTitle.textContent = data.title;
            modalProductDescription.textContent = data.description;
            modalProductBenefits.textContent = data.benefits;
            modalProductImages.textContent = data.ingredients;
            modalProductWhatsapp.href = data.whatsapp;
        }
        modalElement.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    }

    // Función para cerrar un modal
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll de fondo
    }

    // Event listeners para abrir el modal de producto
    openProductModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            openModal(productModal, productId);
        });
    });

    // Event listener para abrir el modal de negocio
    if (openBusinessModalButton) {
        openBusinessModalButton.addEventListener('click', () => {
            openModal(businessModal);
        });
    }

    // Event listeners para cerrar modales
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(productModal); // Intenta cerrar ambos por si acaso, solo uno estará visible
            closeModal(businessModal);
        });
    });

    // Cerrar modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            closeModal(productModal);
        }
        if (event.target === businessModal) {
            closeModal(businessModal);
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal(productModal);
            closeModal(businessModal);
        }
    });

    // ===========================================================
    // 3. Animación al hacer Scroll (Intersection Observer)
    // ===========================================================
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        threshold: 0.1 // Cuando el 10% del elemento sea visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Dejar de observar una vez que ha animado
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

});