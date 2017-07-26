//顶部广告控制
var top_btn = document.getElementById('topBtn');
var top_adv = document.querySelector('.top-adv');
top_btn.addEventListener('touchend', function () {
    top_adv.style.display = 'none';
});



//轮播图
var carousel = document.querySelector('.carousel');
var imageLis = document.querySelectorAll('.images li');
console.log(imageLis);
var circleLis = document.querySelectorAll('.circles li');

var idx = 0;
var next = 1;
var prev = imageLis.length - 1;

var timer = setInterval(function () {
    showNext();
}, 3000);
for(var i = 0; i < circleLis.length; i++){
    (function (i) {
        circleLis[i].addEventListener('touchstart', function () {
            cleaInterval(timer);
            setCurrentImage(i);
        }, false)
    })(i)
}
function setCurrentImage(_idx) {
    idx = _idx;
    prev = idx - 1;
    if(prev === -1) {
        prev = imageLis.length - 1;
    }
    next = idx + 1;
    if(next > imageLis.length -1) {
        next = 0;
    }
    init();

    clearInterval(timer);
    timer = setInterval(function () {
        showNext();
    }, 3000)
}
var windowWidth;
init();
window.onresize = init;

function init() {
    windowWidth = document.documentElement.clientWidth;
    console.log(windowWidth);
    for(var i = 0; i < imageLis.length; i++) {
        imageLis[i].style.webkitTransform = "translate(" + windowWidth + ")px";
    }
    changepic();
    setPoint();
}
carousel.addEventListener('touchstart', touchstartHandler, false);
carousel.addEventListener('touchmove',touchmoveHandler, false);
carousel.addEventListener("touchend",touchendHandler, false);

var startX, startTimer;

function touchstartHandler(event) {
    event.preventDefault();
    clearInterval(timer);
    startX = event.touches[0].clientX;

    startTimer = new Date();

    imageLis[prev].style.transition = 'none';
    imageLis[idx].style.transition = 'none';
    imageLis[next].style.transition = 'none';
}

function touchmoveHandler(event){
    event.preventDefault();

    var clientX = event.touches[0].clientX;

    imageLis[idx].style.webkitTransform = "translateX(" + (clientX - startX) + 'px)';
    imageLis[next].style.webkitTransform = "translateX(" + (windowWidth + (clientX - startX)) + 'px)';
    imageLis[prev].style.webkitTransform = 'translateX(' + (-windowWidth + (clientX - startX)) + 'px)';
}

function touchendHandler(event) {
    event.preventDefault();

    var distance = event.changedTouches[0].clientX - startX;

    var time = new Date() - startTimer;

    if(distance >= windowWidth/2 || (distance > 30 && time < 300)) {
        showprev();
    } else if (distance <= -windowWidth/2 ||(distance < -30 && time < 300)) {
        showNext();
    } else {
        console.log('不成功');

        imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
        imageLis[idx].style.webkitTransform = "translateX(0px)";
        imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';

        imageLis[prev].style.transition = 'all 0.3s ease 0s';
        imageLis[next].style.transition = 'all 0.3s ease 0s';
        imageLis[idx].style.transition = 'all 0.3s ease 0s';
    }

        clearInterval(timer);
        timer = setInterval(function () {
            showNext();
        }, 3000)
}


    function showprev() {
        next = idx;
        idx = prev;
        prev--;
        if (prev < 0) {
            prev = imageLis.length - 1;
        }
        changepic();
        setPoint();
        imageLis[prev].style.transition = "none";
        imageLis[next].style.transition = "all 0.3s ease 0s";
        imageLis[idx].style.transition = "all 0.3s ease 0s";

    }
    function showNext(){
        prev = idx;
        idx = next;
        next++;
        if(next > imageLis.length - 1) {
            next = 0;
        }
        changepic();
        setPoint();
        imageLis[prev].style.transition = "all 0.3s ease 0s";
        imageLis[idx].style.transition = "all 0.3s ease 0s";
        imageLis[next].style.transition = "none";
    }

    function changepic() {
        imageLis[idx].style.webkitTransform = "translateX(0px)";
        imageLis[next].style.webkitTransform = "translateX(" + windowWidth + 'px)';
        imageLis[prev].style.webkitTransform = "translateX(" + -windowWidth + 'px)';
    }
    function setPoint() {
        for (var i = 0; i < circleLis.length; i++) {
            circleLis[i].className = '';
        }
        circleLis[idx].className = 'cur';
    }


//请求数据
ajax('GET', 'http://h6.duchengjiu.top/shop/api_goods.php?search_text=女&page='+1+'&pagesize='+20,null,function(response) {
    // console.log(response);
    var len = response.data.length > 12 ? 12 : response.data.length;
    // var html = '';
    for(var i = 0; i < len; i++){
        var obj = response.data[i];
        console.log(obj);
        var oLi = $('<li></li>');
        $('#shop-list').append(oLi);
        var oA = $('<a href ='+"shoplist.html?goods_id=" + obj.goods_id + '></a>');
        oLi.append(oA);
        var oImg = $('<img src="'+ obj.goods_thumb +'">');
        oA.append(oImg);
        var oP = $('<p>'+obj.goods_name+'</p>');
        oLi.append(oP);
    }
});



ajax('GET', 'http://h6.duchengjiu.top/shop/api_goods.php?&page='+4+'&pagesize='+20,null,function (response) {
    // console.log(response);
    var len = response.data.length > 20 ? 20 : response.data.length;
    var html = '';
    for(var i = 0; i < len; i++){
        var obj = response.data[i];
        // console.log(obj);
        var oLi = $('<li></li>');
        $('#showWatchUl').append(oLi);
        var oA = $('<a href ='+"shoplist.html?goods_id=" + obj.goods_id + '></a>');
        oLi.append(oA);
        var oImg = $('<img src="'+ obj.goods_thumb +'">');
        oA.append(oImg);
        var oP = $('<p>￥'+obj.price+'</p>');
        oA.append(oP);
        var oEm = $('<em>'+obj.goods_name+'</em>');
        oA.append(oEm);
    }
});

