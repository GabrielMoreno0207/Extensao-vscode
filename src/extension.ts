import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

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

            // Obter o caminho para os arquivos HTML, CSS e JavaScript
            const htmlPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'extension.html'));
            const cssPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'extension.css'));
            const jsPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'script.js'));

            if (!fs.existsSync(htmlPath.fsPath)) {
                vscode.window.showErrorMessage(`HTML não encontrado ${htmlPath.fsPath}`);
                return;
            }

            if (!fs.existsSync(cssPath.fsPath)) {
                vscode.window.showErrorMessage(`CSS não encontrado ${cssPath.fsPath}`);
                return;
            }

            if (!fs.existsSync(jsPath.fsPath)) {
                vscode.window.showErrorMessage(`JavaScript não encontrado ${jsPath.fsPath}`);
                return;
            }

            // Ler o conteúdo dos arquivos
            const htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf-8');
            const cssContent = fs.readFileSync(cssPath.fsPath, 'utf-8');
            const jsContent = fs.readFileSync(jsPath.fsPath, 'utf-8');

            // HTML, CSS, e JavaScript combinados
            const combinedContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`) + `<script>${jsContent}</script>`;
            panel.webview.html = combinedContent;
        })
    );
}
