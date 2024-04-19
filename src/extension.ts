import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // Criar um novo item na barra de status
    const statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusItem.text = "Just Colors 🎨";
    statusItem.tooltip = "Clique para abrir Just Colors";
    statusItem.command = "JustColors.start";
    statusItem.show();

    // Registrar o comando para abrir Just Colors
    context.subscriptions.push(
        vscode.commands.registerCommand('JustColors.start', () => {
            // Colocar o código para criar e exibir o webview aqui
            const panel = vscode.window.createWebviewPanel(
                'JustColors',
                'Just Colors',
                vscode.ViewColumn.Beside,
                {
                    enableScripts: true,
                },
            );

            // Obter o caminho para o arquivo JavaScript
            const jsPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'script.js'));

            if (!fs.existsSync(jsPath.fsPath)) {
                vscode.window.showErrorMessage(`JavaScript não encontrado ${jsPath.fsPath}`);
                return;
            }

            // Ler o conteúdo do arquivo JavaScript
            const jsContent = fs.readFileSync(jsPath.fsPath, 'utf-8');

            // HTML e CSS
            function getWebviewContent(){ 
                return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                        ${fs.readFileSync(path.join(context.extensionPath, 'src', 'extension.css'), 'utf-8')}
                    </style>
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>
                
                <title>Teste de Cores</title>
                  
            </head>
            <body>
            
                <!-- Conteúdo principal -->
                <div class="container">
                    <h1>Just <span class="color-red">C</span><span class="color-orange">o</span><span class="color-yellow">l</span><span class="color-green">o</span><span class="color-blue">r</span><span class="color-purple">s</span></h1>
            
                    
                    <div class="color-picker">
                        <input type="text" class="color-input" id="colorInput" placeholder="Digite uma cor em hexadecimal (#RRGGBB)">
                        <div class="color-preview" id="colorPreview"></div>
                        <div class="color-display" id="colorDisplay">
                        </div>
                        <div class="color-preview2" id="colorPreview" ></div>
                        <button class="clear-button" id="clearButton">Limpar Tudo</button>
                        <button class="clear-button"  onclick="gerarCSS()">Gerar CSS</button>
                        <button class="clear-button" id="criarPaleta" onclick="criarPaletaDeCores()">Criar Paleta</button>
                        
                        <h3>Criar Gradiente</h3>
                        <div>
                            <input type="color" id="startColor" value="#ff0000">
                            <input type="color" id="endColor" value="#0000ff">
                            <select id="direction">
                                <option value="to right">Direita</option>
                                <option value="to left">Esquerda</option>
                                <option value="to bottom">Baixo</option>
                                <option value="to top">Cima</option>
                            </select>
                            
                            
                           
                        </div>
                        
                        <div id="gradient-box"></div>
            
                        <div class="color-css" >
                            <code class ="code" id="css-output">
                               
                            </code>
                        </div>
                        <button class="copy-button" onclick="copyCode()">Copiar</button>
                    </div>
                </div>
            <br>
            
            <a href="https://buymeacoffee.com/gabrielmoreno
            ">
                    <button  href=""class="coffee-button" id="coffeeButton">Apoiar desenvolvedor</button>
                </a>
            
                <script>
                        ${jsContent}
                </script>
            </body>
            </html>
            
            `;
        }

            panel.webview.html = getWebviewContent();
        })
    );
}
