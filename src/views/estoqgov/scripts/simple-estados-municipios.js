// VERSÃO SIMPLES - Estados e Municípios

const estadoSelect = document.getElementById('estado');
const municipioSelect = document.getElementById('municipio');

async function loadEstados() {
    try {
        const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const estados = await res.json();
        
        estadoSelect.innerHTML = '<option disabled selected value="">Selecione o estado</option>';
        estados.forEach(estado => {
            const opt = document.createElement('option');
            opt.value = estado.id;
            opt.textContent = `${estado.nome} (${estado.sigla})`;
            estadoSelect.appendChild(opt);
        });
    } catch (err) {
        console.error('Erro ao carregar estados:', err);
        estadoSelect.innerHTML = '<option disabled selected value="">Erro ao carregar estados</option>';
    }
}

async function loadMunicipios(estadoId) {
    municipioSelect.disabled = true;
    municipioSelect.innerHTML = '<option disabled selected value="">Carregando municípios...</option>';
    
    try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
        const municipios = await res.json();
        
        municipioSelect.innerHTML = '<option disabled selected value="">Selecione o município</option>';
        municipios.forEach(municipio => {
            const opt = document.createElement('option');
            opt.value = municipio.id;
            opt.textContent = municipio.nome;
            municipioSelect.appendChild(opt);
        });
        
        municipioSelect.disabled = false;
    } catch (err) {
        console.error('Erro ao carregar municípios:', err);
        municipioSelect.innerHTML = '<option disabled selected value="">Erro ao carregar municípios</option>';
        municipioSelect.disabled = true;
    }
}

// Event listener
estadoSelect.addEventListener('change', () => {
    const estadoId = estadoSelect.value;
    if (!estadoId) {
        municipioSelect.innerHTML = '<option disabled selected value="">Selecione o município</option>';
        municipioSelect.disabled = true;
        return;
    }
    loadMunicipios(estadoId);
});

// Inicializar
loadEstados();