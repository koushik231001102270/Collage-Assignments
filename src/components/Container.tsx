import React from 'react'

export const Container = ({ children }: { children?: React.ReactNode }) => {
    return (
        <main style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
        }}
        >
            {children}
        </main >
    )
}
