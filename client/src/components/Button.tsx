import React from "react";
type Easing = "brightness" | "scale";
interface ButtonProps {
    children: string | React.ReactNode;
    style?: "filled" | "outlined";
    color?: string;
    text_size?: number;
    text_color?: string;
    px?: number;
    py?: number;
    mx?: number;
    my?: number;
    easing?: Easing;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


export default function Button({ 
    children, 
    style = "filled",
    color = "default", 
    text_size = 12, 
    text_color,
    px = 6, 
    py = 2,
    mx = 0,
    my = 0,
    easing = "brightness" as Easing,
    onClick
}: ButtonProps) {
    const colors: {[name: string]: string} = {
        "default": "#29b0ff",
        "red": "#ff2929",
        "green": "#5cff87",
        "orange": "#ff7e3d"
    }

    const bgColor = colors[color] || color || colors.default;

    const styleProperties: {[key: string]:string} = {}
    if (style === "filled") {
        styleProperties["backgroundColor"] = bgColor;
        styleProperties["border"] = "none";
        styleProperties["color"] = text_color || "white";
    } else if (style === "outlined") {
        styleProperties["backgroundColor"] = "transparent";
        styleProperties["border"] = `2px solid ${bgColor}`;
        styleProperties["color"] = text_color || bgColor;
    }

    const getEasingClasses = (type: Easing) => {
        const classes = {
            brightness: "hover:brightness-90 active:brightness-50",
            scale: "hover:scale-125 active:scale-125 origin-center"
        };
        return classes[type];
    };

    return (
        <button 
            className={`font-bold rounded duration-200 ${getEasingClasses(easing)}`}
            style={{
                ...styleProperties,
                padding: `${py}px ${px}px`,
                fontSize: `${text_size}px`,
                margin: `${my}px ${mx}px`
            }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}