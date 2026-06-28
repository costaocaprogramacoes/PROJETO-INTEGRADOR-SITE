const catalogoJogos = [
    {
        id: 1,
        nome: "Cyberpunk 2077",
        imagem: "./img_jogos/cyberpunk.webp",
        categoria: "RPG / Open World",
        estrelas: "⭐⭐⭐⭐",
        nota: "4.2",
        tags: [
            { classe: "rtx", texto: "RTX Required" },
            { classe: "vram", texto: "VRAM Hungry" },
            { classe: "cpu", texto: "CPU Intensive" }
        ],
        specs: {
            minimo: { cpu: "Intel Core i7-6700K", gpu: "NVIDIA GTX 1060", ram: "12 GB" },
            recomendado: { cpu: "Intel Core i7-8700K", gpu: "NVIDIA RTX 2080 SUPER", ram: "16 GB" },
            ultra: { cpu: "Intel Core i9-12900K", gpu: "NVIDIA RTX 4080", ram: "32 GB DDR5" }
        }
    },
    {
        id: 2,
        nome: "Valorant",
        imagem: "./img_jogos/valorant.webp",
        categoria: "Tactical Shooter",
        estrelas: "⭐⭐⭐⭐⭐",
        nota: "4.5",
        tags: [
            { classe: "rtx", texto: "High FPS" },
            { classe: "vram", texto: "Low Latency" },
            { classe: "cpu", texto: "Competitive" }
        ],
        specs: {
            minimo: { cpu: "Intel Core i3-4150", gpu: "NVIDIA GT 730", ram: "4 GB" },
            recomendado: { cpu: "Intel Core i5-9400F", gpu: "NVIDIA GTX 1050 Ti", ram: "8 GB" },
            ultra: { cpu: "Intel Core i7-13700K", gpu: "NVIDIA RTX 3070", ram: "16 GB DDR5" }
        }
    },
    {
        id: 3,
        nome: "Baldur's Gate 3",
        imagem: "./img_jogos/baldurs.webp",
        categoria: "RPG / Strategy",
        estrelas: "⭐⭐⭐⭐⭐",
        nota: "4.9",
        tags: [
            { classe: "rtx", texto: "Story Driven" },
            { classe: "vram", texto: "GPU Intensive" },
            { classe: "cpu", texto: "Co-op" }
        ],
        specs: {
            minimo: { cpu: "Intel Core i7-8700K", gpu: "NVIDIA GTX 1060", ram: "8 GB" },
            recomendado: { cpu: "Intel Core i7-10700K", gpu: "NVIDIA 2060 SUPER", ram: "16 GB" },
            ultra: { cpu: "Intel Core i9-13900K", gpu: "NVIDIA RTX 4090", ram: "32 GB DDR5" }
        }
    },
    {
        id: 4,
        nome: "Fortnite",
        imagem: "./img_jogos/fortnite.webp",
        categoria: "Battle Royale",
        estrelas: "⭐⭐⭐⭐",
        nota: "3.8",
        tags: [
            { classe: "rtx", texto: "Free to Play" },
            { classe: "vram", texto: "Cross-platform" },
            { classe: "cpu", texto: "High FPS" }
        ],
        specs: {
            minimo: { cpu: "Intel Core i5-7300U", gpu: "NVIDIA GTX 960", ram: "8 GB" },
            recomendado: { cpu: "Intel Core i7-8700", gpu: "NVIDIA RTX 3070", ram: "16 GB" },
            ultra: { cpu: "Intel Core i9-12900K", gpu: "NVIDIA RTX 4070 Ti", ram: "32 GB DDR5" }
        }
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('catalogo-container');
    const searchBox = document.getElementById('search-jogos');
    const btnLupa = document.querySelector('.btn-lupa');

    // Lógica Lupa
    if (btnLupa && searchBox) {
        btnLupa.addEventListener('click', () => {
            searchBox.classList.toggle('ativo');
            if (searchBox.classList.contains('ativo')) searchBox.focus();
        });
    }

    // Renderizar os jogos na tela
    function renderizarJogos(lista) {
        container.innerHTML = "";
        
        if (lista.length === 0) {
            container.innerHTML = `<p style="color: #8a8fb8; margin: 2vw 16.3vw;">Nenhum jogo encontrado.</p>`;
            return;
        }

        lista.forEach(jogo => {
            const cardHTML = `
            <div class="cards">
                <div class="img_card">
                    <img src="${jogo.imagem}" alt="${jogo.nome}">
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <div class="card-title">
                            <h2>${jogo.nome}</h2>
                            <span class="categoria">${jogo.categoria}</span>
                            <div class="star">${jogo.estrelas}<span class="nota">${jogo.nota}</span></div>
                        </div>
                        <div class="tags">
                            ${jogo.tags.map(tag => `<span class="tag ${tag.classe}">${tag.texto}</span>`).join('')}
                        </div>
                    </div>

                    <div class="spec-card">
                        <div class="spec-box min">
                            <h3>MÍNIMO</h3>
                            <p><strong>CPU:</strong> ${jogo.specs.minimo.cpu}</p>
                            <p><strong>GPU:</strong> ${jogo.specs.minimo.gpu}</p>
                            <p><strong>RAM:</strong> ${jogo.specs.minimo.ram}</p>
                        </div>
                        <div class="spec-box med">
                            <h3>RECOMENDADO</h3>
                            <p><strong>CPU:</strong> ${jogo.specs.recomendado.cpu}</p>
                            <p><strong>GPU:</strong> ${jogo.specs.recomendado.gpu}</p>
                            <p><strong>RAM:</strong> ${jogo.specs.recomendado.ram}</p>
                        </div>
                        <div class="spec-box max">
                            <h3>ULTRA</h3>
                            <p><strong>CPU:</strong> ${jogo.specs.ultra.cpu}</p>
                            <p><strong>GPU:</strong> ${jogo.specs.ultra.gpu}</p>
                            <p><strong>RAM:</strong> ${jogo.specs.ultra.ram}</p>
                        </div>
                    </div>

                    <div class="buttons">
                        <button class="btn_setup" onclick="window.location.href='../Setup_Page/setup.html'">MONTAR SETUP</button>
                    </div>
                </div>
            </div>`;
            container.innerHTML += cardHTML;
        });
    }

    // Filtro de pesquisa
    searchBox.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const filtrados = catalogoJogos.filter(jogo => 
            jogo.nome.toLowerCase().includes(termo) || 
            jogo.categoria.toLowerCase().includes(termo)
        );
        renderizarJogos(filtrados);
    });

    renderizarJogos(catalogoJogos);
});