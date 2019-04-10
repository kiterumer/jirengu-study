// var allChildren = item3.parentNode.children ;
// // 伪数组
// var array = {
//     length: 0
// }
// // 获取item3的兄弟姐妹
// for (let i = 0; i < allChildren.length; i++){
//     if(allChildren[i] !== item3){
//         array[array.length] = allChildren[i];
//         array.length += 1;
//     }
// }
// console.log(array);

// 封装一下
function getSiblings(node){  /* API */
    var allChildren = node.parentNode.children ;
    // 伪数组
    var array = {
        length: 0
    }
    // 获取node的兄弟姐妹
    for (let i = 0; i < allChildren.length; i++){
        if(allChildren[i] !== node){
            // array是伪数组，没有push方法
            array[array.length] = allChildren[i];
            array.length += 1;
        }
    }
    return array
}

// 可以增删类
function addClass(node,classes){
//给元素添加类
// var classes = {'a':true,'b':false,'c':true}
    for(let key in classes){
        var value = classes[key]
        var methodName = value ? 'add':'remove'

        node.classList[methodName](key)

        // 有相同的代码就有优化的空间
        // if(value){
        //     node.classList.add(key)
        // }else{
        //     node.classList.remove(key)
        // }
    }
}

// 只能加类
function addClass2(node,classes){
    classes.forEach(value => {
        node.classList.add(value)
    });
}

// getSiblings,addClass作为yyydom对象的方法
// 命名空间
window.yyydom = {}
yyydom.getSiblings = getSiblings
yyydom.addClass = addClass
yyydom.addClass2 = addClass2

yyydom.addClass2(item2,['m','n']) //这种调用方式并不好

// 给node的prototype添加函数，篡改Node公用属性
// item3可以通过原型链可以调用getSiblings方法
// 通过this获取谁在调用
Node.prototype.getSiblings = function(){
    var allChildren = this.parentNode.children ;
    // 伪数组
    var array = {
        length: 0
    }
    // 获取node的兄弟姐妹
    for (let i = 0; i < allChildren.length; i++){
        if(allChildren[i] !== this){
            // array是伪数组，没有push方法
            array[array.length] = allChildren[i];
            array.length += 1;
        }
    }
    return array
}

Node.prototype.addClass2 = function(classes){
    classes.forEach(value => {
        this.classList.add(value)
    });
}

// console.log(item3.getSiblings())
// 用call显示this
// item3.getSiblings.call(item3)
// item3.addClass2(['q','w','e'])
// item3.addClass2(item3,['q','w','e'])


// 在Node原型上增加方法并不好，如果有多个人修改容易造成冲突

// 自己创建一个新Node构造函数

// window.Node2 = function(node){
//     return {
//         getSiblings:function(){
//             var allChildren = node.parentNode.children ;
//             // 伪数组
//             var array = {
//             length: 0
//             }
//             // 获取node的兄弟姐妹
//             for (let i = 0; i < allChildren.length; i++){
//             if(allChildren[i] !== node){
//             // array是伪数组，没有push方法
//             array[array.length] = allChildren[i];
//             array.length += 1;
//             }
//             }
//             return array
//         },
//         addClass2:function(classes){
//             classes.forEach(value => {
//                 node.classList.add(value)
//             });
//         }
//     }
// }
// var node2 = Node2(item3)
// node2.getSiblings()
// node2.addClass2(['p','o'])

// 把Node2改名为jQuery
window.jQuery = function(nodeOrSelector){
    if(typeof nodeOrSelector === 'string'){
        node = document.querySelector(nodeOrSelector)
    }else{
        node = nodeOrSelector
    }

    return {
        getSiblings:function(){
            var allChildren = node.parentNode.children ;
            // 伪数组
            var array = {
            length: 0
            }
            // 获取node的兄弟姐妹
            for (let i = 0; i < allChildren.length; i++){
            if(allChildren[i] !== node){
            // array是伪数组，没有push方法
            array[array.length] = allChildren[i];
            array.length += 1;
            }
            }
            return array
        },
        addClass2:function(classes){
            classes.forEach(value => {
                node.classList.add(value)
            });
        }
    }

}

var node2 = jQuery('ul>li:nth-child(5)')
// 给我旧的对象，返回新的对象
node2.addClass2(['red'])

// 如果要获取多个节点,里面要用到document.querySelectorAll
window.jQuery2 = function(nodeOrSelector){
    let nodes 
    if(typeof nodeOrSelector === 'string'){
        nodes = document.querySelectorAll(nodeOrSelector) //伪数组
    }else if(nodeOrSelector instanceof Node){
        // 保证返回结果一致，都是伪数组
        nodes = {
            0: nodeOrSelector,
            length: 1
        }
    }

    nodes.addClass2 = function(classes){
        classes.forEach((value) => {
            // 给nodes数组里每一项添加类
            for (let i = 0;i < nodes.length; i++){
                nodes[i].classList.add(value)
            }
        })
    }
    // 获取元素文本
    nodes.getText = function(){
        var texts = []
        for(let i = 0;i < nodes.length;i++){
            texts.push(nodes[i].textContent)
        }
        return texts
    }
    // 设置文本
    nodes.setText = function(text){
        for(let i=0;i<nodes.length;i++){
            nodes[i].textContent = text
        }
    }
    // 两者合并
    nodes.text = function(text){
        if(text === undefined){
            var texts = []
            for(let i = 0;i < nodes.length;i++){
            texts.push(nodes[i].textContent)
            }
            return texts
        }else{
            for(let i=0;i<nodes.length;i++){
                nodes[i].textContent = text
            }
        }
    }
    return nodes
}

var node3 = jQuery2('ul>li')
node3.addClass2(['red'])
node3.text('yyy')
console.log(node3.text())



