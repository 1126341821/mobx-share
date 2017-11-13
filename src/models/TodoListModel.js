import { observable, computed, action } from "mobx";

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
}

class Foo {
    @observable length = 2;
    @computed get squared() {
        return this.length * this.length;
    }
    set squared(value) { // 这是一个自动的动作，不需要注解
        this.length = Math.sqrt(value); // 根号10
    }
}
const ff=new Foo();
ff.squared=100;// set
console.log(ff.squared); // get 100
console.log(ff.length);// 10

