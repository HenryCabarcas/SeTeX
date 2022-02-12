
let numbers = {};
var numEditors = 0;
let editor = {}
var lineHoverColor = [0, 0, 0, 0.15],
    actualLineColor = "rgba(0,10,35,0.35)",
    cursorColor = "rgb(255,0,0)";

String.prototype.splice = function (start, newSubStr) {
    return this.substr(0, start) + newSubStr + this.substr(start + 1);
};
window.onload = () => {
    editor = document.getElementsByTagName("code-editor")[0];
    let lines = document.getElementsByClassName("line-text");
    var minimap = document.getElementById("editor-minimap-0");
    numbers = document.getElementsByClassName("numbers")[0];
    let text = [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum ", "optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum ", "optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum ", "optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum ", "optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum ", "optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum ", "optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum ", "optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum ", "optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum ", "optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eaque mollitia voluptas sit, tempora cumque placeat est corrupti illum optio eos eveniet, corporis amet ipsam laboriosam magnam! Sit, maiores? Accusantium."
    ]

    for (let i = 0; i < text.length; i++) {
        editor.numLines++;
        const line = new EditorLine(text[i], editor.numLines, editor.idx, false);
        editor.lines.append(line);
    };

    const link = document.createElement("link");
    link.href = "./editor.css";
    link.rel = "stylesheet";
    editor.minimap.contentWindow.document.open();
    editor.minimap.contentWindow.document.write(editor.lines.innerHTML);
    editor.minimap.contentWindow.document.write(
        `<style>
        @font-face {
  font-family: "minimap";
  src: url("https://cdn.jsdelivr.net/gh/davestewart/minimap-font@ee2d6c79c101bfe13658e2dcbdc1e1bbeef24def/src/webfont/minimap.woff2")
      format("woff2"),
    url("https://cdn.jsdelivr.net/gh/davestewart/minimap-font@ee2d6c79c101bfe13658e2dcbdc1e1bbeef24def/src/webfont/minimap.woff")
      format("woff");
  font-weight: normal;
  font-style: normal;
}
* {
  padding: 0 0;
  font-size: 4px;
  font-family: minimap, sans-serif;
  letter-spacing: -0.5px;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: unset;
  font-smoothing: unset;
  
  white-space: nowrap;
  color: #5b8cb1;

  overflow: hidden;
   -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
}
</style>
`);
    editor.minimap.contentDocument.head.append(link);
    editor.minimap.contentDocument.close();

    //initMinimap(editor.minimap, editor.lines);
    //editor.addEventListener("mousemove", updateMinimap);

}
class EditorElement extends HTMLElement {
    constructor(color = [0, 0, 0, 0]) {
        super();
        this.color = [0, 0, 0, 0];
        this.style.backgroundColor = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
        this.state = "active";
        this.bgColor = color;
        this.num = 0;
        this.innerHTML = '&nbsp;';
    }
    setBgColor(color = this.bgColor) {
        this.style.backgroundColor = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
    }
}

class EditorLine extends EditorElement {
    constructor(text, lineNum = 0, idx = -1, onMinimap = true) {
        super();
        this.text = text;
        this.classList.add("line");
        this.num = lineNum;
        if (!onMinimap) {
            //this.id = "line-" + this.num;
            this.mark = new EditorElement();
            this.mark.id = `line-mark-${this.num}`;
            this.number = new EditorElement();
            this.number.innerHTML = `${this.num}`;
            this.number.id = `line-number-${this.num}`;
            this.icon = new EditorElement();
            this.icon.innerHTML = '&nbsp;'
            this.icon.id = `line-icon-${this.num}`;
            this.color = new EditorElement();
            this.color.innerHTML = '&nbsp;'
            this.color.id = `line-color-${this.num}`;
            document.getElementById(`editor-marks-${idx}`).appendChild(this.mark);
            document.getElementById(`editor-numbers-${idx}`).appendChild(this.number);
            document.getElementById(`editor-icons-${idx}`).appendChild(this.icon);
            document.getElementById(`editor-colors-${idx}`).appendChild(this.color);
        }
        var actual = "";
        var wordId = 0;
        const add = (text, hasSpace) => {
            const word = document.createElement("span");
            word.id = `l-${this.num}-p-${wordId}`;
            word.innerHTML = text;
            word.classList.add("word");
            this.appendChild(word);
            if (hasSpace) {
                wordId++;
                var space = document.createElement("span");
                space.id = `l-${this.num}-p-${wordId}`;
                space.innerHTML = " ";
                space.classList.add("space");
                this.appendChild(space);
            }
            wordId++;

        }
        if (this.text) {
            for (let i = 0; i < this.text.length; i++) {
                const elem = this.text[i];
                if (elem == " ") {
                    add(actual, true);
                    actual = "";
                } else if (actual == "\n") {
                    add(actual, false);
                    actual = "";
                }
                else {
                    actual += elem;
                }
            }
        }
        this.addEventListener("mouseover", (e) => {
            onLineHovered(e, this.num, this.parentElement.parentElement.id);
        })
        this.addEventListener("mouseenter", (e) => {
            onLineHovered(e, this.num, this.parentElement.parentElement.id);
        })
        this.addEventListener("mouseleave", (e) => {
            onLineUnHovered(e, this.num, this.parentElement.parentElement.id);
        })
    }
}

