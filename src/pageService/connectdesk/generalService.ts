class GeneralService {


    init() {
        const banner = {
            imageUrl: '/images/about-banner.svg',
        };

        const logo = {
            imageUrl: '/images/connectfy-logo.svg',
            alt: 'Logo',
            title: 'Logo',
        };

        return {
            banner,
            logo,
        }
    }
}

export default new GeneralService();