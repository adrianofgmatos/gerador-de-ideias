const ideas = [
    "Poste uma foto dos seus bastidores. O que está acontecendo 'atrás das câmeras'?",
    "Faça uma pergunta para engajar seus seguidores. Ex: 'Qual foi a melhor coisa que aconteceu com você esta semana?'",
    "Compartilhe uma dica rápida ou um 'hack' relacionado ao seu nicho.",
    "Crie uma enquete sobre dois tópicos populares no seu setor.",
    "Poste um #tbt (Throwback Thursday) de um momento marcante.",
    "Compartilhe uma citação inspiradora e pergunte o que seus seguidores acham dela.",
    "Mostre um antes e depois de um projeto ou transformação.",
    "Recomende uma ferramenta, livro ou recurso que você ama.",
    "Faça um pequeno vídeo mostrando como usar um de seus produtos ou serviços.",
    "Compartilhe um fato interessante ou uma estatística surpreendente sobre sua área.",
    "Crie um post de 'mito vs. verdade' para desmistificar um conceito comum.",
    "Poste sobre um erro que você cometeu e o que aprendeu com ele.",
    "Agradeça seus seguidores por algo específico.",
    "Compartilhe uma prévia de algo novo que está por vir.",
    "Faça uma live rápida para conversar com seu público."
];

const ideaPlaceholder = document.getElementById('idea-placeholder');
const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * ideas.length);
    ideaPlaceholder.textContent = ideas[randomIndex];
});
