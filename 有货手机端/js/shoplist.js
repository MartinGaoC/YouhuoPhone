//顶部广告控制
var top_btn = document.getElementById('topBtn');
var top_adv = document.querySelector('.top-adv');
top_btn.addEventListener('touchend', function () {
    top_adv.style.display = 'none';
});
// 控制菜单
var menuBtn = document.querySelector('#menuBtn');
menuBtn.addEventListener('touchend', function () {
    $('.menuShadow').toggle();
});

//获取数据

var goods_id = $.getQueryString('goods_id');
//
// var goods_id = al.getQueryString('goods_id');
$.ajax({
    'url': 'http://h6.duchengjiu.top/shop/api_goods.php?format=jsonp&callback=martin&goods_id=' + goods_id,
    'type': 'GET',
    'dataType': 'jsonp',
    'jsonpCallback': 'martin',
    'success': function (response) {
        var obj = response.data[0];
        console.log(obj);
        var oImg = $('<img src="'+obj.goods_thumb+'"/>');
        $('#banner').append(oImg);
        var oH2 = $('<h2>'+obj.goods_name+'</h2>');
        $('#banner').append(oH2);
        var oSpan = $('<span>￥'+obj.price+'</span>');
        $('#banner').append(oSpan);
        var oP = $('<p>'+obj.goods_desc+'</p>');
        $('.shadow_comment').append(oP);




    }
});

//控制菜单
var cound = 0;
var page = false;
var spinnerBtn = document.getElementById('spinnerBtn');
var shadow = document.querySelector('.shadow');
spinnerBtn.addEventListener('touchend', function (event) {
    event.preventDefault();
    console.log(1);
    cound++;
    spinnerBtn.style.transform = "rotate("+(180 * cound)+"deg)";
    spinnerBtn.style.transition = '1s';
    if(page) {
        shadow.style.transform = "translateY("+-2.5+"rem)";
        shadow.style.transition = '1s'
    } else {
        shadow.style.transform = "translateY("+0+"rem)";
        shadow.style.transition = '1s'
    }
        page = !page;
});

//收藏按钮

var shoplist_mune_like = document.querySelector('.shoplist_mune_like');
shoplist_mune_like.addEventListener('touchend', function (event) {
    event.preventDefault();
    if(page) {
        shoplist_mune_like.className = "shoplist_mune_like"
    } else {
        shoplist_mune_like.className = "shoplist_mune_like shoplist_mune_red"
    }
    page = !page;
});


//购物车按钮

var Cart = document.getElementById('Cart');
Cart.addEventListener('touchend', function (event) {
    event.preventDefault();
    // 验证用户是否登录
    if(!localStorage.token) {
        location.assign('login.html#callbackurl='+location.href);
    }
    // ajax('POST','http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,"")
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
        "type": "POST",
        "data": {
            "goods_id": goods_id
        },
        "dataType": "json",
        "success": function (response) {
            console.log(response);
            location.assign('cart.html#callbackurl='+location.href)
        }
    })
});