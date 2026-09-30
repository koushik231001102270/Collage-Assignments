import React from 'react'

export const Section = ({ children, style  }: { children?: React.ReactNode,style?: React.CSSProperties;  }) => {
    return (
        <section style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%",
            paddingInline: "16px",
            maxWidth: "640px",
            ...style
        }}
        >
            {children}
        </section>
    )
}
