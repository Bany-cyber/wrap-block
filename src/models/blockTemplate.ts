/**
 * Шаблон блока для оборачивания выделенного кода.
 * Используется как структура данных для описания доступных конструкций.
 */
export interface BlockTemplate {
    id: string;
    label: string;
    header: string;
    footer: string;
    description: string;
}

/**
 * Набор доступных блоков (структура данных — Map).
 * Ключ — идентификатор блока, значение — описание шаблона.
 *
 * Шаблоны ориентированы на C++.
 */
export const BLOCK_TEMPLATES: Map<string, BlockTemplate> = new Map([
    ['if', {
        id: 'if',
        label: 'if (...) { ... }',
        header: 'if (condition) {',
        footer: '}',
        description: 'Обернуть выделенный код в if-блок'
    }],
    ['else', {
        id: 'else',
        label: 'else { ... }',
        header: 'else {',
        footer: '}',
        description: 'Обернуть выделенный код в else-блок'
    }],
    ['for', {
        id: 'for',
        label: 'for (int i = 0; i < N; i++) { ... }',
        header: 'for (int i = 0; i < N; i++) {',
        footer: '}',
        description: 'Обернуть выделенный код в for-цикл (C++)'
    }],
    ['while', {
        id: 'while',
        label: 'while (...) { ... }',
        header: 'while (condition) {',
        footer: '}',
        description: 'Обернуть выделенный код в while-цикл'
    }]
]);