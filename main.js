document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os links do seu site
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const destino = this.getAttribute('href');

            // Ignora a animação se for um link vazio (#)
            if (!destino || destino === '#') {
                return;
            }

            e.preventDefault(); // Segura o carregamento imediato da página

            // Adiciona a classe que apaga a tela
            document.body.classList.add('fade-out');

            // Espera 400ms (o tempo exato da animação do CSS) para trocar a página
            setTimeout(() => {
                window.location.href = destino;
            }, 400);
        });
    });
});