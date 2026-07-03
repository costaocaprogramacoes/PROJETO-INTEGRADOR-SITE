/* =========================================================================
   LOJA_SCRIPT.JS - Logica exclusiva da pagina Montar Setup
   Os bancos de dados (jogos e produtos) agora ficam em arquivos separados:
   -> dados-produtos.js  (produtos)
   Deve ser carregado no HTML ANTES deste arquivo.
========================================================================= */

const ITENS_POR_PAGINA = 8; 
let paginaAtual = 1;
let termoPesquisa = "";
let ordenacao = "relevancia";
let precoMin = null;
let precoMax = null;

const containerProdutos = document.getElementById("container-produtos");
const containerPaginacao = document.getElementById("container-paginacao");
const searchBox = document.getElementById("search-box");
const btnLupa = document.querySelector(".btn-lupa");
const inputPrecoMin = document.getElementById("preco-min");
const inputPrecoMax = document.getElementById("preco-max");

// Converte o preço "efetivo" do produto (promoção se existir, senão o preço normal) em número real.
// Formato dos dados: "7.299", "1.199,99", " 599,99", "R$ 1.499,99"
function obterPrecoNumerico(produto) {
    let valor = produto.precoPromocao || produto.precoOriginal;
    if (typeof valor === "number") return valor;

    valor = String(valor)
        .trim()
        .replace(/[^\d,]/g, "")  // remove tudo que não for dígito ou vírgula (ex: "R$", espaços, pontos de milhar)
        .replace(",", ".");      // vírgula decimal vira ponto

    return parseFloat(valor) || 0;
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarLoja();
    configurarEventos();
    atualizarBadgeCarrinho();
});

function renderizarLoja() {
    const checkboxesMarcados = Array.from(document.querySelectorAll('.filtro-grupo input[type="checkbox"]:checked')).map(cb => cb.value);

    let produtosFiltrados = produtos.filter(produto => {
        const matchesCategoria = checkboxesMarcados.length === 0 || checkboxesMarcados.includes(produto.categoria);
        const matchesPesquisa = produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) || 
                                produto.categoria.toLowerCase().includes(termoPesquisa.toLowerCase());

        const precoNumerico = obterPrecoNumerico(produto);
        const matchesPrecoMin = precoMin === null || precoNumerico >= precoMin;
        const matchesPrecoMax = precoMax === null || precoNumerico <= precoMax;

        return matchesCategoria && matchesPesquisa && matchesPrecoMin && matchesPrecoMax;
    });

    produtosFiltrados = ordenarProdutos(produtosFiltrados);

    const totalItens = produtosFiltrados.length;
    const totalPaginas = Math.ceil(totalItens / ITENS_POR_PAGINA) || 1;
    
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    const produtosPagina = produtosFiltrados.slice(inicio, fim);

    renderizarCards(produtosPagina);
    renderizarBotoesPaginacao(totalPaginas);
}

function ordenarProdutos(lista) {
    const listaOrdenada = [...lista];

    switch (ordenacao) {
        case "menor-preco":
            listaOrdenada.sort((a, b) => obterPrecoNumerico(a) - obterPrecoNumerico(b));
            break;
        case "maior-preco":
            listaOrdenada.sort((a, b) => obterPrecoNumerico(b) - obterPrecoNumerico(a));
            break;
        case "relevancia":
        default:
            listaOrdenada.sort((a, b) => b.score - a.score);
            break;
    }

    return listaOrdenada;
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
                ${produto.precoPromocao ? `<div class="precos"><span>R$ ${produto.precoOriginal}</span></div>` : ''}
                <div class="promos"><span>R$ ${produto.precoPromocao || produto.precoOriginal}</span></div>
                <div class="botao"><button onclick="comprarItem(${produto.id})">Comprar</button></div>
            </div>
        `;
        containerProdutos.innerHTML += cardHTML;
    });
}

function renderizarBotoesPaginacao(totalPaginas) {
    containerPaginacao.innerHTML = "";
    if (totalPaginas <= 1) return;

    const MAX_VISIVEL = 5;

    const criarBotaoNumero = (numero) => {
        const botao = document.createElement("button");
        botao.innerText = numero;
        if (numero === paginaAtual) botao.classList.add("ativo");

        botao.addEventListener("click", () => {
            paginaAtual = numero;
            renderizarLoja();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        containerPaginacao.appendChild(botao);
    };

    const criarPontinhos = (proximaPagina) => {
        const botao = document.createElement("button");
        botao.innerText = "...";
        botao.classList.add("pontos");

        botao.addEventListener("click", () => {
            paginaAtual = proximaPagina;
            renderizarLoja();
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

    document.querySelectorAll('input[name="ordenacao"]').forEach(radio => {
        radio.addEventListener("change", (e) => {
            ordenacao = e.target.value;
            paginaAtual = 1;
            renderizarLoja();
        });
    });

    if (inputPrecoMin) {
        inputPrecoMin.addEventListener("input", (e) => {
            precoMin = e.target.value === "" ? null : parseFloat(e.target.value);
            paginaAtual = 1;
            renderizarLoja();
        });
    }

    if (inputPrecoMax) {
        inputPrecoMax.addEventListener("input", (e) => {
            precoMax = e.target.value === "" ? null : parseFloat(e.target.value);
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