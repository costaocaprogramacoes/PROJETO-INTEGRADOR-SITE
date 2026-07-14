/* ==================================================
        MENU HAMBURGUER (MOBILE)
================================================== */
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

/* ==================================================
        NAVEGAÇÃO ENTRE TELAS (SINGLE PAGE)
================================================== */
function mudarTela(telaId) {
    // Esconde todas as telas
    document.getElementById('view-login').style.display = 'none';
    document.getElementById('view-cadastro').style.display = 'none';
    document.getElementById('view-recuperar').style.display = 'none';

    // Mostra apenas a tela solicitada
    document.getElementById(telaId).style.display = 'block';

    // Rola suavemente para o topo do formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==================================================
        MOSTRAR / OCULTAR QUALQUER SENHA
================================================== */
function mostrarSenha(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

/* ==================================================
        VALIDAÇÕES DOS FORMULÁRIOS
================================================== */
document.addEventListener("DOMContentLoaded", function () {

    configurarMenuMobile();

    // Lógica da Lupa: mostra/esconde a caixa de pesquisa (igual às outras páginas do site)
    const btnLupaLogin = document.querySelector('.btn-lupa');
    const searchBoxLogin = document.querySelector('.search-box');
    if (btnLupaLogin && searchBoxLogin) {
        btnLupaLogin.addEventListener('click', () => {
            searchBoxLogin.classList.toggle('ativo');
            if (searchBoxLogin.classList.contains('ativo')) searchBoxLogin.focus();
        });
    }

    // Se a pessoa já está logada, não faz sentido ficar na tela de login
    if (typeof estaLogado === 'function' && estaLogado()) {
        window.location.href = '../Main_Page/main.html';
        return;
    }

    // --- LOGIN ---
    const formLogin = document.getElementById("formLogin");
    if (formLogin) {
        const emailLogin = document.getElementById("emailLogin");
        const senhaLogin = document.getElementById("senha");
        const erroLogin = document.getElementById("erroLogin");

        formLogin.addEventListener("submit", (e) => {
            // e.preventDefault();
            erroLogin.textContent = "";

            const sessao = autenticarUsuario(emailLogin.value, senhaLogin.value);

            if (!sessao) {
                erroLogin.textContent = "E-mail ou senha incorretos.";
                return;
            }

            window.location.href = '../Main_Page/main.html';
        });
    }

    // --- VALIDAÇÃO DE CADASTRO ---
    const formCadastro = document.getElementById("formCadastro");
    if (formCadastro) {
        const nome = document.getElementById("nome");
        const emailCadastro = document.getElementById("emailCadastro");
        const senhaCadastro = document.getElementById("senhaCadastro");
        const confirmarSenha = document.getElementById("confirmarSenha");

        const erroNome = document.getElementById("erroNome");
        const erroEmail = document.getElementById("erroEmail");
        const erroSenhaCadastro = document.getElementById("erroSenhaCadastro");
        const erroConfirmar = document.getElementById("erroConfirmar");

        const statusCadastro = document.getElementById("statusCadastro");

        formCadastro.addEventListener("submit", (e) => {
            // e.preventDefault(); // Este formulário nunca recarrega a página; tudo é tratado por JS

            let valido = true;

            // Limpa erros anteriores
            erroNome.textContent = "";
            erroEmail.textContent = "";
            erroSenhaCadastro.textContent = "";
            erroConfirmar.textContent = "";
            if (statusCadastro) { statusCadastro.textContent = ""; }

            if (nome.value.trim().length < 3) {
                erroNome.textContent = "Digite seu nome completo!";
                valido = false;
            }

            if (!emailCadastro.value.includes("@")) {
                erroEmail.textContent = "Digite um e-mail válido!";
                valido = false;
            }

            if (senhaCadastro.value.length < 6) {
                erroSenhaCadastro.textContent = "A senha deve ter no mínimo 6 caracteres!";
                valido = false;
            }

            if (confirmarSenha.value !== senhaCadastro.value) {
                erroConfirmar.textContent = "As senhas não coincidem!";
                valido = false;
            }

            if (!valido) return;

            // Cria a conta (sempre como usuário comum, sem acesso de administrador)
            const resultado = registrarUsuario(nome.value, emailCadastro.value, senhaCadastro.value);

            if (!resultado.ok) {
                erroEmail.textContent = resultado.mensagem;
                return;
            }

            // Loga automaticamente com a conta recém-criada e vai para o início
            autenticarUsuario(emailCadastro.value, senhaCadastro.value);
            window.location.href = '../Main_Page/main.html';
        });
    }

    // --- LÓGICA DE RECUPERAR SENHA ---
    const formRecuperar = document.getElementById("formRecuperar");
    if (formRecuperar) {
        const emailRecuperar = document.getElementById("emailRecuperar");
        const erroEmailRecuperar = document.getElementById("erroEmailRecuperar");
        const statusMsg = document.getElementById("statusMsg");
        const btnEnviar = document.getElementById("btnEnviar");

        formRecuperar.addEventListener("submit", (e) => {
            // e.preventDefault();

            erroEmailRecuperar.textContent = "";
            statusMsg.textContent = "";

            // Validação simples de email
            if (!emailRecuperar.value.includes("@") || emailRecuperar.value.trim().length < 5) {
                erroEmailRecuperar.textContent = "Digite um e-mail válido!";
                return;
            }

            // Simulação de Loading
            btnEnviar.disabled = true;
            btnEnviar.textContent = "ENVIANDO...";
            statusMsg.style.color = "white";
            statusMsg.textContent = "Enviando código de recuperação...";

            // Simulação de resposta da requisição (Delay de 2s)
            setTimeout(() => {
                statusMsg.style.color = "lightgreen";
                statusMsg.textContent = "Se o e-mail existir, você receberá um código em instantes.";

                btnEnviar.disabled = false;
                btnEnviar.textContent = "ENVIAR CÓDIGO";
                emailRecuperar.value = "";
            }, 2000);
        });
    }
});