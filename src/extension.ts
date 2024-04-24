import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('JustColors.start', () => {
            JustColorsPanel.createOrShow(context.extensionUri);
        })
    );
}

class JustColorsPanel {
    public static currentPanel: JustColorsPanel | undefined;

    public static readonly viewType = 'justColors';

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (JustColorsPanel.currentPanel) {
            JustColorsPanel.currentPanel._panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            JustColorsPanel.viewType,
            'Just Colors',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
            }
        );

        JustColorsPanel.currentPanel = new JustColorsPanel(panel, extensionUri);
    }

    public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        JustColorsPanel.currentPanel = new JustColorsPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'alert':
                        vscode.window.showErrorMessage(message.text);
                        return;
                }
            },
            null,
            this._disposables
        );

        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        this._panel.onDidChangeViewState(
            e => {
                if (this._panel.visible) {
                    this._update();
                }
            },
            null,
            this._disposables
        );

        this._update();
    }

    public dispose() {
        JustColorsPanel.currentPanel = undefined;
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _update() {
        const webview = this._panel.webview;

        const jsContent = fs.readFileSync(path.join(this._extensionUri.fsPath, 'media', 'script.js'), 'utf-8');
        const htmlContent = this._getHtmlForWebview(jsContent);
        this._panel.webview.html = htmlContent;
    }

    private _getHtmlForWebview(jsContent: string): string {
     

        const nonce = getNonce();

        return ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                   
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
            body {
                font-family: 'Fira code', monospace;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                height: 100vh;
                background-color: #100c1b; /* cor de fundo principal */
                color: #ffffff; /* cor do texto */
                position: relative; /* Permitir que os emojis sejam posicionados */
            }
            
            .container {
                text-align: center;
                width: 400px;
                padding: 20px;
                z-index: 1; /* Garantir que o conteúdo fique na frente dos emojis */
            }
            
            .color-picker {
                background-color: #0a0713; /* cor do fundo do card */
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                max-height: 400px; /* Altura máxima do card */
                overflow-y: auto; /* Habilitar a barra de rolagem vertical */
            }
            
            .color-css {
                background-color: #0a0713; /* cor do fundo do card */
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            
            .color-input {
                width: calc(100% - 16px); /* Considerando o padding */
                margin-bottom: 20px; /* Espaço extra entre o input e o próximo elemento */
                margin-top: 10px; /* Margem superior para separá-lo do .color-preview */
                padding: 8px;
                font-size: 16px;
                border: 1px solid #ffffff; /* cor da borda do campo de entrada */
                border-radius: 5px;
                color: #ffffff; /* cor do texto do campo de entrada */
                background-color: #140f27; /* cor de fundo do campo de entrada */
                margin: 0 auto; /* centralizar horizontalmente */
            }
            
            
            .color-preview {
                width: 100%;
                height: 100px;
                margin-bottom: 10px;
                border-radius: 5px;
                margin-top: 10px;
                display:  none;
            }
            .color-preview2 {
                width: 100%;
                height: 200px;
                margin-bottom: 10px;
                border-radius: 5px;
                margin-top: 10px;
                display: none;
            }
            
            .color-display {
                width: 100%;
                margin-bottom: 10px;
                border-radius: 5px;
                padding-top: 6px;
            }
            
            .color-item {
                display: inline-block;
                margin-right: 5px;
                border-radius: 5px;
                width: 40px;
                height: 20px;
            }
            
            
            .clear-button, .copy-button {
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #1e163a; /* cor do botão */
                border: none;
                border-radius: 5px;
                color: #ffffff; /* cor do texto do botão */
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            
            .clear-button:hover, .copy-button:hover {
                background-color: #281e4e; /* cor do botão ao passar o mouse */
            }
            
            .coffee-button {
                padding: 15px 30px;
                background-color: #550d80; /* cor do botão de doação */
                border: none;
                border-radius: 5px;
                color: rgb(255, 255, 255); /* cor do texto do botão de doação */
                font-size: 18px;
                text-decoration: none;
                transition: background-color 0.3s;
            }
            
            .coffee-button:hover {
                background-color: #480b6b; /* cor do botão de doação ao passar o mouse */
                transform: scale(1.3);
            }
            
            /* Estilos para emojis */
            .emoji {
                position: absolute;
                font-size: 2rem;
                opacity: 0.3;
            }
            
            h1 {
                font-size: 2.5rem; /* Reduzi o tamanho da fonte */
                text-align: center;
                height: auto; /* Removi a altura fixa */
                line-height: 1; /* Defini a altura da linha como 1 para evitar espaçamento extra */
                color: #ffffff;
                background: #0a0713;
                font-family: "Fredericka the Great", serif;
                font-weight: 400;
                font-style: normal;
                border-radius:  10px;
                /* Removi o text-shadow para simplificar */
            }
            
            code {
               
               
                background-color: #0a0713; /* cor do botão */
                border: none;
                border-radius: 5px;
                color: #ffffff; /* cor do texto do botão */
                font-size: 16px;
                cursor: pointer;
            }
            
            
            .color-red { color: #4169E1;  font-family: "Fredericka the Great", serif; font-weight: 400; font-style: normal;}
            .color-orange { color: #00FA9A; font-family: "Fredericka the Great", serif; font-weight: 400; font-style: normal;}
            .color-yellow { color: #DC143C;  font-family: "Fredericka the Great", serif; font-weight: 400; font-style: normal;}
            .color-green { color: #FF0000; font-family: "Fredericka the Great", serif; font-weight: 400; font-style: normal;}
            .color-blue { color: #FFFF00;  font-family: "Fredericka the Great", serif; font-weight: 400; font-style: normal;}
            .color-purple { color: #FFFFFF;  font-family: "Fredericka the Great", serif; font-weight: 400; font-style: normal;}
            
            
            .form-group {
              margin-bottom: 10px;
            }
            
            label {
              display: inline-block;
              width: 100px;
            }
            
            input[type="color"],
            select {
                width: 80px;
                padding: 5px;
                background-color: #1e163a;
                border: 1px solid #8a2be2; /* cor da borda roxa */
                border-radius: 3px;
                margin-right: 10px;
                color: #FFFFFF;
            }
            
            #gradient-box {
              width: 70px;
              height: 70px;
              border: 1px solid #000;
              margin: 20px auto;
            }
            

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

            <script nonce="${nonce}">${jsContent}</script>
        </body>
        </html>`;
    }
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
