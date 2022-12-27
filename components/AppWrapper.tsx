import { FC, CSSProperties, ReactNode } from "react";

interface IProps {
  style?: CSSProperties;
  children?: ReactNode
}

const AppWrapper: FC<IProps> = ({ children, style }) => {
  return (
    <div
      style={{
        width: 780,
        maxWidth: "88vw",
        margin: "4vh auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default AppWrapper;
