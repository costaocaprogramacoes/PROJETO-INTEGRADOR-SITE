/* =========================================================================
   JOGOS_SCRIPT.JS - Logica exclusiva da pagina de Jogos (catalogo/paginacao/filtros)
   O banco de dados dos jogos fica em um arquivo separado:
   -> dados-jogos.js (catalogoBase e catalogoJogos)
   Ele deve ser carregado no HTML ANTES deste arquivo.
========================================================================= */

// Duplicando itens para formar o catalogo completo e gerando IDs únicos
const catalogoExpandido = [...catalogoBase, ...catalogoBase.slice(0, 0)].map((jogo, index) => ({
    ...jogo, 
    id: index + 1
}));

// Variáveis de Controle da Paginação e Filtros
const ITENS_POR_PAGINA = 5;
let paginaAtual = 1;
let termoPesquisa = "";

// Nome exato do jogo vindo da URL (?jogo=), usado uma única vez para pular
// direto para a página correta e destacar o card certo, mesmo que a busca
// bata com vários jogos.
let jogoAlvoExato = null;

// Mapeia o "peso" (usado no montador de PC) para cada jogo do catálogo pelo nome
function obterPeso(nomeJogo) {
    const dados = catalogoJogos.find(j => j.nome === nomeJogo);
    return dados ? dados.peso : 1.0;
}

// Classifica o jogo em Leve / Médio / Pesado com base no peso
function obterFaixaDesempenho(nomeJogo) {
    const peso = obterPeso(nomeJogo);
    if (peso <= 0.7) return "leve";
    if (peso <= 1.3) return "medio";
    return "pesado";
}

// Categorias "macro" usadas no filtro, derivadas da categoria e das tags de cada jogo
const CATEGORIAS_FILTRO = [
    { valor: "FPS", regex: /shooter|fps/i },
    { valor: "BATTLE_ROYALE", regex: /battle royale/i },
    { valor: "RPG", regex: /\brpg\b/i },
    { valor: "MUNDO_ABERTO", regex: /open world/i },
    { valor: "TERROR", regex: /horror/i },
    { valor: "SOULSLIKE", regex: /souls/i },
    { valor: "ACAO", regex: /action|adventure/i },
    { valor: "MULTIPLAYER", regex: /co-op|multiplayer|asymmetrical/i },
    { valor: "ESTRATEGIA", regex: /strategy|turn-based/i },
    { valor: "SIMULACAO", regex: /simulation/i },
    { valor: "LUTA", regex: /fighting/i },
    { valor: "INDIE", regex: /indie|platformer|metroidvania/i }
];

function jogoTemCategoria(jogo, valor) {
    const cat = CATEGORIAS_FILTRO.find(c => c.valor === valor);
    if (!cat) return false;
    const texto = jogo.categoria + " " + jogo.tags.map(t => t.texto).join(" ");
    return cat.regex.test(texto);
}

