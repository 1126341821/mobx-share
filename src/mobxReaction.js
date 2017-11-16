import React from "react";
import { render } from "react-dom";
import { Provider, observer, Observer, inject } from 'mobx-react';
import { observable, extendObservable, action, autorun, toJS, whyRun, computed } from "mobx";

let message = extendObservable({
    title: "Foo",
    author: {
        name: "Michel"
    },
    likes: [
        "John", "Sara"
    ]
})
// var title = message.title;// 错误的: 在追踪函数外进行间接引用，title 变量不是 observable
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
const author = message.author;
message.author.name = "Sara";// 可追踪
message.author = { name: "彭丽媛" };// 不可追踪，因为authhor不是同一个了
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
// message.postDate = new Date();// ***不可，用extendObservable比较好，对未来的属性可以做到
extendObservable(message, {
    postDate: new Date()
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
const twitterUrls = observable.map({
    "John": "twitter.com/johnny"
});// map支持观察还不存在的项。
twitterUrls.set("Sara", "twitter.com/horsejs")
autorun(() => {
    // console.log(title);
    if (twitterUrls.has("Sara")) {
        console.log(twitterUrls.Sara);
    }
    console.log(twitterUrls.get("Sara"))
    console.log("=====", message.postDate);
    console.log(message.title);
    console.log(author.name);// 不可追踪，因为authhor不是同一个了
    console.log(message.likes.join(", "));
    setTimeout(() => console.log(message.likes.join[1], "延时函数"), 10);
    // autorun 执行期间没有访问到任何 observable，而只在 setTimeout 访问到
    console.log(message.likes[10]);// 当索引值不存在的时候不妥，用join比较好,报错如下
    // Attempt to read an array index (10) that is out of bounds (4). Please check length first. Out of bound indices will not be tracked by MobX
    // whyRun();// whyRun() 方法来验证 MobX 在追踪什么
});

const divided = computed(() => {
    return message.likes.length;
});
message.likes[2] = "习大大";
message.author.name = "Sara";
message.author = { name: "John" };
message.likes.push("Jennifer");
// message = observable({ title: "Bar" }) // 这样做是错误的，观察的不是同意一个对象
/*@observer
class TodoList extends React.Component {
    render() {
        console.log(33)
        return <div>
            <MyComponent message={message} />
            <DoNotUseTheLocalCache message={message} />
            {divided.get()}
        </div>
    }
}*/
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
// <div> 实际上不是由 MyComponent(有追踪的渲染) 渲染的，而是 SomeContainer。 
// 所以要确保 SomeContainer 的 title 可以正确对新的 message.title 作出反应，
// SomeContainer 应该也是一个 observer。
/*const MyComponent = observer(({ message }) => // 这样做是错误的
    <SomeContainer
        title={() => <div>{message.title}</div>}
    />
);

class SomeContainer extends React.Component {
    render() {
        return <div>
            {this.props.title()}
            dd
        </div>
    }
}*/

// ==================
// 在写组件的时候拆的越小，当使用对象的时候，对象的值越晚用月好，
/*@observer
class SomeContainer extends React.Component {
    render() {
        console.log(this.props);
        return (<div>
            {this.props.title()}
        </div>);
    }
}
// let SomeContainer = observer(({ title }) =>
//     <div>{title()}</div>
// );
let TitleRenderer = observer(({ message }) =>
    <div>{message.title}</div>
);
let MyComponent = observer(({ message }) =>
    <SomeContainer
        title={
            () => {
                return <TitleRenderer message={message} />
            }
        }
    />
);
message.title = "十九大";*/
// ==================
@observer
class SomeContainer extends React.Component {
    render() {
        console.log(this.props);
        return (<div>
            {this.props.title()}
        </div>);
    }
}
const MyComponent = ({ message }) =>
    <SomeContainer
        title={() =>
            <Observer>
                {() => <div>{message.title}</div>}
            </Observer>
        }
    />

message.title = "Bar"

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
@observer
class DoNotUseTheLocalCache extends React.Component {
    // author;// 避免在本地字段中缓存 observable
    // constructor(props) {
    //     super(props);
    //     this.author = props.message.author;
    // }
    @computed get author() {
        console.log(22);
        return this.props.message.author
    }
    @action
    amendName() {
        console.log(1)
        message.author.name = "DoNotUseTheLocalCache";
        console.log(message);
    }
    render() {
        console.log("-----", author);
        return <div onClick={this.amendName.bind(this)} style={{ background: 'red' }}>{author.name}</div >
    }
}


@observer
class TodoList extends React.Component {
    render() {
        console.log(33)
        return <div>
            {/*<MyComponent message={message} />*/}
            <DoNotUseTheLocalCache message={message} />
            {divided.get()}
        </div>
    }
}

render(
    <TodoList />,
    document.getElementById("root")
);