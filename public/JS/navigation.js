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

// Adicione um evento de clique a cada item de menu para alternar as seções
const menuItems = document.querySelectorAll("nav ul li a");
menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (event) => {
        event.preventDefault(); // Impede a ação padrão do link
        const sectionId = event.target.getAttribute("href").substring(1); // Obtém o ID da seção
        toggleSection(sectionId);
    });
});

// Inicialmente, exiba a primeira seção (Chats) como padrão
toggleSection("chats");