
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

        lstProducts: [
            {
                id: 1,
                nome: "Base de conhecimento",
                image: '/images/laptop-overlays.jpg',
                logo: '/images/knowledgment.png',
                description: "Organize, instrua e facilite o acesso à informação em qualquer lugar.",
                show: false,
            },
            {
                id: 2,
                nome: "Treinamento",
                image: '/images/student-studing.jpg',
                logo: '/images/training.png',
                description: "A versão Pro do ConnectDesk oferece funcionalidades avançadas para empresas que buscam otimizar ainda mais seu atendimento.",
                show: false,
            },
            {
                id: 3,
                nome: "Atendimento",
                image: '/images/woman-tablet.jpg',
                logo: '/images/tickets.png',
                description: "A solução Enterprise é ideal para grandes empresas que precisam de uma plataforma robusta e escalável para gerenciar seu atendimento.",
                show: false,
            },
            {
                id: 4,
                nome: "Chat",
                image: '/images/girl-standing-texting.jpg',
                logo: '/images/chat.png',
                description: "O ConnectDesk Chatbot é uma ferramenta de inteligência artificial que automatiza o atendimento ao cliente, respondendo perguntas frequentes e direcionando os usuários para as informações corretas.",
                show: false,
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

        tiltEffect(event, card) {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * -10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        },

        resetTilt(card) {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        },

        init() {
            console.log('init');
            this.controllScroll();

        }

    }))

    
});