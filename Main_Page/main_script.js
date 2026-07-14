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

    // Menu Hamburguer (mobile)
    const btnHamburger = document.getElementById('btn-hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

    // Move busca, conta e carrinho para dentro do menu mobile (sem duplicar IDs)
    const MOBILE_BREAKPOINT = 1024;
    const iconesNav = document.querySelector('.icones-nav');
    const searchContainer = document.querySelector('.search-container');
    const carrinhoLink = document.querySelector('.carrinho-link');
    const areaConta = document.getElementById('area-conta');
    const mobileSearchSlot = document.getElementById('mobile-nav-search-slot');
    const mobileRowSlot = document.getElementById('mobile-nav-row-slot');

    function moverIconesParaMobile() {
        if (!searchContainer || !carrinhoLink || !areaConta || !mobileSearchSlot || !mobileRowSlot) return;
        if (searchContainer.parentElement !== mobileSearchSlot) {
            mobileSearchSlot.appendChild(searchContainer);
        }
        if (areaConta.parentElement !== mobileRowSlot) {
            mobileRowSlot.appendChild(areaConta);
        }
        if (carrinhoLink.parentElement !== mobileRowSlot) {
            mobileRowSlot.appendChild(carrinhoLink);
        }
    }

    function moverIconesParaDesktop() {
        if (!searchContainer || !carrinhoLink || !areaConta || !iconesNav || !btnHamburger) return;
        if (searchContainer.parentElement !== iconesNav) {
            iconesNav.insertBefore(searchContainer, btnHamburger);
        }
        if (areaConta.parentElement !== iconesNav) {
            iconesNav.insertBefore(areaConta, btnHamburger);
        }
        if (carrinhoLink.parentElement !== iconesNav) {
            iconesNav.insertBefore(carrinhoLink, btnHamburger);
        }
    }

    function ajustarLayoutIcones() {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            moverIconesParaMobile();
        } else {
            moverIconesParaDesktop();
        }
    }

    ajustarLayoutIcones();
    window.addEventListener('resize', ajustarLayoutIcones);

    function fecharMenuMobile() {
        btnHamburger.classList.remove('ativo');
        mobileNav.classList.remove('ativo');
        mobileNavOverlay.classList.remove('ativo');
        btnHamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function abrirMenuMobile() {
        btnHamburger.classList.add('ativo');
        mobileNav.classList.add('ativo');
        mobileNavOverlay.classList.add('ativo');
        btnHamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    if (btnHamburger && mobileNav && mobileNavOverlay) {
        btnHamburger.addEventListener('click', () => {
            const jaAberto = mobileNav.classList.contains('ativo');
            jaAberto ? fecharMenuMobile() : abrirMenuMobile();
        });

        mobileNavOverlay.addEventListener('click', fecharMenuMobile);

        // Botão "Voltar" dentro do próprio menu (essencial em telas muito estreitas,
        // onde o menu cobre a tela toda e o botão hamburguer some do header)
        const btnVoltarMenu = document.getElementById('mobile-nav-back');
        if (btnVoltarMenu) {
            btnVoltarMenu.addEventListener('click', fecharMenuMobile);
        }

        // Fecha o menu ao clicar em qualquer link dele
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', fecharMenuMobile);
        });

        // Fecha o menu automaticamente se a tela for redimensionada para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) fecharMenuMobile();
        });
    }

    // Atualiza a bolinha de contagem do carrinho
    atualizarBadgeCarrinho();

    // Mostra "Entrar" ou o usuário logado no header
    if (typeof renderizarAreaConta === 'function') renderizarAreaConta();

    // Dados das Categorias
    const categorias = [
        { icone: "fa-solid fa-microchip", titulo: "PROCESSADORES", itens: 26, valorFiltro: "PROCESSADOR" },
        { icone: "fa-solid fa-desktop", titulo: "MONITORES", itens: 15, valorFiltro: "MONITOR" },
        { icone: "fa-solid fa-headphones", titulo: "HEADSETS", itens: 10, valorFiltro: "HEADSET" },
        { icone: "fa-solid fa-computer-mouse", titulo: "MOUSES", itens: 16, valorFiltro: "MOUSE" }
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
            <div class="card" onclick="window.location.href='../Loja_Page/loja.html?categoria=${cat.valorFiltro}'">
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
            <div class="game-card" onclick="window.location.href='../Jogos_Page/jogos.html?jogo=${encodeURIComponent(jogo.nome).replace(/'/g, '%27')}'">
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

function atualizarBadgeCarrinho() {
    const badge = document.getElementById('badge-carrinho');
    if (!badge) return;

    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    if (totalItens > 0) {
        badge.innerText = totalItens;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}
