/* =========================================================================
   LOJA_SCRIPT.JS - Logica exclusiva da pagina Montar Setup
   Os bancos de dados (jogos e produtos) agora ficam em arquivos separados:
   -> dados-produtos.js  (produtos)
   Deve ser carregado no HTML ANTES deste arquivo.
========================================================================= */

const ITENS_POR_PAGINA = 10; 
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

    verificarFiltroURL();
    
    renderizarLoja();
    configurarEventos();
    atualizarBadgeCarrinho();
    if (typeof renderizarAreaConta === 'function') renderizarAreaConta();
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
                <div class="video-container" onclick="abrirModalProduto(${produto.id})">
                    <img class="card1-img" src="${produto.imagem}" alt="${produto.nome}">
                    ${produto.video ? `
                        <video class="video-hover" autoplay muted loop playsinline>
                            <source src="${produto.video}" type="video/mp4">
                        </video>
                    ` : ''}
                    <div class="overlay-detalhes">
                        <button type="button" class="btn-ver-detalhes" onclick="event.stopPropagation(); abrirModalProduto(${produto.id})">Ver Detalhes</button>
                    </div>
                </div>
                <div class="cardp"><p>${produto.categoria}</p></div>
                <div class="h1"><p>${produto.nome}</p></div>
                <div class="score"><p>🔹Score ${produto.score}/100</p></div>
                ${produto.precoPromocao ? `<div class="precos"><span>R$ ${produto.precoOriginal}</span></div>` : ''}
                <div class="promos"><span>R$ ${produto.precoPromocao || produto.precoOriginal}</span></div>
                <div class="botao"><button onclick="event.stopPropagation(); comprarItem(${produto.id})">Comprar</button></div>
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

/* =========================================================================
   MODAL DE DETALHES DO PRODUTO
   As especificações de cada produto ficam salvas no localStorage
   (chave 'nexus_specs_overrides'), guardadas por id do produto.
   Isso permite adicionar/remover specs sem alterar o arquivo de dados,
   e as alterações continuam salvas mesmo depois de recarregar a página.
========================================================================= */

const CHAVE_SPECS = 'nexus_specs_overrides';
let produtoModalAtual = null;

function obterOverridesSpecs() {
    return JSON.parse(localStorage.getItem(CHAVE_SPECS)) || {};
}

function salvarOverridesSpecs(overrides) {
    localStorage.setItem(CHAVE_SPECS, JSON.stringify(overrides));
}

// Retorna as specs "efetivas" do produto, mesclando 3 origens (da mais
// "oficial" pra mais "provisória"):
//   1) produto.especificacoes  -> vem do dados-produtos.js (base fixa)
//   2) especificacoesExtras    -> vem do especificacoes-extras.js (commitado no Git,
//                                  visível pra todo mundo que der git pull)
//   3) overrides do localStorage -> edições feitas AGORA neste navegador,
//                                  que ainda não foram exportadas/commitadas
function obterSpecsProduto(produto) {
    const overridesLocais = obterOverridesSpecs();
    const base = produto.especificacoes || {};
    const commitado = (typeof especificacoesExtras !== 'undefined' && especificacoesExtras[produto.id]) || null;
    const local = overridesLocais[produto.id];

    if (local) return { ...local };
    if (commitado) return { ...commitado };
    return { ...base };
}

