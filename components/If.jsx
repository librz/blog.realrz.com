import React from "react";

const If = ({ condition, children }) => {
  if (condition) return <>{children}</>;
  else return null;
};

export default If;
