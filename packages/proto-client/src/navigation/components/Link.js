import React from "react";
import { NavLink } from "react-router-dom";

export default ({ path, to, match, children, ...props }) =>
  match && path ? (
    path.includes(match) ? (
      <span>{children}</span>
    ) : (
      <NavLink to={to}>{children}</NavLink>
    )
  ) : (
    <NavLink to={to}>{children}</NavLink>
  );
