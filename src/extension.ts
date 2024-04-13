import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('ColorTest.start', () => {
            
            const panel = vscode.window.createWebviewPanel(
                'ColorTest',
                'Color Test',
                vscode.ViewColumn.Two,
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

            //  HTML, CSS, and JavaScript
            const combinedContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`) + `<script>${jsContent}</script>`;

            panel.webview.html = combinedContent;
        })
    );
}
