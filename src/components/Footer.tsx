import React from 'react'

export const Footer = ({ children, style }: { children?: React.ReactNode, style?: React.CSSProperties; }) => {
    return (
        <footer style={{
            "display": "flex",
            paddingBlock: "20px",
            paddingInline: "16px",
            paddingTop: '56px',
            alignItems: "center",
            width: "100%",
            maxWidth: "640px",
            ...style
        }}>
            {children}
        </footer>
    )
}