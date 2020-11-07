var express = require("express");
//建立一个路由空表！！！！
var router = express.Router();
//引入user 模型 类似于英雄联盟  只能有六神装的设计
const user = require("../sql/user");

router.get("/", function (req, res, next) {
    console.log("此时进入了register");
    res.render('register');
});


router.post("/in", function (req, res, next) {
    console.log("此时进入了register的in处理");
    let obj = req.body;
    console.log(obj);
    console.log(obj.username);
    console.log(obj.password);

    //重复用户问题的解决


    //解决用户重复的第一种写法
    user.findOne({ username: obj.username }, (err, data) => {
        if (err) {
            //发送错误日志，可以写进数据库
            console.log(err);
        }

        if (data) {
            res.redirect("/register");
        } else {
            user.insertMany(obj, (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(data);
                res.redirect("/login");
            })
        }
    })


    //第二种
    // user.findOne({ username: obj.username }, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     if (data) {
    //         res.redirect("/register");
    //     } else {
    //         user.insertMany(obj, (err, data) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             console.log(data);
    //             if (data) {
    //                 res.redirect("/login");
    //             } else {
    //                 res.redirect("/register");
    //             }
    //         })
    //     }
    // })
})







module.exports = router;