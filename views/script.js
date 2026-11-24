const formPesquisa = document.getElementById('formPesquisa');
const divResultados = document.getElementById('resultados');
const sectionDetalhes = document.getElementById('detalhesReceita');

// Função que renderiza os cards na tela
function mostrarReceitas(receitas) {
    sectionDetalhes.innerHTML = '';

    if (!receitas || receitas.length === 0) {
        divResultados.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    divResultados.innerHTML = receitas.map(receita => `
        <div class="card-receita" style="border: 1px solid #ccc; padding: 12px; margin-bottom: 12px; border-radius: 8px;">
            ${receita.foto ? `<img src="${receita.foto}" alt="${receita.nome}" style="max-width: 220px; border-radius: 6px;">` : ''}
            <h3>${receita.nome}</h3>
            <p><strong>País:</strong> ${receita.pais} | <strong>Categoria:</strong> ${receita.categoria}</p>
            <p><strong>Autor:</strong> ${receita.autor}</p>
            <button type="button" onclick="verDetalhes(${receita.id})">Ver modo de preparo</button>
        </div>
    `).join('');
}

// Função para exibir ingredientes e modo de preparo ao clicar
async function verDetalhes(id) {
    const resp = await fetch(`/api/receitas/${id}`);
    const receita = await resp.json();

    sectionDetalhes.innerHTML = `
        <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
            <h3>${receita.nome} - Detalhes</h3>
            <h4>Ingredientes:</h4>
            <ul>
                ${receita.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <h4>Modo de Preparo:</h4>
            <p>${receita.modo_de_preparo}</p>
        </div>
    `;
}

// Intercepta o envio do formulário de pesquisa
formPesquisa.addEventListener('submit', async (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
        nome: document.getElementById('nomeReceita').value,
        categoria: document.getElementById('categoria').value,
        ingrediente: document.getElementById('ingrediente').value,
        pais: document.getElementById('pais').value
    });

    try {
        const resposta = await fetch(`/api/receitas?${params.toString()}`);
        const receitas = await resposta.json();
        mostrarReceitas(receitas);
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        divResultados.innerHTML = '<p>Erro ao conectar com o servidor.</p>';
    }
});