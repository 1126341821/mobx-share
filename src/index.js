import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
import TodoModel from "./models/TodoModel";

// const store = new TodoListModel();

// render(
//   <div>
//     <DevTools />
//     <TodoList store={store} />
//   </div>,
//   document.getElementById("root")
// );
// store.addTodo("Get Coffee");// 调用todoListmodel添加 Get Coffee
// store.addTodo("Write simpler code");
// store.todos[0].finished = true;// 让数据的第一个数据的finished属性为真

// setTimeout(() => {
//   store.addTodo("Get a cookie as well");
// }, 2000);

// // playing around in the console
// window.store = store; 


// import { observer } from "mobx-react";
// import { observable, computed, action, autorun, toJS } from "mobx";

// var timerData = observable({
//   secondsPassed: 0
// });

// setInterval(() => {
//   timerData.secondsPassed++;
// }, 1000);
// let { secondsPassed } = toJS(timerData);
// @observer
// class Timer extends React.Component {
//   render() {
//     const { secondsPassed } = toJS(timerData);
//     return (
//       <div>
//         <span>Seconds passed: {timerData.secondsPassed} </span>
//         {/* <span>Seconds passed: {this.props.timerData.secondsPassed} </span> */}
//         <span>Seconds passed: {this.props.timerData} </span>
        
//       </div>)
//   }
// };

// console.log(secondsPassed);
// render(
//   <div>
//      <Timer timerData={timerData.secondsPassed}/> 
//     {/* <Timer timerData={timerData}/> */}
//   </div>,
//   document.getElementById("root")
// );

// /* <Timer timerData={timerData.secondsPassed}/> 不能这么写 */
