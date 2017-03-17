var e = function(selector) {
    return document.querySelector(selector)
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var next = function(){
       // 找到父节点div
       var slide = e('.slide')
       // 得到图片总数和当前图片下标
       var number = parseInt(slide.dataset.imgs)
       var active = parseInt(slide.dataset.active)
       // 求出下一张的id
       var Id = (active + 1) % number
       slide.dataset.active = Id
       var nextSelector = '#id-image-' + String(Id)
       // 删除当前图片的class 给下一张图片加claas
       var className = 'active-image'
       removeClassAll(className)
       var img = e(nextSelector)
       img.classList.add(className)
       // 绑定圆点
       var dot = '#id-div-' + String(Id)
       // console.log(dot);
       var classNames = 'white'
       removeClassAll(classNames)
       var div = e(dot)
       // console.log(div);
       div.classList.add(classNames)
}

var int = setInterval("next()", 3000)

var bindEventSlideNext = function () {
    var selector = '.next-button'
    bindAll(selector, 'click', next)
}


var bindEventSlideTop = function () {
    var selector = '.top-button'
    bindAll(selector, 'click', function(event){
        // 找到父节点div
        var slide = event.target.parentElement
        // console.log(slide);
        // 得到图片总数和当前图片下标
        var number = parseInt(slide.dataset.imgs)
        var active = parseInt(slide.dataset.active)
        // 求出下一张的id
        var Id = (active - 1 + number) % number
        slide.dataset.active = Id
        var topSelector = '#id-image-' + String(Id)
        // 删除当前图片的class 给下一张图片加claas
        var className = 'active-image'
        removeClassAll(className)
        var img = e(topSelector)
        img.classList.add(className)
        // 绑定圆点
        var dot = '#id-div-' + String(Id)
        // console.log(dot);
        var classNames = 'white'
        removeClassAll(classNames)
        var div = e(dot)
        // console.log(div);
        div.classList.add(classNames)
    })
}


var bindEventDot = function () {
    var selector = '.guai'
    bindAll(selector, 'mouseover', function(event){
        // console.log('click');
        var target = event.target.id
        // console.log(target);
        var active = target.slice(-1)
        var dot = '#id-div-' + active
        // console.log(dot);
        // 删除当前div的class 给下一张图片加claas
        var className = 'white'
        removeClassAll(className)
        var img = e(dot)
        img.classList.add(className)
        // 绑定图片
        var topSelector = '#id-image-' + active
        // console.log(topSelector);
        // 删除当前图片的class 给下一张图片加claas
        var classNames = 'active-image'
        removeClassAll(classNames)
        var img = e(topSelector)
        img.classList.add(classNames)
        var slide = e('.slide')
        // 得到图片总数和当前图片下标
        slide.dataset.active = active

        //定时器暂停
        clearInterval(int)
    })

    bindAll(selector, 'mouseout', function(){
        int = setInterval("next()", 3000)
    })

}


// 程序主入口
var _mian = function () {
    bindEventSlideNext()
    bindEventSlideTop()
    bindEventDot()
}

_mian()
