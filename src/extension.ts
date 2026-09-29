import * as vscode from 'vscode';
import { registerWrapCommand } from './commands/wrapCommand';

/**
 * Точка входа расширения.
 * Делегирует регистрацию команды в commands/wrapCommand.ts
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Расширение "wrap-block" активировано!');
    registerWrapCommand(context);
}

export function deactivate() {}