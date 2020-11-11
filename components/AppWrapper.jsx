import React from "react";

const AppWrapper = ({ children, style }) => {
  return (
    <div
      style={{
        width: 800,
        maxWidth: "86vw",
        margin: "2rem auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default AppWrapper;
