
mobx.useStrict(true); // 严格模式
import React from "react";
import { render } from "react-dom";
import * as mobx from 'mobx';
import { Provider, observer, Observer, inject } from 'mobx-react';
import { observable, action, computed, autorun, extendObservable, toJS, whyRun } from "mobx";

class Ticker {
    @observable tick = 1;
    @action
    increment() {
        this.tick += 1 // 'this' 永远都是正确的
    }
    @computed get computedFun() {
        return this.tick + 1;
    }
    aa = autorun(() => console.log(this.tick, 1));
}

const ticker = new Ticker();

// setInterval(() => { ticker.increment() }, 1000);
// console.log(toJS(ticker.tick)); // 得到原始数据
@observer
class Todo extends React.Component {
    @action
    resetTickValue() {
        this.props.tick.tick = 0;
    }
    @action
    bb() {
        setInterval(() => { this.props.tick.increment() }, 1000);
    }
    render() {
        const { tick } = this.props;
        return (
            <li >
                {tick.tick}
                <p>{tick.computedFun}</p>
                <button onClick={this.bb.bind(this)}>定时器开启</button>
                <button onClick={this.resetTickValue.bind(this)}>tick之值为0</button>
            </li>);
    }

}

render(
    <div >
        <Todo tick={ticker} />
    </div>,
    document.getElementById("root")
);


