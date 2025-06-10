import GeneralService from './generalService';


class IndexService {

    public async execute(params: any): Promise<any> {
        const generalService = GeneralService.init();

        let callToConnectDesk = "";

        if (process.env.NODE_ENV === 'production') {
            callToConnectDesk = "https://site-connectdesk.appservicedesk.com/";
        } else {
            callToConnectDesk = "http://connectdesk.local:3000";
        }


        console.log('IndexService', params);

        const banner = {
            imageUrl: '/images/stars2.svg',

        };

        const bannerAsset = {
            confidentMen: '/images/confident_men.png',
        };

        const bannerAsset2 = {
            iconLogo: '/images/logo.svg',
        }

        const paralaxAsset = {
            imageUrl: '/images/cheerfull.png',
        }

        const lstComents = [
            {
                name: 'John Doe',
                comment: 'A possibilidade de treinar nossos clientes e funcionários através de módulos de treinamento online fornecidos pela ConnectFy foi um verdadeiro diferencial. A redução dos custos com treinamentos in loco foi substancial.',
                role: 'Diretor Executivo',
                logo: '/images/govsolutions_preferencial.png',
                fileName: 'Govsolutions',
                style: 1,
            },
            {
                name: 'John Doe',
                comment: 'A meritocracia implementada pela ConnectFy nos permitiu premiar os trabalhadores mais dedicados. Agora, temos uma equipe motivada e focada em entregar resultados excepcionais.',
                role: 'Gerente de Suporte',
                logo: '/images/estoqgov_preferencial.png',
                fileName: 'EstoqGOV',
                style: 2,
            },
            {
                name: 'John Doe',
                comment: 'A liberdade de trabalhar remotamente, proporcionada pela ConnectFy, melhorou a qualidade de vida de nossos funcionários e freelancers, refletindo-se na qualidade dos serviços prestados.',
                role: 'CEO e Fundador',
                logo: '/images/nutrigov_preferencial.png',
                fileName: 'NutriGOV',
                style: 1,
            },
            {
                name: 'John Doe',
                comment: 'A central de ajuda personalizada que a ConnectFy oferece, tornou nosso atendimento ao cliente mais eficiente e alinhado com nossa identidade visual, o que fortaleceu nossa marca.',
                role: 'Gerente de Marketing',
                logo: '/images/lotagovrh_preferencial.png',
                fileName: 'LotaGOVRH',
                style: 1,
            },
            {
                name: 'John Doe',
                comment: 'A gestão dos pagamentos por serviços prestados na ConnectFy é incrivelmente eficiente. Ela facilita nosso trabalho e garante que todos sejam pagos de maneira justa e assertiva.',
                role: 'Gerente Financeiro',
                logo: '/images/etransporte_preferencial.png',
                fileName: 'eTransporte',
                style: 2,
            },
            {
                name: 'John Doe',
                comment: 'A integração de ferramentas como a emissão de notas fiscais e a centralização de documentos na plataforma ConnectFy facilitou imensamente nosso trabalho. Agora, tudo está em um só lugar e podemos focar em oferecer um serviço contábil de excelência sem perder tempo com burocracias.',
                role: 'Diretor Executivo',
                logo: '/images/crontabil_preferencial.png',
                fileName: 'Crontabil',
                style: 1,
            },
        ]

        const lstAdvantages = [
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
        ]

        const lstAdvantages2 = [
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
        ]


        const lstFaq = [
            {
                title: 'O que é o ConnectFy?',
                description: 'O ConnectFy é uma plataforma inovadora que transforma o atendimento ao cliente, permitindo que equipes de qualquer organização se conectem de forma ágil e personalizada, oferecendo soluções rápidas e eficientes, aumentando a produtividade e melhorando a experiência do cliente com tecnologia inteligente e integração simplificada.',
                toggle: false
            },
            {
                title: 'O que é o ConnectFy?',
                description: 'O ConnectFy é uma plataforma inovadora que transforma o atendimento ao cliente, permitindo que equipes de qualquer organização se conectem de forma ágil e personalizada, oferecendo soluções rápidas e eficientes, aumentando a produtividade e melhorando a experiência do cliente com tecnologia inteligente e integração simplificada.',
                toggle: false
            },
            {
                title: 'O que é o ConnectFy?',
                description: 'O ConnectFy é uma plataforma inovadora que transforma o atendimento ao cliente, permitindo que equipes de qualquer organização se conectem de forma ágil e personalizada, oferecendo soluções rápidas e eficientes, aumentando a produtividade e melhorando a experiência do cliente com tecnologia inteligente e integração simplificada.',
                toggle: false
            },
            {
                title: 'O que é o ConnectFy?',
                description: 'O ConnectFy é uma plataforma inovadora que transforma o atendimento ao cliente, permitindo que equipes de qualquer organização se conectem de forma ágil e personalizada, oferecendo soluções rápidas e eficientes, aumentando a produtividade e melhorando a experiência do cliente com tecnologia inteligente e integração simplificada.',
                toggle: false
            },
        ]


        return {
            logo: generalService.logo,
            banner: generalService.banner,
            bannerAsset,
            bannerAsset2,
            paralaxAsset,
            lstComents,
            callToConnectDesk,
            lstAdvantages,
            lstAdvantages2,
            lstFaq,
            title: 'Connectfy',
            description: 'This is the about us page.',
            content: '<p>Welcome to our website!</p>',
            page: 'index',
        }
    }

    
}

export default new IndexService();