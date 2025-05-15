
document.addEventListener('alpine:init', () => {
    Alpine.data('geral', () => ({
        acessibility: false,
        isScrolled: false,
        theme: 'light',
        showAboutUs: false,
        toggleMobileMenu: false,

        lstAdvantages: [
            {
                title: 'Controle Total e Transparência',
                description: 'Tenha acesso a relatórios detalhados e métricas de desempenho em tempo real.',
                style: 1,
            },

            {
                title: 'Os Melhores Preços do Mercado',
                description: 'A combinação perfeito custo x benefícios.',
                style: 2,
            },
            {
                title: 'Com valores cobrados em moeda local',
                description: 'Pague sempre na sua moeda. Esqueça o IOF e as variações do câmbio! Não tenha surpresas no final do mês.',
                style: 1,
            },
            {
                title: 'Plataforma Integrada',
                description:'Conecte todas as áreas do seu negócio em um único lugar.',
                style: 2,
            },
        ],
        
        lstAdvantages2: [
            {
                title: 'Trabalhe de Onde Quiser',
                description: 'Flexibilidade total para escolher seu local e horário de trabalho, em qualquer parte do mundo.',
                style: 1,
            },
            {
                title: 'Diversidade de Projetos',
                description:'Trabalhe em diferentes setores e expanda seu portfólio.',
                style: 2,
            },
            {
                title: 'Crescimento Profissional Constante',
                description: 'Acesse treinamentos e feedback contínuo para evoluir sua carreira.',
                style: 1,
            },
            {
                title: 'Autonomia Total',
                description: 'Defina suas metas, escolha seus projetos e gerencie seu próprio tempo.',
                style: 2,
            },
        ],


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
            const elInnerBody = document.querySelector('#body');
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