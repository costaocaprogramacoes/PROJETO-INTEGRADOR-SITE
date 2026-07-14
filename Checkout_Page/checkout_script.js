document.addEventListener("DOMContentLoaded", () => {
    configurarMenuMobile();
    inicializarAbasPagamento();
    renderizarResumoCheckout();
    configurarLupaPesquisa();
    if (typeof renderizarAreaConta === 'function') renderizarAreaConta();
});

function configurarMenuMobile() {
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
}

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
    let limpo = String(precoString).trim().replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(limpo) || 0;
}

// Pega o preço efetivo do item: usa a promoção se existir, senão o preço normal
function obterPrecoItem(item) {
    return converterPrecoParaNumero(item.precoPromocao || item.precoOriginal);
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
        // O caminho de volta aqui deve ser ajustado conforme o nome da pasta do carrinho
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
        const precoNumerico = obterPrecoItem(item);
        subtotal += (precoNumerico * item.quantidade);

        // --- MÁGICA DO CAMINHO DA IMAGEM ---
        let caminhoImagem = item.imagem;
        
        if (caminhoImagem && !caminhoImagem.startsWith('../')) {
            if (caminhoImagem.startsWith('/')) {
                caminhoImagem = caminhoImagem.substring(1);
            }
            caminhoImagem = '../Loja_Page/' + caminhoImagem;
        }

        htmlProdutos += `
            <div class="checkout-item-mini">
                <div class="item-mini-img-container">
                    <img src="${caminhoImagem}" alt="${item.nome}" class="item-mini-img" onerror="this.src='https://via.placeholder.com/45?text=Sem+Img'">
                </div>
                <div class="item-mini-info">
                    <span class="item-mini-nome">${item.nome}</span>
                    <span class="item-mini-qtd">Qtd: ${item.quantidade}</span>
                </div>
                <span class="item-mini-preco">R$ ${formatarMoeda(precoNumerico)}</span>
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