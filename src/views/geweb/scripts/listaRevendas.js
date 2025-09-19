

function mostrarConce(event) {


    var content = document.querySelector("div.rev-grid");
    if (!content) return
    let key = ""
    if (event.target) {
        key = event.target.value;
    } else {
        key = event
    }
    var cards = "";

    var last = "";


    // selecionar indivisualmente estados pelo svg
    // document.querySelector("#BR-PB").onclick = function (){console.log("Paraiba")}


    for (var i in uf) {

        if (uf[i]['uf'] == key) {
            let conce = uf[i]['conce']
            for (let x in conce) {

                let { nome, cor, site, meso, telefone } = uf[i]['conce'][x];

                if (nome != "") {

                    cards += `<a href="${site}" target="_blank" id="rev-content" class="${cor}">
                            <div>
                                <div class="row" style="margin: 0px !important; padding: 1.0rem">
                                    <div class="col xl6 l12 m6 s12">
                                        <p>Representante</p>
                                        <p>${nome}</p>
                                        <p>${meso}</p>
                                    </div>
                                    <div class="col xl6 l12 m6 s12">
                                        <p>${site}</p>
                                        <p>${telefone}</p>
                                    </div>
                                </div>
                            </div>
                        </a>`

                }
            }
        }
    }

    content.innerHTML = cards + last;
}




var uf = new Array({
    "uf": "ceara",
    "conce": [
        { "nome": "IGESoftware", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/1", "telefone": "(91) 98459-1959" },
        { "nome": "TecnoSoftwares", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/2", "telefone": "(91) 98459-1959" }
    ]
}, {
    "uf": "maranhao",
    "conce": [
        { "nome": "GemaSoftwares", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/3", "telefone": "(91) 98459-1959" },

    ]
}, {
    "uf": "para",
    "conce": [
        { "nome": "EducarBR", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/4", "telefone": "(91) 98459-1959" },
        { "nome": "Smart 4 Web", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/5", "telefone": "(91) 98459-1959" },
        { "nome": "SmartSoftwares", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/6", "telefone": "(91) 98459-1959" },
        { "nome": "SmartTecnologia", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/7", "telefone": "(91) 98459-1959" }
    ]
}, {
    "uf": "minasgerais",
    "conce": [
        { "nome": "JJSILVA", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/8", "telefone": "(91) 98459-1959" }
    ]
},

    {
        "uf": "riograndedosul",
        "conce": [
            { "nome": "DGConsultoria", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/9", "telefone": "(91) 98459-1959" }
        ]
    }, {
    "uf": "santacatarina",
    "conce": [
        { "nome": "", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "", "telefone": "" },
    ]
}, {
    "uf": "tocantins",
    "conce": [
        { "nome": "Smart 4 Web", "cor": "solid_purple reverse scale", "meso": "Baixo Amazonas", "site": "geweb-form/11", "telefone": "(91) 98459-1959" }
    ]
}
)