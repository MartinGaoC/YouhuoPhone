//顶部广告控制
var top_btn = document.getElementById('topBtn');
var top_adv = document.querySelector('.top-adv');
top_btn.addEventListener('touchend', function () {
    top_adv.style.display = 'none';
});


// 登录后界面
if(localStorage.getItem('token')) {
      var login = document.querySelector('#login');
      var loginLink = document.querySelector('#loginLink');
      // var loginText = document.querySelector('#loginText');
      loginLink.style.display = 'none';
      // loginText.style.display = 'none';
      var oSpan = document.createElement('span');
      oSpan.className = 'login_photo';
      login.appendChild(oSpan);
      var oUser = document.createElement('span');
      oUser.className = 'login_username';
      oUser.innerText = localStorage.getItem('username');
      login.appendChild(oUser);
      var oEm = document.createElement('em');
      oEm.className = 'signout';
      oEm.innerText = "退出";
      login.appendChild(oEm);
} else {

}

// 退出后界面
var signout = document.querySelector('.signout');
signout.addEventListener('touchend', function () {
    login.style.display = 'none';
    loginLink.style.display = 'block';
    localStorage.clear();
});