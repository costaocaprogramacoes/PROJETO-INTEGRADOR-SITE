// 1. Banco de dados com as informações dos jogos e configurações
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

// 2. Estado inicial
let jogoAtual = "SUBNAUTICA 2";
let nivelAtual = "MÍNIMO";

// 3. Seletores do DOM
const botoesJogos = document.querySelectorAll('.botao button');
const botoesNiveis = document.querySelectorAll('.niveis button');

const imgJogo = document.querySelector('.card-jogo img');
const tituloJogo = document.querySelector('.info h2');
const notaJogo = document.querySelector('.info p');
const containerTags = document.querySelector('.tags');

const linhasSpec = document.querySelectorAll('.spec .linha span:nth-child(2)');
const cpuSpec = linhasSpec[0];
const gpuSpec = linhasSpec[1];
const ramSpec = linhasSpec[2];
const armazSpec = linhasSpec[3];

// 4. Função principal para atualizar a interface
function atualizarInterface() {
    const dados = dadosJogos[jogoAtual];
    
    // Proteção caso clique num jogo que não existe no banco de dados
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

    cpuSpec.textContent = specs.cpu;
    gpuSpec.textContent = specs.gpu;
    ramSpec.textContent = specs.ram;
    armazSpec.textContent = specs.armaz;
}

// 5. Evento de clique nos botões dos Jogos
botoesJogos.forEach(botao => {
    botao.addEventListener('click', (e) => {
        botoesJogos.forEach(b => b.classList.remove('ativo'));
        e.target.classList.add('ativo');
        
        jogoAtual = e.target.textContent.trim();
        atualizarInterface();
    });
});

// 6. Evento de clique nos botões dos Níveis de Performance
botoesNiveis.forEach(botao => {
    botao.addEventListener('click', (e) => {
        botoesNiveis.forEach(b => b.classList.remove('ativo'));
        e.target.classList.add('ativo');
        
        nivelAtual = e.target.textContent.trim();
        atualizarInterface();
    });
});

// 7. Inicializa a primeira visualização
atualizarInterface();

// 8. Lógica da Barra de Pesquisa
const btnLupa = document.querySelector('.btn-lupa');
const searchBox = document.querySelector('.search-box');

if (btnLupa && searchBox) {
    btnLupa.addEventListener('click', () => {
        searchBox.classList.toggle('ativo');
        // Coloca o cursor automaticamente para digitar quando abrir
        if (searchBox.classList.contains('ativo')) {
            searchBox.focus();
        }
    });
}