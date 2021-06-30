import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="mt-3 display-4 mb-3">{title}</h2>
          <p className="mt-3 lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
