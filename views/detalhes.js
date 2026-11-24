
//esse window location search vai pegar oq vem depois do ? na url (Esse é o query que o professor explicou em uma das aulas)
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

const detalhes = document.getElementById('detalhesReceita');

//aqui ele vai carregar a receita e substituit aquele carregando receita
async function carregarReceita() {
    const resposta = await fetch(`/api/receitas/${id}`);
    const dados = await resposta.json();

    const receita = dados.meals[0];

    detalhes.innerHTML = `
        <h2>${receita.strMeal}</h2>

        <img src="${receita.strMealThumb}" alt="${receita.strMeal}" width="300">

        <p>Categoria: ${receita.strCategory}</p>
        <p>Origem: ${receita.strArea}</p>

        <h3>Ingredientes</h3>
        <ul id="listaIngredientes"></ul>

        <h3>Modo de preparo</h3>
        <p>${receita.strInstructions}</p>
    `;

    const lista = document.getElementById('listaIngredientes');

    for (let i = 1; i <= 20; i++) {
        const ingrediente = receita[`strIngredient${i}`];
        const quantidade = receita[`strMeasure${i}`];

        if (ingrediente && ingrediente.trim() !== '') {
            const item = document.createElement('li');
            item.textContent = `${quantidade} - ${ingrediente}`;
            lista.appendChild(item);
        }
    }
}

carregarReceita();
