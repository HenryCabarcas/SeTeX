import React from "react";
const _effectColor = [255, 255, 255, 1];
const diameter = 500;
var circlePos = { x: 0, y: 0 };

export function InitFluent(props) {
    const effectColor = props.effectColor ? props.effectColor : _effectColor;
    return (
        <React.Fragment>
            <svg width="0" height="0">
                <defs>
                    <radialGradient id="effect-gradient" cx="50%" cy="50%" r="50%">
                        <stop stopColor={`rgba(${effectColor[0]},${effectColor[1]},${effectColor[2]},${effectColor[3]})`} offset="0%" />
                        <stop stopColor={`rgba(${effectColor[0]},${effectColor[1]},${effectColor[2]},${effectColor[3] * 0.5})`} offset="50%" />
                        <stop stopColor={`rgba(${effectColor[0]},${effectColor[1]},${effectColor[2]},${effectColor[3] * 0.05})`} offset="100%" />
                    </radialGradient>
                </defs>
            </svg>
            <span id="button-circle" className="circle" style={{
                width: `${diameter}px`,
                height: `${diameter}px`
            }}>

            </span>
        </React.Fragment>
    )
}

export function borderEffect(event) {
    const buttons = document.getElementsByClassName("fluent-button");
    for (var i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        var atr = button.getAttribute("border");
        if (atr !== "0px" && atr !== "0") {
            var borderNum = Number.parseInt(atr.replace(/^\D+/g, ''));
            var rect = button.getBoundingClientRect();
            circlePos.x = event.clientX - rect.left;
            circlePos.y = event.clientY - rect.top;
            const cir = button.getElementsByTagName("circle")[0];
            cir.style.display = "block";
            cir.setAttribute("cx", `${circlePos.x}px`);
            cir.setAttribute("cy", `${circlePos.y}px`);
            const svg = button.getElementsByTagName("svg")[0];
            svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
            const innerRect = svg.getElementsByTagName("rect")[1];
            innerRect.setAttribute("width", `${rect.width - 2 * borderNum}`);
            innerRect.setAttribute("height", `${rect.height - 2 * borderNum}`);
        }
    }
}

export function borderEffectClear(event) {
    const buttons = document.getElementsByClassName("fluent-button");
    for (var i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        var atr = button.getAttribute("border");
        if (atr !== "0px" && atr !== "0") {
            const cir = button.getElementsByTagName("circle")[0];
            cir.style.display = "none";
        }
    }
}


