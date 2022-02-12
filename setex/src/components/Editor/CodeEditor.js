import '../../styles/CodeEditor.css'
import loader from '@monaco-editor/loader';
import { Component, useEffect } from 'react';
import loadLatex from '../../languajes/LaTeX/latexDefinition';

export default function CodeEditor(props) {
    // eslint-disable-next-line no-useless-constructor

    let editor = {}

    useEffect(() => {
        var f = document.getElementById("setexCodeEditor");
        var head2 = document.getElementById("setexTabs");
        f.style.position = "fixed";
        f.style.top = `${head2.getBoundingClientRect().bottom}px`;
        f.style.height = `${document.body.getBoundingClientRect().height - head2.getBoundingClientRect().bottom - 22}px`;
        loader.init().then(monaco => {
            loadLatex(monaco, f)
            monaco.editor.setTheme("vs");
            monaco.editor.MinimapPosition = 2
        });
        window.addEventListener("resize", () => {
            f.style.top = `${head2.getBoundingClientRect().bottom}px`;
            f.style.height = `${document.body.getBoundingClientRect().height - head2.getBoundingClientRect().bottom - 22}px`;

        })
    })

    return (
        <div id="setexCodeEditorContainer" >
            <div id="setexCodeEditor" />
        </div>
    )






};

