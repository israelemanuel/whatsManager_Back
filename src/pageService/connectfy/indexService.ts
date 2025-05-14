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


        return {
            logo: generalService.logo,
            banner: generalService.banner,
            bannerAsset,
            bannerAsset2,
            paralaxAsset,
            lstComents,
            callToConnectDesk,
            title: 'Connectfy',
            description: 'This is the about us page.',
            content: '<p>Welcome to our website!</p>',
            page: 'index',
        }
    }

    
}

export default new IndexService();