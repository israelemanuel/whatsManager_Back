function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Função para alternar entre os modos de alto-contraste
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast ? 'enabled' : 'disabled');
}

// Função para alternar sublinhado
function toggleUnderline() {
    const elements = document.querySelectorAll('span, a, li');
    elements.forEach(element => {
        if (element.style.textDecoration === 'underline') {
            element.style.textDecoration = 'none';
        } else {
            element.style.textDecoration = 'underline';
        }
    });
}

// Função para alternar a visibilidade do menu
function toggleMenu() {
    const body = document.getElementById('innerBody');
    const matMenu = document.querySelector('.mat-menu');
    if (matMenu) {
        matMenu.classList.toggle('show');
        body.classList.toggle('overflow-hidden');
    }
}

// Função para remover a classe 'show' do mat-menu
function hideMenu() {
    const body = document.getElementById('innerBody');
    const matMenus = document.querySelectorAll('.mat-menu');
    matMenus.forEach(matMenu => {
        matMenu.classList.remove('show');
    });
    body.classList.remove('overflow-hidden');
}

// Função para ajustar o tamanho da fonte
function adjustFontSize(increment) {
    const rootElement = document.documentElement;
    const defaultFontSize = 100; // Tamanho padrão da fonte em porcentagem
    let currentFontSize = parseInt(rootElement.style.fontSize) || defaultFontSize;
    if (increment === 100) {
        currentFontSize = defaultFontSize;
    } else {
        currentFontSize += increment;
    }
    rootElement.style.fontSize = currentFontSize + "%";
}

// Função para carregar as preferências do usuário do localStorage
function loadUserPreferences() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    const highContrast = localStorage.getItem('highContrast');
    if (highContrast === 'enabled') {
        document.body.classList.add('high-contrast');
        document.body.classList.remove('dark-mode'); // Garantir que o modo escuro esteja desativado
    }
}

// Inicializar as funções ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    loadUserPreferences();
    
});