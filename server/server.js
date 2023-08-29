import cors from 'cors';
import express from 'express'
import mysql from 'mysql2'; // https://www.npmjs.com/package/mysql2 官方api文档
const connetion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '775028',
    database: 'WebMusic'
})
const app = express();


//配置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 设置允许跨域访问的源
// 1. 使用cors包
app.use(cors());

// 2. 手动配置跨域请求问题
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });


// 处理各种api请求
// 1. 服务器响应
app.get('/', (req, res) => {
    res.send('hello world!')
})

// 2. 判断是否存在账户
app.post('/LogIn', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    let query = 'select * from users where name=?';
    connetion.query(query, [name], (err, results, fields) => {
        if (results.length) {
            if (results[0].password != password) { return res.send('fail'); }
            if (results[0].active == 0) { return res.send('deactive'); }
            return res.send('success');
        }
        return res.send('no this user');
    })
})

// 3. 注册账户
app.post('/SignUp', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    let query = 'select * from users where name=?';
    connetion.query(query, [name], (err, results, fields) => {
        if (results.length) {
            return res.send('users info exist');
        }
        else {
            let insert = 'insert into users (name,password,email) values (?,?,?)';
            connetion.execute(insert, [name, password, email], (err, results, fields) => {
                if (err) {
                    return res.send(' sign up fail');
                }
                return res.send('sign up success');
            })
        }
    })
})

// 4.拿到用户列表
app.get('/userList', (req, res) => {
    let query = 'select * from users ';
    connetion.query(query, (err, results, fields) => {
        res.send(results);
    })
})

// 5. 删除用户
app.post('/deleteUser', (req, res) => {
    let name = req.body.name;
    let query = "delete from users where name=?";
    connetion.execute(query, [name], (err, results, fields) => {
        if (err) {
            return res.send('delete fail');
        }
        return res.send('delete success');
    })
})

// 6. 停用账户
app.post('/stopUser', (req, res) => {
    let name = req.body.name;
    let query = "update users set active=0 where name=?";
    connetion.execute(query, [name], (err, results, fields) => {
        if (err) {
            return res.send('stop fail');
        }
        return res.send('stop success');
    })
})


// 启动服务器
app.listen(8000, () => {
    console.log('express listen on 8000');
})

