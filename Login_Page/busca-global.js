/* =========================================================================
   BUSCA-GLOBAL.JS
   Barra de pesquisa com autocomplete, funcional em QUALQUER página do site.

   Depende de duas variáveis globais (que já existem no projeto):
   -> produtos       (definida em Dados/dados-produtos.js)
   -> catalogoBase   (definida em Dados/dados-jogos.js)

   Por isso, para a pesquisa funcionar em uma página, ela precisa carregar
   os dois arquivos de dados ANTES deste script, mesmo que a página não use
   esses dados para mais nada. Ex:

   <script src="./Dados/dados-produtos.js"></script>
   <script src="./Dados/dados-jogos.js"></script>
   <script src="busca-global.js"></script>

   Como funciona:
   - Qualquer input com a classe "search-box" na página vira automaticamente
     uma caixa de pesquisa com autocomplete (peças da loja + jogos).
   - Ao digitar, aparece uma listinha de sugestões (produto ou jogo).
   - Ao clicar/selecionar uma sugestão (mouse, Enter ou toque):
       -> Produto: redireciona para a Loja já na página certa, com o item
          filtrado e destacado.
       -> Jogo: redireciona para Jogos já filtrado no jogo escolhido.
========================================================================= */

(function () {
    const MAX_POR_TIPO = 4;
    const MAX_SUGESTOES = 6;

    // Remove acentos e caixa alta/baixa para comparar "público" com "publico", etc.
    function normalizar(texto) {
        return (texto || "")
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function obterProdutos() {
        return (typeof produtos !== "undefined" && Array.isArray(produtos)) ? produtos : [];
    }

    function obterJogos() {
        return (typeof catalogoBase !== "undefined" && Array.isArray(catalogoBase)) ? catalogoBase : [];
    }

    function buscar(termo) {
        const alvo = normalizar(termo);
        if (!alvo) return [];

        const produtosEncontrados = obterProdutos()
            .filter(p => normalizar(p.nome).includes(alvo) || normalizar(p.categoria).includes(alvo))
            .slice(0, MAX_POR_TIPO)
            .map(p => ({
                tipo: "produto",
                id: p.id,
                nome: p.nome,
                categoria: p.categoria,
                imagem: p.imagem
            }));

        const jogosEncontrados = obterJogos()
            .filter(j => normalizar(j.nome).includes(alvo) || normalizar(j.categoria).includes(alvo))
            .slice(0, MAX_POR_TIPO)
            .map(j => ({
                tipo: "jogo",
                nome: j.nome,
                categoria: j.categoria,
                imagem: j.imagem
            }));

        return [...produtosEncontrados, ...jogosEncontrados].slice(0, MAX_SUGESTOES);
    }

    // Envia o usuário para a Loja já com a peça encontrada, filtrada e destacada
    function irParaProduto(item) {
        const params = new URLSearchParams();
        params.set("busca", item.nome);
        if (item.id !== undefined && item.id !== null) params.set("id", item.id);
        window.location.href = `../Loja_Page/loja.html?${params.toString()}`;
    }

    // Envia o usuário para Jogos já filtrado no jogo escolhido
    function irParaJogo(item) {
        const params = new URLSearchParams();
        params.set("jogo", item.nome);
        window.location.href = `../Jogos_Page/jogos.html?${params.toString()}`;
    }

    // Deixa em <mark> a parte do texto que bate com o termo pesquisado
    function destacarTexto(texto, termo) {
        const alvo = normalizar(termo);
        const normalizado = normalizar(texto);
        const idx = normalizado.indexOf(alvo);
        if (!alvo || idx === -1) return texto;
        return `${texto.slice(0, idx)}<mark>${texto.slice(idx, idx + alvo.length)}</mark>${texto.slice(idx + alvo.length)}`;
    }

    function iconePara(tipo) {
        return tipo === "jogo"
            ? '<i class="fa-solid fa-gamepad"></i>'
            : '<i class="fa-solid fa-microchip"></i>';
    }

    function inicializarAutocomplete(input) {
        if (!input || input.dataset.buscaGlobalInit) return;
        input.dataset.buscaGlobalInit = "true";

        // O dropdown é anexado direto no <body> e posicionado com "fixed",
        // calculado a partir da posição real do input na tela. Isso evita
        // que ele fique cortado por containers estreitos ou com
        // "overflow: hidden" (comum na caixinha de pesquisa que expande
        // com a lupa).
        const dropdown = document.createElement("div");
        dropdown.className = "busca-global-dropdown";
        document.body.appendChild(dropdown);

        let itensAtuais = [];
        let indiceAtivo = -1;
        let debounceTimer = null;

        function posicionar() {
            const rect = input.getBoundingClientRect();
            const largura = Math.max(rect.width, 260);
            dropdown.style.top = `${rect.bottom + 8}px`;
            dropdown.style.width = `${largura}px`;

            // Se abrir pra esquerda faria o dropdown sair da tela, ele "abre"
            // alinhado à direita do input em vez de à esquerda.
            let esquerda = rect.right - largura;
            if (esquerda < 8) esquerda = rect.left;
            if (esquerda + largura > window.innerWidth - 8) {
                esquerda = window.innerWidth - largura - 8;
            }
            dropdown.style.left = `${Math.max(esquerda, 8)}px`;
        }

        function fechar() {
            dropdown.classList.remove("ativo");
            dropdown.innerHTML = "";
            itensAtuais = [];
            indiceAtivo = -1;
        }

        function marcarAtivo() {
            dropdown.querySelectorAll(".busca-global-item").forEach((el, i) => {
                el.classList.toggle("ativo", i === indiceAtivo);
            });
            const ativo = dropdown.querySelector(".busca-global-item.ativo");
            if (ativo) ativo.scrollIntoView({ block: "nearest" });
        }

        function selecionar(item) {
            if (!item) return;
            input.value = item.nome;
            fechar();
            if (item.tipo === "produto") irParaProduto(item);
            else irParaJogo(item);
        }

        function renderizarSugestoes(termo) {
            itensAtuais = buscar(termo);
            indiceAtivo = -1;

            if (itensAtuais.length === 0) {
                fechar();
                return;
            }

            posicionar();

            dropdown.innerHTML = itensAtuais.map((item, i) => `
                <div class="busca-global-item" data-index="${i}">
                    ${item.imagem
                        ? `<img src="${item.imagem}" alt="" onerror="this.remove()">`
                        : `<span class="busca-global-icone">${iconePara(item.tipo)}</span>`}
                    <div class="busca-global-texto">
                        <span class="busca-global-nome">${destacarTexto(item.nome, termo)}</span>
                        <span class="busca-global-tag ${item.tipo}">${item.tipo === "jogo" ? "JOGO" : item.categoria}</span>
                    </div>
                </div>
            `).join("");

            dropdown.classList.add("ativo");

            dropdown.querySelectorAll(".busca-global-item").forEach(el => {
                // mousedown (não click) para disparar ANTES do input perder o foco
                el.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    const i = parseInt(el.dataset.index, 10);
                    selecionar(itensAtuais[i]);
                });
            });
        }

        input.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            const termo = input.value;
            debounceTimer = setTimeout(() => renderizarSugestoes(termo), 120);
        });

        input.addEventListener("focus", () => {
            if (input.value.trim().length > 0) renderizarSugestoes(input.value);
        });

        input.addEventListener("keydown", (e) => {
            if (!dropdown.classList.contains("ativo")) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                indiceAtivo = Math.min(indiceAtivo + 1, itensAtuais.length - 1);
                marcarAtivo();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                indiceAtivo = Math.max(indiceAtivo - 1, 0);
                marcarAtivo();
            } else if (e.key === "Enter") {
                if (indiceAtivo >= 0 && itensAtuais[indiceAtivo]) {
                    e.preventDefault();
                    selecionar(itensAtuais[indiceAtivo]);
                } else if (itensAtuais[0]) {
                    // Enter sem seleção por seta -> assume a primeira sugestão
                    e.preventDefault();
                    selecionar(itensAtuais[0]);
                }
            } else if (e.key === "Escape") {
                fechar();
            }
        });

        window.addEventListener("resize", () => {
            if (dropdown.classList.contains("ativo")) posicionar();
        });
        window.addEventListener("scroll", () => {
            if (dropdown.classList.contains("ativo")) posicionar();
        }, true);

        document.addEventListener("click", (e) => {
            if (e.target !== input && !dropdown.contains(e.target)) fechar();
        });
    }

    function inicializarTodasAsCaixas() {
        document.querySelectorAll(".search-box").forEach(inicializarAutocomplete);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inicializarTodasAsCaixas);
    } else {
        inicializarTodasAsCaixas();
    }

    // Exposto globalmente caso alguma página crie uma caixa de pesquisa dinamicamente
    window.inicializarBuscaGlobal = inicializarTodasAsCaixas;
})();
