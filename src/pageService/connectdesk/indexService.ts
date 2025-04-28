import GeneralService from './generalService';

class IndexService {

    public async execute(params: any): Promise<any> {

        const generalService = GeneralService.init();


        console.log('IndexService', params);

        const banner = {
            imageUrl: '/images/backgroundBanner.png',

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

        const lstProblems = [
            { id: 1, nome: "Atendimento" },
            { id: 2, nome: "Suporte" },
            { id: 3, nome: "Documentação" },
            { id: 4, nome: "Base de conhecimento" },
            { id: 5, nome: "Autoatendimento" },
            { id: 6, nome: "Treinamento" },
            { id: 7, nome: "Produtividade" },
            { id: 8, nome: "Informação" },
            { id: 9, nome: "Eficiência" },
            { id: 10, nome: "Chat" },
            { id: 11, nome: "Colaboração" },
            { id: 12, nome: "Processos" },
            { id: 13, nome: "Gestão" },
            { id: 14, nome: "Capacitação" },
            { id: 15, nome: "Resposta rápida" },
            { id: 16, nome: "Relatórios" },
            { id: 17, nome: "SLA" },
            { id: 18, nome: "Monitoramento" },
            { id: 19, nome: "Indicadores" },
            { id: 20, nome: "Priorização" },
            { id: 21, nome: "Experiência do cliente" },
            { id: 22, nome: "Satisfação" },
            { id: 23, nome: "Reputação" },
            { id: 24, nome: "Escalabilidade" },
            { id: 25, nome: "Crescimento" },
            { id: 26, nome: "Chatbot" },
            { id: 27, nome: "Encaminhamento" },
            { id: 28, nome: "Histórico" },
            { id: 29, nome: "Prazos" },
            { id: 30, nome: "Setores" },
            { id: 31, nome: "Transparência" },
            { id: 32, nome: "Acesso online" },
            { id: 33, nome: "Equipe remota" },
        ];

        const lstSolutions = [
            {
                id: 1, nome: "Atendimento",
                image: '/images/atendimento.png',
            },
            {
                id: 2, nome: "Suporte",
                image: '/images/atendimento.png',
            },
            {
                id: 4, nome: "Base de conhecimento",
                image: '/images/atendimento.png',
            },
            {
                id: 6, nome: "Treinamento",
                image: '/images/atendimento.png',
            },

        ];


        return {
            logo: generalService.logo,
            banner,
            bannerAsset,
            bannerAsset2,
            paralaxAsset,
            lstProblems,
            lstSolutions,
            title: 'Connectfy',
            description: 'This is the about us page.',
            content: '<p>Welcome to our website!</p>',
            page: 'index',
        }
    }
}

export default new IndexService();