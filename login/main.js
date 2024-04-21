import { Fetch } from "/api/fetch.js"

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
    if (e.target.textContent === "SIGN IN") {
        let UserName = LogIn_Name.value.trim();
        let Password = LogIn_Password.value.trim();
        if (!UserName || !Password) {
            alert("用户名或密码不能为空");
            return;
        }
        Fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: UserName,
                password: Password
            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            console.log(text);
            if (text === "success") {
                // 存储用户信息
                localStorage.setItem("name", UserName);

                //设置cookie
                document.cookie = "name=" + UserName;
                document.cookie = "password=" + Password;
                console.log(document.cookie);
                window.location.href = "../home/index.html";
            }
        }).catch(error => {
            console.log(error);
            if (error.message.startsWith("HTTP error!")) {
                const status = error.message.split(": ")[1];
                switch (status) {
                    case '500':
                        alert("服务器错误,请稍后再试!");
                        break;
                    case '401':
                        alert("用户名或密码错误,请重新输入!");
                        break;
                    case '403':
                        alert("该账户已被停用,请联系管理员!");
                        break;
                    case '404':
                        alert("该用户不存在,请注册!");
                        break;
                    case '409':
                        alert("账号已登录!请勿重复登录")
                    default:
                        alert("未知错误,请稍后再试!");
                        break;
                }
            }
        });
    } else {
        let UserName = SignUp_Name.value;
        let Password = SignUp_Password.value;
        let Email = SignUp_Email.value;
        Fetch('/SignUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: UserName,
                password: Password,
                email: Email
            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            localStorage.setItem("name", UserName);
            window.location.href = "../home/index.html";
        }).catch(error => {
            if (error.message.startsWith("HTTP error!")) {
                const status = error.message.split(": ")[1];
                switch (status) {
                    case '409':
                        alert("用户名已存在,请重新注册!");
                        break;
                    default:
                        alert("服务器未知错误!");
                        break;
                }
            }
        });
    }
}

// 切换登录和注册的表单
let changeForm = () => {
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
let shell = () => {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", getButtons);
    }

    for (let i = 0; i < switchBtn.length; i++) {
        switchBtn[i].addEventListener("click", changeForm);

    }
}
window.addEventListener("load", function () {
    shell();
    LogIn_Name.value = "";
    LogIn_Password.value = "";
});
