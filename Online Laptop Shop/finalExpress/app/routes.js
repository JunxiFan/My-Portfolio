// app/routes.js
// var multer = require('multer');
// var upload = multer();
// grab the nerd model we just created
var User = require('./models/user');
var Accessory = require('./models/accessory');
var mongoose = require('mongoose');
var Laptop = require('./models/laptop');
var Item = require('./models/item');



module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    //注册Customer
    app.post('/register', (req, res) => {
        User.findOne({ username: req.body.username }, (err, n) => {
            if (err) {
                console.log('checkerror: ', err);
            } else {
                if (n !== null && n !== undefined) {
                    console.log('this username is already exist.');
                    res.send(false);
                } else {
                    console.log('this username can be used.');
                    var rec = new User({
                        username: req.body.username,
                        password: req.body.password,
                        role: 'Customer'
                    });
                    rec.save((err, n) => {
                        if (err) {
                            // res.send(false);
                            console.log('registration failed');
                        } else {
                            res.send(true);
                        };
                    });
                }
            }
        })
    });

    //确认登陆
    app.post('/loginCheck', (req, res) => {

        User.findOne({
            username: req.body.username,
            // password: req.body.password
        }, (err, n) => {
            if (err) {
                // res.send(false);
                console.log('(mongodb) loginCheck failed');
            } else {
                if (!n) {
                    console.log('no such username');
                    res.sendStatus(400);
                } else {
                    console.log('(mongodb) find username executed: ' + n);
                    if (req.body.password == n.password) {
                        res.json(n.role);
                    } else {
                        res.send(false);
                    }
                }
            };
        });
    });


    //Admin Service

    //accessory
    //添加accessory
    app.post('/admin', (req, res) => {
        var rec = new Accessory({
            accName: req.body.accName,
            accDesc: req.body.accDesc,
            accType: req.body.accType
        });
        rec.save((err, n) => {
            if (err) {
                // res.send(false);
                console.log('add accessory failed');
            } else {
                res.sendStatus(200);
            };
        });
    });

    //获得accessory列表
    app.get('/admin/', function (req, res) {
        Accessory.find(function (err, list) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            // console.log('testmodel', testModels);
            // console.log(list);

            res.json(list);
        });
    });

    //根据id删除accessory
    app.delete('/admin', (req, res) => {

        var accId = req.query.accId;
        // 不需要将string类型的id转化为ObjectID类型也能进行mongoose操作
        // var id = mongoose.Types.ObjectId(accId);
        // console.log(mongoose.Types.ObjectId(accId));
        Accessory.findByIdAndRemove(accId,
            (err, n) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('is exists?', n);
                    res.sendStatus(200);
                }


            })
    });

    // 根据_id修改accessory
    app.put('/admin', (req, res) => {
        var id = req.query.accId;
        // rec不能为一个新的Accessory对象， 因为会自动生成一个_id, _id是不允许更改的
        var rec = {
            accName: req.body.accName,
            accDesc: req.body.accDesc,
            accType: req.body.accType
        }
        Accessory.findByIdAndUpdate(id, rec,
            (err, n) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    console.log('updated: ', n);
                    res.sendStatus(200);
                }
            }
        )

    });

    //laptop
    //添加laptop
    app.post('/admin/lap', (req, res) => {
        var rec = new Laptop({
            lapName: req.body.lapName,
            lapDesc: req.body.lapDesc,
            lapBrand: req.body.lapBrand,
            lapCPU: req.body.lapCPU,
            lapGraph: req.body.lapGraph,
            lapPrice: req.body.lapPrice
        });
        rec.save((err, n) => {
            if (err) {
                // res.send(false);
                console.log('add accessory failed');
            } else {
                res.sendStatus(200);
            };
        });
    });

    // 获取laptops列表
    app.get('/admin/lap', function (req, res) {
        Laptop.find(function (err, list) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            else {
                res.json(list);
            }
        });
    });

    // 根据_id修改laptop
    app.put('/admin/lap', (req, res) => {
        var id = req.query.lapId;
        console.log(id);

        // rec不能为一个新的Accessory对象， 因为会自动生成一个_id, _id是不允许更改的
        var rec = {
            lapName: req.body.lapName,
            lapDesc: req.body.lapDesc,
            lapBrand: req.body.lapBrand,
            lapCPU: req.body.lapCPU,
            lapGraph: req.body.lapGraph,
        }
        Laptop.findByIdAndUpdate(id, rec,
            (err, n) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    console.log('updated: ', n);
                    res.sendStatus(200);
                }
            }
        )

    });

    //根据id删除laptop
    app.delete('/admin/lap', (req, res) => {

        var id = req.query.lapId;
        // 不需要将string类型的id转化为ObjectID类型也能进行mongoose操作
        // var id = mongoose.Types.ObjectId(accId);
        // console.log(mongoose.Types.ObjectId(accId));
        Laptop.findByIdAndRemove(id,
            (err, n) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('is exists?', n);
                    res.sendStatus(200);
                }


            })
    });

    //注册admim
    app.post('/admin/stuff', (req, res) => {
        User.findOne({ username: req.body.username }, (err, n) => {
            if (err) {
                console.log('checkerror: ', err);
            } else {
                if (n !== null && n !== undefined) {
                    console.log('this username is already exist.');
                    res.send(false);
                } else {
                    console.log('this username can be used.');
                    var rec = new User({
                        username: req.body.username,
                        password: req.body.password,
                        role: 'Admin'
                    });
                    rec.save((err, n) => {
                        if (err) {
                            // res.send(false);
                            console.log('registration failed');
                            res.json('Save complete')
                        } else {
                            res.send(true);
                        };
                    });
                }
            }
        })
    });


    //customer
    //findlaptopBYBrand
    app.get('/customer/findLapByBrand', function (req, res) {
        console.log(req.query.lapBrand);
        //  case insensitivity
        Laptop.find({
            lapBrand: new RegExp(req.query.lapBrand, 'i')
        }, function (err, list) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            else {
                console.log(list);

                res.json(list);
            }
        });
    });

    // findLaptopByName
    app.get('/customer/findLapByName', function (req, res) {
        console.log(req.query.lapName);
        //  case insensitivity
        Laptop.find({
            lapName: new RegExp(req.query.lapName, 'i')
        }, function (err, list) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            else {
                console.log(list);

                res.json(list);
            }
        });
    });

    //findlaptopbyid
    app.get('/customer/findLapById', function (req, res) {
        console.log(req.query.lapId);

        Laptop.findById(req.query.lapId, function (err, lap) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            else {
                console.log(lap);

                res.json(lap);
            }
        });
    });

    //findlaptopBySpec
    app.get('/customer/findLapBySpec', function (req, res) {
        // console.log('------------------------------------------------------------------------------------------');

        name = req.query.lapName;
        cpu = req.query.lapCPU;
        graph = req.query.lapGraph;
        console.log(name, cpu, graph);

        //  case insensitivity
        Laptop.findOne({
            lapName: name,
            lapCPU: cpu,
            lapGraph: graph
        }, function (err, list) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            else {
                // console.log(res);

                res.json(list);
            }
        });
    });

    //add to cart
    app.post('/customer/addtoCart', (req, res) => {
        console.log('add to cart req.body', req.body);

        var rec = new Item(req.body);
        rec.save((err, n) => {
            if (err) {
                // res.send(false);
                console.log('add accessory failed');
            } else {
                res.sendStatus(200);
            };
        });
    });

    //find cart items by username
    app.get('/customer/findCartItems', function (req, res) {
        console.log(req.query.username);
        //  case insensitivity
        Item.find({
            username: req.query.username,
            status: 'unpaid'
        }, function (err, list) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            else {
                // console.log(list);
                res.json(list);
            }
        });
    });

    //edit cart items
    app.put('/customer/editCartItem', (req, res) => {
        var id = req.body._id;

        // rec不能为一个新的Accessory对象， 因为会自动生成一个_id, _id是不允许更改的
        var rec = {
            amount: req.body.amount,
            lapCPU: req.body.lapCPU,
            lapGraph: req.body.lapGraph,
            lapPrice: req.body.lapPrice
        }
        Item.findByIdAndUpdate(id, rec,
            (err, n) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    console.log('updated: ', n);
                    res.sendStatus(200);
                }
            }
        )

    });

    //delete cart item
    app.delete('/customer/delCartItem', (req, res) => {

        var id = req.query.itemId;
        // 不需要将string类型的id转化为ObjectID类型也能进行mongoose操作
        // var id = mongoose.Types.ObjectId(accId);
        // console.log(mongoose.Types.ObjectId(accId));
        Item.findByIdAndRemove(id,
            (err, n) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('is exists?', n);
                    res.sendStatus(200);
                }


            })
    });

    //Checkout
    app.put('/customer/checkout', (req, res) => {
        var id = req.body._id;
        var rec = {
            status: 'paid'
        }
        Item.findByIdAndUpdate(id, rec,
            (err, n) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    // console.log('updated: ', n);
                    res.sendStatus(200);
                }
            }
        )

    });


    //find order history items by username
    app.get('/customer/findHistoryItems', function (req, res) {
        console.log(req.query.username);
        //  case insensitivity
        Item.find({
            username: req.query.username,
            status: 'paid'
        }, function (err, list) {
            if (err)
                res.send(err);
            else {
                // console.log(list);
                res.json(list);
            }
        });
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    // app.get('/', function (req, res) {
    //     res.sendfile('./public/views/index.html'); // load our public/index.html file
    // });

};