import React from "react";

import "./TodoItem.styles.scss";

const TodoItem = (props) => (
  <div className={props.item.completed ? "item item-done" : "item"}>
    <div>
      <input
        type="checkbox"
        id={props.item.id}
        checked={props.item.completed}
        onChange={() => props.handleChange(props.item.id)}
      />
      <label htmlFor={props.item.id} className="ml-1">
        {props.item.text}
        <span
          className={props.item.completed ? "line line-through" : "line"}
        ></span>
      </label>
    </div>
    <button className="btn-delete" onClick={() => props.handleClickDelete(props.item.id)}>X</button>
  </div>
);

export default TodoItem;
