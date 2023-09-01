import { LogIn, SignUp } from '@/api/api.js';

// 获取DOM元素

// 1. 样式切换按钮
let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch_circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

// 2. 表单元素
let LogIn_Name = document.querySelector("#LogIn-Name");
let LogIn_Password = document.querySelector("#LogIn-Password");
let SignUp_Name = document.querySelector("#SignUp-Name");
let SignUp_Password = document.querySelector("#SignUp-Password");
let SignUp_Email = document.querySelector("#SignUp-Email");

// 页面跳转
let getButtons = (e) => {
    e.preventDefault();
    console.log(e.target.textContent);
    if (e.target.textContent == "SIGN IN") {
        let UserName = LogIn_Name.value.trim();
        let Password = LogIn_Password.value.trim();
        if (!UserName || !Password) {
            alert("用户名或密码不能为空");
            return;
        }
        LogIn({
            name: UserName,
            password: Password
        }).then(response => {
            // handle success
            if (response.data == 'deactive') {
                alert("该账户已被停用,请联系管理员");
            }
            else if (response.data == 'success') {

                // 存储用户信息
                localStorage.setItem("name", UserName);

                //设置cookie
                document.cookie = "name=" + UserName;
                document.cookie = "password=" + Password;
                window.location.href = "/src/pages/index/index.html";
            } else if (response.data == 'fail') {
                alert("用户名或密码错误,请重新输入");
            } else if (response.data == 'no this user') {
                alert("该用户不存在,请注册");
            }
        }).catch(error => {
            // handle error
            console.log(error);
        })
    }
    else {
        let UserName = SignUp_Name.value;
        let Password = SignUp_Password.value;
        let Email = SignUp_Email.value;
        SignUp({
            name: UserName,
            password: Password,
            email: Email
        }).then(response => {
            // handle success
            console.log(response);
            if (response.data == 'users info exist') {
                alert("用户名已存在,请重新输入");
            }
            else if (response.data == 'sign up fail') {
                alert("注册失败,请稍后再试");
            }
            else if (response.data == 'sign up success') {
                alert("注册成功,即将跳转到首页");
                localStorage.setItem("name", UserName);
                window.location.href = "/src/pages/index/index.html";
            }
        }).catch(error => {
            // handle error
            console.log(error);
        })
    }
}

// 切换登录和注册的表单
let changeForm = (e) => {
    // 修改类名
    switchCtn.classList.add("is-gx");
    setTimeout(function () {
        switchCtn.classList.remove("is-gx");
    }, 1500)
    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z");
    console.log('change style');
}

// 点击切换
let shell = (e) => {
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", getButtons);

    }

    for (var i = 0; i < switchBtn.length; i++) {
        switchBtn[i].addEventListener("click", changeForm);

    }
}
window.addEventListener("load", function () {
    shell();

    // 解析cookie,自动填充表单
    let cookieString = document.cookie;
    if (cookieString == '') return;
    const cookies = cookieString.split('; ');
    const parsedCookies = {};
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        parsedCookies[name] = value;
    });
    LogIn_Name.value = parsedCookies.name;
    LogIn_Password.value = parsedCookies.password;
});