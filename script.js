/ Formula 1 Race Intelligence Dashboard — Yashda Khire
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const tableauFrame = document.getElementById("tableauFrame");
    const embedFallback = document.getElementById("embedFallback");
    // Mobile navigation
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.textContent = "☰";
            });
        });
    }
    // Highlight navigation based on the visible section
    const sections = document.querySelectorAll("main section[id]");
    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navItems.forEach((link) => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${entry.target.id}`
                            );
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );
        sections.forEach((section) => sectionObserver.observe(section));
    }
    // Load the Tableau dashboard when its section approaches the viewport
    if (tableauFrame) {
        const loadTableau = () => {
            if (!tableauFrame.src) {
                tableauFrame.src = tableauFrame.dataset.src;
            }
        };
        if ("IntersectionObserver" in window) {
            const frameObserver = new IntersectionObserver(
                (entries) => {
                    if (entries.some((entry) => entry.isIntersecting)) {
                        loadTableau();
                        frameObserver.disconnect();
                    }
                },
                {
                    rootMargin: "250px"
                }
            );
            frameObserver.observe(tableauFrame);
        } else {
            loadTableau();
        }
        tableauFrame.addEventListener("load", () => {
            if (embedFallback) {
                embedFallback.style.display = "none";
            }
        });
    }
    // Smooth scrolling for internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});
