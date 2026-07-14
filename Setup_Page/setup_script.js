/* =========================================================================
   SETUP_SCRIPT.JS - Logica exclusiva da pagina Montar Setup
   Os bancos de dados (jogos e produtos) agora ficam em arquivos separados:
   -> dados-jogos.js     (catalogoJogos)
   -> dados-produtos.js  (produtos)
   Ambos devem ser carregados no HTML ANTES deste arquivo.
========================================================================= */

/* =========================================================================
   MENU HAMBURGUER (MOBILE) - busca, login e carrinho passam a ficar
   dentro do menu deslizante, com botão "Voltar" para fechar
========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
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

        // Botão "Voltar" dentro do próprio menu
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
});

/* =========================================================================
   2. CONFIGURAÇÃO E ORGANIZAÇÃO DOS DADOS
========================================================================= */

// Função que define as especificações (Socket/RAM) baseadas no nome
function extrairEspecificacoes(p) {
    const nome = p.nome.toUpperCase();
    let specs = {};

    if (p.categoria === "PROCESSADOR") {
        if (nome.includes("5600") || nome.includes("5700") || nome.includes("5800")) specs.socket = "AM4";
        else if (nome.includes("7600") || nome.includes("7700") || nome.includes("7800") || nome.includes("7950") || nome.includes("9950")) specs.socket = "AM5";
        else if (nome.includes("12100") || nome.includes("12400") || nome.includes("13400") || nome.includes("13600") || nome.includes("14600") || nome.includes("13700") || nome.includes("13900")) specs.socket = "LGA1700";
    } 
    else if (p.categoria === "PLACA MAE") {
        if (nome.includes("B550")) { specs.socket = "AM4"; specs.ramType = "DDR4"; }
        else if (nome.includes("B650") || nome.includes("X870")) { specs.socket = "AM5"; specs.ramType = "DDR5"; }
        else if (nome.includes("B760") || nome.includes("Z790")) { 
            specs.socket = "LGA1700";
            specs.ramType = nome.includes("D4") ? "DDR4" : "DDR5"; 
        }
    } 
    else if (p.categoria === "MEMORIA") {
        specs.ramType = nome.includes("DDR4") ? "DDR4" : "DDR5";
    }

    return specs;
}

// Estrutura que guarda as peças separadas por categoria
const dbComponentes = { cpu: [], placamae: [], gpu: [], ram: [], armazenamento: [], fonte: [], monitor: [], mouse: [], teclado: [], headset: [] };

// Popula o objeto `dbComponentes` usando a lista gigante
produtos.forEach(p => {
    const item = {
        id: p.id.toString(),
        nome: p.nome,
        nota: p.score,
        preco: p.precoPromocao || p.precoOriginal,
        img: p.imagem,
        specs: extrairEspecificacoes(p)
    };

    if (p.categoria === "PROCESSADOR") dbComponentes.cpu.push(item);
    else if (p.categoria === "PLACA MAE") dbComponentes.placamae.push(item);
    else if (p.categoria === "PLACA DE VÍDEO") dbComponentes.gpu.push(item);
    else if (p.categoria === "MEMORIA") dbComponentes.ram.push(item);
    else if (p.categoria === "FONTE") dbComponentes.fonte.push(item);
    else if (p.categoria === "MONITOR") dbComponentes.monitor.push(item);
    else if (p.categoria === "MOUSE") dbComponentes.mouse.push(item);
    else if (p.categoria === "TECLADO") dbComponentes.teclado.push(item);
    else if (p.categoria === "HEADSET") dbComponentes.headset.push(item);
    else if (p.categoria === "ARMAZENAMENTO") dbComponentes.armazenamento.push(item);
});
// Objeto que rastreia o que o usuário selecionou
const setupSelecionado = {
    cpu: null, placamae: null, gpu: null, ram: null, armazenamento: null, fonte: null, monitor: null, mouse: null, teclado: null, headset: null
};

// ==========================================================
// LÓGICA DE FILTRO POR JOGO VIA URL
// ==========================================================
const paramsSetup = new URLSearchParams(window.location.search);
const nomeJogoUrl = paramsSetup.get('jogo');
let jogoFiltradoParaSetup = null;

// Busca os dados completos do jogo se o parâmetro existir na URL
if (nomeJogoUrl && typeof catalogoJogos !== 'undefined') {
    jogoFiltradoParaSetup = catalogoJogos.find(j => j.nome.toLowerCase() === nomeJogoUrl.toLowerCase());
}

const ordemMontagem = ['cpu', 'placamae', 'gpu', 'ram', 'armazenamento', 'fonte', 'monitor', 'mouse', 'teclado', 'headset'];

