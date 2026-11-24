const formularioPesquisa = document.getElementById('formPesquisa');
const campoNome = document.getElementById('nomeReceita');
const resultados = document.getElementById('resultados');
const detalhes = document.getElementById('detalhesReceita');

// depois podem tirar esses comentarios mas vou explicar oq cada coisa faz, ja que a gente nn aprendeu sobre api nas aulas

formularioPesquisa.addEventListener('submit', async (evento) => {
    //essa função é pra pagina nn recarregar
    evento.preventDefault();

    const nome = campoNome.value;

    const resposta = await fetch(`/api/receitas?nome=${encodeURIComponent(nome)}`);

    const dados = await resposta.json();
    //esse if é pra caso o cara coloque algo q nn existe, ou n encontre uma receita
    if (!dados.meals) {
        resultados.innerHTML = `
            <p>Nenhum resultado encontrado</p>
        `;
        return
    }


    // esse innerHTML vai servir para apagar os resultados anteriores
    resultados.innerHTML = '';

    //esse foreach percorre todas as receitas da api encontradas
    dados.meals.forEach((receita) => {
        //vai criar um card pra cada elemente encontrado, tipo um for in que cria um card pra cada elemento
        const card = document.createElement('div');

        //esses receita.alguma coisa, são as informaçoes contidas no objeto da api, tipo, se pesquisou por pizza, ess strCategory vai pegar a categoria da pizza (ta tudo na api)
        card.innerHTML = `
        <h3>${receita.strMeal}</h3>
        <img src="${receita.strMealThumb}" alt="${receita.strMeal}" width="200">
        <p>Categoria: ${receita.strCategory}</p>
        <p>Origem: ${receita.strArea}</p>
        <button class="btnDetalhes">Ver receita</button>
        `;
        //adiciona oq a gente criou na tela
        resultados.appendChild(card);

        //essa variavel botao vai pegar o botao que a gente criou la no innerHTML e vamo adicionar uma funçaõ pra ter o ver detalhes
        const botao = card.querySelector('.btnDetalhes');
        //esse botao vai te redirecionar pra uma nova janela detalhes.html e vai puxar o id da comida que vc clicou em ver dfetalhes
        botao.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${receita.idMeal}`;
        });
    });
});