function garantirModalExiste() {
    if (document.getElementById('modal-produto-overlay')) return;

    const modalHTML = `
        <div id="modal-produto-overlay" class="modal-produto-overlay">
            <div class="modal-produto">
                <button type="button" class="modal-fechar" onclick="fecharModalProduto()">&times;</button>

                <div class="modal-produto-topo">
                    <div class="modal-produto-imagem">
                        <img id="modal-img" src="" alt="">
                    </div>

                    <div class="modal-produto-info">
                        <p class="modal-categoria" id="modal-categoria"></p>
                        <h2 id="modal-nome"></h2>
                        <p class="modal-score" id="modal-score"></p>

                        <div class="modal-precos">
                            <span class="modal-preco-original" id="modal-preco-original" style="display:none;"></span>
                            <span class="modal-preco-final" id="modal-preco-final"></span>
                        </div>

                        <button type="button" class="modal-btn-comprar" id="modal-btn-comprar">Adicionar ao Carrinho</button>
                    </div>
                </div>

                <div class="modal-specs-area">
                    <h3>ESPECIFICAÇÕES</h3>
                    <div id="modal-specs-lista" class="modal-specs-lista"></div>

                    <div class="modal-add-spec" id="modal-add-spec-form">
                        <input type="text" id="input-spec-nome" placeholder="Nome (ex: Fabricante)">
                        <input type="text" id="input-spec-valor" placeholder="Valor (ex: NVIDIA)">
                        <button type="button" onclick="adicionarEspecificacao()">+ Adicionar</button>
                    </div>

                    <div id="modal-export-area" class="modal-export-area">
                        <button type="button" class="modal-btn-exportar" onclick="exportarEspecificacoes()">
                            ⬇ Exportar para o Git
                        </button>
                        <p class="modal-export-aviso">Baixa <code>especificacoes-extras.js</code> atualizado. Substitua o arquivo no repositório e faça commit + push para que as mudanças apareçam para todo mundo.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('modal-produto-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'modal-produto-overlay') fecharModalProduto();
    });
}

function abrirModalProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    garantirModalExiste();
    produtoModalAtual = produto;

    document.getElementById('modal-img').src = produto.imagem;
    document.getElementById('modal-img').alt = produto.nome;
    document.getElementById('modal-categoria').innerText = produto.categoria;
    document.getElementById('modal-nome').innerText = produto.nome;
    document.getElementById('modal-score').innerText = `🔹 Score ${produto.score}/100`;

    const precoOriginalEl = document.getElementById('modal-preco-original');
    const precoFinalEl = document.getElementById('modal-preco-final');

    if (produto.precoPromocao) {
        precoOriginalEl.style.display = 'inline';
        precoOriginalEl.innerText = `R$ ${produto.precoOriginal}`;
    } else {
        precoOriginalEl.style.display = 'none';
    }
    precoFinalEl.innerText = `R$ ${produto.precoPromocao || produto.precoOriginal}`;

    document.getElementById('modal-btn-comprar').onclick = () => {
        comprarItem(produto.id);
    };

    renderizarSpecsModal();

    document.getElementById('modal-produto-overlay').classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

function fecharModalProduto() {
    const overlay = document.getElementById('modal-produto-overlay');
    if (overlay) overlay.classList.remove('ativo');
    document.body.style.overflow = '';
    produtoModalAtual = null;
}

// Só o administrador logado pode adicionar/remover especificações.
// Usuários comuns (ou visitantes deslogados) veem a lista, mas somente leitura.
function usuarioPodeEditarSpecs() {
    return typeof ehAdmin === 'function' && ehAdmin();
}

function renderizarSpecsModal() {
    if (!produtoModalAtual) return;

    const podeEditar = usuarioPodeEditarSpecs();
    const lista = document.getElementById('modal-specs-lista');
    const formAdd = document.getElementById('modal-add-spec-form');
    const areaExport = document.getElementById('modal-export-area');
    const specs = obterSpecsProduto(produtoModalAtual);
    const chaves = Object.keys(specs);

    // Mostra o formulário de adicionar especificação e o botão de exportar apenas para admin
    if (formAdd) formAdd.style.display = podeEditar ? 'flex' : 'none';
    if (areaExport) areaExport.style.display = podeEditar ? 'block' : 'none';

    if (chaves.length === 0) {
        lista.innerHTML = podeEditar
            ? `<p class="modal-specs-vazio">Nenhuma especificação cadastrada ainda. Adicione abaixo!</p>`
            : `<p class="modal-specs-vazio">Nenhuma especificação cadastrada para este produto.</p>`;
        return;
    }

    lista.innerHTML = chaves.map(nome => `
        <div class="modal-spec-item">
            <span class="modal-spec-nome">${nome}</span>
            <span class="modal-spec-valor">${specs[nome]}</span>
            ${podeEditar ? `<button type="button" class="modal-spec-remover" onclick="removerEspecificacao('${nome.replace(/'/g, "\\'")}')" title="Remover especificação">&times;</button>` : ''}
        </div>
    `).join('');
}

function adicionarEspecificacao() {
    if (!produtoModalAtual) return;
    if (!usuarioPodeEditarSpecs()) return; // proteção extra: só admin pode chegar até aqui

    const inputNome = document.getElementById('input-spec-nome');
    const inputValor = document.getElementById('input-spec-valor');

    const nome = inputNome.value.trim();
    const valor = inputValor.value.trim();

    if (!nome || !valor) {
        inputNome.focus();
        return;
    }

    const overrides = obterOverridesSpecs();
    const specsAtuais = obterSpecsProduto(produtoModalAtual);

    specsAtuais[nome] = valor;
    overrides[produtoModalAtual.id] = specsAtuais;
    salvarOverridesSpecs(overrides);

    inputNome.value = '';
    inputValor.value = '';
    inputNome.focus();

    renderizarSpecsModal();
}

function removerEspecificacao(nome) {
    if (!produtoModalAtual) return;
    if (!usuarioPodeEditarSpecs()) return; // proteção extra: só admin pode chegar até aqui

    const overrides = obterOverridesSpecs();
    const specsAtuais = obterSpecsProduto(produtoModalAtual);

    delete specsAtuais[nome];
    overrides[produtoModalAtual.id] = specsAtuais;
    salvarOverridesSpecs(overrides);

    renderizarSpecsModal();
}

// Gera o arquivo especificacoes-extras.js com TUDO que já existia commitado
// mais TODAS as edições locais (de qualquer produto, não só o que está aberto
// no modal) e força o download. O admin substitui o arquivo no projeto e
// faz commit + push — assim quem der 'git pull' já vê as specs atualizadas.
function exportarEspecificacoes() {
    if (!usuarioPodeEditarSpecs()) return;

    const overridesLocais = obterOverridesSpecs();
    const combinado = { ...(typeof especificacoesExtras !== 'undefined' ? especificacoesExtras : {}) };

    Object.keys(overridesLocais).forEach(id => {
        combinado[id] = overridesLocais[id];
    });

    const conteudo = `/* =========================================================================\n   ESPECIFICACOES-EXTRAS.JS\n   Gerado automaticamente pelo botão "Exportar para o Git" na Loja.\n   Substitua o arquivo antigo por este no repositório e faça commit + push.\n========================================================================= */\n\nconst especificacoesExtras = ${JSON.stringify(combinado, null, 4)};\n`;

    const blob = new Blob([conteudo], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'especificacoes-extras.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    mostrarToast('Arquivo <b>especificacoes-extras.js</b> baixado! Substitua no projeto e dê commit + push.');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModalProduto();
});

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

// Função para checar se existe uma categoria na URL e marcar o checkbox
function verificarFiltroURL() {
    const parametros = new URLSearchParams(window.location.search);
    const categoriaURL = parametros.get('categoria'); // Pega o valor ex: "PROCESSADOR"

    if (categoriaURL) {
        // Busca o checkbox que tem o mesmo value da URL
        const checkbox = document.querySelector(`.filtro-grupo input[type="checkbox"][value="${categoriaURL}"]`);
        
        if (checkbox) {
            checkbox.checked = true; // Marca o checkbox
        }
    }
}