import GeneralService from './generalService';

class ConnectProService {
    public async execute(params: any): Promise<any> {


        console.log('AboutService', params);



        const page = this.page();
        const municipios = await this.getAllMunicipios();
        const generalService = GeneralService.init();

        const connectProBanner = {
            imageUrl: '/images/connectprobanner.jpg',
        };

        const connectPro1Setp = {
            imageUrl: '/images/cadastro.jpg',
        }

        const connectPro2Setp = {
            imageUrl: '/images/candidatese.jpg',
        }

        const connectPro3Setp = {
            imageUrl: '/images/notificado.jpg',
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
                title: 'Horários Flexíveis',
                subtitle: 'Defina seu próprio horário',
                image: '/images/economy_time_money.jpg',
                description: 'Adeus ao horário das 9 às 18h! Como freelancer, você escolhe quando trabalhar. Organize seu tempo de acordo com suas necessidades e preferências, equilibrando trabalho e vida pessoal.'
            },
            {
                title: 'Qualidade de Vida e Equilíbrio Emocional',
                subtitle: 'Mais tempo para o que mais Importa e menos estresse',
                image: '/images/flexible_time.png',
                description: 'Trabalhar como freelancer permite uma melhor qualidade de vida. Mais tempo com a família, menos estresse e a liberdade de organizar seu espaço de trabalho e sua rotina de forma mais saudável e equilibrada promovendo a  saúde mental e bem-estar.'
            },
            {
                title: 'Diversidade de Projetos',
                subtitle: 'Novos Desafios, Novas Oportunidades',
                image: '/images/estability_security.jpg',
                description: 'Freelancers têm a oportunidade de trabalhar em diversos projetos, conhecendo diferentes empresas e desafios. Isso amplia seu portfólio, enriquece sua experiência e mantém o trabalho interessante.'
            },
            {
                title: 'Autonomia e Independência',
                subtitle: 'Seja Seu Próprio Chefe',
                image: '/images/economy_time_money.jpg',
                description: 'Como freelancer, você tem a autonomia para escolher seus projetos e clientes. Essa independência permite que você direcione sua carreira da maneira que achar melhor, sem estar preso a uma única empresa.'
            },
            {
                title: 'Networking Global',
                subtitle: 'Conecte-se com Profissionais do Mundo Todo',
                image: '/images/flexible_time.png',
                description: 'Trabalhe para empresas ao redor do mundo sem sair de casa. Ampliar seu networking global abre portas para novas oportunidades e colaborações internacionais.'
            },
            {
                title: 'Crescimento Profissional',
                subtitle: 'Evolua Continuamente',
                image: '/images/estability_security.jpg',
                description: 'Freelancers estão sempre em constante aprendizado, adaptando-se a novos projetos e demandas. Essa evolução contínua é fundamental para o crescimento profissional e a aquisição de novas habilidades.'
            },
            {
                title: 'Variedade de Experiências',
                subtitle: 'Trabalhe com Diversos Profissionais',
                image: '/images/economy_time_money.jpg',
                description: 'Como freelancer, você terá a chance de colaborar com diferentes equipes e profissionais. Essa variedade enriquece suas habilidades interpessoais e expande seu conhecimento em várias áreas.'
            },
            {
                title: 'Equilíbrio Pessoal e Profissional',
                subtitle: 'A Vida que Você Merece',
                image: '/images/flexible_time.png',
                description: 'Ser freelancer proporciona um equilíbrio entre vida pessoal e profissional. Trabalhe quando estiver mais produtivo, tire um tempo para relaxar quando precisar e aproveite mais a vida.'
            },
            {
                title: 'Inovação e Criatividade',
                subtitle: 'Liberte sua Criatividade',
                image: '/images/estability_security.jpg',
                description: 'Trabalhar como freelancer permite explorar sua criatividade sem as restrições de uma empresa tradicional. Desenvolva soluções inovadoras e traga novas ideias para cada projeto.'
            },
            {
                title: 'Estabilidade e Segurança',
                subtitle: 'Diversifique suas Fontes de Renda',
                image: '/images/economy_time_money.jpg',
                description: 'Como freelancer, você não depende de um único empregador. Essa diversificação de clientes traz mais estabilidade e segurança financeira, diminuindo os riscos associados a perder um único emprego.'
            },
            {
                title: 'Foco em Resultados',
                subtitle: 'Seja Avaliado pelo Seu Trabalho',
                image: '/images/estability_security.jpg',
                description: 'Freelancers são valorizados pelos resultados que entregam. Isso motiva a busca constante pela excelência e o reconhecimento profissional, baseando-se no desempenho real.'
            },
            {
                title: 'Desenvolvimento Pessoal',
                subtitle: 'Cresça com Cada Projeto',
                image: '/images/estability_security.jpg',
                description: 'Cada novo projeto é uma oportunidade de aprendizado e desenvolvimento pessoal. Enfrente desafios, adquira novas habilidades e se torne um profissional mais completo e versátil.'
            },
        ],

            lstAdvantagesConnectPro = [
                {
                    title: 'Acesso a rede de empresas',
                    image: '/images/acessoaRedeDeEmpresas.png',
                    description: ''
                },
                {
                    title: 'Área de treinamentos diversos',
                    image: '/images/economy_time_money.jpg',
                    description: ''
                },
                {
                    title: 'Blog / Fórum',
                    image: '/images/economy_time_money.jpg',
                    description: ''
                },
                {
                    title: 'Módulo de financeiro gratuito (Em Breve)',
                    image: '/images/economy_time_money.jpg',
                    description: ''
                },
                {
                    title: 'Contabilidade Online (Em Breve)',
                    image: '/images/economy_time_money.jpg',
                    description: ''
                },
            ]




        return {
            logo: generalService.logo,
            banner: generalService.banner,
            lstComents,
            municipios,
            connectProBanner,
            lstAdvantages,
            lstAdvantagesConnectPro,
            connectPro1Setp,
            connectPro2Setp,
            connectPro3Setp,
            ...page,
            title: 'About Us',
            description: 'This is the about us page.',
            content: '<p>Welcome to our website!</p>',
        }
    }


    page() {
        return {
            nome: 'Isaque',
        }
    }

    async getAllMunicipios() {

        return [
            {
                id: 1,
                nome: 'São Paulo',
                sigla: 'SP',
                estado: 'São Paulo',
            }]
    }
}

export default new ConnectProService();