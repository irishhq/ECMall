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

router.get("/list", (req, res) => {
	var sql = "select * from xz_user";
	pool.query(sql, (err, result) => {
		if (err) { throw err; }
		else {
			if ( result.length > 0 ) {
				res.send(result);
			}
		}
	});
});

router.get("/delete", (req, res) => {
	var $uid = req.query.uid;
	console.log($uid);
	if (!$uid) {
		res.send("用户ID为空");
		return;
	}
	var sql = "delete from xz_user where uid=?"
	pool.query(sql, [$uid], (err, result) => {
		if (err) {throw err;}
		console.log(result);
		if ( result.affectedRows > 0 ) {
			res.send("1");
		}
	});
});

router.get("/selectUser", (req, res) => {
	var $uid = req.query.uid;
	if (!$uid) {
		res.send("uid不存在");
		return;
	}
	var sql = "select * from xz_user where uid=?";
	pool.query(sql, [$uid], (err, result) => {
		console.log(result);
		console.log(result[0]);
		if (result.length > 0) {
			res.send(result[0]);
		} else {
			res.send("0");
		}
	});
});

router.post("/update", (req, res) => {
	var user = req.body;
	console.log(user);
	var sql = "UPDATE xz_user SET";
	var uid = null;
	for ( var key in user ){
		console.log("--------");
		console.log(user);
		if (key == "uid") {
			uid = user[key];
			continue;
		}
		sql += " " + key + "='" + user[key] + "',";
	}
	sql = sql.substring(0, sql.length-1);
	sql += " where uid=" + uid;
	console.log(sql);
	pool.query(sql, (err, result) => {
		console.log(result);
	});
});

router.get('/checkUname', (req, res) => {
	var $uname = req.query.uname;
	if (!$uname) {
		res.send('2');
		return;
	}
	var sql = "select * from xz_user where uname=?";
	pool.query(sql, [$uname], (err, result) => {
		console.log(11111);

		if (err) { throw err; }
		if (result.length > 0) {
			res.send("1");
		} else {
			res.send("0");
		}
	});
});

router.get('/checkEmail', (req, res) => {
	var $email = req.query.email;
	console.log($email);
	if (!$email) {
		res.send('2');
		return;
	}
	var sql = "select * from xz_user where email=?";
	pool.query(sql, [$email], (err, result) => {
		if (err) { throw err; }
		if (result.length > 0) {
			res.send("1");			
		} else {
			res.send("0");
		}
	});
});

router.get('/checkPhone', (req, res) => {
	var $phone = req.query.phone;
		console.log($phone);
	if (!$phone) {
		res.send('2');
		return;
	}
	var sql = "select * from xz_user where phone=?";
	pool.query(sql, [$phone], (err, result) => {
		if (err) { throw err; }
		if (result.length > 0) {
			res.send("1");			
		} else {
			res.send("0");
		}
	});
});

router.post("/register", (req, res) => {
	var user = req.body;
	// console.log(user);
	var sql = "INSERT INTO `xz_user` VALUES(null, ?, ?, ?, ?, ?, ?, ?)";
	pool.query(sql, [user.uname, user.upwd, user.email, user.phone, user.avatar, user.user_name, user.gender], (err, result) => {
		console.log(result);
		console.log(sql);
	});
});
module.exports = router;