class EditorCursor extends HTMLElement {
    constructor(Id) {
        super();
        this.classList.add("cursor");
        this.id = Id;
        this.innerHTML = '&nbsp;';
        this.x = 0;
        this.y = 0;
        this.parentId = "0";
        this.style.backgroundColor = cursorColor;
    }
    setPos(parent, x, y) {
        for (i = 0; i < parent.children.length; i++) {
            const item = parent.children[i];
        }
    }
}

class Editor extends HTMLElement {
    constructor() {
        super();
        this.scrolled = { x: 0, y: 0 };
        this.cursors = [];
        this.numLines = 0;
        this.idx = numEditors;
        this.id = numEditors;
        this.marks = document.createElement("div");
        this.marks.id = `editor-marks-${this.id}`;
        this.marks.classList.add("no-select");
        this.append(this.marks);
        this.numbers = document.createElement("div");
        this.numbers.id = `editor-numbers-${this.id}`;
        this.numbers.classList.add("no-select");
        this.append(this.numbers);
        this.icons = document.createElement("div");
        this.icons.id = `editor-icons-${this.id}`;
        this.icons.classList.add("no-select");
        this.append(this.icons);
        this.colors = document.createElement("div");
        this.colors.id = `editor-colors-${this.id}`;
        this.colors.classList.add("no-select");
        this.append(this.colors);
        this.lines = document.createElement("div");
        this.lines.id = `editor-lines-${this.id}`;
        this.append(this.lines);
        this.select = document.createElement("div");
        this.select.id = `editor-select-${this.id}`;
        this.lines.append(this.select);
        this.minimap = document.createElement(/*'http://www.w3.org/2000/svg', */'iframe');
        this.minimap.title = `editor-minimap-${this.id}`;
        this.minimap.id = `editor-minimap-${this.id}`;
        this.append(this.minimap);
        this.id = `editor-${this.id}`;
        var cur = new EditorCursor("c-0");
        this.lines.appendChild(cur);
        this.cursors.push(cur.id);
        numEditors++;
        document.addEventListener("selectionchange", () => {
            this.select.innerHTML = "";
            var params = getSelectionParams();
            const selection = window.getSelection();
            var selections = document.getElementsByClassName("selected");
            for (var i = 0; i < this.lines.children.length; i++) {
                fancySelection(this.lines.children[i], selection, params, this.select);
            }
        })
        this.addEventListener("mouseup", e => {
            var elems = getSelectionParams();
            this.lastCursorPos.elem = elems.focus;
            this.lastCursorPos.offset = elems.fOffset;
            setCursorInLine(elems.focus, elems.fOffset, this.lastCursorPos);
        })
        this.lines.addEventListener("scroll", onLinesScroll);
        this.lastCursorPos = {
            x: 0, y: 0, elem: this.cur, offset: 0
        }
        window.addEventListener("keydown", e => {
            console.log(this.lastCursorPos.elem.text)

            if (e.code === "Space") {
                this.lastCursorPos.elem.innerHTML = this.lastCursorPos.elem.innerHTML.substr(0, this.lastCursorPos.offset)
                    + " " + this.lastCursorPos.elem.innerHTML.substr(this.lastCursorPos.offset);
                this.lastCursorPos.offset += 1;
            }
            else {
                this.lastCursorPos.elem.innerHTML = this.lastCursorPos.elem.innerHTML.substr(0, this.lastCursorPos.offset)
                    + e.key + this.lastCursorPos.elem.innerHTML.substr(this.lastCursorPos.offset);
                this.lastCursorPos.offset += e.key.length;
            }
            setCursorInLine(this.lastCursorPos.elem, this.lastCursorPos.offset, this.lastCursorPos)
            document.getElementById("key").innerHTML = e.key;
            document.getElementById("keyCode").innerHTML = e.bubbles;
            document.getElementById("eventCode").innerHTML = e.code;
        })

    }
    addCursor(x, y) {

    }
}
function onLineHovered(e, index, parentId) {
    var t = e.currentTarget;
    t.style.backgroundColor = "rgba(0,0,0,0.15)";
    editor.minimap.contentDocument.body.children[index].style.backgroundColor = lineHoverColor;
    editor.marks.children[t.num - 1].setBgColor(lineHoverColor);
    editor.numbers.children[t.num - 1].setBgColor(lineHoverColor);
    editor.icons.children[t.num - 1].setBgColor(lineHoverColor);
}

