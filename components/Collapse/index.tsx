"use client";
import React, { CSSProperties, useState } from "react";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Collapse: React.FC<CollapseProps> = ({ title, style, className, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        border: "2px solid grey",
        padding: "4px 16px",
        borderRadius: 4,
        marginBottom: 8,
        cursor: "pointer",
        ...style,
      }}
      className={className}
    >
      <header
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ paddingRight: 24 }}>{title}</div>
        <div>点击{isOpen ? "折叠" : "展开"}</div>
      </header>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Collapse;
