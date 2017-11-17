/*MobX 只会为 observer 组件追踪数据存取，如果数据是直接通过 render 进行存取的*/
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

// 当组件的 render 回调函数在第一个类中传递给另一个组件时，经常会发生这种情况。
// <div> 实际上不是由 MyComponent(有追踪的渲染) 渲染的，而是 SomeContainer。 
// 所以要确保 SomeContainer 的 title 可以正确对新的 message.title 作出反应，
// SomeContainer 应该也是一个 observer。

// const MyComponent = observer(({ message }) => // 这样做是错误的
//     <SomeContainer
//         title={() => <div>{message.title}</div>}
//     />
// );

// (2) 使用Observer组件也是一样的效果
/*const MyComponent = ({ message }) =>
    <SomeContainer
        title={() =>
            <Observer>
                {() => <div>{message.title}</div>}
            </Observer>
        }
    />
// (1) @observer  MobX 只会为 observer 组件追踪数据存取
class SomeContainer extends React.Component {
    render() {
        return <div>
            {this.props.title()}
        </div>
    }
}

render(
    <MyComponent message={message} />,
    document.getElementById("root")
);

message.title = "Bar";// 组件加observer渲染不起来；*/





class SomeContainer extends React.Component {
    render() {
        return <div>
            {this.props.title()}
        </div>
    }
}

const MyComponent = observer(({ message }) =>
    <SomeContainer // 永远只传递拥有 observable 属性的对象,不然跟踪不到值
        title={() => <TitleRenderer message={message} />}
    />
)
// observer 只作用于当前组件的 render 函数，
// 传递一个 render 回调函数或组件给子组件不会自动地变成响应的
// TitleRenderer没有observer是渲染不出来的
const TitleRenderer = observer(({ message }) =>
    <div>{message.title}</div>);


render(
    <MyComponent message={message} />,
    document.getElementById("root")
);

message.title = "Bar";// 组件加observer渲染不起来；