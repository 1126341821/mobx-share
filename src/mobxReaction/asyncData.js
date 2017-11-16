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
// function upperCaseAuthorName(author) {
//     const baseName = author.name;
//     return baseName.toUpperCase();
// }
// autorun(() => {
//     console.log(upperCaseAuthorName(message.author));// 同步
//     setTimeout(() => console.log(message.likes.length),10);
// });
autorun(() => {
    setTimeout(
        () => console.log(message.likes.join(", ")),
        10
    )
})
// message.author.name = "Chesterton";
message.likes.push("Jennifer");


