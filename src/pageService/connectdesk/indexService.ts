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

        const otherResources = [
            {
                id: 1,
                title: "Base de Conhecimento",
                subtitle: "Ilimitada"
            },

            {
                id: 2,
                title: "100% RealTime",
            },

            {
                id: 3,
                title: "100% de suporte a dispositivos móveis",
                image: "/images/store.png"
            },

            {
                id: 4,
                title: "Suporte para integração com a API do ChatGPT",
                image: "/images/gpt_logo.svg"
            },
            {
                id: 5,
                title: "Chat Integrado com as principais plataoformas",
                image: "/images/chat_integrado.png"
            },
            {
                id: 6,
                title: "Armazene até 24GB de Documentos Gratuitamente",
                image: "/images/arquivos.png"
            },
            {
                id: 7,
                title: "O melhor custo benefício do mercado"
            },
            {
                id: 8,
                title: "Compatível com",
                image: "/images/plataformas_compativeis.png",

            },
            {
                id: 9,
                title: "24H",
                subtitle: "Ao seu alcance"  
            }
        ]

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
                id: 1,
                nome: "Produtividade e Eficiência",
                image: '/images/produtividade.png',
                list: [
                    {
                        title: "Base de Conhecimento",
                        paragraph: "Criação de base de conhecimento para autoatendimento, reduzindo perguntas repetitivas e aumentando a produtividade."
                    },
                    {
                        title: "Automação de Respostas",
                        paragraph: "Automação de respostas com artigos e bots para aliviar a sobrecarga da equipe."
                    },
                    {
                        title: "Dashboards e KPIs",
                        paragraph: "Dashboards com KPIs e insights operacionais para controle de produtividade."
                    },
                    {
                        title: "Escalabilidade",
                        paragraph: "Escalabilidade com autoatendimento e organização para acompanhar o crescimento da empresa."
                    }
                ]
            },
            {
                id: 2,
                nome: "Atendimento ao Cliente",
                image: '/images/atendimento.png',
                list: [
                    {
                        title: "Atendimento em Tempo Real",
                        paragraph: "Atendimento em tempo real via chat para reduzir a demora no suporte ao cliente."
                    },
                    {
                        title: "Autoatendimento 24/7",
                        paragraph: "Autoatendimento 24/7 com inteligência artificial para suporte fora do horário comercial."
                    },
                    {
                        title: "Atendimento Ágil",
                        paragraph: "Atendimento ágil e padronizado para aumentar a satisfação do cliente."
                    },
                    {
                        title: "Melhoria da Experiência",
                        paragraph: "Melhoria da experiência e da reputação da marca com suporte eficaz."
                    }
                ]
            },
            {
                id: 3,
                nome: "Organização e Processos",
                image: '/images/organizacao_processos.png',
                list: [
                    {
                        title: "Gestão de Tickets",
                        paragraph: "Gestão centralizada de tickets e prioridades para melhorar a organização nos atendimentos."
                    },
                    {
                        title: "Documentação de Processos",
                        paragraph: "Documentação de processos e scripts para padronizar os atendimentos."
                    },
                    {
                        title: "Gestão de Conteúdos",
                        paragraph: "Gestão facilitada de conteúdos e procedimentos para atualizar processos."
                    },
                    {
                        title: "Encaminhamento Inteligente",
                        paragraph: "Encaminhamento inteligente entre setores para maior eficiência na transferência de chamados."
                    }
                ]
            },
            {
                id: 4,
                nome: "Treinamento e Capacitação",
                image: '/images/treinamento.png',
                list: [
                    {
                        title: "Treinamento Contínuo",
                        paragraph: "Ambiente de treinamento contínuo para reduzir erros por falta de capacitação."
                    },
                    {
                        title: "Onboarding Rápido",
                        paragraph: "Treinamentos online e atualizados para acelerar o onboarding de novos colaboradores."
                    },
                    {
                        title: "Treinamento Remoto",
                        paragraph: "Ambiente de treinamento remoto e acessível para equipes distribuídas."
                    }
                ]
            },
            {
                id: 5,
                nome: "Visibilidade e Monitoramento",
                image: '/images/visibilidade.png',
                list: [
                    {
                        title: "Relatórios e Métricas",
                        paragraph: "Relatórios e métricas de desempenho para maior visibilidade sobre o suporte."
                    },
                    {
                        title: "Monitoramento de SLAs",
                        paragraph: "Monitoramento de níveis de serviço para controle sobre SLAs e prazos."
                    },
                    {
                        title: "Registro de Atendimentos",
                        paragraph: "Registro completo de atendimentos para manter o histórico das interações."
                    }
                ]
            },
            {
                id: 6,
                nome: "Colaboração e Comunicação",
                image: '/images/comunicacao.png',
                list: [
                    {
                        title: "Documentação Acessível",
                        paragraph: "Documentação acessível e colaboração estruturada para melhorar a comunicação interna."
                    },
                    {
                        title: "Centralização de Informações",
                        paragraph: "Centralização em uma base de conhecimento para facilitar o acesso a informações internas."
                    }
                ]
            }
        ];


        return {
            logo: generalService.logo,
            banner,
            bannerAsset,
            bannerAsset2,
            paralaxAsset,
            lstProblems,
            lstSolutions,
            otherResources,
            title: 'Connectfy',
            description: 'This is the about us page.',
            content: '<p>Welcome to our website!</p>',
            page: 'index',
            
        }
    }
}

export default new IndexService();