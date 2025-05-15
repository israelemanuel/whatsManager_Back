import GeneralService from './generalService';

class AboutService {

   public async execute(params : any): Promise<any> {

    const generalService = GeneralService.init();


    const lstFaq = [
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
    ]
        

        return{
            logo: generalService.logo,
            banner: generalService.banner,
            lstFaq,
            title: 'About Us',
            description: 'This is the about us page.',
            content: '<p>Welcome to our website!</p>',
            page: 'about',
        }
    }
}

export default new AboutService();