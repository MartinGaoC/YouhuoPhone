//顶部广告控制
var top_btn = document.getElementById('topBtn');
var top_adv = document.querySelector('.top-adv');
top_btn.addEventListener('touchend', function () {
    top_adv.style.display = 'none';
});

var login_btn = document.querySelector('#login_btn');
login_btn.addEventListener('touchend', function () {
    var username = document.querySelector('#login_username').value;
    var password = document.querySelector('#login_password').value;
    var prompt = document.querySelector('#prompt');
    ajax('POST',"http://h6.duchengjiu.top/shop/api_user.php","status=login&username="+username+"&password="+password,function (response) {
        console.log(response);
        if(response.code === 1000) {
                        prompt.style.display = 'block';
                        prompt.innerText = '用户名或密码不能为空';
                        timer = setInterval(function () {
                            clearInterval(timer);
                            prompt.style.display = 'none'
                        },3000);
                        return
                    }
                    if(response.code === 1001) {
                        prompt.style.display = 'block';
                        prompt.innerText = '密码最小长度为6位';
                        timer = setInterval(function () {
                            clearInterval(timer);
                            prompt.style.display = 'none'
                        },3000);
                        return
                    }
                    if(response.code === 2001) {
                        prompt.style.display = 'block';
                        prompt.innerText = '用户名不存在';
                        timer = setInterval(function () {
                            clearInterval(timer);
                            prompt.style.display = 'none'
                        },3000);
                        return
                    }
                    if(response.code === 0) {
                        prompt.style.display = 'block';
                        prompt.innerText = '登录成功';
                        var　 data = response.data;
                        for(var prop in data) {
                            if(data.hasOwnProperty(prop)){
                                localStorage.setItem(prop, data[prop]);
                            }
                        }
                        var  callbackurl = location.hash.substr(13);
                        if(callbackurl) {
                            location.assign(callbackurl);
                        } else {
                            location.assign('personal.html')
                        }
                    }
    })
});
