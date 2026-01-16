document.addEventListener("DOMContentLoaded", () => {

    /* ============== MOBILE NAV TOGGLE ============== */
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.querySelector("nav ul");

    if (navToggle && navMenu) {
        navToggle.setAttribute("aria-expanded", "false");

        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            const expanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!expanded));
        });
    }

    /* ============== CONTACT FORM VALIDATION ============== */
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name")?.value.trim();
            const cellphone = document.getElementById("cellphone")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const message = document.getElementById("message")?.value.trim();

            if (!name || !cellphone || !email) {
                alert("Please fill in all required fields.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(cellphone)) {
                alert("Please enter a valid phone number (10–15 digits).");
                return;
            }

            alert(`Thank you, ${name}! We’ll contact you soon at ${email}.`);
            contactForm.reset();
        });
    }

    /* ============== GALLERY LIGHTBOX ============== */
    document.querySelectorAll(".gallery img").forEach(img => {
        img.addEventListener("click", () => {

            const overlay = document.createElement("div");
            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.9);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            `;

            const enlargedImg = document.createElement("img");
            enlargedImg.src = img.src;
            enlargedImg.alt = img.alt;
            enlargedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
                box-shadow: 0 10px 40px rgba(0,0,0,.5);
            `;

            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);

            overlay.addEventListener("click", () => document.body.removeChild(overlay));
        });
    });

    /* ============== SCROLL ANIMATIONS ============== */
    const sections = document.querySelectorAll("section, .card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.6s ease";
        observer.observe(section);
    });

    

    /* ============== SMOOTH SCROLLING ============== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute("href"))?.scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    console.log("✅ All features initialized successfully");

});

/* ============== WINDOW RESIZE HANDLER ============== */
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {

        const navLinks = document.querySelector("nav ul");
        const navToggle = document.getElementById("navToggle");

        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove("active");
            navToggle?.setAttribute("aria-expanded", "false");
        }

    }, 250);
});

// Mobile-optimized map initialization
        document.addEventListener('DOMContentLoaded', function() {
            // Coordinates for 74 Paul Kruger Street, Pretoria Central
            const lat = -25.746111;
            const lng = 28.188889;
            
            // Detect if user is on mobile
            const isMobile = window.innerWidth <= 768;
            
            // Create the map with mobile-optimized settings
            const map = L.map('map', {
                center: [lat, lng],
                zoom: isMobile ? 14 : 15,
                scrollWheelZoom: !isMobile,
                dragging: true,
                tap: true,
                touchZoom: true,
                zoomControl: true,
                attributionControl: true
            });
            
            // Add OpenStreetMap tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
                minZoom: 10
            }).addTo(map);
            
            // Custom marker icon
            const customIcon = L.divIcon({
                html: `
                    <div style="
                        background-color: rgb(37, 132, 163);
                        width: 40px;
                        height: 40px;
                        border-radius: 50% 50% 50% 0;
                        transform: rotate(-45deg);
                        border: 3px solid white;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <i class="fa-solid fa-building" style="
                            color: white;
                            font-size: 18px;
                            transform: rotate(45deg);
                        "></i>
                    </div>
                `,
                className: 'custom-marker',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            });
            
            // Add marker
            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
            
            // Popup content
            const popupContent = `
                <div style="text-align: center; padding: 0.5rem;">
                    <strong style="color: rgb(37, 132, 163); font-size: 16px;">J & B Construction</strong><br>
                    <p style="margin: 0.5rem 0; font-size: 14px;">
                        74 Paul Kruger Street<br>
                        Pretoria Central, 0001
                    </p>
                    <p style="margin: 0.5rem 0; font-size: 13px;">
                        📞 (+27) 69 719 3308<br>
                        📧 info@jbconstruction.com
                    </p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=-25.746111,28.188889" 
                       target="_blank" 
                       style="
                           display: inline-block;
                           margin-top: 0.5rem;
                           padding: 0.5rem 1rem;
                           background-color: rgb(37, 132, 163);
                           color: white;
                           text-decoration: none;
                           border-radius: 4px;
                           font-size: 13px;
                       ">
                        Get Directions
                    </a>
                </div>
            `;
            
            marker.bindPopup(popupContent, {
                maxWidth: 250,
                className: 'custom-popup'
            }).openPopup();
            
            // Add circle around location
            L.circle([lat, lng], {
                color: 'rgb(37, 132, 163)',
                fillColor: 'rgba(37, 132, 163, 0.2)',
                fillOpacity: 0.3,
                radius: 100
            }).addTo(map);
            
            // Responsive resize
            let resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    map.invalidateSize();
                    const newIsMobile = window.innerWidth <= 768;
                    if (newIsMobile !== isMobile) {
                        map.setZoom(newIsMobile ? 14 : 15);
                    }
                }, 200);
            });
            
            // Add scale control
            L.control.scale({
                imperial: false,
                metric: true,
                position: 'bottomleft'
            }).addTo(map);
            
            console.log('Mobile-optimized map loaded successfully');
        });