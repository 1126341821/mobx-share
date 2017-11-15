

/*@observer
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
export default Todo;*/
// 无状态函数组件,和上面注释调的是一样的
import React, { Component } from "react";
import { observer } from "mobx-react";

const Todo = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => (todo.finished = !todo.finished)}
    />
    {todo.title}
  </li>
));

export default Todo;