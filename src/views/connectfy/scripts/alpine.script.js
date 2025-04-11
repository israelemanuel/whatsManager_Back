
document.addEventListener('alpine:init', () => {
    Alpine.data('geral', () => ({
        acessibility: false,
        isScrolled: false,
        theme: 'light',
        showAboutUs: false,
        toggleMobileMenu: false,


        lstFaq: [
            {
                title: 'O que é o connectDesk?',
                description: 'O connectDesk é uma plataforma inovadora que transforma o atendimento ao cliente, permitindo que equipes de qualquer organização se conectem de forma ágil e personalizada, oferecendo soluções rápidas e eficientes, aumentando a produtividade e melhorando a experiência do cliente com tecnologia inteligente e integração simplificada.',
                toggle: false
            },
            {
                title: 'O que é o connectDesk?',
                description: 'O connectDesk é uma plataforma inovadora que transforma o atendimento ao cliente, permitindo que equipes de qualquer organização se conectem de forma ágil e personalizada, oferecendo soluções rápidas e eficientes, aumentando a produtividade e melhorando a experiência do cliente com tecnologia inteligente e integração simplificada.',
                toggle: false
            },
            {
                title: 'O que é o connectDesk?',
                description: 'O connectDesk é uma plataforma inovadora que transforma o atendimento ao cliente, permitindo que equipes de qualquer organização se conectem de forma ágil e personalizada, oferecendo soluções rápidas e eficientes, aumentando a produtividade e melhorando a experiência do cliente com tecnologia inteligente e integração simplificada.',
                toggle: false
            },
            {
                title: 'O que é o connectDesk?',
                description: 'O connectDesk é uma plataforma inovadora que transforma o atendimento ao cliente, permitindo que equipes de qualquer organização se conectem de forma ágil e personalizada, oferecendo soluções rápidas e eficientes, aumentando a produtividade e melhorando a experiência do cliente com tecnologia inteligente e integração simplificada.',
                toggle: false
            },
        ],

        
        toggleMenu(){
            this.toggleMobileMenu = !this.toggleMobileMenu
        },

        toggleAcessibility() {
            this.acessibility = !this.acessibility
        },

        toggleAboutUs(){
            this.showAboutUs = !this.showAboutUs
        },

        controllScroll() {
            const elInnerBody = document.querySelector('#innerBody');
            const { debounceTime, distinct, pluck, tap } = rxjs.operators;
            rxjs.fromEvent(elInnerBody, 'scroll')
                .pipe(
                    // tap(console.log),
                    pluck('target', 'scrollTop'),
                    distinct()
                )
                .subscribe((scrollTop) => {
                    this.isScrolled = scrollTop > 64;
                })
        },

        init() {
            console.log('init');
            this.controllScroll();

        }

    }))

    Alpine.data('carro', () => ({
        carros: [
            { marca: 'Chevrolet', modelo: 'Onix', preco: 'R$} 60.000,00' },
            { marca: 'Fiat', modelo: 'Argo', preco: 'R$} 65.000,00' },
            { marca: 'Ford', modelo: 'Ka', preco: 'R$} 55.000,00' },
        ]
    }))
});