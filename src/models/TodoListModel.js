
import { observable, computed, action, autorun } from "mobx";

import TodoModel from "./TodoModel";

export default class TodoListModel {
  @observable todos = [];

  @computed // 可以直接被调用
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action
  addTodo(title) {
    this.todos.push(new TodoModel(title));
    console.log(this.todos);
    // todos是被包了一层的数组（ObservableArray），
    //   并且每个数据有值极为push进去的值
    //   反之为undefined，
  }
  aa = autorun(() => console.log(this.todos));
}

// class Foo {
//   @observable length = 2;
//   @computed get squared() {
//     if (this.length === 0)
//       throw new Error("Division by zero")
//     return this.length * this.length;
//   } 
// }
// const ff = new Foo();
// ff.squared = 0;// set
// console.log(ff.squared); // get 100
// console.log(ff.length);// 10

// var numbers = observable([1,2,3]);
// var numbers2 = observable([4,5,6]);
// var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

// var disposer = autorun(() => console.log(numbers2));

// // 输出 '6'
// numbers.push(4);
// // 输出 '10'

// disposer();
// numbers.push(5);
// // 不会再输出任何值。`sum` 不会再重新计算。
