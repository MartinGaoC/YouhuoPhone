// 控制字体
setFontSize();
window.onresize = setFontSize;
function setFontSize() {
    var windowWidth = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = 40 * (windowWidth / 640) + 'px';
}


// ajax请求
var register_btn = document.querySelector('.register_btn');

register_btn.addEventListener('touchend', function () {
    var username = document.querySelector('#register_username').value;
    var password = document.querySelector('#register_password').value;
    var phone = document.querySelector('#register_phone').value;
    var prompt = document.getElementById('prompt');
    var timer;
    if((password === '' || password.length < 6 || password.length > 20)){
            prompt.style.display = 'block';
            prompt.innerText = '请输入正确的密码格式';
            timer = setInterval(function () {
                clearInterval(timer);
                prompt.style.display = 'none'
            },3000);
            return;
    } else if(!/^1[3-8]\d{9}$/.test(phone)){
        prompt.style.display = 'block';
        prompt.innerText = '请输入正确的手机号';
        timer = setInterval(function () {
            clearInterval(timer);
            prompt.style.display = 'none'
        },3000);
        return
    }
    ajax('POST',"http://h6.duchengjiu.top/shop/api_user.php","status=register&username="+username+"&password="+password,function (response) {
        console.log(response);
        if(response.code === 0){

        } else if(response.code === 2001) {
            prompt.style.display = 'block';
            prompt.innerText = '用户名已被注册';
            timer = setInterval(function () {
                clearInterval(timer);
                prompt.style.display = 'none'
            },3000);
            return
        } else if(/[A-z0-9_]+/.test(username === '' || username.length < 20 || username.length > 3)) {
            prompt.style.display = 'block';
            prompt.innerText = '请输入正确用户名';
            timer = setInterval(function () {
                clearInterval(timer);
                prompt.style.display = 'none'
            },3000);
            return
        }
        location.assign('index.html');

    });
});


