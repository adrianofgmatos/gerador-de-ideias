document.addEventListener('DOMContentLoaded', () => {
    // --- GERADOR DE IDEIAS ---
    const ideaPlaceholder = document.getElementById('idea-placeholder');
    const generateBtn = document.getElementById('generate-btn');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const copyBtn = document.getElementById('copy-btn');

    let ideas = [];
    let currentCategory = 'Todos';

    function generateIdea() {
        const filteredIdeas = currentCategory === 'Todos'
            ? ideas
            : ideas.filter(idea => idea.category === currentCategory);

        if (filteredIdeas.length === 0) {
            ideaPlaceholder.textContent = 'Nenhuma ideia encontrada para esta categoria.';
            copyBtn.style.display = 'none';
            return;
        }

        copyBtn.style.display = 'flex';
        const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
        ideaPlaceholder.textContent = filteredIdeas[randomIndex].text;
    }

    // Carrega as ideias do JSON e depois inicializa a funcionalidade
    fetch('ideas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            ideas = data.ideas;

            // Adiciona os event listeners depois de carregar as ideias
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    currentCategory = button.dataset.category;
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    generateIdea();
                });
            });

            generateBtn.addEventListener('click', generateIdea);

            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(ideaPlaceholder.textContent).then(() => {
                    const originalContent = copyBtn.innerHTML;
                    copyBtn.innerHTML = 'Copiado!';
                    setTimeout(() => {
                        copyBtn.innerHTML = originalContent;
                    }, 2000);
                }).catch(err => {
                    console.error('Erro ao copiar texto: ', err);
                });
            });

            // Gera a primeira ideia
            generateIdea();
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo de ideias:', error);
            ideaPlaceholder.textContent = 'Não foi possível carregar as ideias. Tente recarregar a página.';
        });


    // --- GERADOR DE HASHTAGS ---
    const tagsInput = document.getElementById('tags-input');
    const generateTagsBtn = document.getElementById('generate-tags-btn');
    const tagsResultBox = document.getElementById('tags-result-box');
    const tagsPlaceholder = document.getElementById('tags-placeholder');
    const copyTagsBtn = document.getElementById('copy-tags-btn');

    const hashtagContexts = {
        moda: {
            keywords: ['roupa', 'moda', 'estilo', 'vestido', 'calça', 't-shirt', 'look', 'fashion', 'acessório', 'sapatos'],
            hashtags: ['#moda', '#fashion', '#estilo', '#lookdodia', '#modafeminina', '#modamasculina', '#instafashion', '#tendencia', '#acessorios', '#look', '#roupas']
        },
        comida: {
            keywords: ['comida', 'restaurante', 'prato', 'receita', 'delicioso', 'saboroso', 'fome', 'jantar', 'almoço', 'foodie'],
            hashtags: ['#comida', '#foodie', '#instafood', '#gastronomia', '#restaurante', '#delicia', '#yummy', '#foodlover', '#receitas', '#jantar', '#almoço']
        },
        viagem: {
            keywords: ['viagem', 'viajar', 'férias', 'turismo', 'destino', 'mundo', 'praia', 'cidade', 'natureza', 'travel'],
            hashtags: ['#viagem', '#travel', '#turismo', '#ferias', '#viajar', '#instatravel', '#travelgram', '#amoviajar', '#natureza', '#praia', '#destinos']
        },
        fitness: {
            keywords: ['fitness', 'ginásio', 'treino', 'saúde', 'exercício', 'fit', 'dieta', 'musculação', 'corrida', 'gym'],
            hashtags: ['#fitness', '#treino', '#gym', '#saude', '#vidasaudavel', '#foco', '#dieta', '#musculação', '#fit', '#lifestyle', '#corrida']
        },
        negocios: {
            keywords: ['negócios', 'business', 'marketing', 'empreendedorismo', 'sucesso', 'carreira', 'dinheiro', 'trabalho', 'dicas'],
            hashtags: ['#negocios', '#business', '#marketingdigital', '#empreendedorismo', '#sucesso', '#carreira', '#motivação', '#marketing', '#dinheiro', '#foco']
        }
    };

    generateTagsBtn.addEventListener('click', () => {
        const userInput = tagsInput.value.toLowerCase();
        if (!userInput) {
            tagsPlaceholder.textContent = 'Por favor, insira uma descrição.';
            tagsResultBox.style.display = 'block';
            copyTagsBtn.style.display = 'none';
            return;
        }

        let generatedHashtags = new Set();

        // Adiciona hashtags dos contextos
        for (const context in hashtagContexts) {
            const { keywords, hashtags } = hashtagContexts[context];
            if (keywords.some(kw => userInput.includes(kw))) {
                hashtags.forEach(tag => generatedHashtags.add(tag));
            }
        }

        // Adiciona hashtags a partir das palavras do utilizador
        const userWords = userInput.split(/\s+/).filter(word => word.length > 3);
        userWords.forEach(word => {
            generatedHashtags.add(`#${word}`);
        });


        if (generatedHashtags.size === 0) {
            tagsPlaceholder.textContent = 'Não foram encontradas sugestões. Tente descrever o seu post com mais detalhes sobre tópicos como moda, comida, viagem, etc.';
            copyTagsBtn.style.display = 'none';
        } else {
            tagsPlaceholder.textContent = Array.from(generatedHashtags).join(' ');
            copyTagsBtn.style.display = 'flex';
        }
        
        tagsResultBox.style.display = 'block';
    });

    copyTagsBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(tagsPlaceholder.textContent).then(() => {
            const originalContent = copyTagsBtn.innerHTML;
            copyTagsBtn.innerHTML = 'Copiado!';
            setTimeout(() => {
                copyTagsBtn.innerHTML = originalContent;
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar hashtags: ', err);
        });
    });
});
