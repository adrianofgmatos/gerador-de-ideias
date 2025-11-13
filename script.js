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

    generateTagsBtn.addEventListener('click', async () => {
        const keywords = tagsInput.value.split(',')
            .map(kw => kw.trim())
            .filter(kw => kw.length > 0);

        if (keywords.length === 0) {
            tagsPlaceholder.textContent = 'Por favor, insira pelo menos uma palavra-chave.';
            tagsResultBox.style.display = 'block';
            copyTagsBtn.style.display = 'none';
            return;
        }

        // Feedback de loading
        const originalButtonText = generateTagsBtn.textContent;
        generateTagsBtn.textContent = 'A carregar...';
        generateTagsBtn.disabled = true;
        tagsResultBox.style.display = 'none';

        try {
            const synonymPromises = keywords.map(kw =>
                fetch(`https://api.datamuse.com/words?rel_syn=${kw.replace(/\s+/g, '+')}`)
                    .then(response => response.json())
            );

            const synonymArrays = await Promise.all(synonymPromises);

            let hashtags = new Set(keywords.map(kw => `#${kw.replace(/\s+/g, '').toLowerCase()}`));

            synonymArrays.forEach(synonymArray => {
                synonymArray.forEach(synonym => {
                    hashtags.add(`#${synonym.word.replace(/\s+/g, '').toLowerCase()}`);
                });
            });
            
            if (hashtags.size === 0) {
                 tagsPlaceholder.textContent = 'Não foram encontrados sinónimos. Tente outras palavras.';
            } else {
                 tagsPlaceholder.textContent = Array.from(hashtags).join(' ');
            }
           
            tagsResultBox.style.display = 'block';
            copyTagsBtn.style.display = 'flex';

        } catch (error) {
            console.error('Erro ao buscar sinónimos:', error);
            tagsPlaceholder.textContent = 'Ocorreu um erro ao buscar sinónimos. Verifique a sua conexão à internet.';
            tagsResultBox.style.display = 'block';
            copyTagsBtn.style.display = 'none';
        } finally {
            // Restaura o botão
            generateTagsBtn.textContent = originalButtonText;
            generateTagsBtn.disabled = false;
        }
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
