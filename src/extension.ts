import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('ColorTest.start', () => {
            // Create and show panel
            const panel = vscode.window.createWebviewPanel(
                'ColorTest',
                'Color Test',
                vscode.ViewColumn.Two,
                {}
            );

            // Get the absolute path to the 'src' directory
            const srcPath = vscode.Uri.file(context.extensionPath + '/src');

            // Read the HTML, CSS, and JavaScript files
            const htmlPath = vscode.Uri.joinPath(srcPath, 'extension.html');
            const cssPath = vscode.Uri.joinPath(srcPath, 'extension.css');
            const jsPath = vscode.Uri.joinPath(srcPath, 'script.js');

            if (!fs.existsSync(htmlPath.fsPath)) {
                vscode.window.showErrorMessage(`HTML file not found at ${htmlPath.fsPath}`);
                return;
            }

            if (!fs.existsSync(cssPath.fsPath)) {
                vscode.window.showErrorMessage(`CSS file not found at ${cssPath.fsPath}`);
                return;
            }

            if (!fs.existsSync(jsPath.fsPath)) {
                vscode.window.showErrorMessage(`JavaScript file not found at ${jsPath.fsPath}`);
                return;
            }

            const htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf-8');
            const cssContent = fs.readFileSync(cssPath.fsPath, 'utf-8');
            const jsContent = fs.readFileSync(jsPath.fsPath, 'utf-8');

            // Combine HTML, CSS, and JavaScript
            const combinedContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`) + `<script>${jsContent}</script>`;

            // Set HTML content
            panel.webview.html = combinedContent;
        })
    );
}
