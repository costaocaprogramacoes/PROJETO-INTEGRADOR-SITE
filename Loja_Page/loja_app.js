const produtos = [
    { id: 1, categoria: "PLACA DE VÍDEO", nome: "NVIDIA RTX 4080 16GB", preco: "7.299", imagem: "./img_loja/ts.png" },
    { id: 2, categoria: "PROCESSADOR", nome: "Intel Core i9-13900K", preco: "4.199", imagem: "./img_loja/intel.png" },
    { id: 3, categoria: "MOUSE", nome: "Logitech G Pro X Superlight 2", preco: "699", imagem: "./img_loja/mouse.png" }
];

const container = document.getElementById("container-produtos");

function renderizarProdutos() {
    // Pega todos os checkboxes marcados
    const selecionados = Array.from(document.querySelectorAll('.filtro-grupo input:checked')).map(i => i.value);
    
    // Se nada estiver marcado, mostra tudo
    const mostrar = selecionados.length === 0 ? produtos : produtos.filter(p => selecionados.includes(p.categoria));

    container.innerHTML = mostrar.map(p => `
        <div class="card">
            <img src="${p.imagem}" alt="${p.nome}">
            <p style="font-size:10px; color:#5878ff">${p.categoria}</p>
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco}</p>
            <div class="botao"><button>Comprar</button></div>
        </div>
    `).join('');
}

document.querySelectorAll('.filtro-grupo input').forEach(input => {
    input.addEventListener('change', renderizarProdutos);
});

// Primeira renderização
renderizarProdutos();