/* =========================================================================
   3. LÓGICA DE RENDERIZAÇÃO E INTERFACE
========================================================================= */

// Renderiza todas as listas e avalia quem fica "cinza" (incompatível)
function renderAllLists() {
    ordemMontagem.forEach(categoria => {
        const container = document.getElementById(`list-${categoria}`);
        if (!container) return;

        // Adicionamos um .filter() antes do .map()
container.innerHTML = dbComponentes[categoria].filter(item => {
    // Se nenhum jogo veio pela URL, mostra todas as peças normalmente
    if (!jogoFiltradoParaSetup) return true;

    // Lógica de filtro: CPU e GPU precisam ter potência (nota) suficiente para rodar o jogo (peso)
    if (categoria === 'cpu' || categoria === 'gpu') {
        // Exemplo matemático: Exige uma nota mínima baseada no peso do jogo
        // Ajuste o multiplicador (ex: 20) conforme os valores exatos do seu banco de dados
        const notaMinimaExigida = jogoFiltradoParaSetup.peso * 45; 
        
        // Retorna true (mostra a peça) apenas se a nota for maior ou igual ao exigido
        return item.nota >= notaMinimaExigida; 
    }
    
    // Periféricos, gabinetes e outras peças não sofrem filtro de desempenho
    return true; 
    
}).map(item => {
    let compativel = true;
    // ... o restante do código do seu map continua igual
            let motivoIncompatibilidade = "";

            // Verifica se a peça é compatível com o que já foi selecionado
            if (categoria === "cpu" && setupSelecionado.placamae) {
                if (item.specs.socket !== setupSelecionado.placamae.specs.socket) {
                    compativel = false; motivoIncompatibilidade = "Socket incompatível com Placa Mãe";
                }
            }
            if (categoria === "placamae") {
                if (setupSelecionado.cpu && item.specs.socket !== setupSelecionado.cpu.specs.socket) {
                    compativel = false; motivoIncompatibilidade = "Socket incompatível com Processador";
                }
                if (setupSelecionado.ram && item.specs.ramType !== setupSelecionado.ram.specs.ramType) {
                    compativel = false; motivoIncompatibilidade = "Incompatível com a Memória (DDR)";
                }
            }
            if (categoria === "ram" && setupSelecionado.placamae) {
                if (item.specs.ramType !== setupSelecionado.placamae.specs.ramType) {
                    compativel = false; motivoIncompatibilidade = "DDR incompatível com Placa Mãe";
                }
            }

            // Tratamento de rota da imagem
            let caminhoImg = item.img || ""; 
            if (caminhoImg && !caminhoImg.startsWith('http') && !caminhoImg.startsWith('../')) {
                caminhoImg = '../Loja_Page/' + (caminhoImg.startsWith('/') ? caminhoImg.substring(1) : caminhoImg);
            }

            // Verifica se este card específico é o que está selecionado no momento
            const isSelecionado = setupSelecionado[categoria]?.id === item.id;
            const bgSelecionado = isSelecionado ? "background: #0d1e36; border-left: 4px solid #00d9ff;" : "";

            return `
                <div class="component-option ${!compativel ? 'incompativel' : ''}" 
                     style="${bgSelecionado}"
                     onclick="${compativel ? `selecionarPeca('${categoria}', '${item.id}')` : ''}">
                    
                    <img src="${caminhoImg}" alt="${item.nome}" class="comp-img" onerror="this.onerror=null; this.removeAttribute('src');">
                    
                    <div class="comp-details">
                        <span class="comp-name">${item.nome}</span>
                        ${!compativel ? `<span class="aviso-incompativel">⚠️ ${motivoIncompatibilidade}</span>` : ''}
                    </div>
                    <div class="comp-price">R$ ${item.preco}</div>
                </div>
            `;
        }).join('');
    });
}

// Abre/Fecha a sanfona de categorias (Toggle de Menu)
window.toggleAccordion = function(categoria) {
    const item = document.getElementById(`acc-${categoria}`);
    if (!item) return;

    const isAlreadyActive = item.classList.contains('active');

    // Fecha todos
    document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
    
    // Se clicou em um que estava fechado, ele abre. (Se já estava aberto, fica fechado).
    if (!isAlreadyActive) {
        item.classList.add('active');
    }
}