function onLineUnHovered(e, index, parentId) {
    var t = e.currentTarget;
    t.style.backgroundColor = "rgba(0,0,0,0)";
    editor.minimap.contentDocument.body.children[index + 2].style.backgroundColor = "rgba(0,0,0,0)";
    editor.marks.children[t.num - 1].setBgColor();
    editor.numbers.children[t.num - 1].setBgColor();
    editor.icons.children[t.num - 1].setBgColor();
}
function getSelectionParams() {
    const selection = window.getSelection();
    return {
        base: selection.baseNode.parentElement,
        bOffset: selection.baseOffset,
        focus: selection.focusNode.parentElement,
        fOffset: selection.focusOffset
    }
}

function setCursorInLine(item, offset, lastInfo) {
    item.parentElement.style.backgroundColor = actualLineColor;
    var rect = item.getBoundingClientRect();
    var cur = document.getElementById("c-0")
    var s = calculateWordDimensions(item.innerHTML.substr(0, offset))
    var s2 = rect.left + s.width;
    cur.x = lastInfo.x = s2;
    cur.y = lastInfo.y = rect.top;
    cur.style.left = `${s2}px`;
    cur.style.top = `${rect.top}px`
    cur.blur();
}

function calculateWordDimensions(text, font = '"Inconsolata"') {
    var div = document.createElement('div');
    div.classList.add('textDimensionCalculation')
    div.style.font = font;
    div.innerHTML = text;
    document.body.appendChild(div);
    var dimensions = {
        width: div.getBoundingClientRect().width,
        height: div.getBoundingClientRect().height
    };
    div.parentNode.removeChild(div);
    return dimensions;
}

function onLinesScroll(e) {
    e.currentTarget.firstChild.style.width = `${e.currentTarget.getBoundingClientRect().width}px`;
    var cur = document.getElementById("c-0")
    var left = parseFloat(cur.style.left.replace("px", ""));
    cur.style.left = `${left - (e.currentTarget.scrollLeft - editor.scrolled.x)}px`;
    editor.scrolled = {
        x: e.currentTarget.scrollLeft,
        y: e.currentTarget.scrollTop
    }
}

function fancySelection(line, selection, params, selectE) {
    var min = 1e10, max = 0, width = 0;
    var sel = undefined;
    for (var i = 0; i < line.children.length; i++) {
        const item = line.children[i];
        if (selection.containsNode(item)) {
            var rect = item.getBoundingClientRect();
            if (item === params.base) {
                //if (selection.containsNode(item.nextElementSibling)) {
                if (min === 1e10) {
                    var s = calculateWordDimensions(item.innerHTML.substr(0, params.bOffset))
                    min = rect.left + s.width;
                } else {
                    var s = calculateWordDimensions(item.innerHTML.substr(params.bOffset))
                    max = rect.left + s.width;
                }
                //}
            }
            else if (item === params.focus) {
                if (min === 1e10) {
                    var s = calculateWordDimensions(item.innerHTML.substr(0, params.fOffset))
                    min = rect.left + s.width;
                } else {
                    var s = calculateWordDimensions(item.innerHTML.substr(params.fOffset))
                    max = rect.left + s.width;
                }
            }
            else if (rect.x < min) min = rect.x;
            else if (rect.x + rect.width > max) max = rect.x + rect.width;
            if (sel === undefined) {
                sel = document.createElement("div");
                sel.style.height = `${line.getBoundingClientRect().height}px`;
                sel.style.top = `${line.getBoundingClientRect().top - selectE.getBoundingClientRect().top}px`
                sel.classList.add("selected");
            } else {
                sel.style.left = `${min - selectE.getBoundingClientRect().left}px`;
                sel.style.width = `${max - min}px`;
            }
        }
    }
    if (sel !== undefined) {

        selectE.append(sel);
    }
}

customElements.define("e-e", EditorElement);
customElements.define("e-line", EditorLine);
customElements.define("e-cursor", EditorCursor);
customElements.define("code-editor", Editor);
