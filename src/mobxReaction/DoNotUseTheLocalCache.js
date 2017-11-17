/*文档有误*/ 
import React from "react";
import { render } from "react-dom";
import { Provider, observer, Observer, inject } from 'mobx-react';
import { observable, extendObservable, action, autorun, toJS, whyRun, computed } from "mobx";

let message = observable({
    title: "Foo",
    author: {
        name: "Michel"
    },
    likes: [
        "John", "Sara"
    ]
});

// @observer
// class MyComponent extends React.Component {
//     author;
//     constructor(props) {
//         super(props);
//         this.author = props.message.author;
//         // 组件会对 author.name 的变化作出反应，但不会对 message 本身的 .author 的变化作出反应！
//         // 因为这个间接引用发生在 render() 之外，而render() 是 observer 组件的唯一追踪函数。
//         // 注意，即便把组件的 author 字段标记为 @observable 字段也不能解决这个问题，
//         // author 仍然是只分配一次。 这个问题可以简单地解决，方法是在 render() 中进行间接引用或者在组件实例上引入一个计算属性:

//     }
//     // @computed get getValue() {
//     //     console.log(22, this.props.message.author.name);
//     //     return this.props.message.author.name;
//     // }
//     render() {
//         // console.log(this.getValue);
//         return <div>
//             {/* <div>{this.getValue}</div> */}
//             <div>{this.author.name}</div>
//         </div>
//     }
// }
// render(
//     <MyComponent message={message} />,
//     document.getElementById("root")
// );
// message.author.name = "普京";
// autorun(() => {
//     console.log(message.author.name);
// });


// @observer class MyComponent extends React.Component {
//     name;
//     constructor(props) {
//         super(props)
//         this.name = props.message.author.name;
//     }
//     @action amend() {
//         message.author.name = "普京";
//     }
//     render() {
//         console.log(this.author);
//         return <div onClick={this.amend.bind(this)}>{this.name}</div>
//     }
// }
// render(
//     <MyComponent message={message} />,
//     document.getElementById("root")
// );
// // 两种解决办法：
// （1）：不直接使用值
// @observer class MyComponent extends React.component {
//     author;
//     constructor(props) {
//         super(props)
//         this.author = props.message.author;
//     }

//     render() {
//         return <div>{this.author.name}</div>
//     }
// }
// （2）：使用computed
// @observer
// class MyComponent extends React.Component {

//     @computed get getValue() {// 计算值将仅追踪那些它们已被观察的依赖
//         console.log(22, this.props.message.author.name);
//         return this.props.message.author.name;
//     }
//     render() {
//         return <div>
//             <div>{this.getValue}</div>
//         </div>
//     }
// }