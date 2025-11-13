const ideas = [
    { category: "Engajamento", text: "Faça uma pergunta para engajar seus seguidores. Ex: 'Qual foi a melhor coisa que aconteceu com você esta semana?'" },
    { category: "Engajamento", text: "Crie uma enquete sobre dois tópicos populares no seu setor." },
    { category: "Engajamento", text: "Peça para seus seguidores legendarem uma foto." },
    { category: "Bastidores", text: "Poste uma foto da sua mesa de trabalho ou do seu espaço criativo." },
    { category: "Bastidores", text: "Mostre um 'dia na vida' através de stories." },
    { category: "Bastidores", text: "Compartilhe um erro que você cometeu e o que aprendeu com ele." },
    { category: "Vendas", text: "Mostre um antes e depois de um cliente que usou seu produto/serviço." },
    { category: "Vendas", text: "Anuncie uma oferta por tempo limitado ou um desconto especial." },
    { category: "Vendas", text: "Compartilhe um depoimento de um cliente satisfeito." },
    { category: "Educacional", text: "Compartilhe uma dica rápida ou um 'hack' relacionado ao seu nicho." },
    { category: "Educacional", text: "Recomende uma ferramenta, livro ou recurso que você ama." },
    { category: "Educacional", text: "Crie um post de 'mito vs. verdade' para desmistificar um conceito comum." }
];

const ideaPlaceholder = document.getElementById('idea-placeholder');
const generateBtn = document.getElementById('generate-btn');
const categoryButtons = document.querySelectorAll('.category-btn');
const copyBtn = document.getElementById('copy-btn');

let currentCategory = 'Todos';

function generateIdea() {
    const filteredIdeas = currentCategory === 'Todos' 
        ? ideas 
        : ideas.filter(idea => idea.category === currentCategory);
    
    if (filteredIdeas.length === 0) {
        ideaPlaceholder.textContent = 'Nenhuma ideia encontrada para esta categoria.';
        copyBtn.style.display = 'none'; // Esconde o botão se não houver ideia
        return;
    }

    copyBtn.style.display = 'flex'; // Mostra o botão se houver ideia
    const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
    ideaPlaceholder.textContent = filteredIdeas[randomIndex].text;
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.dataset.category;
        
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        generateIdea();
    });
});

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

generateBtn.addEventListener('click', generateIdea);

// Gera uma ideia inicial ao carregar a página
generateIdea();


// --- GERADOR DE HASHTAGS ---

const tagsInput = document.getElementById('tags-input');
const generateTagsBtn = document.getElementById('generate-tags-btn');
const tagsResultBox = document.getElementById('tags-result-box');
const tagsPlaceholder = document.getElementById('tags-placeholder');
const copyTagsBtn = document.getElementById('copy-tags-btn');

generateTagsBtn.addEventListener('click', () => {
    const keywords = tagsInput.value.split(',')
        .map(kw => kw.trim())
        .filter(kw => kw.length > 0);

    if (keywords.length === 0) {
        tagsPlaceholder.textContent = 'Por favor, insira pelo menos uma palavra-chave.';
        tagsResultBox.style.display = 'block';
        copyTagsBtn.style.display = 'none';
        return;
    }

    let hashtags = new Set(); // Usa um Set para evitar duplicados

    keywords.forEach(kw => {
        // Remove espaços e caracteres especiais para a hashtag principal
        const baseHashtag = kw.replace(/\s+/g, '').toLowerCase();
        hashtags.add(`#${baseHashtag}`);

        // Adiciona variações se a palavra-chave tiver várias palavras
        const words = kw.split(' ').filter(w => w.length > 0);
        if (words.length > 1) {
            words.forEach(word => {
                hashtags.add(`#${word.toLowerCase()}`);
            });
        }
    });

    tagsPlaceholder.textContent = Array.from(hashtags).join(' ');
    tagsResultBox.style.display = 'block';
    copyTagsBtn.style.display = 'flex';
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
