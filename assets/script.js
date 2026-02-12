document.addEventListener("DOMContentLoaded", () => {

    document.title = CONFIG.gymName;
    document.getElementById("gymTitle").innerText = CONFIG.gymName;
    document.getElementById("gymName").innerText = CONFIG.gymName;

    // LOGO + NOMBRE suben al inicio al hacer clic
    document.querySelector('.header-brand').addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Suave
        });
    });

    document.getElementById("heroTitle").innerText = CONFIG.hero.title;
    document.getElementById("heroSubtitle").innerText = CONFIG.hero.subtitle;

    document.getElementById("aboutText").innerText = CONFIG.about;

    document.getElementById("phone").innerText = CONFIG.phone;
    document.getElementById("email").innerText = CONFIG.email;
    document.getElementById("hours").innerText = CONFIG.openHours;

    document.getElementById("instaBtn").href = CONFIG.social.instagram;
    document.getElementById("fbBtn").href = CONFIG.social.facebook;

    // Footer icons
    //document.getElementById("instaBtnFooter").href = CONFIG.social.instagram;
    //document.getElementById("fbBtnFooter").href = CONFIG.social.facebook;


    /* GOOGLE MAPS */

    document.getElementById("gymAddress").innerText =
        CONFIG.location.address;

    document.getElementById("mapFrame").src =
        CONFIG.location.googleMapsEmbed;

    document.getElementById("footerText").innerText =
        `© ${new Date().getFullYear()} ${CONFIG.gymName}`;


    document.getElementById("openMapsBtn").href =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.location.address)}`;

    /* CONTACT CTA */
    document.getElementById("ctaContact").href =
        `mailto:${CONFIG.email}`;


    /* WHATSAPP */
    document.getElementById("whatsappBtn").href =
        `https://wa.me/${CONFIG.whatsapp.replace("+", "")}`;


    /* SERVICES */
    CONFIG.services.forEach(service => {
        document.getElementById("servicesContainer").innerHTML += `
        <div class="card">
            <img src="${service.image}">
            <div class="card-content">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        </div>`;
    });


    /* ACHIEVEMENTS */
    CONFIG.achievements.forEach(a => {
        document.getElementById("achievementsContainer").innerHTML += `
        <div class="card">
            <div class="card-content">
                <h3>${a.title}</h3>
                <p>${a.description}</p>
            </div>
        </div>`;
    });


    /* GALLERY */
    CONFIG.gallery.forEach(img => {
        document.getElementById("galleryContainer").innerHTML +=
            `<img src="${img}" loading="lazy">`;
    });

    // MODAL ZOOM GALERÍA - VERSIÓN CORREGIDA
    function createGalleryModal() {
        const galleryModal = document.createElement('div');
        galleryModal.className = 'gallery-modal';
        galleryModal.innerHTML = `
    <span class="close-modal">&times;</span>
    <img class="modal-img" src="" alt="Foto ampliada">
  `;
        document.body.appendChild(galleryModal);
        return galleryModal;
    }

    // Crear modal
    const galleryModal = createGalleryModal();

    // Event listeners CORRECTOS
    document.addEventListener('click', function (e) {
        const gallery = document.querySelector('#galleryContainer');

        // ✅ CLICK EN IMAGEN de GALERÍA
        if (e.target.parentNode === gallery || e.target === gallery) {
            const img = e.target.closest('img');
            if (img && img.src) {
                galleryModal.querySelector('.modal-img').src = img.src;
                galleryModal.style.display = 'flex';
                return;
            }
        }

        // ✅ CLICK FUERA o X = CERRAR
        if (e.target === galleryModal || e.target.classList.contains('close-modal')) {
            galleryModal.style.display = 'none';
        }
    });

    // ESC para cerrar
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && galleryModal.style.display === 'flex') {
            galleryModal.style.display = 'none';
        }
    });


    /* ANIMACIONES */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting)
                entry.target.classList.add("visible");
        });
    });

    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

    function renderScheduleBlocks() {
        const container = document.getElementById('scheduleBlocks');
        let html = '';

        const dayNames = CONFIG.schedule.days.slice(1); // Sin "Hora"
        const slots = CONFIG.schedule.slots;

        dayNames.forEach((day, dayIndex) => {
            html += `<div class="schedule-day">
      <div class="day-header">${day}</div>`;

            slots.forEach(slot => {
                const className = slot.classes[dayIndex]; // +1 por "Hora"
                if (className) {
                    const classCss = `class-${className.toLowerCase().replace(/ /g, '-')}`;
                    html += `
          <div class="schedule-slot">
            <span class="time-badge">${slot.time}</span>
            <div class="${classCss} class-block">${className}</div>
          </div>`;
                }
            });

            html += `</div>`;
        });

        container.innerHTML = html;
    }

    // Llamar nueva función
    renderScheduleBlocks();

    // MENÚ HAMBURGUESA
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    mobileMenuBtn.addEventListener('click', function () {
        mainNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');

        // Prevenir scroll body cuando menú abierto
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    // CERRAR MENÚ al hacer clic en enlace
    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // CERRAR al hacer clic fuera
    document.addEventListener('click', function (e) {
        if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mainNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });


});
