const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

if (window.innerWidth < 768) {
    sidebar.style.transform = "translateX(-260px)";
    sidebar.style.transition = "transform 0.3s ease";
}

function openSidebar() {
    sidebar.style.transform = "translateX(0)";
    sidebarOverlay.style.display = "block";
    document.body.style.overflow = "hidden"; 
}

function closeSidebar() {
    sidebar.style.transform = "translateX(-260px)";
    sidebarOverlay.style.display = "none";
    document.body.style.overflow = "auto"; 
}

sidebarToggle.addEventListener("click", openSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        sidebar.style.transform = "translateX(0)";
        sidebarOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    } else {
        sidebar.style.transform = "translateX(-260px)";
    }
});
