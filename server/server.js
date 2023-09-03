import cors from 'cors';
import express from 'express'
import mysql from 'mysql2'; // https://www.npmjs.com/package/mysql2 官方api文档
import multer from 'multer';
import path from 'path';
// const uploadFile = multer({ dest: '../public/mp3/' })
const connetion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '775028',
    database: 'WebMusic'
})
const app = express();

// 使用multer.diskStorage磁盘控制引擎,修改文件名称
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/mp3/'); // 指定上传的目标文件夹
    },
    filename: function (req, file, cb) {
        const originalFileName = file.originalname;  // 获取文件名称
        const extension = path.extname(originalFileName); // 获取文件的扩展名
        const fileName = originalFileName.slice(0, originalFileName.lastIndexOf(extension));
        cb(null, fileName + extension);
        // cb(null, fileName + '-' + Date.now() + extension); // 添加时间戳以确保文件名的唯一性
    }
});
const uploadFile = multer({ storage });

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


// 7. 拿到歌曲列表
app.get('/getSongList', (req, res) => {
    const query = 'select * from musicList';
    connetion.query(query, (err, results, fields) => {
        return res.send(results);
    })
})

// 8. 拿到歌曲评论
app.get('/getSongComment', (req, res) => {
    let name = req.query.name;
    const query = 'select * from commentList where musicName=? ORDER BY date DESC';
    connetion.query(query, [name], (err, results, fields) => {
        // console.log(results)
        return res.send(results);
    })
})


// 9. 新增对歌曲的评论
app.post('/commentSong', (req, res) => {
    let userName = req.body.userName;
    let commentContent = req.body.comment;
    let musicName = req.body.musicName;
    const query = 'insert into commentList (userName,commentContent,musicName) values (?,?,?)';
    connetion.execute(query, [userName, commentContent, musicName], (err, results, fields) => {
        // console.log(results)
        return res.send(results);
    })
})
// 10. 删除歌曲
app.post('/deleteMusic', (req, res) => {
    let musicName = req.body.musicName;
    const query = 'delete from musicList where musicName=?';
    connetion.execute(query, [musicName], (err, results, fields) => {
        return res.send('删除成功');
    })
})

// 11. 上传自己的专辑文件
app.post('/uploadMusicFile', uploadFile.single('mp3'), (req, res) => {
    // console.log(req.file);
    return res.send(req.file.originalname); //返回详细文件名称
})


// 12. 添加音乐
app.post('/addMusic', (req, res) => {
    const musicName = req.body.musicName;
    const singerName_album = req.body.singerName_album;
    const timeLength = req.body.timeLength;
    const url = req.body.url;
    let query = 'insert into musicList (musicName,singerName_album,timeLength,url) values (?,?,?,?)';
    connetion.execute(query,[musicName,singerName_album,timeLength,url],(err,results,fields)=>{
        if(err){
            return res.send('添加失败');
        }
        return res.send('添加成功');
    })
})

// 13. 修改音乐信息
app.post('/modifyMusic',(req,res)=>{
    const musicOriginName = req.body.musicOriginName;
    const musicNewName = req.body.musicNewName;
    const singerName_album = req.body.newSingerName_album;
    const timeLength = req.body.newTimeLength;
    let query = 'update musicList set musicName=?,singerName_album=?,timeLength=? where musicName=?';
    connetion.execute(query,[musicNewName,singerName_album,timeLength,musicOriginName],(err,results,fields)=>{
        if(err){
            return res.send('修改失败');
        }
        return res.send('修改成功');
    })
})
// 启动服务器
app.listen(8000, () => {
    console.log('express listen on 8000');
})

