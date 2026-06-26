// 1. Banco de dados com as informações dos jogos
const dadosJogos = {
    "SUBNAUTICA 2": {
        img: "./img_setup/subnautica.jpg",
        titulo: "Subnautica 2",
        nota: "⭐⭐⭐⭐ 4.5",
        tags: ["Survival / Open World", "Co-op", "Sci-Fi"],
        niveis: {
            "MÍNIMO": { cpu: "Intel Core i5-8400 / AMD Ryzen 5 2600", gpu: "NVIDIA GTX 1660 / AMD RX 5500 XT", ram: "12 GB", armaz: "50 GB SSD" },
            "IDEAL": { cpu: "Intel Core i7-13700 / AMD Ryzen 7 7700X", gpu: "NVIDIA RTX 3070 / AMD RX 6700 XT", ram: "16 GB", armaz: "50 GB SSD" },
            "ULTRA": { cpu: "Intel Core i7-13700 / AMD Ryzen 7 7700X", gpu: "NVIDIA RTX 4070 / AMD RX 6900 XT", ram: "32 GB", armaz: "50 GB SSD" }
        }
    },
    "RESIDENT EVIL REQUIEM": {
        img: "./img_setup/requiem.png",
        titulo: "Resident Evil Requiem",
        nota: "⭐⭐⭐⭐ 4.5",
        tags: ["Survival Horror", "Third-Person", "Atmospheric"],
        niveis: {
            "MÍNIMO": { cpu: "Intel Core i5-8500 / AMD Ryzen 5 3500", gpu: "Nvidia GeForce GTX 1660 / AMD Radeon RX 5500 XT", ram: "16 GB", armaz: "80 GB SSD" },
            "IDEAL": { cpu: "Intel Core i7-8700 / AMD Ryzen 5 5500", gpu: "Nvidia GeForce RTX 2060 Super / AMD Radeon RX 6600", ram: "16 GB", armaz: "80 GB SSD" },
            "ULTRA": { cpu: "Ryzen 7 5700X / i5-13600K", gpu: "RTX 4070 / RX 7800 XT", ram: "32 GB", armaz: "80 GB SSD" }
        }
    },
    "GOD OF WAR RAGNARÖK": {
        img: "./img_setup/ragnarok.png",
        titulo: "God Of War Ragnarök",
        nota: "⭐⭐⭐⭐⭐4.9",
        tags: ["Action / Adventure", "Over-the-Shoulder", "Cinematic"],
        niveis: {
            "MÍNIMO": { cpu: "Intel Core i5-4670K / AMD Ryzen 3 1200", gpu: "NVIDIA GeForce GTX 1060 / AMD Radeon RX 5500 XT", ram: "8 GB", armaz: "190 GB SSD" },
            "IDEAL": { cpu: "Intel Core i5-8600 / AMD Ryzen 5 3600", gpu: "NVIDIA GeForce RTX 2060 Super / AMD Radeon RX 5700", ram: "16 GB", armaz: "190 GB SSD" },
            "ULTRA": { cpu: "Intel Core i5-11600K / AMD Ryzen 7 3700X", gpu: "NVIDIA GeForce RTX 4070 Ti / AMD Radeon RX 7900 XT", ram: "16 GB", armaz: "190 GB SSD" }
        }
    },
    "PRAGMATA": {
        img: "./img_setup/pragmata.png",
        titulo: "Pragmata",
        nota: "⭐⭐⭐⭐ 4.3",
        tags: ["Action / Sci-Fi", "Dystopian", "Adventure"],
        niveis: {
            "MÍNIMO": { cpu: "Intel Core i5-8500 / AMD Ryzen 5 3500", gpu: "NVIDIA GeForce GTX 1660 / AMD Radeon RX 5500 XT", ram: "16 GB", armaz: "40 GB SSD" },
            "IDEAL": { cpu: "Intel Core i7-8700 / AMD Ryzen 5 5500", gpu: "NVIDIA GeForce RTX 2060 Super / AMD Radeon RX 6600", ram: "16 GB", armaz: "40 GB SSD" },
            "ULTRA": { cpu: "Intel Core i5-11600K / AMD Ryzen 7 3700X", gpu: "NVIDIA GeForce RTX 4070 Ti / AMD Radeon RX 7900 XT", ram: "16 GB", armaz: "140 GB SSD" }
        }
    }
};

