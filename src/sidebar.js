document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebarToggle");
    const overlay = document.getElementById("sidebarOverlay");

    const isMobile = () => window.innerWidth <= 768;

    function openSidebar() {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (isMobile()) {
            sidebar.classList.contains("active")
                ? closeSidebar()
                : openSidebar();
        } else {
            sidebar.classList.toggle("collapsed");
        }
    });

    overlay.addEventListener("click", closeSidebar);

    window.addEventListener("resize", () => {
        if (!isMobile()) {
            closeSidebar();
        }
    });
});
