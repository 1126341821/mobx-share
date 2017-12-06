
import React from "react";
import { render } from "react-dom";
import { Provider, observer, Observer, inject } from 'mobx-react';
import { observable, action, computed,autorun, extendObservable, toJS, whyRun } from "mobx";

// 将 observer 连接到 store

// mobx-react 包还提供了 Provider 组件，它使用了 React 的上下文(context)机制，可以用来向下传递 stores。
// 要连接到这些 stores，需要传递一个 stores 名称的数组给 observer，
// 这使得 stores 可以作为组件的 props 使用。 
// 这些都可以通过使用装饰器 @observer(["store"]) class ... 或者函数 observer(["store"], React.createClass({ ...来提供。

const colors = observable({
  foreground: 'pink',
  background: '#fff',
});
// observer应该是内装饰，inject外。之间可能还有其他的装饰器。

@inject("color") // 这儿一定要先 inject 后 observer  不然后面setTimeout会报错
@observer
class Button extends React.Component {
  render() {
    return (
      <button style={{ background: this.props.color.foreground }}>
        {this.props.children}
      </button>
    );
  }
}
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

class Message extends React.Component {
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
    <MessageList messages={[{ text: '习近平' }, { text: '彭丽媛' }]} />
  </div>,
  document.getElementById("root")
);

setTimeout(() => {
  colors.foreground = 'red';
}, 2000);
// 还可以定制inject：https://github.com/mobxjs/mobx-react#provider-experimental
