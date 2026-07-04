/* =========================================================================
   AUTH.JS - Sistema de login / sessão / controle de administrador
   Compartilhado por TODAS as páginas do site.

   *** IMPORTANTE ***
   Este site não possui um back-end/servidor, então este é um sistema de
   autenticação DE DEMONSTRAÇÃO: usuários cadastrados e a sessão atual
   ficam salvos no localStorage do próprio navegador. Isso é suficiente
   para simular a experiência de "logar como admin" vs "logar como
   usuário comum", mas não é segurança de verdade — qualquer pessoa com
   acesso ao DevTools do navegador consegue ver esses dados. Para um site
   em produção de verdade, as senhas precisariam ser validadas e
   guardadas em um servidor (com hash, etc).

   Inclua este arquivo em TODAS as páginas, antes do script próprio de
   cada página (ex: antes de main_script.js, loja_script.js, etc).
========================================================================= */

// Credencial fixa do administrador (não é mais exibida na tela de login,
// mas continua funcionando normalmente).
const NEXUS_ADMIN = { email: "admin@nexusgg.com", senha: "nexusgg@admin", nome: "Administrador" };

const CHAVE_USUARIOS = "nexus_users";
const CHAVE_SESSAO = "nexus_session";

function obterUsuarios() {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
}

function salvarUsuarios(lista) {
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista));
}

// Cadastra um novo usuário comum (conta normal, sem permissão de admin).
// Retorna { ok: true } ou { ok: false, mensagem: "..." }
function registrarUsuario(nome, email, senha) {
    email = email.trim().toLowerCase();

    if (email === NEXUS_ADMIN.email) {
        return { ok: false, mensagem: "Este e-mail não está disponível." };
    }

    const usuarios = obterUsuarios();
    if (usuarios.some(u => u.email === email)) {
        return { ok: false, mensagem: "Já existe uma conta com este e-mail." };
    }

    usuarios.push({ nome: nome.trim(), email, senha, role: "user" });
    salvarUsuarios(usuarios);
    return { ok: true };
}

// Tenta autenticar com email/senha. Se bater com o admin OU com algum
// usuário cadastrado, cria a sessão e a retorna. Caso contrário, null.
function autenticarUsuario(email, senha) {
    email = email.trim().toLowerCase();

    if (email === NEXUS_ADMIN.email && senha === NEXUS_ADMIN.senha) {
        const sessao = { nome: NEXUS_ADMIN.nome, email, role: "admin" };
        iniciarSessao(sessao);
        return sessao;
    }

    const usuario = obterUsuarios().find(u => u.email === email && u.senha === senha);

    if (usuario) {
        const sessao = { nome: usuario.nome, email: usuario.email, role: "user" };
        iniciarSessao(sessao);
        return sessao;
    }

    return null;
}

function iniciarSessao(sessao) {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
}

function obterSessao() {
    return JSON.parse(localStorage.getItem(CHAVE_SESSAO)) || null;
}

function encerrarSessao() {
    localStorage.removeItem(CHAVE_SESSAO);
}

function estaLogado() {
    return !!obterSessao();
}

// Único ponto de verdade sobre quem pode editar especificações etc.
function ehAdmin() {
    const sessao = obterSessao();
    return !!sessao && sessao.role === "admin";
}

/* =========================================================================
   ÁREA DE CONTA NO HEADER
   Mostra "Entrar" quando deslogado, ou o nome do usuário + botão "Sair"
   (com uma badge ADMIN quando aplicável) quando logado.
   Chame renderizarAreaConta() dentro do DOMContentLoaded de cada página,
   após colocar uma <div id="area-conta"></div> no header.
========================================================================= */

function injetarEstilosAuth() {
    if (document.getElementById('auth-inline-styles')) return;

    const style = document.createElement('style');
    style.id = 'auth-inline-styles';
    style.textContent = `
        .area-conta { display: flex; align-items: center; }
        .area-conta .btn-entrar-nav {
            display: flex; align-items: center; gap: 6px;
            color: #7070A0; font-size: 14px; font-weight: bold;
            border: 1px solid #234c71; border-radius: 20px;
            padding: 6px 16px; transition: 0.3s; white-space: nowrap;
        }
        .area-conta .btn-entrar-nav:hover { color: #00d9ff; border-color: #00d9ff; }
        .area-conta .usuario-chip { display: flex; align-items: center; gap: 10px; color: #d5d8ea; font-size: 13px; }
        .area-conta .usuario-nome { font-weight: bold; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .area-conta .badge-admin-nav {
            background: rgba(184, 84, 245, 0.15); color: #b854f5; border: 1px solid #b854f5;
            font-size: 10px; font-weight: bold; letter-spacing: 0.5px;
            padding: 2px 8px; border-radius: 10px; text-transform: uppercase;
        }
        .area-conta .btn-sair-nav {
            background: transparent; border: 1px solid #3a3f5c; color: #7070A0;
            border-radius: 20px; padding: 5px 14px; font-size: 12px; font-weight: bold;
            cursor: pointer; transition: 0.3s;
        }
        .area-conta .btn-sair-nav:hover { color: #ff4d6d; border-color: #ff4d6d; }

        /* Aviso de somente-leitura usado no modal de especificações da loja */
        .modal-specs-somente-leitura { color: #7070A0; font-size: 12px; text-align: center; padding: 10px 0 0 0; font-style: italic; }
    `;
    document.head.appendChild(style);
}

function renderizarAreaConta(containerId = 'area-conta') {
    injetarEstilosAuth();
    const container = document.getElementById(containerId);
    if (!container) return;

    const sessao = obterSessao();

    if (!sessao) {
        container.innerHTML = `
            <a href="${caminhoParaLogin()}" class="btn-entrar-nav">
                <i class="fa-regular fa-user"></i> Entrar
            </a>
        `;
        return;
    }

    container.innerHTML = `
        <div class="usuario-chip">
            <span class="usuario-nome">${sessao.nome}</span>
            ${sessao.role === 'admin' ? '<span class="badge-admin-nav">ADMIN</span>' : ''}
            <button type="button" class="btn-sair-nav" id="btn-sair-nav">Sair</button>
        </div>
    `;

    document.getElementById('btn-sair-nav').addEventListener('click', () => {
        encerrarSessao();
        window.location.reload();
    });
}

// Caminho relativo até a página de login, seguindo o mesmo padrão de
// pastas usado no resto do site (ex: ../Loja_Page/loja.html).
function caminhoParaLogin() {
    return '../Login_Page/login_page.html';
}
