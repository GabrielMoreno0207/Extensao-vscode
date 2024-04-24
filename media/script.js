const startColorInput = document.getElementById('startColor');
const endColorInput = document.getElementById('endColor');
const directionSelect = document.getElementById('direction');
const gradientBox = document.getElementById('gradient-box');
const cssOutput = document.getElementById('css-output');

function generateGradient() {
    const startColor = startColorInput.value;
    const endColor = endColorInput.value;
    const direction = directionSelect.value;
    const gradient = `linear-gradient(${direction}, ${startColor}, ${endColor})`;
    gradientBox.style.background = gradient;

    // Gerar CSS do gradiente
    const cssGradient = `background: ${gradient};`;
    cssOutput.innerText = cssGradient;
}

startColorInput.addEventListener('input', generateGradient);
endColorInput.addEventListener('input', generateGradient);
directionSelect.addEventListener('change', generateGradient);

// Inicializa o gradiente
generateGradient();


 // Funções para a paleta de cores
 const colorInput = document.getElementById('colorInput');
 const colorPreview = document.getElementById('colorPreview');
 const clearButton = document.getElementById('clearButton');
 const copyButton = document.getElementById('copyButton');
 const criarPaleta = document.getElementById('criarPaleta');
 const colors = [];

 colorInput.addEventListener('change', () => {
     const color = colorInput.value;
     if (/^#([0-9a-f]{3}){1,2}$/i.test(color)) {
         colorPreview.style.backgroundColor = color;
         colorPreview.style.display = 'block';
         colors.push(color);
         updateColorDisplay();
     } else {
         alert('Por favor, digite um valor hexadecimal válido.');
     }
 });

 clearButton.addEventListener('click', () => {
     limparCores();
     colors.length = 0;
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
     const colorDisplay = document.getElementById('colorDisplay');
     colorDisplay.innerHTML = '';
     colors.forEach(color => {
         const colorItem = document.createElement('div');
         colorItem.classList.add('color-item');
         colorItem.style.backgroundColor = color;
         colorDisplay.appendChild(colorItem);
     });
 }

 function gerarCSS() {
     var cssGerado = '';
     const colorItems = document.querySelectorAll('.color-item');
     colorItems.forEach((colorItem, index) => {
         const color = colorItem.style.backgroundColor;
         cssGerado += ".color" + (index + 1) + " { color: " + color + "; }\n";
     });
     var outputDiv = document.getElementById('css-output');
     outputDiv.innerText = cssGerado; 
 }

 document.getElementById("opcoes").addEventListener("change", function() {
     var opcaoSelecionada = document.getElementById("opcoes").value;
     if (opcaoSelecionada === "opcao1") {
         gerarCSS();
     }
 });

 function criarPaletaDeCores() {
     const colorPickerDiv = document.querySelector('.color-preview2');

     colorPickerDiv.innerHTML = '';
     colorPickerDiv.style.display = 'block';

     const colors = [
         "#000000", "#696969", "#808080", "#A9A9A9", "#C0C0C0", "#D3D3D3", "#DCDCDC", "#FFFFFF", "#6A5ACD", "#483D8B",
         "#191970", "#000080", "#00008B", "#0000CD", "#0000FF", "#6495ED", "#4169E1", "#1E90FF", "#00BFFF", "#87CEFA",
         "#87CEEB", "#ADD8E6", "#4682B4", "#B0C4DE", "#708090", "#778899", "#00FFFF", "#00CED1", "#40E0D0", "#48D1CC",
         "#20B2AA", "#008B8B", "#008B8B", "#7FFFD4", "#66CDAA", "#5F9EA0", "#2F4F4F", "#00FA9A", "#00FF7F", "#98FB98",
         "#90EE90", "#8FBC8F", "#3CB371", "#2E8B57", "#006400", "#008000", "#228B22", "#32CD32", "#00FF00", "#7CFC00",
         "#7FFF00", "#ADFF2F", "#9ACD32", "#6B8E23", "#556B2F", "#808000", "#BDB76B", "#DAA520", "#B8860B", "#8B4513",
         "#A0522D", "#BC8F8F", "#CD853F", "#D2691E", "#F4A460", "#FFDEAD", "#F5DEB3", "#DEB887", "#D2B48C", "#7B68EE",
         "#9370DB", "#8A2BE2", "#4B0082", "#9400D3", "#9932CC", "#BA55D3", "#800080", "#8B008B", "#FF00FF", "#EE82EE",
         "#DA70D6", "#DDA0DD", "#C71585", "#FF1493", "#FF69B4", "#C71585", "#FFB6C1", "#FFC0CB", "#F08080", "#CD5C5C",
         "#DC143C", "#800000", "#8B0000", "#B22222", "#A52A2A", "#FA8072", "#E9967A", "#FFA07A", "#FF7F50", "#FF6347",
         "#FF0000", "#FF4500", "#FF8C00", "#FFA500", "#FFD700", "#FFFF00", "#F0E68C", "#F0F8FF", "#F8F8FF", "#FFFAFA",
         "#FFF5EE", "#FFFAF0", "#F5F5F5", "#F5F5DC", "#FDF5E6", "#FFFFF0", "#FAF0E6", "#FFF8DC", "#FAEBD7", "#FFEBCD",
         "#FFE4C4", "#FFFFE0", "#FFFACD", "#FAFAD2", "#FFEFD5", "#FFDAB9", "#FFE4B5", "#EEE8AA", "#FFE4E1", "#FFF0F5",
         "#E6E6FA", "#D8BFD8", "#F0FFFF", "#E0FFFF", "#B0E0E6", "#E0FFFF", "#F0FFF0", "#F5FFFA"
     ];

     colors.forEach(color => {
         const colorDiv = document.createElement('div');
         colorDiv.style.backgroundColor = color;
         colorDiv.style.width = '13px';
         colorDiv.style.height = '13px';
         colorDiv.style.margin = '2.5px';
         colorDiv.style.display = 'inline-block';
         colorPickerDiv.appendChild(colorDiv);

         let clicks = 0;

         colorDiv.addEventListener('click', () => {
             clicks++;
             if (clicks === 2) {
                 const colorItem = document.createElement('div');
                 colorItem.classList.add('color-item');
                 colorItem.style.backgroundColor = color;
                 colorDisplay.appendChild(colorItem);
                 clicks = 0;
             }
         });
     });
 }

 function limparCores() {
     const colorDisplay = document.getElementById('colorDisplay');
     colorDisplay.innerHTML = ''; 
     const outputDiv = document.getElementById('css-output');
     outputDiv.innerText = ''; 
     const colorPickerDiv = document.querySelector('.color-preview2');
     colorPickerDiv.innerHTML = ''; 
     colorPickerDiv.style.display = 'none';
     colorInput.value = '';
     colorPreview.style.display = 'none';
 }

 criarPaletaDeCores();

 function copyCode() {
    var codeElement = document.getElementById("css-output");
    var range = document.createRange();
    range.selectNode(codeElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}
