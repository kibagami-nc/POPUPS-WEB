document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Remove the delayed transition after the reveal animation is done 
                // to allow hover effects (border color) to be immediate.
                setTimeout(() => {
                    entry.target.style.transition = '';
                }, 1200);

                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target bento items and tip cards
    const revealElements = document.querySelectorAll('.bento-item, .tip-card, h2');
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1 % 0.4}s`;
        revealObserver.observe(el);
    });

    // 2. Interactive Tooltip Logic
    const tooltip = document.getElementById('cursor-tooltip');
    const bentoItems = document.querySelectorAll('.bento-item');
    const meshBlob = document.querySelector('.mesh-blob');

    document.addEventListener('mousemove', (e) => {
        // Position the tooltip with a small offset
        tooltip.style.left = `${e.clientX}px`;
        tooltip.style.top = `${e.clientY}px`;

        // Also update background blob (existing logic merged here)
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        meshBlob.style.left = `${50 + (x - 10)}%`;
        meshBlob.style.top = `${50 + (y - 10)}%`;
    });

    bentoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const definition = item.getAttribute('data-definition');
            if (definition) {
                tooltip.textContent = definition;
                tooltip.classList.add('visible');
            }
        });

        item.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });

    // 3. Smooth internal linking
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log("%c[OBSIDIAN-SENTINEL] System Online. Narrative Ready.", "color:#00f2ff; font-weight:bold;");
});
