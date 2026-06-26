document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();
    atualizarBadgeCarrinho();
    configurarLupaPesquisa();
});

function configurarLupaPesquisa() {
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
}

function converterPrecoParaNumero(precoString) {
    if (!precoString) return 0;
    let semPonto = precoString.replace(/\./g, '');
    let formatado = semPonto.replace(',', '.');
    return parseFloat(formatado);
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderizarCarrinho() {
    const container = document.getElementById('carrinho-conteudo');
    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];

    if (carrinho.length === 0) {
        container.innerHTML = `
            <div class="carrinho-vazio-container">
                <div class="cont-icone-carrinho">
                    <svg class="icone-carrinho" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </div>
                <div class="carrinho-vazio-texto">
                    <span class="carrinho-palavra">CARRINHO</span> <span class="vazio-palavra">VAZIO</span>
                </div>
                <p class="carrinho-vazio-subtexto">Adicione produtos para começar.</p>
                <button class="btn-ver-produtos" onclick="window.location.href='../Loja_Page/loja.html'">VER PRODUTOS</button>
            </div>
        `;
        return;
    }

    let htmlItens = '<div class="lista-itens">';
    let subtotal = 0;
    let totalItens = 0;

    carrinho.forEach(item => {
        const precoNumerico = converterPrecoParaNumero(item.precoPromocao);
        subtotal += (precoNumerico * item.quantidade);
        totalItens += item.quantidade;

        htmlItens += `
            <div class="item-card">
                <img src="${item.imagem}" alt="${item.nome}" class="item-img">
                <div class="item-info">
                    <span class="item-cat">${item.categoria}</span>
                    <span class="item-nome">${item.nome}</span>
                    <div class="item-controles">
                        <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
                        <span>${item.quantidade}</span>
                        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="item-acoes">
                    <i class="fa-solid fa-trash btn-remover" onclick="removerItem(${item.id})"></i>
                    <span class="item-preco">R$ ${item.precoPromocao}</span>
                </div>
            </div>
        `;
    });
    htmlItens += '</div>';

    let valorFrete = subtotal >= 5000 ? 0 : 49.90;
    let textoFrete = valorFrete === 0 ? "Grátis" : `R$ 49,90`;
    let totalFinal = subtotal + valorFrete;

    const htmlResumo = `
        <aside class="resumo-pedido">
            <h3>RESUMO DO PEDIDO</h3>
            <div class="resumo-linha">
                <span>Subtotal (${totalItens} itens)</span>
                <span>R$ ${formatarMoeda(subtotal)}</span>
            </div>
            <div class="resumo-linha">
                <span>Frete</span>
                <span>${textoFrete}</span>
            </div>
            <div class="aviso-frete">Frete grátis acima de R$ 5.000,00</div>
            <div class="linha-divisoria"></div>
            <div class="resumo-total">
                <span>TOTAL</span>
                <span>R$ ${formatarMoeda(totalFinal)}</span>
            </div>
            <div class="parcelamento">ou 12x de R$ ${formatarMoeda(totalFinal / 12)} sem juros</div>
            
            <button class="btn-finalizar" onclick="window.location.href='../Checkout_Page/checkout.html'">FINALIZAR COMPRA</button>

            <ul class="trust-badges">
                <li><i class="fa-solid fa-shield-halved"></i> Compra 100% segura</li>
                <li><i class="fa-solid fa-box"></i> Entrega em 3–7 dias úteis</li>
                <li><i class="fa-solid fa-check"></i> 30 dias de garantia</li>
            </ul>
        </aside>
    `;

    container.innerHTML = htmlItens + htmlResumo;
}

window.alterarQuantidade = function(id, delta) {
    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    let item = carrinho.find(i => i.id === id);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(i => i.id !== id);
        }
        localStorage.setItem('nexus_cart', JSON.stringify(carrinho));
        renderizarCarrinho();
        atualizarBadgeCarrinho();
    }
}

window.removerItem = function(id) {
    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    carrinho = carrinho.filter(i => i.id !== id);
    localStorage.setItem('nexus_cart', JSON.stringify(carrinho));
    renderizarCarrinho();
    atualizarBadgeCarrinho();
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