// Quando clica em um Produto (Toggle de Peça)
window.selecionarPeca = function(categoria, id) {
    const selSub = document.getElementById(`sel-${categoria}`);
    
    // Se o usuário clicou na peça que JÁ estava selecionada, ele a remove.
    if (setupSelecionado[categoria] && setupSelecionado[categoria].id === id) {
        setupSelecionado[categoria] = null;
        if (selSub) {
            selSub.textContent = "Clique para selecionar...";
            selSub.style.color = "#4b5a82";
        }
    } else {
        // Seleciona a nova peça
        const peca = dbComponentes[categoria].find(p => p.id === id);
        if (!peca) return;

        setupSelecionado[categoria] = peca;
        if (selSub) {
            selSub.textContent = peca.nome;
            selSub.style.color = "#00d9ff";
        }

        // Passa pro próximo accordion apenas se foi uma nova seleção
        const accAtual = document.getElementById(`acc-${categoria}`);
        if (accAtual) accAtual.classList.remove('active');
        
        const atualIndex = ordemMontagem.indexOf(categoria);
        if (atualIndex < ordemMontagem.length - 1) {
            const accProximo = document.getElementById(`acc-${ordemMontagem[atualIndex + 1]}`);
            if (accProximo) accProximo.classList.add('active');
        }
    }

    // Re-renderiza tudo para aplicar os estilos de selecionado/incompatível
    renderAllLists();
    verificarCompatibilidadeGeral();
}

/* =========================================================================
   4. CÁLCULO DE PERFORMANCE (FPS E QUALIDADE)
========================================================================= */

