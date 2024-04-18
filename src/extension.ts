import * as vscode from 'vscode';
import * as fs from 'fs';
import { join } from 'path';

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

            const srcPath = vscode.Uri.file(context.extensionPath + '/src');
            const htmlPath = vscode.Uri.joinPath(srcPath, 'extension.html');
            const cssPath = vscode.Uri.joinPath(srcPath, 'extension.css');
            const jsPath = vscode.Uri.joinPath(srcPath, 'script.js');

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

            const htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf-8');
            const cssContent = fs.readFileSync(cssPath.fsPath, 'utf-8');
            const jsContent = fs.readFileSync(jsPath.fsPath, 'utf-8');

            // HTML, CSS, and JavaScript
            const combinedContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`) + `<script>${jsContent}</script>`;
            panel.webview.html = combinedContent;
        })
    );
}
