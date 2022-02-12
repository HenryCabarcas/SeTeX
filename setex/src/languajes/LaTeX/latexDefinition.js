import latexGetSuggestions from "./latexSuggestions";
import latexGetSyntax from "./latexSyntax";

export default function loadLatex(monaco, wrapper) {

    const properties = {
        theme: 'myCoolTheme',
        value: "function hello() {\n\talert(\"Hello world!\");\n}",
        language: "LaTeX",
        automaticLayout: true,
        contextmenu: false,
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8
    }

    const rules = [
        { token: 'custom-info', foreground: '808080' },
        { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
        { token: 'custom-notice', foreground: 'FFA500' },
        { token: 'custom-date', foreground: '008800' },
        { token: 'any', foreground: 'FFFFFF' }
    ]
    monaco.languages.register({ id: 'LaTeX' });
    monaco.languages.setMonarchTokensProvider('LaTeX', latexGetSyntax());
    monaco.editor.defineTheme('myCoolTheme', {
        base: 'vs-dark',
        inherit: false,
        rules: rules
    });

    monaco.languages.registerCompletionItemProvider('LaTeX', {
        provideCompletionItems: () => { return { suggestions: latexGetSuggestions(monaco) }; }
    });
    monaco.editor.create(wrapper, properties);
}