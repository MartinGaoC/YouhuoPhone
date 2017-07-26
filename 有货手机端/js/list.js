//顶部广告控制
var top_btn = document.getElementById('topBtn');
var top_adv = document.querySelector('.top-adv');
top_btn.addEventListener('touchend', function () {
    top_adv.style.display = 'none';
});



//获取分类商品
var cat_id = $.getQueryString('cat_id');
console.log(cat_id);
ajax('GET','http://h6.duchengjiu.top/shop/api_goods.php?cat_id=' + cat_id +'&page='+1+'&pagesize='+30, null, function (response) {
    console.log(response);
    for(var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        var oLi = $('<li></li>');
        $('#listClassify').append(oLi);
        var oA = $('<a href ='+"shoplist.html?goods_id=" + obj.goods_id + '></a>');
        oLi.append(oA);
        var oImg = $('<img src="'+obj.goods_thumb+'"/>');
        oA.append(oImg);
        var oP = $('<p>'+obj.goods_name+'</p>');
        oA.append(oP);
        var oEm = $('<em>价格￥'+obj.price+'</em>');
        oA.append(oEm);
    }
});

// 控制菜单
var menuBtn = document.querySelector('#menuBtn');
menuBtn.addEventListener('touchend', function () {
    $('.menuShadow').toggle();
});
//nav菜单
var nav_listLi =document.querySelector('.nav_list').getElementsByTagName('li');
for(var i = 0; i < nav_listLi.length; i++) {
    nav_listLi[i].index = i;
    nav_listLi[i].addEventListener('touchend',function () {
        for(var j = 0; j < nav_listLi.length; j++) {
            nav_listLi[j].className = '';
        }
        this.className = 'nav_list_black';
    })
}

//获取搜索商品

