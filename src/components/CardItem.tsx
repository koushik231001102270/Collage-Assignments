import React, { Children, cloneElement, isValidElement, useState } from "react";

interface CardContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface CardItemProps {
  title: string;
  subtitle?: string;
  role?: string;
  year?: string;
  href?: string;
  onClick?: () => void;
  index?: number;
  total?: number;
}

const clampTwoLines: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

function getBorderRadius(index: number, totalItems: number) {
  if (totalItems === 1) return "20px";
  if (index === 0) return "20px 20px 4px 4px";
  if (index === totalItems - 1) return "4px 4px 20px 20px";
  return "4px";
}

export const CardItem: React.FC<CardItemProps> = ({
  title,
  subtitle,
  role,
  year,
  href,
  onClick,
  index = 0,
  total = 1,
}) => {
  const [hovered, setHovered] = useState(false);

  const cardInner = (
    <div style={{
      background: hovered ? "rgba(255, 255, 255, 0.1)" : "var(--secondary)",
      borderRadius: getBorderRadius(index, total),
      display: "flex",
      alignItems: "start",
      justifyContent: "space-between",
      gap: "16px",
      padding: "14px 18px",
      transition: "all 0.2s ease-in-out",
      cursor: "default",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: 0,
      }}>
        <span style={{
          fontSize: "16px",
          fontWeight: 400,
          color: "var(--default)",
          ...clampTwoLines,
        }}>
          {title}
        </span>
        {subtitle && (
          <span style={{
            fontSize: "12px",
            letterSpacing: "0.5px",
            color: "var(--subdued)",
            opacity: 0.7,
            ...clampTwoLines,
          }}>
            {subtitle}
          </span>
        )}
      </div>
      {(role || year) && (
        <div style={{ textAlign: "right", flexShrink: 0, whiteSpace: "nowrap" }}>
          {role && (
            <div style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "var(--subdued)",
            }}>
              {role}
            </div>
          )}
          {year && (
            <div style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "var(--default)",
              opacity: 0.7,
            }}>
              {year}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const linkProps = {
    style: { cursor: "default" } as React.CSSProperties,
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (href) {
    return (
      <a href={href} {...linkProps}>
        {cardInner}
      </a>
    );
  }

  return (
    <div {...linkProps} role={onClick ? "button" : undefined}>
      {cardInner}
    </div>
  );
};

export const CardContainer: React.FC<CardContainerProps> = ({ children, style }) => {
  const items = Children.toArray(children).filter(isValidElement) as React.ReactElement<CardItemProps>[];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      transition: "all 0.2s",
      maxWidth: "800px",
      width: "100%",
      ...style
    }}>
      {items.map((child, index) =>
        cloneElement(child, { index, total: items.length })
      )}
    </div>
  );
};

export const Card = Object.assign(CardItem, {
  Container: CardContainer,
});