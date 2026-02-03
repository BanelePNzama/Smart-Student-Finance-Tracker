document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebarToggle");
    const overlay = document.getElementById("sidebarOverlay");
    const innerToggle = document.getElementById("sidebarInnerToggle");
    const sections = document.querySelectorAll(".section");

    // Safety check
    if (!sidebar || !toggleBtn) {
        console.error("Sidebar elements missing");
        return;
    }

    toggleBtn.classList.add("open");

    // Sidebar toggle button
   toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });

    // Overlay click closes sidebar
    overlay.addEventListener("click", () => {
        sidebar.classList.add("hidden");
        toggleBtn.classList.remove("open");
        toggleBtn.classList.add("closed");
        overlay.style.display = "none";
    });

    // Inner toggle button
   if (innerToggle) {
    innerToggle.addEventListener("click", (e) => {
        e.stopPropagation(); 
        sidebar.classList.toggle("collapsed");
    });
}

    function showSection(id) {
        sections.forEach(sec => sec.style.display = "none");
        document.getElementById(id).style.display = "block";
    }

    document.getElementById("homeSection")?.addEventListener("click", () => showSection("homeSection"));
    document.getElementById("dashboardSection")?.addEventListener("click", () => showSection("dashboardSection"));
    document.getElementById("incomeExpenseSection")?.addEventListener("click", () => showSection("incomeExpenseSection"));
    document.getElementById("reportsSection")?.addEventListener("click", () => showSection("reportsSection"));

    
});
