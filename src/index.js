
import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
import TodoModel from "./models/TodoModel";
import { Provider, observer, Observer, inject } from 'mobx-react';
import { observable, action, autorun, extendObservable, toJS } from "mobx";

const store = new TodoListModel();

render(
  <div >
    <DevTools />
    <TodoList store={store} />
  </div>,
  document.getElementById("root")
);

store.addTodo("Get Coffee");
store.addTodo("Write simpler code");
store.todos[0].finished = true;

setTimeout(() => {
  store.addTodo("Get a cookie as well");
}, 2000);

// playing around in the console
window.store = store;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 将 observer 连接到 store

// mobx-react 包还提供了 Provider 组件，它使用了 React 的上下文(context)机制，可以用来向下传递 stores。
// 要连接到这些 stores，需要传递一个 stores 名称的数组给 observer，
// 这使得 stores 可以作为组件的 props 使用。 
// 这些都可以通过使用装饰器 @observer(["store"]) class ... 或者函数 observer(["store"], React.createClass({ ...来提供。

// const colors = observable({
//   foreground: 'red',
//   background: '#fff',
// });
// observer应该是内装饰，inject外。之间可能还有其他的装饰器。
/*@inject("color") @observer
class Button extends React.Component {
  render() {
    return (
      <button style={{ background: this.props.color.foreground }}>
        {this.props.children}
      </button>
    );
  }
}*/
// @inject("color") 和observer(["color"]，func)的功能是一样的 我认为还是inject比较好使
// 只要在provider上存在有，inject一下到其子组件即可

// Provider是一个组件，可以使用React的上下文机制将商店（或其他东西）传递给子组件。
// 你不想通过显式的多层组件传递的东西，这很有用。
// inject可以用来拿起那些商店。
// 这是一个更高阶的组件，它接受一个字符串列表并使这些存储对于被包装的组件可用。

/*const Button = observer(["color"], ({ color, children }) =>
  <button style={{ background: color.foreground }}>
    {children}
  </button>
); // 不推荐这种写法，会报错*/

/*class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text}
        <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {

  render() {
    const children = this.props.messages.map((message, index) =>
      <Message text={message.text} key={index} />
    );
    return <Provider color={colors}>
      <div>
        {children}
      </div>
    </Provider>;
  }
}
render(
  <div>
    <MessageList messages={[{ text: 'tao' }, { text: 'meinv' }]} />
  </div>,
  document.getElementById("root")
);

setTimeout(() => {
  colors.foreground = 'blue';
}, 1000);*/
// 还可以定制inject：https://github.com/mobxjs/mobx-react#provider-experimental


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 注意传递的数据方式，使用observal后数据被包了一层如果要回归原始数据使用toJS
// import {observer} from "mobx-react";
// import {observable, computed, action, autorun, toJS } from "mobx";

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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Observer作为一个react组件,组件观察者适用于一个匿名的地区。
// 不过我不爱用，也没用过
/*class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.person.name}
        <Observer>
          {() => <div>{this.props.person.name}</div>}
        </Observer>
      </div>
    )
  }
}

const person = observable({ name: "John" })

render(<App person={person} />, document.getElementById("root"));// john
person.name = "john" // will cause the Observer region to re-render // john  // john*/
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



var person = observable({
  // observable 属性:
  name: "John",
  age: 42,
  showAge: false,

  // 计算属性:
  get labelText() {
    console.log(1);
    return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
  },

  // 动作:
  setAge: action(function (age) {
    this.age = age;
  })
});

// 对象属性没有暴露 'observe' 方法,
// 但不用担心, 'mobx.autorun' 功能更加强大
autorun(() => console.log(person.labelText)); // jhon dave

person.name = "Dave";

// 输出: 'Dave'
// 当给值的时候就会自动调用autorun，autorun去调用person.labelText,和调用computed一样
// 和例子一样只是例子是用个类来封装，这个是对象
person.father = "习大大";
// 当通过 observable 传递对象时，只有在把对象转变 observable 时存在的属性才会是可观察的。
// 稍后添加到对象的属性不会变为可观察的，除非使用 extendObservable(实践有误，但可记住这点)



//++++++++++++++++++++++++++++++++++++++++++++++++
// maps

var arr = observable.map({ a: 1 });
console.log(arr.has('a'));// true
arr.set("a", 2);
console.log(toJS(arr))// {a:2}


//++++++++++++++++++++++++++++++++++++++++++++++++
// box values

// string
// const cityName = observable("Vienna");

// console.log(cityName.get());// 输出 'Vienna'

// cityName.observe(function (change) {
//   console.log("change", change);
//   // oldValue newValue type object
//   console.log(change.oldValue, "->", change.newValue);
// });

// cityName.set("Amsterdam");

// arr
const myArray = ["Vienna"];
const cityName = observable(myArray);

console.log(cityName[0]);// 输出 'Vienna'

cityName.observe(function (observedArray) {
  console.log(observedArray);
  // 返回各种信息可以查看
  if (observedArray.type === "update") {
    console.log(observedArray.oldValue + "->" + observedArray.newValue);
  } else if (observedArray.type === "splice") {
    if (observedArray.addedCount > 0) {
      console.log(observedArray.added + " added");
    }
    if (observedArray.removedCount > 0) {
      console.log(observedArray.removed + " removed");
    }
  }
});

cityName[0] = "Amsterdam";
// 输出 'Vienna -> Amsterdam'

cityName[1] = "Cleveland";
// 输出 'Cleveland added'

cityName.splice(0, 1);
// 输出 'Amsterdam removed'
