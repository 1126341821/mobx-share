

import React, { Component } from "react";
import mobx,{ observable, action } from "mobx";
import { observer, PropTypes } from "mobx-react";

import Todo from "./Todo";
// 可观察的局部组件状态

// 就像普通类一样，你可以通过使用 @observable 装饰器在React组件上引入可观察属性。 
// 这意味着你可以在组件中拥有功能同样强大的本地状态(local state)，
// 而不需要通过 React 的冗长和强制性的 setState 机制来管理。 
// 响应式状态会被 render 提取调用，但不会调用其它 React 的生命周期方法，
// 除了 componentWillUpdate 和 componentDidUpdate 。
// 如果你需要用到其他 React 生命周期方法 ，只需使用基于 state 的常规 React API 即可。
@observer
class TodoList extends React.Component {
  @observable newTodoTitle = "";
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
    console.log(nextProps, nextState, this.newTodoTitle);
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
  conmponentDidMount() {
    console.log('conmponentDidMount');
  }
  // React 组件通常在新的堆栈上渲染，这使得通常很难弄清楚是什么导致组件的重新渲染。 
  // 当使用 mobx-react 时可以定义一个新的生命周期钩子函数 componentWillReact(一语双关)。
  // 当组件因为它观察的数据发生了改变，它会安排重新渲染，这个时候 componentWillReact 会被触发。
  // 这使得它很容易追溯渲染并找到导致渲染的操作(action)。
  // 不接收参数
  // 初始化渲染前不会触发 (使用 componentWillMount 替代)
  // 对于 mobx-react@4+, 当接收新的 props 时并在 setState 调用后会触发此钩子
  componentWillReact() {
    console.log("I will re-render, since the todo has changed!");
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {this.props.store.todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.store.unfinishedTodoCount}
      </div>
    );
  }

  @action
  handleInputChange = e => {
    this.newTodoTitle = e.target.value;
  };

  @action
  handleFormSubmit = e => {
    this.props.store.addTodo(this.newTodoTitle);
    this.newTodoTitle = "";
    e.preventDefault();
  };
}
// TodoList.propTypes = {
//   store: PropTypes.observableObject.isRequerid,
// };
export default TodoList;