document.addEventListener("DOMContentLoaded", () => {
    // --- Menu Hamburguer (mobile) ---
    const btnHamburger = document.getElementById('btn-hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

    function fecharMenuMobile() {
        if (!btnHamburger || !mobileNav || !mobileNavOverlay) return;
        btnHamburger.classList.remove('ativo');
        mobileNav.classList.remove('ativo');
        mobileNavOverlay.classList.remove('ativo');
        btnHamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function abrirMenuMobile() {
        if (!btnHamburger || !mobileNav || !mobileNavOverlay) return;
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

        // Botão "Voltar" dentro do próprio menu
        const btnVoltarMenu = document.getElementById('mobile-nav-back');
        if (btnVoltarMenu) btnVoltarMenu.addEventListener('click', fecharMenuMobile);

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', fecharMenuMobile);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) fecharMenuMobile();
        });
    }

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
        if (searchContainer.parentElement !== mobileSearchSlot) mobileSearchSlot.appendChild(searchContainer);
        if (areaConta.parentElement !== mobileRowSlot) mobileRowSlot.appendChild(areaConta);
        if (carrinhoLink.parentElement !== mobileRowSlot) mobileRowSlot.appendChild(carrinhoLink);
    }

    function moverIconesParaDesktop() {
        if (!searchContainer || !carrinhoLink || !areaConta || !iconesNav || !btnHamburger) return;
        if (searchContainer.parentElement !== iconesNav) iconesNav.insertBefore(searchContainer, btnHamburger);
        if (areaConta.parentElement !== iconesNav) iconesNav.insertBefore(areaConta, btnHamburger);
        if (carrinhoLink.parentElement !== iconesNav) iconesNav.insertBefore(carrinhoLink, btnHamburger);
    }

    function ajustarLayoutIcones() {
        if (window.innerWidth <= MOBILE_BREAKPOINT) moverIconesParaMobile();
        else moverIconesParaDesktop();
    }

    ajustarLayoutIcones();
    window.addEventListener('resize', ajustarLayoutIcones);

    const searchBox = document.getElementById('search-jogos');
    const btnLupa = document.querySelector('.btn-lupa');

    // Lógica Lupa
    if (btnLupa && searchBox) {
        btnLupa.addEventListener('click', () => {
            searchBox.classList.toggle('ativo');
            if (searchBox.classList.contains('ativo')) searchBox.focus();
        });
    }

    // Filtro de pesquisa
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            termoPesquisa = e.target.value.toLowerCase();
            paginaAtual = 1; // Volta pra pagina 1 ao pesquisar
            renderizarCatalogo();
        });
    }

    // Filtros de Desempenho e Categoria (checkboxes da sidebar)
    document.querySelectorAll('.filtro-grupo input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            paginaAtual = 1;
            renderizarCatalogo();
            atualizarBadgeFiltros();
        });
    });

    // --- Painel de filtros expansível (mobile) ---
    const filtrosToggle = document.getElementById('filtros-toggle');
    const filtrosConteudo = document.getElementById('filtros-conteudo');

    if (filtrosToggle && filtrosConteudo) {
        filtrosToggle.addEventListener('click', () => {
            const aberto = filtrosConteudo.classList.toggle('aberto');
            filtrosToggle.classList.toggle('aberto', aberto);
            filtrosToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
        });
    }

    // Verifica se o usuário veio de um card de jogo (ex: Main Page) via ?jogo=Nome
    verificarJogoURL(searchBox);

    // Verifica se o usuário veio do rodapé (Jogos Leves/Médios/Pesados) via ?peso=
    verificarFiltroPesoURL();

    // Se algum filtro já veio marcado pela URL, abre o painel automaticamente pra deixar visível
    if (document.querySelector('.filtro-grupo input[type="checkbox"]:checked') && filtrosToggle && filtrosConteudo) {
        filtrosConteudo.classList.add('aberto');
        filtrosToggle.classList.add('aberto');
        filtrosToggle.setAttribute('aria-expanded', 'true');
    }
    atualizarBadgeFiltros();

    // Inicia a aplicação
    renderizarCatalogo();
    atualizarBadgeCarrinho();
    if (typeof renderizarAreaConta === 'function') renderizarAreaConta();
});

// Atualiza o contador de filtros ativos no botão "FILTROS"
function atualizarBadgeFiltros() {
    const badge = document.getElementById('filtros-badge');
    if (!badge) return;
    const marcados = document.querySelectorAll('.filtro-grupo input[type="checkbox"]:checked').length;
    if (marcados > 0) {
        badge.textContent = marcados;
        badge.style.display = 'inline-flex';
    } else {
        badge.style.display = 'none';
    }
}

// Lê o parâmetro ?jogo= da URL e já filtra o catálogo para aquele jogo específico
function verificarJogoURL(searchBox) {
    const parametros = new URLSearchParams(window.location.search);
    const jogoURL = parametros.get('jogo');

    if (jogoURL) {
        termoPesquisa = jogoURL.toLowerCase();
        if (searchBox) searchBox.value = jogoURL;
        jogoAlvoExato = jogoURL.toLowerCase();
    }
}

// Lê o parâmetro ?peso= da URL (usado pelos links do rodapé: Jogos Leves/Médios/Pesados)
// e já marca o checkbox de desempenho correspondente, filtrando o catálogo.
function verificarFiltroPesoURL() {
    const parametros = new URLSearchParams(window.location.search);
    const pesoURL = parametros.get('peso'); // "leve", "medio" ou "pesado"

    if (pesoURL) {
        const checkbox = document.querySelector(`.filtro-grupo input[name="peso"][value="${pesoURL}"]`);
        if (checkbox) checkbox.checked = true;
    }
}

