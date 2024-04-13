
        const colorInput = document.getElementById('colorInput');
        const colorPreview = document.getElementById('colorPreview');
        const colorDisplay = document.getElementById('colorDisplay');
        const clearButton = document.getElementById('clearButton');
        const copyButton = document.getElementById('copyButton');
        const colors = [];

        colorInput.addEventListener('change', () => {
            const color = colorInput.value;
            if (/^#([0-9a-f]{3}){1,2}$/i.test(color)) {
                colorPreview.style.backgroundColor = color;
                colors.push(color);
                updateColorDisplay();
            } else {
                alert('Por favor, digite um valor hexadecimal válido.');
            }
        });

        clearButton.addEventListener('click', () => {
            colors.length = 0;
            updateColorDisplay();
        });

        copyButton.addEventListener('click', () => {
            const colorValues = colors.join('\n');
            navigator.clipboard.writeText(colorValues)
                .then(() => {
                    alert('As cores foram copiadas para a área de transferência.');
                })
                .catch(err => {
                    console.error('Erro ao copiar as cores:', err);
                });
        });

        function updateColorDisplay() {
            colorDisplay.innerHTML = '';
            colors.forEach(color => {
                const colorItem = document.createElement('div');
                colorItem.classList.add('color-item');
                colorItem.style.backgroundColor = color;
                colorDisplay.appendChild(colorItem);
            });
        }

        // Função para gerar o CSS com as cores
function gerarCSS() {
    var cssGerado = '';
    colors.forEach((color, index) => {
        cssGerado += ".color" + (index + 1) + " { color: " + color + "; }\n"; // Adiciona a regra CSS para cada cor
    });
    var outputDiv = document.getElementById('css-output');
    outputDiv.innerText = cssGerado; // Exibe o CSS gerado na div
}

document.getElementById("opcoes").addEventListener("change", function() {
    var opcaoSelecionada = document.getElementById("opcoes").value;
    if (opcaoSelecionada === "opcao1") {
        gerarCSS();
    }
}); 