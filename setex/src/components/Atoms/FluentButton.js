import { Component } from "react";
import '../../styles/Fluent.css';
var idx = 0;
const diameter = 500;
const diameter2 = 250;

export default class FluentButton extends Component {
    constructor(props) {
        super(props);
        this.border = props.border ? props.border : "1px";
        this.borderRadius = props.borderRadius ? props.borderRadius : "0";
        this.borderNum = Number.parseInt(this.border.replace(/^\D+/g, ''));
        this.radNum = Number.parseInt(this.borderRadius.replace(/^\D+/g, ''));
        this.svg = {};
        this.index = idx;
        this.id = this.props.id ? this.props.id : `btn-${this.index}`;
        idx++;
    }

    render() {

        return (
            <button id={this.id}
                className="fluent-button fluent"
                border={this.border}
                style={{
                    width: "fit-content",
                    height: "fit-content",
                    borderRadius: this.borderRadius,
                    overflow: "hidden"
                }}>
                {this.props.children}
                <svg id={`btn-svg-${this.index}`} width="100%" height="100%" preserveAspectRatio="none" className="border-svg">
                    <defs>
                        <mask id={`hole${this.index}`}>
                            <rect
                                width="100%"
                                height="100%" rx={`${this.borderRadius}`} fill="white" />
                            <rect
                                id={`btn-svg-rect-${this.index}`}
                                x={`${this.border}`} y={`${this.border}`} />
                        </mask>
                    </defs>
                    <circle
                        cx="50px"
                        cy="50px"
                        r={`${diameter2 / 2}px`}
                        fill="url(#effect-gradient)"
                        mask={`url(#hole${this.index})`}
                    />
                </svg>
            </button>
        )
    }
    componentDidMount() {
        var btn = document.getElementById(this.id);
        btn.setAttribute("border", this.border)
        var r = Number.parseInt(this.border.replace(/^\D+/g, ''));
        if (r > 0) {
            this.svg = document.getElementById(`btn-svg-${this.index}`);
            var Rect = document.getElementById(this.id).getBoundingClientRect();
            var rect = document.getElementById(`btn-svg-rect-${this.index}`);
            rect.setAttribute("width", `${Rect.width - 2 * this.borderNum}px`);
            rect.setAttribute("height", `${Rect.height - 2 * this.borderNum}px`);
            rect.setAttribute("rx", `${this.radNum * 0.85}px`);
        }
        btn.addEventListener("mouseenter", this.insertCircle);
        btn.addEventListener("mousemove", this.moveCircle);
        btn.addEventListener("mouseleave", this.clearCircle);
    }

    insertCircle() {
        var circle = document.getElementById("button-circle");
        document.getElementById(this.id).appendChild(circle);
        circle.style.display = "block";
    }
    moveCircle(event) {
        var circle = document.getElementById("button-circle");
        var rect = document.getElementById(this.id).getBoundingClientRect();
        var x = event.clientX - rect.left; //x position within the element.
        var y = event.clientY - rect.top; //y position within the element.
        circle.style.left = `${x - diameter / 2}px`;
        circle.style.top = `${y - diameter / 2}px`;
    }
    clearCircle() {
        var circle = document.getElementById("button-circle");
        document.getElementById("root").appendChild(circle);
        circle.style.display = "none";
    }

}
