import * as vscode from 'vscode';
import { BLOCK_TEMPLATES } from '../models/blockTemplate';
import { wrapSelection } from '../services/wrapService';


export function registerWrapCommand(
    context: vscode.ExtensionContext
): void {
    const disposable = vscode.commands.registerCommand(
        'wrapBlock.wrapWithBlock',
        () => {

            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('Нет активного редактора.');
                return;
            }


            const selection = editor.selection;
            if (selection.isEmpty) {
                vscode.window.showWarningMessage('Выделите код для оборачивания.');
                return;
            }


            const items = Array.from(BLOCK_TEMPLATES.values()).map(t => ({
                label: t.label,
                description: t.description,
                template: t
            }));


            vscode.window.showQuickPick(items, {
                placeHolder: 'Выберите блок для оборачивания'
            }).then(chosen => {
                if (chosen) {
                    wrapSelection(editor, chosen.template);
                }
            });
        }
    );

    context.subscriptions.push(disposable);
}








//1. Зарегистрировать команду через vscode.commands.registerCommand
//2. Внутри обработчика:
//    a. Проверить activeTextEditor → если нет, показать warning
//    b. Проверить selection.isEmpty → если пусто, показать warning
//    c. Сформировать QuickPickItem[] из BLOCK_TEMPLATES
//    d. Показать showQuickPick → дождаться выбора
//    e. Если выбор есть → вызвать wrapSelection(editor, template)
//3. Подписать disposable на context.subscriptions