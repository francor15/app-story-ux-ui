import React from "react"

function Corner(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} width="10" height="10" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5V1H5" stroke="#64748b" strokeMiterlimit="10" />
        </svg>

    )
}
export default Corner