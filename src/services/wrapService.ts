import * as vscode from 'vscode';
import { BlockTemplate } from '../models/blockTemplate';

/**
 * Оборачивает выделенный код в заданный блок.
 *
 * @param editor Активный редактор VS Code
 * @param template Шаблон блока (header + footer)
 */
export function wrapSelection(
    editor: vscode.TextEditor,
    template: BlockTemplate
): void {
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    // Определяем текущий отступ выделенного кода
    const startLine = selection.start.line;
    const lineText = editor.document.lineAt(startLine).text;
    const baseIndentMatch = lineText.match(/^\s*/);
    const baseIndent = baseIndentMatch ? baseIndentMatch[0] : '';

    // Добавляем один уровень отступа к каждой непустой строке
    const indentedBody = selectedText
        .split('\n')
        .map(line => line.trim() ? baseIndent + '    ' + line : line)
        .join('\n');

    // Собираем итоговый код
    const header = baseIndent + template.header;
    const footer = baseIndent + template.footer;
    const result = `${header}\n${indentedBody}\n${footer}`;

    // Заменяем выделение
    editor.edit(editBuilder => {
        editBuilder.replace(selection, result);
    });
}