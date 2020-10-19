import React from "react";
import "./body.styles.scss";
import Sidepanel from "./sidepanel/sidepanel.components";
import Todolist from "./todolist/todolist.components";
export const Body = () => {
  return (
    <div className="main-body">
      <div className="space--one"></div>
      <Sidepanel />
      <Todolist />
      <div className="space--two"></div>
    </div>
  );
};