// Função principal de Filtro e Divisão de Páginas
function renderizarCatalogo() {
    const pesosMarcados = Array.from(document.querySelectorAll('.filtro-grupo input[name="peso"]:checked')).map(cb => cb.value);
    const categoriasMarcadas = Array.from(document.querySelectorAll('.filtro-grupo input[name="categoria"]:checked')).map(cb => cb.value);

    const filtrados = catalogoExpandido.filter(jogo => {
        const matchesPesquisa = jogo.nome.toLowerCase().includes(termoPesquisa) || 
            jogo.categoria.toLowerCase().includes(termoPesquisa);

        const matchesPeso = pesosMarcados.length === 0 || pesosMarcados.includes(obterFaixaDesempenho(jogo.nome));

        const matchesCategoria = categoriasMarcadas.length === 0 || 
            categoriasMarcadas.some(valor => jogoTemCategoria(jogo, valor));

        return matchesPesquisa && matchesPeso && matchesCategoria;
    });

    // Se veio um jogo exato pela URL (busca global ou card de outra página),
    // acha a posição dele dentro da lista filtrada e pula pra página certa.
    // Só roda uma vez: jogoAlvoExato é zerado logo em seguida.
    let idParaDestacar = null;
    if (jogoAlvoExato !== null) {
        const indiceAlvo = filtrados.findIndex(j => j.nome.toLowerCase() === jogoAlvoExato);
        if (indiceAlvo !== -1) {
            paginaAtual = Math.floor(indiceAlvo / ITENS_POR_PAGINA) + 1;
            idParaDestacar = filtrados[indiceAlvo].id;
        }
        jogoAlvoExato = null;
    }

    const totalItens = filtrados.length;
    const totalPaginas = Math.ceil(totalItens / ITENS_POR_PAGINA) || 1;
    
    // Trava de segurança para não acessar página vazia
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    // Lógica de fatiamento (Slice) da array
    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    const jogosPagina = filtrados.slice(inicio, fim);

    renderizarCards(jogosPagina);
    renderizarBotoesPaginacao(totalPaginas);

    if (idParaDestacar !== null) {
        destacarJogoNaTela(idParaDestacar);
    }
}

// Rola até o card do jogo encontrado e aplica um destaque visual temporário
function destacarJogoNaTela(id) {
    const container = document.getElementById('catalogo-container');
    const card = container ? container.querySelector(`[data-id="${id}"]`) : null;
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("destaque-busca");
    setTimeout(() => card.classList.remove("destaque-busca"), 3600);
}

// Renderiza apenas os itens da página atual
function renderizarCards(lista) {
    const container = document.getElementById('catalogo-container');
    container.innerHTML = "";
    
    if (lista.length === 0) {
        container.innerHTML = `<p style="color: #8a8fb8; margin: 2vw 0; text-align: center;">Nenhum jogo encontrado.</p>`;
        return;
    }

    lista.forEach(jogo => {
        const cardHTML = `
        <div class="cards" data-id="${jogo.id}">
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
                    <button class="btn_setup" onclick="window.location.href='../Setup_Page/setup.html?jogo=${encodeURIComponent(jogo.nome)}'">MONTAR SETUP</button>
                </div>
            </div>
        </div>`;
        container.innerHTML += cardHTML;
    });
}

// Renderiza os botões de paginação no mesmo padrão da Loja: 1-5 e reticências para as próximas
function renderizarBotoesPaginacao(totalPaginas) {
    const containerPaginacao = document.getElementById("container-paginacao");
    containerPaginacao.innerHTML = "";
    if (totalPaginas <= 1) return;

    const MAX_VISIVEL = 5;

    const criarBotaoNumero = (numero) => {
        const botao = document.createElement("button");
        botao.innerText = numero;
        if (numero === paginaAtual) botao.classList.add("ativo");

        botao.addEventListener("click", () => {
            paginaAtual = numero;
            renderizarCatalogo();
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
        containerPaginacao.appendChild(botao);
    };

    const criarPontinhos = (proximaPagina) => {
        const botao = document.createElement("button");
        botao.innerText = "...";
        botao.classList.add("pontos");

        botao.addEventListener("click", () => {
            paginaAtual = proximaPagina;
            renderizarCatalogo();
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
        containerPaginacao.appendChild(botao);
    };

    // Se todas as páginas cabem nos botões visíveis, mostra todas normalmente
    if (totalPaginas <= MAX_VISIVEL) {
        for (let i = 1; i <= totalPaginas; i++) criarBotaoNumero(i);
        return;
    }

    // Calcula a janela de páginas visíveis, sempre contendo a página atual
    let inicio = Math.max(1, paginaAtual - Math.floor(MAX_VISIVEL / 2));
    let fim = inicio + MAX_VISIVEL - 1;

    if (fim > totalPaginas) {
        fim = totalPaginas;
        inicio = fim - MAX_VISIVEL + 1;
    }

    // Pontinhos à esquerda, caso a janela não comece na página 1
    if (inicio > 1) {
        criarPontinhos(inicio - 1);
    }

    for (let i = inicio; i <= fim; i++) criarBotaoNumero(i);

    // Pontinhos à direita, caso a janela não termine na última página
    if (fim < totalPaginas) {
        criarPontinhos(fim + 1);
    }
}

function atualizarBadgeCarrinho() {
    const badge = document.getElementById('badge-carrinho');
    if(!badge) return;

    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    if (totalItens > 0) {
        badge.innerText = totalItens;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}
