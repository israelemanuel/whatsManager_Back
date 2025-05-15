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

    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#header", {
        backgroundColor:  "var(--mat-sys-surface)", // Altera a cor de fundo
        duration: 0.5, // Duração da transição
        scrollTrigger: {
            trigger: "#header", // Elemento que ativa a animação
            start: "top top", // Inicia quando o topo do header atinge o topo da viewport
            scrub: false, // Sincroniza a animação com o scroll
            markers: false,   // Mostra os marcadores para depuração (remova em produção)
        },
    });

    gsap.to("#inicio", {
        scale: 2,
        opacity: 0,
        duration: 1,
        ease: "bezier(0.075, 0.82, 0.165, 1)", // Tipo de easing
        scrollTrigger: {
            trigger: "#inicio",
            start: "top 0%", // Inicia quando o topo do elemento atinge 80% da viewport
            end: "bottom 80%",  // Termina quando o topo do elemento atinge 100% da viewport
            scrub: true,     // Faz a animação acompanhar o scroll
            markers: false,   // Mostra os marcadores para depuração (remova em produção)
        },
    });

    gsap.to("#vantagens-calltitle", {
        opacity: 0, // Gradualmente desaparece
        duration: .6, // Duração da animação
        ease: "bezier(0.075, 0.82, 0.165, 1)", // Tipo de easing
        scrollTrigger: {
            trigger: "#vantagens-calltitle", // Elemento que ativa a animação
            start: "top 80%", // Inicia quando o topo do elemento atinge 80% da viewport
            end: "bottom 60%", // Termina quando o fundo do elemento atinge 20% da viewport
            scrub: true, // Sincroniza a animação com o scroll
            markers: false, // Mostra os marcadores para depuração (remova em produção)
        },
    });

    gsap.to("#advantage-title", {
        opacity: 1, // Gradualmente aparece
        y: 0, // Move para a posição original
        duration: 0.6, // Duração da animação
        ease: "power1.out", // Efeito de suavização
        scrollTrigger: {
            trigger: "#advantage-title", // Elemento que ativa a animação
            start: "top 20%", // Inicia quando o topo do elemento atinge 100% da viewport
            end: "bottom 40%", // Termina quando o fundo do elemento atinge 70% da viewport
            scrub: true, // Sincroniza a animação com o scroll
            markers: false, // Mostra os marcadores para depuração (remova em produção)
        },
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#vantagens-list-top", // Ativa a animação quando a seção #vantagens entra na viewport
            start: "top 70%", // Inicia quando o topo da seção atinge 80% da viewport
            end: "bottom 60%", // Termina quando o fundo da seção atinge 20% da viewport
            scrub: true, // Sincroniza a animação com o scroll
            markers: false, // Mostra os marcadores para depuração (remova em produção)
            toggleActions: "play none none reverse", // Ações de animação
        },
    });

    tl.from(".slideFromTop", {
        opacity: 0, // Começa invisível
        y: -20, // Começa deslocado 50px para a direita
        duration: 0.6, // Duração de cada animação
        ease: "power1.out", // Suavização
        stagger: {
            amount: 0.6, // Tempo total do stagger
            from: "end", // Aplica o stagger do último para o primeiro
        },
    });

    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#vantagens-list-bottom", // Ativa a animação quando a seção #vantagens entra na viewport
            start: "top 70%", // Inicia quando o topo da seção atinge 80% da viewport
            end: "bottom 60%", // Termina quando o fundo da seção atinge 20% da viewport
            scrub: true, // Sincroniza a animação com o scroll
            markers: false, // Mostra os marcadores para depuração (remova em produção)
            toggleActions: "play none none reverse", // Ações de animação
        },
    });
    
    // Animação para os elementos .slideFromBottom (ordem inversa)
    tl2.from(".slideFromBottom", {
        opacity: 0, // Começa invisível
        y: 20, // Começa deslocado 50px para a direita
        duration: 0.6, // Duração de cada animação
        ease: "power1.out", // Suavização
        stagger: {
            amount: 0.6, // Tempo total do stagger
            from: "end", // Aplica o stagger do último para o primeiro
        },
    });

    gsap.to("#freelancers-modal", {
        opacity: 1, // Gradualmente aparece
        y: 0, // Move para a posição original
        scale: 1,
        duration: 0.6, // Duração da animação
        ease: "power1.out", // Efeito de suavização
        scrollTrigger: {
            trigger: "#freelancers", // Elemento que ativa a animação
            start: "top 100%", // Inicia quando o topo do elemento atinge 100% da viewport
            end: "bottom 80%", // Termina quando o fundo do elemento atinge 70% da viewport
            scrub: true, // Sincroniza a animação com o scroll
            markers: false, // Mostra os marcadores para depuração (remova em produção)
        },
    });

    gsap.to("#prod-connect-desk", {
        opacity: 1, // Gradualmente aparece
        x: 0, // Move para a posição original
        scale: 1,
        duration: 0.6, // Duração da animação
        ease: "power1.out", // Efeito de suavização
        scrollTrigger: {
            trigger: "#prod-connect-desk", // Elemento que ativa a animação
            start: "top 100%", // Inicia quando o topo do elemento atinge 100% da viewport
            end: "bottom 80%", // Termina quando o fundo do elemento atinge 70% da viewport
            scrub: true, // Sincroniza a animação com o scroll
            markers: false, // Mostra os marcadores para depuração (remova em produção)
        },
    });

    gsap.to("#prod-connect-schools", {
        opacity: 1, // Gradualmente aparece
        x: 0, // Move para a posição original
        scale: 1,
        duration: 0.6, // Duração da animação
        ease: "power1.out", // Efeito de suavização
        scrollTrigger: {
            trigger: "#prod-connect-schools", // Elemento que ativa a animação
            start: "top 100%", // Inicia quando o topo do elemento atinge 100% da viewport
            end: "bottom 80%", // Termina quando o fundo do elemento atinge 70% da viewport
            scrub: true, // Sincroniza a animação com o scroll
            markers: false, // Mostra os marcadores para depuração (remova em produção)
        },
    });
});