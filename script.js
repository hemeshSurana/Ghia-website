// --------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    // Load Header
    fetch("./components/header.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("header").innerHTML = html;

            // INIT MENU AFTER HEADER LOADED
            initMobileMenu();
        });

    // Load Footer
    fetch("./components/footer.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("footer").innerHTML = html;
        });
});


// --------------------------------------
// Mobile Menu Logic
// --------------------------------------
function initMobileMenu() {

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Mobile Dropdown Toggle
    const dropdownButtons = document.querySelectorAll('[data-mobile-dropdown]');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-mobile-dropdown');
            const targetMenu = document.getElementById(targetId + '-mobile-menu');
            const arrow = button.querySelector('span');

            if (targetMenu) {
                targetMenu.classList.toggle('hidden');
                arrow.innerHTML = targetMenu.classList.contains('hidden') ? '▶' : '▼';
            }
        });
    });

    // Close menu on desktop mode
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');

                // Hide submenus
                document.querySelectorAll('#mobile-menu ul.ml-4')
                    .forEach(el => el.classList.add('hidden'));

                // Reset arrows
                document.querySelectorAll('[data-mobile-dropdown] span')
                    .forEach(a => a.innerHTML = '▶');
            }
        }
    });
}

