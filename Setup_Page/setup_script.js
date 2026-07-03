/* =========================================================================
   SETUP_SCRIPT.JS - Logica exclusiva da pagina Montar Setup
   Os bancos de dados (jogos e produtos) agora ficam em arquivos separados:
   -> dados-jogos.js     (catalogoJogos)
   -> dados-produtos.js  (produtos)
   Ambos devem ser carregados no HTML ANTES deste arquivo.
========================================================================= */

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

const ordemMontagem = ['cpu', 'placamae', 'gpu', 'ram', 'armazenamento', 'fonte', 'monitor', 'mouse', 'teclado', 'headset'];

/* =========================================================================
   3. LÓGICA DE RENDERIZAÇÃO E INTERFACE
========================================================================= */

// Renderiza todas as listas e avalia quem fica "cinza" (incompatível)
function renderAllLists() {
    ordemMontagem.forEach(categoria => {
        const container = document.getElementById(`list-${categoria}`);
        if (!container) return;

        container.innerHTML = dbComponentes[categoria].map(item => {
            let compativel = true;
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

    // O poder bruto do PC é a média do Score da CPU e da GPU (já que removemos o display do score do visual)
    const pcPower = (setupSelecionado.cpu.nota + setupSelecionado.gpu.nota) / 2;

    // Gerar opções do select (Dropdown) baseado no array 'catalogoJogos'
    const selectOptionsHTML = catalogoJogos.map((jogo, index) => 
        `<option value="${index}">${jogo.nome}</option>`
    ).join('');

    resultsContainer.innerHTML = `
        <div style="padding: 20px;">
            <div style="margin-bottom: 20px;">
                <label style="color:#7070A0; font-size:12px; font-weight:bold;">ESCOLHA UM JOGO PARA TESTAR:</label>
                <select id="jogoTestado" onchange="atualizarResultadoFPS(${pcPower})" style="width: 100%; padding: 10px; margin-top: 8px; background: #060a16; color: white; border: 1px solid #1a2340; border-radius: 4px; outline: none; font-size:14px; cursor:pointer;">
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
    window.atualizarResultadoFPS(pcPower);
}

// Calcula FPS e Qualidade com base no Jogo escolhido
window.atualizarResultadoFPS = function(pcPower) {
    const selector = document.getElementById('jogoTestado');
    const resultBox = document.getElementById('resultado-fps-box');
    if (!selector || !resultBox) return;

    const jogo = catalogoJogos[selector.value];
    
    // Cálculo estimado (Poder do PC dividido pelo peso de processamento do Jogo)
    const desempenhoCalculado = pcPower / jogo.peso; 
    
    let qualidadeRecomendada = "";
    let fpsEstimado = "";

    if (desempenhoCalculado > 120) {
        qualidadeRecomendada = "ULTRA / EXTREMO";
        fpsEstimado = "144+ FPS";
    } else if (desempenhoCalculado > 90) {
        qualidadeRecomendada = "ALTO / ULTRA";
        fpsEstimado = "60 a 90 FPS";
    } else if (desempenhoCalculado > 60) {
        qualidadeRecomendada = "MÉDIO";
        fpsEstimado = "40 a 60 FPS";
    } else {
        qualidadeRecomendada = "MÍNIMO / BAIXO";
        fpsEstimado = "30 FPS";
    }

    resultBox.innerHTML = `
        <div class="game-result-item">
            <div class="empty-icon" style="width: 40px; height:40px; margin:0; border: 1px solid #00d9ff; color:#00d9ff; font-size:20px;">🎮</div>
            <div class="game-result-info" style="display:flex; flex-direction:column; gap:4px;">
                <span style="color: #7070A0; font-size: 11px;">PREDEFINIÇÃO RECOMENDADA</span>
                <h4 style="color: white; font-size: 16px;">${qualidadeRecomendada}</h4>
                <span style="font-size: 13px; color: #00ff88; font-weight:bold;">Desempenho: ${fpsEstimado}</span>
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

// Iniciar a aplicação na primeira carga
renderAllLists();
atualizarBadgeSimples();