ajax('GET', 'http://h6.duchengjiu.top/shop/api_goods.php?&page='+10+'&pagesize='+20,null,function (response) {
    // console.log(response);
    var len = response.data.length > 8 ? 8 : response.data.length;

    for(var i = 0; i < len; i++){
        var obj = response.data[i];
        console.log(obj);
        var oLi = $('<li></li>');
        $('#trendList').append(oLi);
        var oA = $('<a href ='+"shoplist.html?goods_id=" + obj.goods_id + '></a>');
        oLi.append(oA);
        var oP = $('<p>'+obj.goods_name+'</p>');
        oA.append(oP);
        var oEm = $('<em>'+obj.goods_desc+'</em>');
        oA.append(oEm);
        var oImg = $('<img src="'+ obj.goods_thumb +'">');
        oA.append(oImg);
    }
});


//懒加载
var page = 1;
var likeList = document.getElementById('likeList');

document.addEventListener('scroll',function () {
    var bodyHeight = document.body.scrollHeight;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var sewheel = parseInt(document.body.scrollTop);

    console.log(bodyHeight);
    console.log(windowHeight);
    console.log(sewheel);
    if(sewheel + windowHeight === bodyHeight ) {
        page++;
        if(page > 20) return;
        scroll(page)
    }
});
scroll(page);
function scroll(page) {
    ajax('GET', 'http://h6.duchengjiu.top/shop/api_goods.php?page='+page+'&pagesize='+10,null,function (response) {
        console.log(response);
            var html = "";
        for(var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            console.log(obj.goods_id);
            html += "<li><a href=shoplist.html?goods_id="+obj.goods_id+"><img src="+obj.goods_thumb+"><p>"+obj.goods_name+"</p><em>"+obj.price+"</em></a></li>"
            // var oLi = $('<li></li>');
            // $('#likeList').append(oLi);
            // var oA = $('<a href ='+"shoplist.html?goods_id=" + obj.goods_id + '></a>');
            // oLi.append(oA);
            // var oImg = $('<img src="'+obj.goods_thumb+'"/>');
            // oA.append(oImg);
            // var oP = $('<p>'+obj.goods_name+'</p>');
            // oA.append(oP);
            // var oEm = $('<em>'+obj.price+'</em>');
            // oA.append(oEm);
        }
        $('#likeList').html(html);
    });

}




// API2
//     function callback(obj) {
//         console.log(obj);
        // for (var i = 0; i < obj.length; i++) {
        //     var item = obj[i];
        //     var img = document.createElement('img');
        //     img.src = item.goodsListImg;
        //     document.body.appendChild(img);
        // }
    //     var len = obj.length > 12 ? 12 : obj.length;
    //     var html = '';
    //     for(var i = 0; i < len; i++){
    //         var item = obj[i];
    //         console.log(obj);
    //         html += '<li><a href="#"><img src="'+ item.goodsListImg +'"/></a><p>'+item.+'</p></li>'
    //     }
    //     $('#showWatch').html(html);
    // }
    // var script = document.createElement('script');
    // script.src = 'http://datainfo.duapp.com/shopdata/getGoods.php?&linenumber='+12;
    // document.body.appendChild(script);





    //左侧菜单
    var pd = false;
    var header_btn = document.getElementById('header-btn');
    header_btn.addEventListener('click', function () {
        if(pd){
            $(".container").animate({"left":"0%"}, 300);
        } else {
            $(".container").animate({"left":"70%"}, 300);
        }

        pd = !pd;
    },false);


  //swiper轮播
var mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000,
        pagination : '.swiper-pagination',     //让小圆点显示
        paginationClickable:true,       //实现小圆点点击
        loop:true                   //可选选项，自动滑动
});




// 惯性菜单

var showWatch = document.querySelector('#showWatch');
var showWatchUl = document.querySelector('#showWatchUl');
var windowWid = document.documentElement.clientWidth ||document.body.clientWidth;
var alllength = showWatch.querySelectorAll('li').length * 126;
var deltaX;
var nowx = 0;
var movearr = [0,0];

showWatch.addEventListener('touchstart', function (event) {
    showWatchWid = showWatch.offsetWidth;
    // event.preventDefault();
    movearr = [0, 0];
    showWatch.style.transition = 'none';
    deltaX = event.touches[0].clientX - nowx;
},false);
showWatch.addEventListener('touchmove', function (event) {
    event.preventDefault();
    if(showWatch.offsetLeft > 0) return;
    nowx = event.touches[0].clientX - deltaX;
    showWatch.style.left = nowx + "px";
    movearr.push(event.touches[0].clientX);
});
showWatch.addEventListener('touchend', function (event) {
    event.preventDefault();
    var s = movearr[movearr.length-1] - movearr[movearr.length-2];
    var targetx = nowx + s * 5;
    if(targetx > 0 ) {
        targetx = 0;
        showWatch.style.transition = 'all 0,4s cudic-bezier(0.15,0.85,0.15,2.08) 0s'
    } else if (targetx < -(showWatchWid-windowWid)){
        targetx = -(showWatchWid-windowWid);
        showWatch.style.transition = 'all 0,4s cudic-bezier(0.15,0.85,0.15,2.08) 0s'
    } else {
        showWatch.style.transition = 'all 0,4s cudic-bezier(0.18,0.68,0.65,0.88) 0s'
    }

    showWatch.style.left = targetx + "px";
    nowx  = targetx;
}, false);