import React from 'react'

export const Title = ({ children, style  }: { children?: React.ReactNode,style?: React.CSSProperties;  }) => {
    return (
        <div style={{
            color: "var(--subdued)",
            letterSpacing: ".04em",
            fontSize: "12px",
            lineHeight: "16px",
            ...style
        }}>
{children}
        </div>
    )
}
