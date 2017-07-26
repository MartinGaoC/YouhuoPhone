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


//搜索逻辑
var searchBtn = document.getElementById("searchBtn");
if(searchBtn) {
    searchBtn.addEventListener('touchend', function () {
        console.log(1);
        //获得关键字
        var searchText = document.getElementById('searchText').value;

        // alert(searchText);

        ajax('GET','http://h6.duchengjiu.top/shop/api_goods.php?search_text='+searchText+'&page='+1+'&pagesize='+20,null,function (response) {
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
    });
}



    // $.ajax({
    //     "url": 'http://h6.duchengjiu.top/shop/api_goods.php?search_text='+searchText+'&page='+1+'&pagesize='+20,
    //     'type': "GET",
    //     'dataType': 'json',
    //     'success': function (response) {
    //         console.log(response);
    //
    //         for(var i = 0; i < response.data.length; i++){
    //             var obj = response.data[i];
    //             console.log(obj);
    //         }
    //     }
    // });
