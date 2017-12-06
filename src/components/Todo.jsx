import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class Todo extends React.Component {
  // componentWillUpdate(nextProps, nextState) {
  //   console.log('componentWillUpdate');
  //   // console.log(nextProps, nextState, this.newTodoTitle);
  // }
  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }
  // conmponentDidMount() {
  //   console.log('conmponentDidMount');
  // }
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
// 无状态函数组件,和上面注释调的是一样的


// const Todo = observer(({ todo }) => (
//   <li>
//     <input
//       type="checkbox"
//       checked={todo.finished}
//       onClick={() => (todo.finished = !todo.finished)}
//     />
//     {todo.title}
//   </li>
// ));

// export default Todo;