document.addEventListener("DOMContentLoaded", () => {
    configurarMenuMobile();
    renderizarCarrinho();
    atualizarBadgeCarrinho();
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
        const precoNumerico = obterPrecoItem(item);
        subtotal += (precoNumerico * item.quantidade);
        totalItens += item.quantidade;

        // --- MÁGICA DO CAMINHO DA IMAGEM ---
        let caminhoImagem = item.imagem;
        
        // Se a imagem existir e não tiver "../" no começo, significa que veio da raiz da loja
        if (caminhoImagem && !caminhoImagem.startsWith('../')) {
            // Remove uma barra inicial caso exista acidentalmente (ex: /img_loja/...)
            if (caminhoImagem.startsWith('/')) {
                caminhoImagem = caminhoImagem.substring(1);
            }
            // Adiciona o caminho relativo para voltar à raiz e entrar na Loja_Page
            caminhoImagem = '../Loja_Page/' + caminhoImagem;
        }

        htmlItens += `
            <div class="item-card">
                <div class="item-img-container">
                    <img src="${caminhoImagem}" alt="${item.nome}" class="item-img" onerror="this.src='https://via.placeholder.com/80?text=Sem+Img'">
                </div>
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
                    <span class="item-preco">R$ ${formatarMoeda(precoNumerico)}</span>
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
            
            <button class="btn-finalizar" onclick="irParaCheckout()">FINALIZAR COMPRA</button>

            <ul class="trust-badges">
                <li><i class="fa-solid fa-shield-halved"></i> Compra 100% segura</li>
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

// Só deixa seguir para o checkout quem estiver logado.
window.irParaCheckout = function() {
    if (!exigirLogin('Você precisa entrar para finalizar a compra.', { tipo: 'checkout', retornoUrl: '../Checkout_Page/checkout.html' })) return;
    window.location.href = '../Checkout_Page/checkout.html';
}