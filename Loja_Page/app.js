const produtos = [
    { "id": 1, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA RTX 4080 16GB", "score": 98, "precoOriginal": "7.999", "precoPromocao": "7.299", "imagem": "./img_loja/ts.png", "video": null },
    { "id": 2, "categoria": "PROCESSADOR", "nome": "Intel Core i9-13900K", "score": 96, "precoOriginal": "4.599", "precoPromocao": "4.199", "imagem": "./img_loja/intel.png", "video": null },
    { "id": 3, "categoria": "MOUSE", "nome": "Logitech G Pro X Superlight 2", "score": 96, "precoOriginal": "899", "precoPromocao": "699", "imagem": "./img_loja/mouse.png", "video": "./img_loja/mouse.mp4.mp4" },
    { "id": 4, "categoria": "HEADSET", "nome": "SteelSeries Arctis Nova Pro", "score": 94, "precoOriginal": "1.499", "precoPromocao": "1.200", "imagem": "./img_loja/H.png", "video": null },
    { "id": 5, "categoria": "HEADSET", "nome": "SteelSeries Arctis Nova Pro (Duplicado)", "score": 94, "precoOriginal": "1.499", "precoPromocao": "1.200", "imagem": "./img_loja/H.png", "video": null },
    { "id": 6, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 9 7950X", "score": 98, "precoOriginal": "4.299", "precoPromocao": "3.799", "imagem": "./img_loja/PROCESSADOR.png", "video": null },
    { "id": 7, "categoria": "HEADSET", "nome": "SteelSeries Arctis Nova Pro Wireless", "score": 94, "precoOriginal": "1.499", "precoPromocao": "1.200", "imagem": "./img_loja/headset.png", "video": "./img_loja/headset.mp4" },
    { "id": 8, "categoria": "MONITOR", "nome": "ASUS ROG Swift 25\" 360Hz", "score": 100, "precoOriginal": "3.299", "precoPromocao": "2.950", "imagem": "./img_loja/monitor.png", "video": "./img_loja/monitor.mp4" },
    { "id": 9, "categoria": "PLACA DE VÍDEO", "nome": "NVIDIA GeForce RTX 5090", "score": 98, "precoOriginal": "15.000", "precoPromocao": "13.500", "imagem": "./img_loja/PROCESSADOR.png", "video": null },
    { "id": 10, "categoria": "PROCESSADOR", "nome": "AMD Ryzen 9 9950X", "score": 100, "precoOriginal": "4.299", "precoPromocao": "4.000", "imagem": "./img_loja/PROCESSADOR.png", "video": null },
    { "id": 11, "categoria": "MEMORIA", "nome": "Corsair Vengeance RGB DDR5 32GB", "score": 100, "precoOriginal": "899", "precoPromocao": "650", "imagem": "./img_loja/PROCESSADOR.png", "video": null },
    { "id": 12, "categoria": "HEADSET", "nome": "HyperX Cloud III", "score": 100, "precoOriginal": "439,99", "precoPromocao": "390", "imagem": "./img_loja/PROCESSADOR.png", "video": null },
    { "id": 13, "categoria": "MONITOR", "nome": "ASUS ROG Swift PG259QN", "score": 100, "precoOriginal": "4.200", "precoPromocao": "3.999", "imagem": "./img_loja/PROCESSADOR.png", "video": null },
    { "id": 14, "categoria": "TECLADO", "nome": "SteelSeries Apex Pro", "score": 100, "precoOriginal": "1.099", "precoPromocao": "950", "imagem": "./img_loja/PROCESSADOR.png", "video": null },
    { "id": 15, "categoria": "PLACA MAE", "nome": "ASUS ROG Strix X870-E Gaming WiFi", "score": 100, "precoOriginal": "2.100", "precoPromocao": "1.850", "imagem": "./img_loja/PROCESSADOR.png", "video": null },
    { "id": 16, "categoria": "FONTE", "nome": "Corsair RM1000x", "score": 100, "precoOriginal": "1.099,90", "precoPromocao": "950", "imagem": "./img_loja/FONTES.jpg", "video": null }
];

const ITENS_POR_PAGINA = 9; // Fica muito melhor numa grid preenchida com múltiplas linhas de 3
let paginaAtual = 1;
let termoPesquisa = "";

const containerProdutos = document.getElementById("container-produtos");
const containerPaginacao = document.getElementById("container-paginacao");
const searchBox = document.getElementById("search-box");
const btnLupa = document.querySelector(".btn-lupa");

document.addEventListener("DOMContentLoaded", () => {
    renderizarLoja();
    configurarEventos();
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

// ... Mantenha todo o seu código de produtos e filtros lá em cima ...

// Substitua a função comprarItem antiga por esta:
function comprarItem(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    // Busca o carrinho salvo no navegador (ou cria um novo vazio)
    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    
    // Verifica se o item já está no carrinho
    let itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        // Clona o produto e adiciona a quantidade = 1
        const produtoParaCarrinho = { ...produto, quantidade: 1 };
        carrinho.push(produtoParaCarrinho);
    }

    // Salva de volta no navegador
    localStorage.setItem('nexus_cart', JSON.stringify(carrinho));

    // Mostra a notificação e atualiza a bolinha
    mostrarToast(`<b>${produto.nome}</b> adicionado ao carrinho!`);
    atualizarBadgeCarrinho();
}

// Funcionalidade da notificação (Toast)
let toastTimeout;
function mostrarToast(mensagem) {
    const toast = document.getElementById('toast-notificacao');
    const toastMsg = document.getElementById('toast-mensagem');
    
    toastMsg.innerHTML = mensagem;
    toast.classList.add('mostrar');

    clearTimeout(toastTimeout);
    // Esconde automaticamente após 5 segundos
    toastTimeout = setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 5000);
}

// Atualiza o numero na bolinha do carrinho
function atualizarBadgeCarrinho() {
    const badge = document.getElementById('badge-carrinho');
    if(!badge) return;

    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    
    // Soma a quantidade de todos os itens
    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    if (totalItens > 0) {
        badge.innerText = totalItens;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Adicione atualizarBadgeCarrinho() dentro do seu DOMContentLoaded lá em cima, 
// ou simplesmente coloque essa linha no final do arquivo para rodar ao carregar a página:
atualizarBadgeCarrinho();