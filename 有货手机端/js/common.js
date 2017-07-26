
//获取cat_id
$.getQueryString = function(name) {
    var search = location.search.substr(1);
    var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
    var r = search.match(reg);
    if (r === null) return null;
    return decodeURI(r[2]);
};



// 控制字体
setFontSize();
window.onresize = setFontSize;
function setFontSize() {
    var windowWidth = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = 40 * (windowWidth / 640) + 'px';
}


//ajax请求数据
function ajax(type,url,data,callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
            var response = JSON.parse(xhr.responseText);
            callback(response);
        }
    };

    if(type === 'GET'){
        xhr.open(type,url);
        xhr.send();
    }
    if(type === 'POST') {
        xhr.open(type,url);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
}