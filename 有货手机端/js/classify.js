//顶部广告控制
var top_btn = document.getElementById('topBtn');
var top_adv = document.querySelector('.top-adv');
top_btn.addEventListener('touchend', function () {
    top_adv.style.display = 'none';
});

//获取分类信息
$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_cat.php?format=jsonp&callback=martin",
    "type": "GET",
    "jsonCallback": 'martin',
    "dataType": "jsonp",
    'success' : function (response) {
        // console.log(response);
        var html = '';
        for(var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            html += '<li class="two_lists_li"><a href="list.html?cat_id='+obj.cat_id+'">'+obj.cat_name+'</a></li>';

        }

        $('.two-lists').html(html);
        var two_lists_li = document.getElementsByClassName('two_lists_li');

        console.log(two_lists_li);
        for(var i = 0; i < two_lists_li.length; i++) {
            two_lists_li[i].index = i;
            two_lists_li[i].style.backgroundColor="#f8f8f8";
            two_lists_li[i].addEventListener('touchend', function () {
                for(var j = 0; j < two_lists_li.length; j++) {
                    two_lists_li[j].style.backgroundColor = '#f8f8f8'
                }
                this.style.backgroundColor = 'white'
            })
        }
    }
});
// 二级控制

// 一级与二级控制
var oneList = document.getElementById('oneList').getElementsByTagName('li');
var twoList = document.querySelectorAll('.two-list');
console.log(oneList);
console.log(twoList);
for(var i = 0; i < oneList.length; i++) {
    oneList[i].index = i;
    oneList[i].addEventListener('touchend', function () {
        for(var j = 0; j < oneList.length; j++) {
            oneList[j].className = '';
            twoList[j].className = 'two-list';
        }
        this.className = 'one-list-black';
        twoList[this.index].className = 'two-list two-listSha'
    })
}
