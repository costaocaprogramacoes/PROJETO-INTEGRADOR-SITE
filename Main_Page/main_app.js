document.addEventListener("DOMContentLoaded", () => {
    // Animação da Lupa
    const btnLupa = document.querySelector('.btn-lupa');
    const searchBox = document.querySelector('.search-box');

    if (btnLupa && searchBox) {
        btnLupa.addEventListener('click', () => {
            searchBox.classList.toggle('ativo');
            if (searchBox.classList.contains('ativo')) {
                searchBox.focus();
            }
        });
    }

    // Dados das Categorias
    const categorias = [
        { icone: "fa-solid fa-microchip", titulo: "PROCESSADORES", itens: 20 },
        { icone: "fa-solid fa-desktop", titulo: "MONITORES", itens: 15 },
        { icone: "fa-solid fa-headphones", titulo: "HEADSETS", itens: 10 },
        { icone: "fa-solid fa-computer-mouse", titulo: "MOUSES", itens: 8 }
    ];

    // Dados dos Jogos em Destaque
    const destaques = [
        { img: "./img_main/Subnautica 2.webp", estrelas: "★★★★⯨", nota: "4.5", nome: "Subnautica 2", genero: "Survival / Open World", tags: ["Co-op", "Sci-Fi"] },
        { img: "./img_main/Clair Obscur Expedition 33.webp", estrelas: "★★★★☆", nota: "4.4", nome: "Clair Obscur: Expedition 33", genero: "Turn-Based RPG", tags: ["Story Driven", "Dark Fantasy"] },
        { img: "./img_main/Pragmata.webp", estrelas: "★★★★☆", nota: "4.3", nome: "Pragmata", genero: "Action / Sci-Fi", tags: ["Dystopian", "Adventure"] },
        { img: "./img_main/Black Myth Wukong.webp", estrelas: "★★★★★", nota: "4.7", nome: "Black Myth: Wukong", genero: "Action RPG / Souls-like", tags: ["Action Game", "Mythological"] },
        { img: "./img_main/God Of War Ragnarok.webp", estrelas: "★★★★★", nota: "4.9", nome: "God of War Ragnarök", genero: "Action / Adventure", tags: ["Over-the-Shoulder", "Cinematic"] },
        { img: "./img_main/Resident Evil Requiem.webp", estrelas: "★★★★⯨", nota: "4.5", nome: "Resident Evil Requiem", genero: "Survival Horror", tags: ["Third-Person", "Atmospheric"] },
        { img: "./img_main/Assassins Creed Shadows.webp", estrelas: "★★★★", nota: "4.2", nome: "Assassin's Creed Shadows", genero: "Action / Open World", tags: ["Historical", "Stealth"] },
        { img: "./img_main/Call Of Duty Warzone.webp", estrelas: "★★★☆☆", nota: "3.9", nome: "Call of Duty: Warzone", genero: "Battle Royale / FPS", tags: ["Free to Play", "Cross-platform"] }
    ];

    // Renderizar Categorias
    const catContainer = document.getElementById('categorias-container');
    if (catContainer) {
        catContainer.innerHTML = categorias.map(cat => `
            <div class="card" onclick="window.location.href='../Loja_Page/loja.html'">
                <i class="${cat.icone}"></i>
                <div>
                    <h3>${cat.titulo}</h3>
                    <p>${cat.itens} itens</p>
                </div>
                <i class="fa-solid fa-chevron-right seta"></i>
            </div>
        `).join('');
    }

    // Renderizar Jogos em Destaque
    const destContainer = document.getElementById('destaques-container');
    if (destContainer) {
        destContainer.innerHTML = destaques.map(jogo => `
            <div class="game-card" onclick="window.location.href='../Setup_Page/setup.html'">
                <img src="${jogo.img}" alt="${jogo.nome}">
                <div class="game-info">
                    <div class="stars">${jogo.estrelas}</div>
                    <span>${jogo.nota}</span>
                </div>
                <div class="dados-jogos">
                    <span class="nome">${jogo.nome}</span>
                    <span>${jogo.genero}</span>
                </div>
                <div class="buttons-jogos">
                    ${jogo.tags.map(tag => `<button class="button-jogos">${tag}</button>`).join('')}
                </div>
            </div>
        `).join('');
    }
});
