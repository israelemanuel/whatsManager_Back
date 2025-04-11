

class ConnectProService {
    public async execute(params: any): Promise<any> {


        console.log('AboutService', params);



        const page = this.page();
        const municipios = await this.getAllMunicipios();


        return {
            municipios,
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