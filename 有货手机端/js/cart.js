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

ajax('GET',"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),null,function (response) {
    console.log(response);
    var html = '';
    for(var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        html += "<div class='shop'><div class='shop_top'><span>再购¥399.00元立享满￥399减￥100</span><em>去凑单</em> > </div><div class='shop_bottom'><div class='shop_photo'><em checked='true'></em><img src='"+obj.goods_thumb+"' alt=''></div><div class='shop_name'><em>"+obj.goods_name+"</em><span>￥"+obj.goods_price+"</span></div><div class='shop_list'><div class='shop_lists'><span id='listLeft'>-</span><input type='text' id='listText' value='1'><span id='listRight'>+</span></div><em>￥"+obj.goods_price+"</em></div></div></div>"
    }
    $('#Shop').html(html);

});