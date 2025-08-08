class GeneralService {


    init() {
        const logo = {
          imageUrl: "/images/estoq_gov_logo.svg",
          alt: "Logo",
          title: "Logo",
        };

        return {
            logo,
        }
    }
}

export default new GeneralService();