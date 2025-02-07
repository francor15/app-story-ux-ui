import React from "react"

export default function Arrow(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} width="100" height="49" viewBox="0 0 112 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.5 23.9778L76.5333 48H112" stroke="#1F2937" />
            <line x1="-1.48738e-08" y1="24.5222" x2="112" y2="24.5222" stroke="#1F2937" />
            <path d="M45.5 25.0222L76.5333 1H112" stroke="#1F2937" />
        </svg>
    )
}