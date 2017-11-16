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
var title = message.title;// ****
const author = message.author;// **** 后面的message.author = { name: "John" };所以要注意修改方式，取值方式
autorun(() => {
    console.log(message.title);// Foo
    console.log(title)// Foo title 变量不是 observable，所以 autorun 永远不会作出反应。
    console.log(message.author.name)// Sara John
    console.log('存储于本地', author.name)// **** 当author重新=object，// 不可追踪，因为authhor不是同一个了
    whyRun();// whyRun() 方法来验证 MobX 在追踪什么
    console.log(message.likes.join(", "));// 这种方式ok
    setTimeout(() => console.log(message.likes.join[1], "延时函数"), 10);
    // autorun 执行期间没有访问到任何 observable，而只在 setTimeout 访问到
    console.log(message.likes.length);// 可以用length属性来访问
    console.log(message.likes[10]);//**** 当索引值不存在的时候不妥，用join比较好,报错如下
    // Attempt to read an array index (10) that is out of bounds (4). Please check length first. Out of bound indices will not be tracked by MobX

});
//message = observable({ title: "Bar" });// ****不会作出反应。message 被改变了，不是原来的哪个message。
message.title = "Bar"

message.author.name = "Sara";
message.author = { name: "John" };

message.likes[2] = "Jennifer";
message.pus("习大大");



