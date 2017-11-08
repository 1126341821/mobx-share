import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

@observer
class Todo extends React.Component {
  render() {
    const { todo } = this.props;
    return (<li>
      <input
        type="checkbox"
        checked={todo.finished}
        onClick={() => (todo.finished = !todo.finished)}
      />
      {todo.title}
    </li>);
  }
}
export default Todo;
