/* =========================================================================
   LOJA_SCRIPT.JS - Logica exclusiva da pagina da Loja (catalogo/paginacao)
   O banco de dados dos produtos agora fica em um arquivo separado:
   -> dados-produtos.js (catalogoBase)
   Ele deve ser carregado no HTML ANTES deste arquivo.
========================================================================= */

// Duplicando itens para formar 25 jogos (5 páginas de 5 itens) e gerando IDs únicos
const catalogoExpandido = [...catalogoBase, ...catalogoBase.slice(0, 0)].map((jogo, index) => ({
    ...jogo, 
    id: index + 1
}));

// Variáveis de Controle da Paginação
const ITENS_POR_PAGINA = 5;
let paginaAtual = 1;
let termoPesquisa = "";

document.addEventListener("DOMContentLoaded", () => {
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

    // Inicia a aplicação
    renderizarCatalogo();
    atualizarBadgeCarrinho();
    if (typeof renderizarAreaConta === 'function') renderizarAreaConta();
});

// Função principal de Filtro e Divisão de Páginas
function renderizarCatalogo() {
    const filtrados = catalogoExpandido.filter(jogo => 
        jogo.nome.toLowerCase().includes(termoPesquisa) || 
        jogo.categoria.toLowerCase().includes(termoPesquisa)
    );

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
}

// Renderiza apenas os 5 itens da página atual
function renderizarCards(lista) {
    const container = document.getElementById('catalogo-container');
    container.innerHTML = "";
    
    if (lista.length === 0) {
        container.innerHTML = `<p style="color: #8a8fb8; margin: 2vw 0; text-align: center;">Nenhum jogo encontrado.</p>`;
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

// Renderiza os botões dinamicamente
function renderizarBotoesPaginacao(totalPaginas) {
    const containerPaginacao = document.getElementById("container-paginacao");
    containerPaginacao.innerHTML = "";
    
    // Se só tiver 1 página ou nenhuma, não mostra os botões
    if (totalPaginas <= 1) return;

    for (let i = 1; i <= totalPaginas; i++) {
        const botao = document.createElement("button");
        botao.innerText = i;
        
        if (i === paginaAtual) botao.classList.add("ativo");
        
        botao.addEventListener("click", () => {
            paginaAtual = i;
            renderizarCatalogo();
            // Dá um scroll suave de volta pro topo do catálogo
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
        
        containerPaginacao.appendChild(botao);
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