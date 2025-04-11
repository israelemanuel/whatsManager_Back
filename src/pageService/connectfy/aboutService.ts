import GeneralService from './generalService';

class AboutService {

   public async execute(params : any): Promise<any> {

    const generalService = GeneralService.init();


        console.log('AboutService', params);
        

        return{
            logo: generalService.logo,
            banner: generalService.banner,
            title: 'About Us',
            description: 'This is the about us page.',
            content: '<p>Welcome to our website!</p>',
            page: 'about',
        }
    }
}

export default new AboutService();