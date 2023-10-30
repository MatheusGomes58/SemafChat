// Função para alternar entre as seções de acordo com a seleção no menu
function toggleSection(sectionId) {
    // Esconda todas as seções
    const sections = document.querySelectorAll("main > section");
    sections.forEach((section) => {
        section.style.display = "none";
    });

    // Mostre a seção correspondente ao ID fornecido
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = "block";
    }
}

toggleSection('chats')