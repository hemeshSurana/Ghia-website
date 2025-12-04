// --------------------------------------
// Load Header + Footer
// --------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    // Load Header
    fetch("./components/header.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("header").innerHTML = html;

            // INIT MOBILE MENU AFTER HEADER LOADED
            initMobileMenu();
        });

    // Load Footer
    fetch("./components/footer.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("footer").innerHTML = html;
        });
});
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) return;

    // Ensure menu is hidden initially
    mobileMenu.classList.add('hidden');

    // Toggle main mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        // Change icon
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.replace('fa-xmark', 'fa-bars');
        } else {
            icon.classList.replace('fa-bars', 'fa-xmark');
        }
    });

    // Toggle submenus
    document.querySelectorAll('[data-mobile-dropdown]').forEach(button => {
        const targetId = button.getAttribute('data-mobile-dropdown');
        const targetMenu = document.getElementById(targetId + '-mobile-menu');
        const arrow = button.querySelector('span');

        if (!targetMenu) return;
        // Ensure submenus are hidden initially
        targetMenu.classList.add('hidden');
        arrow.innerHTML = '▶';

        button.addEventListener('click', () => {
            targetMenu.classList.toggle('hidden');
            arrow.innerHTML = targetMenu.classList.contains('hidden') ? '▶' : '▼';
        });
    });

    // Close menu on desktop resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            mobileMenu.classList.add('hidden');

            document.querySelectorAll('#mobile-menu ul.ml-4')
                .forEach(el => el.classList.add('hidden'));

            document.querySelectorAll('[data-mobile-dropdown] span')
                .forEach(a => a.innerHTML = '▶');

            // Reset mobile menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-xmark')) {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        }
    });
}
