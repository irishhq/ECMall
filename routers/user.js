const express = require('express');
var pool = require('../pool.js');

//创建路由器
var router = express.Router();
//往路由器中添加多个路由

router.post("/login", (req, res) => {
	var $uname = req.body.uname;
	var $upwd = req.body.upwd;
	console.log($uname + $upwd);
	if(!$uname) {
		res.send({code: 401, msg: '用户名不存在'});
		return;
	}
	if(!$upwd) {
		res.send({code: 401, msg: '密码不存在'});
		return;
	}

	var sql = "select * from xz_user where uname=? and upwd=?";
	pool.query(sql, [$uname, $upwd], (err, result) => {
		if (err)
		{
			throw err;
		} else {
			if (result.length > 0)
			{
				res.send("登录成功");
			}
			else {
				res.send("登录失败");
			}
		}
	});
});
module.exports = router;