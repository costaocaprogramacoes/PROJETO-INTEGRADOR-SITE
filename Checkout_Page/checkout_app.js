document.addEventListener("DOMContentLoaded", () => {
    inicializarAbasPagamento();
    renderizarResumoCheckout();
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

function inicializarAbasPagamento() {
    const botoesAba = document.querySelectorAll('.aba-btn');
    const paineis = document.querySelectorAll('.metodo-painel');

    botoesAba.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesAba.forEach(b => b.classList.remove('ativa'));
            paineis.forEach(p => p.classList.remove('ativo'));

            botao.classList.add('ativa');
            
            const metodo = botao.getAttribute('data-metodo');
            const painelAlvo = document.getElementById(`painel-${metodo}`);
            if (painelAlvo) {
                painelAlvo.classList.add('ativo');
            }
        });
    });
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

function renderizarResumoCheckout() {
    const containerProdutos = document.getElementById('checkout-produtos-lista');
    const txtQtdItens = document.getElementById('checkout-qtd-itens');
    const txtSubtotal = document.getElementById('checkout-subtotal');
    const txtFrete = document.getElementById('checkout-frete');
    const txtTotal = document.getElementById('checkout-total');
    const txtParcelamento = document.getElementById('checkout-parcelamento');
    const badgeCarrinho = document.getElementById('badge-carrinho');

    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        window.location.href = '../Carrinho_Page/carrinho.html';
        return;
    }

    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    if (badgeCarrinho && totalItens > 0) {
        badgeCarrinho.innerText = totalItens;
        badgeCarrinho.style.display = 'flex';
    }

    let htmlProdutos = '<div class="checkout-lista-produtos">';
    let subtotal = 0;

    carrinho.forEach(item => {
        const precoNumerico = converterPrecoParaNumero(item.precoPromocao);
        subtotal += (precoNumerico * item.quantidade);

        htmlProdutos += `
            <div class="checkout-item-mini">
                <img src="${item.imagem}" alt="${item.nome}" class="item-mini-img">
                <div class="item-mini-info">
                    <span class="item-mini-nome">${item.nome}</span>
                    <span class="item-mini-qty">Qty: ${item.quantidade}</span>
                </div>
                <span class="item-mini-preco">R$ ${item.precoPromocao}</span>
            </div>
        `;
    });
    htmlProdutos += '</div>';
    containerProdutos.innerHTML = htmlProdutos;

    let valorFrete = subtotal >= 5000 ? 0 : 49.90;
    let totalFinal = subtotal + valorFrete;

    txtQtdItens.innerText = `Subtotal (${totalItens} ${totalItens === 1 ? 'item' : 'itens'})`;
    txtSubtotal.innerText = `R$ ${formatarMoeda(subtotal)}`;
    txtFrete.innerText = valorFrete === 0 ? "Grátis" : `R$ ${formatarMoeda(valorFrete)}`;
    txtTotal.innerText = `R$ ${formatarMoeda(totalFinal)}`;
    txtParcelamento.innerText = `ou 12x de R$ ${formatarMoeda(totalFinal / 12)} sem juros`;

    const btnConfirmar = document.getElementById('btn-confirmar-checkout');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', () => {
            alert('Pedido enviado para processamento com sucesso!');
            localStorage.removeItem('nexus_cart');
            window.location.href = '../Main_Page/main.html';
        });
    }
}