/* =========================================================================
   LOJA_SCRIPT.JS - Logica exclusiva da pagina Montar Setup
   Os bancos de dados (jogos e produtos) agora ficam em arquivos separados:
   -> dados-produtos.js  (produtos)
   Deve ser carregado no HTML ANTES deste arquivo.
========================================================================= */

const ITENS_POR_PAGINA = 8; 
let paginaAtual = 1;
let termoPesquisa = "";

const containerProdutos = document.getElementById("container-produtos");
const containerPaginacao = document.getElementById("container-paginacao");
const searchBox = document.getElementById("search-box");
const btnLupa = document.querySelector(".btn-lupa");

document.addEventListener("DOMContentLoaded", () => {
    renderizarLoja();
    configurarEventos();
    atualizarBadgeCarrinho();
});

function renderizarLoja() {
    const checkboxesMarcados = Array.from(document.querySelectorAll('.filtro-grupo input[type="checkbox"]:checked')).map(cb => cb.value);

    const produtosFiltrados = produtos.filter(produto => {
        const matchesCategoria = checkboxesMarcados.length === 0 || checkboxesMarcados.includes(produto.categoria);
        const matchesPesquisa = produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) || 
                                produto.categoria.toLowerCase().includes(termoPesquisa.toLowerCase());
        return matchesCategoria && matchesPesquisa;
    });

    const totalItens = produtosFiltrados.length;
    const totalPaginas = Math.ceil(totalItens / ITENS_POR_PAGINA) || 1;
    
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    const produtosPagina = produtosFiltrados.slice(inicio, fim);

    renderizarCards(produtosPagina);
    renderizarBotoesPaginacao(totalPaginas);
}

function renderizarCards(listaProdutos) {
    containerProdutos.innerHTML = "";

    if (listaProdutos.length === 0) {
        containerProdutos.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #7070A0; margin-top: 40px;">Nenhum produto encontrado.</p>`;
        return;
    }

    listaProdutos.forEach(produto => {
        const cardHTML = `
            <div class="card">
                <div class="video-container">
                    <img class="card1-img" src="${produto.imagem}" alt="${produto.nome}">
                    ${produto.video ? `
                        <video class="video-hover" autoplay muted loop playsinline>
                            <source src="${produto.video}" type="video/mp4">
                        </video>
                    ` : ''}
                </div>
                <div class="cardp"><p>${produto.categoria}</p></div>
                <div class="h1"><p>${produto.nome}</p></div>
                <div class="score"><p>🔹Score ${produto.score}/100</p></div>
                <div class="precos"><span>R$ ${produto.precoOriginal}</span></div>
                <div class="promos"><span>R$ ${produto.precoPromocao}</span></div>
                <div class="botao"><button onclick="comprarItem(${produto.id})">Comprar</button></div>
            </div>
        `;
        containerProdutos.innerHTML += cardHTML;
    });
}

function renderizarBotoesPaginacao(totalPaginas) {
    containerPaginacao.innerHTML = "";
    if (totalPaginas <= 1) return;

    for (let i = 1; i <= totalPaginas; i++) {
        const botao = document.createElement("button");
        botao.innerText = i;
        if (i === paginaAtual) botao.classList.add("ativo");
        
        botao.addEventListener("click", () => {
            paginaAtual = i;
            renderizarLoja();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        containerPaginacao.appendChild(botao);
    }
}

function configurarEventos() {
    document.querySelectorAll('.filtro-grupo input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            paginaAtual = 1;
            renderizarLoja();
        });
    });

    if (searchBox) {
        searchBox.addEventListener("input", (e) => {
            termoPesquisa = e.target.value;
            paginaAtual = 1;
            renderizarLoja();
        });
    }

    if (btnLupa && searchBox) {
        btnLupa.addEventListener("click", () => {
            searchBox.classList.toggle("ativo");
            if (searchBox.classList.contains("ativo")) searchBox.focus();
        });
    }
}

function comprarItem(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    
    let itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        const produtoParaCarrinho = { ...produto, quantidade: 1 };
        carrinho.push(produtoParaCarrinho);
    }

    localStorage.setItem('nexus_cart', JSON.stringify(carrinho));

    mostrarToast(`<b>${produto.nome}</b> adicionado ao carrinho!`);
    atualizarBadgeCarrinho();
}

let toastTimeout;
function mostrarToast(mensagem) {
    const toast = document.getElementById('toast-notificacao');
    const toastMsg = document.getElementById('toast-mensagem');
    
    toastMsg.innerHTML = mensagem;
    toast.classList.add('mostrar');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 5000);
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