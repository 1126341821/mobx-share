// Observable state(可观察的状态)
// MobX 为现有的数据结构(如对象，数组和类实例)添加了可观察的功能。
class Todo { // es6版本
    id = Math.random();
    @observable title = ""; // 可以为引用值
    @observable finished = false;
}
function Todo() { // es5版本
    this.id = Math.random()
    extendObservable(this, {
        title: "",
        finished: false
    });
}