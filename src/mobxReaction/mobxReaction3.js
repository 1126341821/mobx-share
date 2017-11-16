/* 针对开始不存在于观察中的数据*/

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
autorun(() => {
    console.log('observable', message.postDate)
});// 不会对开始时不存在的 observable 属性作出反应
message.postDate = new Date();


// +++++++++++++++++++++++++++++++++++++++++++++
let message1 = extendObservable({
    title: "Foo",
    author: {
        name: "Michel"
    },
    likes: [
        "John", "Sara"
    ]
});
extendObservable(message1, {
    postDate: new Date()
});// 一定要放在autorun前面，对开始时不存在的 observable 属性作出反应

autorun(() => {
    console.log('extendObservable', message1.postDate)
});
message1.postDate = new Date(1971);

// +++++++++++++++++++++++++++++++++++++++++++++
// 
const twitterUrls = observable.map({
    "John": "twitter.com/johnny"
}); // map支持观察还不存在的项

autorun(() => {
    if (twitterUrls.has("Sara")) {
        console.log('map',twitterUrls.get("Sara"));
    }
});
twitterUrls.set("Sara", "twitter.com/horsejs")