// 2. Componentes Dinâmicos Recomendados (Simulação de Loja)
const componentesRecomendados = {
    "MÍNIMO": [
        { categoria: "PROCESSADOR", nome: "Intel Core i5-12400F", nota: 85, preco: "999" },
        { categoria: "PLACA DE VÍDEO", nome: "NVIDIA RTX 3060 12GB", nota: 88, preco: "1.899" },
        { categoria: "MEMÓRIA RAM", nome: "Corsair Vengeance 16GB DDR4", nota: 90, preco: "349" },
        { categoria: "MONITOR", nome: "AOC Hero 24\" 144Hz", nota: 89, preco: "899" }
    ],
    "IDEAL": [
        { categoria: "PROCESSADOR", nome: "AMD Ryzen 5 7600X", nota: 92, preco: "1.599" },
        { categoria: "PLACA DE VÍDEO", nome: "NVIDIA RTX 4070 12GB", nota: 95, preco: "4.199" },
        { categoria: "MEMÓRIA RAM", nome: "Kingston Fury 32GB DDR5", nota: 94, preco: "799" },
        { categoria: "MONITOR", nome: "Dell Alienware 27\" 165Hz", nota: 96, preco: "2.599" }
    ],
    "ULTRA": [
        { categoria: "PROCESSADOR", nome: "Intel Core i9-13900K", nota: 98, preco: "3.499" },
        { categoria: "PLACA DE VÍDEO", nome: "NVIDIA RTX 4080 16GB", nota: 100, preco: "7.299" },
        { categoria: "MEMÓRIA RAM", nome: "Corsair Dominator 32GB DDR5", nota: 95, preco: "1.299" },
        { categoria: "MONITOR", nome: "LG 27\" OLED 4K 144Hz", nota: 99, preco: "4.999" },
        { categoria: "HEADSET", nome: "SteelSeries Arctis Nova Pro", nota: 94, preco: "1.499" },
        { categoria: "MOUSE", nome: "Razer DeathAdder V3 Pro", nota: 92, preco: "699" }
    ]
};

// 3. Lógica de atualização
let jogoAtual = "SUBNAUTICA 2";
let nivelAtual = "MÍNIMO";

const botoesJogos = document.querySelectorAll('#botoes-jogos-container button');
const botoesNiveis = document.querySelectorAll('.niveis button');
const imgJogo = document.querySelector('.card-jogo img');
const tituloJogo = document.querySelector('.info h2');
const notaJogo = document.querySelector('.info p');
const containerTags = document.querySelector('.tags');
const linhasSpec = document.querySelectorAll('.spec .linha span:nth-child(2)');
const setupComponentsContainer = document.getElementById("setup-components");
const tituloSetup = document.getElementById("titulo-setup");

function atualizarInterface() {
    const dados = dadosJogos[jogoAtual];
    if (!dados) return; 
    
    const specs = dados.niveis[nivelAtual];

    imgJogo.src = dados.img;
    tituloJogo.textContent = dados.titulo;
    notaJogo.textContent = dados.nota;

    containerTags.innerHTML = '';
    dados.tags.forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag;
        containerTags.appendChild(span);
    });

    linhasSpec[0].textContent = specs.cpu;
    linhasSpec[1].textContent = specs.gpu;
    linhasSpec[2].textContent = specs.ram;
    linhasSpec[3].textContent = specs.armaz;

    renderizarHardware();
}

function renderizarHardware() {
    tituloSetup.textContent = `🏆 SETUP RECOMENDADO PARA ${nivelAtual}`;
    setupComponentsContainer.innerHTML = "";
    
    const listaComponentes = componentesRecomendados[nivelAtual];
    
    listaComponentes.forEach(comp => {
        setupComponentsContainer.innerHTML += `
        <div class="card">
            <div class="topo-card">
                <div class="info-componente">
                    <span class="categoria">${comp.categoria}</span>
                    <h3>${comp.nome}</h3>
                </div>
                <div class="info-direita">
                    <span class="nota">${comp.nota}/100</span>
                    <span class="preco">R$ ${comp.preco}</span>
                    <button onclick="alert('${comp.nome} adicionado ao carrinho!')">ADICIONAR</button>
                </div>
            </div>
            <div class="barra">
                <div class="progresso" style="width:${comp.nota}%;"></div>
            </div>
        </div>
        `;
    });
}

botoesJogos.forEach(botao => {
    botao.addEventListener('click', (e) => {
        botoesJogos.forEach(b => b.classList.remove('ativo'));
        e.target.classList.add('ativo');
        jogoAtual = e.target.textContent.trim();
        atualizarInterface();
    });
});

botoesNiveis.forEach(botao => {
    botao.addEventListener('click', (e) => {
        botoesNiveis.forEach(b => b.classList.remove('ativo'));
        e.target.classList.add('ativo');
        nivelAtual = e.target.textContent.trim();
        atualizarInterface();
    });
});

// Inicialização
atualizarInterface();

// Lógica Lupa
const btnLupa = document.querySelector('.btn-lupa');
const searchBox = document.querySelector('.search-box');
if (btnLupa && searchBox) {
    btnLupa.addEventListener('click', () => {
        searchBox.classList.toggle('ativo');
        if (searchBox.classList.contains('ativo')) searchBox.focus();
    });
}