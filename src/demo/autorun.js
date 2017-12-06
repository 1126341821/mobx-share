/* 当key是动态加上去的observable不认 */
import React from "react";
import { render } from "react-dom";
import { Provider, observer, Observer, inject } from 'mobx-react';
import { observable, action, computed, autorun, extendObservable, toJS, whyRun } from "mobx";

class test {
  @observable a = [{ key: 2 }]
  @action addKey(num) {
    this.a[0].addKey=num;
  }
  aa = autorun(() => { console.log(this.a[0].key) });
  // 要congole到细节上的东西，你该变的是哪一层就console那一层
  // 像改变数组，你console 数组的长度,但是你只改变其中一个项的值是不console的
  // bb=autorun(()=>{console.log(this.a,2)});
}
const Test = new test();

Test.a[0].key = 3; // 2,3

// 页可以看下 下面的组件
Test.addKey(20);











@observer
class View extends React.Component {
  render() {
    const { a } = this.props.store;
    let arr = [];
    toJS(a).map((item) => {
      for (let key in item) {
        arr.push(`属性：${key};值：${item[key]}`);
      }
    });
    return <div>
      {arr.map((item) => {
        return item;
      })
      }
    </div>
  }
}

render(
  <div >
    <View store={Test} />
  </div>,
  document.getElementById("root")
);