window.verificarCompatibilidadeGeral = function() {
    const resultsContainer = document.getElementById('compat-results');
    if (!resultsContainer) return;

    // Só exibe os cálculos se o cara tiver escolhido Processador e Placa de Vídeo
    if (!setupSelecionado.cpu || !setupSelecionado.gpu) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line></svg></div>
                <p>Selecione um Processador e uma Placa de Vídeo para simular a performance.</p>
            </div>
        `;
        return;
    }
    
    // Somar preço total e calcular "poder" do PC com base nas notas (score)
    let valorTotal = 0;
    
    ordemMontagem.forEach(cat => {
        if (setupSelecionado[cat]) {
            const valor = parseFloat(setupSelecionado[cat].preco.replace(/\./g, '').replace(',', '.'));
            if (!isNaN(valor)) valorTotal += valor;
        }
    });

    // Calcula o "poder" ponderado do PC (GPU pesa mais que CPU para FPS, com penalidade de gargalo e bônus/penalidade de RAM/Armazenamento)
    const pcPower = calcularPoderDoPC();

    // Gerar opções do select (Dropdown) baseado no array 'catalogoJogos'
const selectOptionsHTML = catalogoJogos.map((jogo, index) => {
    // Verifica se o jogo atual do loop é o mesmo que veio pela URL
    const isSelecionado = (jogoFiltradoParaSetup && jogo.nome === jogoFiltradoParaSetup.nome) ? 'selected' : '';
    return `<option value="${index}" ${isSelecionado}>${jogo.nome}</option>`;
}).join('');
    resultsContainer.innerHTML = `
        <div style="padding: 20px;">
            <div style="margin-bottom: 20px;">
                <label style="color:#7070A0; font-size:12px; font-weight:bold;">ESCOLHA UM JOGO PARA TESTAR:</label>
                <select id="jogoTestado" onchange="atualizarResultadoFPS()" style="width: 100%; padding: 10px; margin-top: 8px; background: #060a16; color: white; border: 1px solid #1a2340; border-radius: 4px; outline: none; font-size:14px; cursor:pointer;">
                    ${selectOptionsHTML}
                </select>
            </div>
            
            <div id="resultado-fps-box">
                <!-- O FPS aparecerá aqui -->
            </div>

            <div style="margin-top: 30px; background: #060a16; padding: 15px; border-radius: 8px; border: 1px solid #1a2340;">
                <h3 style="color: #7070A0; font-size: 12px;">CUSTO TOTAL APROXIMADO</h3>
                <h2 style="color: #00ff88; font-size: 24px; margin-top: 5px;">
                    R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h2>
                <button class="btn-setup-completo" onclick="adicionarSetupAoCarrinho()" style="margin-top: 15px; padding: 10px; font-size: 12px; cursor: pointer;">ADICIONAR TUDO AO CARRINHO</button>
            </div>
        </div>
    `;

    // Chama a função uma vez para popular o resultado do primeiro jogo do Select
    window.atualizarResultadoFPS();
}

// Calcula o "poder" ponderado do PC, considerando gargalo (bottleneck) entre CPU/GPU e o impacto de RAM/Armazenamento
function calcularPoderDoPC() {
    const cpuScore = setupSelecionado.cpu.nota;
    const gpuScore = setupSelecionado.gpu.nota;

    // A GPU pesa mais no resultado final de FPS (~63%), a CPU entra com ~37%
    let poder = (gpuScore * 0.63) + (cpuScore * 0.37);

    // Gargalo: se a GPU é muito mais forte que a CPU, parte do potencial da GPU se perde
    const diferenca = gpuScore - cpuScore;
    if (diferenca > 12) {
        poder -= (diferenca - 12) * 0.35;
    }
    // Gargalo inverso: CPU muito acima da GPU também limita levemente (a GPU é o teto)
    else if (diferenca < -12) {
        poder -= (Math.abs(diferenca) - 12) * 0.15;
    }

    // Memória RAM: capacidade insuficiente derruba o desempenho, capacidade alta ajuda um pouco
    if (setupSelecionado.ram) {
        const capMatch = setupSelecionado.ram.nome.match(/(\d+)\s*GB/i);
        const capacidade = capMatch ? parseInt(capMatch[1], 10) : 16;
        if (capacidade <= 8) poder -= 12;
        else if (capacidade < 16) poder -= 6;
        else if (capacidade >= 32) poder += 3;
    } else {
        poder -= 8; // Sem RAM selecionada, assume-se um cenário abaixo do ideal
    }

    // Armazenamento: HD mecânico causa engasgos/stutter (carregamento de texturas), SSD NVMe ajuda a manter a fluidez
    if (setupSelecionado.armazenamento) {
        const nomeArmz = setupSelecionado.armazenamento.nome.toUpperCase();
        if (nomeArmz.includes("HD ") || nomeArmz.startsWith("HD")) poder -= 4;
        else if (nomeArmz.includes("NVME")) poder += 2;
    }

    return Math.max(poder, 15);
}

// Calcula FPS e Qualidade com base no Jogo escolhido
window.atualizarResultadoFPS = function() {
    const selector = document.getElementById('jogoTestado');
    const resultBox = document.getElementById('resultado-fps-box');
    if (!selector || !resultBox) return;
    if (!setupSelecionado.cpu || !setupSelecionado.gpu) return;

    const jogo = catalogoJogos[selector.value];
    const pcPower = calcularPoderDoPC();

    // Estimativa de FPS contínua (não apenas faixas fixas), variando de acordo com peso do jogo e poder do PC
    let fpsCalculado = Math.round((pcPower * pcPower) / (jogo.peso * 55));

    // Ruído leve determinístico (baseado no nome do jogo + peças) pra simular variações reais entre motores gráficos
    const seed = (jogo.nome.length * 7 + setupSelecionado.cpu.id.length + setupSelecionado.gpu.id.length) % 9;
    fpsCalculado += (seed - 4);
    fpsCalculado = Math.max(fpsCalculado, 14);

    let qualidadeRecomendada = "";
    let corResultado = "#00ff88";
    let fpsEstimado = "";

    if (fpsCalculado >= 200) {
        qualidadeRecomendada = "ULTRA / EXTREMO";
        fpsEstimado = "300+ FPS";
    } else if (fpsCalculado >= 144) {
        qualidadeRecomendada = "ULTRA";
        fpsEstimado = `${fpsCalculado - 15} a ${fpsCalculado + 20} FPS`;
    } else if (fpsCalculado >= 100) {
        qualidadeRecomendada = "ALTO / ULTRA";
        fpsEstimado = `${fpsCalculado - 10} a ${fpsCalculado + 15} FPS`;
        corResultado = "#00ff88";
    } else if (fpsCalculado >= 70) {
        qualidadeRecomendada = "ALTO";
        fpsEstimado = `${fpsCalculado - 8} a ${fpsCalculado + 10} FPS`;
        corResultado = "#7cff5c";
    } else if (fpsCalculado >= 50) {
        qualidadeRecomendada = "MÉDIO";
        fpsEstimado = `${fpsCalculado - 6} a ${fpsCalculado + 8} FPS`;
        corResultado = "#ffd23f";
    } else if (fpsCalculado >= 35) {
        qualidadeRecomendada = "BAIXO";
        fpsEstimado = `${fpsCalculado - 5} a ${fpsCalculado + 5} FPS`;
        corResultado = "#ff8c42";
    } else {
        qualidadeRecomendada = "MÍNIMO";
        fpsEstimado = `~${fpsCalculado} FPS`;
        corResultado = "#ff3366";
    }

    resultBox.innerHTML = `
        <div class="game-result-item">
            <div class="empty-icon" style="width: 40px; height:40px; margin:0; border: 1px solid ${corResultado}; color:${corResultado}; font-size:20px;">🎮</div>
            <div class="game-result-info" style="display:flex; flex-direction:column; gap:4px;">
                <span style="color: #7070A0; font-size: 11px;">PREDEFINIÇÃO RECOMENDADA</span>
                <h4 style="color: white; font-size: 16px;">${qualidadeRecomendada}</h4>
                <span style="font-size: 13px; color: ${corResultado}; font-weight:bold;">Desempenho estimado: ${fpsEstimado}</span>
            </div>
        </div>
    `;
}

/* =========================================================================
   5. INTEGRAÇÃO COM O CARRINHO E AVISOS (TOAST)
========================================================================= */

window.adicionarSetupAoCarrinho = function() {
    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    let itensAdicionados = 0;

    // Varre a lista de peças montadas no setup
    ordemMontagem.forEach(cat => {
        const pecaSelecionada = setupSelecionado[cat];
        
        if (pecaSelecionada) {
            // Busca o produto original na lista gigante para garantir que temos todos os dados (como categoria correta)
            // Se não achar (como o SSD manual s1), usamos os dados do próprio setupSelecionado
            const produtoOriginal = produtos.find(p => p.id.toString() === pecaSelecionada.id.toString()) || {
                id: pecaSelecionada.id,
                categoria: cat === 'armazenamento' ? 'ARMAZENAMENTO' : cat.toUpperCase(),
                nome: pecaSelecionada.nome,
                precoPromocao: pecaSelecionada.preco,
                imagem: pecaSelecionada.img
            };

            // Verifica se a peça já existe no carrinho
            const itemNoCarrinho = carrinho.find(i => i.id.toString() === produtoOriginal.id.toString());
            
            if (itemNoCarrinho) {
                itemNoCarrinho.quantidade += 1;
            } else {
                carrinho.push({
                    id: produtoOriginal.id,
                    categoria: produtoOriginal.categoria,
                    nome: produtoOriginal.nome,
                    precoPromocao: produtoOriginal.precoPromocao || produtoOriginal.precoOriginal || pecaSelecionada.preco,
                    imagem: produtoOriginal.imagem || pecaSelecionada.img,
                    quantidade: 1
                });
            }
            itensAdicionados++;
        }
    });

    if (itensAdicionados > 0) {
        // Salva no localStorage
        localStorage.setItem('nexus_cart', JSON.stringify(carrinho));
        
        // Atualiza o contador visual do ícone do carrinho, se ele existir na página de setup
        atualizarBadgeSimples();
        
        // Dispara o aviso visual
        mostrarToastSucesso();
    }
}

// Cria e exibe a notificação Toast no canto da tela
function mostrarToastSucesso() {
    let toast = document.getElementById('toast-setup-success');
    
    // Se o elemento ainda não existe, criamos e injetamos no HTML
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-setup-success';
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="background: #00ff88; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: #060a16; font-weight: bold; font-size: 14px;">✓</div>
                <div>
                    <strong style="display: block; color: white; font-size: 14px;">Setup Adicionado!</strong>
                    <span style="color: #8a8fb8; font-size: 12px;">Suas peças já estão no carrinho.</span>
                </div>
            </div>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: -400px;
            background: #060a16;
            border-left: 4px solid #00ff88;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            z-index: 9999;
            transition: right 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-family: inherit;
        `;
        document.body.appendChild(toast);
    }

    // Faz o Toast entrar na tela
    setTimeout(() => { toast.style.right = '30px'; }, 10);

    // Remove o Toast da tela após 3.5 segundos
    setTimeout(() => { toast.style.right = '-400px'; }, 3500);
}

// Função de backup para atualizar a bolinha do carrinho se a header estiver na página de setup
function atualizarBadgeSimples() {
    const badge = document.getElementById('badge-carrinho');
    if (!badge) return;
    
    let carrinho = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    let totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    if (totalItens > 0) {
        badge.innerText = totalItens;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Lógica da Lupa: mostra/esconde a caixa de pesquisa (igual às outras páginas do site)
const btnLupaSetup = document.querySelector('.btn-lupa');
const searchBoxSetup = document.querySelector('.search-box');
if (btnLupaSetup && searchBoxSetup) {
    btnLupaSetup.addEventListener('click', () => {
        searchBoxSetup.classList.toggle('ativo');
        if (searchBoxSetup.classList.contains('ativo')) searchBoxSetup.focus();
    });
}

// Iniciar a aplicação na primeira carga
renderAllLists();
atualizarBadgeSimples();
if (typeof renderizarAreaConta === 'function') renderizarAreaConta();