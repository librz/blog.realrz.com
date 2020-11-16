import React from "react";

const AppWrapper = ({ children, style }) => {
  return (
    <div
      style={{
        width: 780,
        maxWidth: "88vw",
        margin: "2rem auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default AppWrapper;
