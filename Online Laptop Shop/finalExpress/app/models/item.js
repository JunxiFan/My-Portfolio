var mongoose = require('mongoose');

// define our sample model
// module.exports allows us to pass this to other files when it is called
//此处定义db下json表的名字, 这张表就和模型保定，查找的时候也是根据该名称去该表中查找
module.exports = mongoose.model('item', {
    lapId: String,
    lapName: String,
    lapPrice: Number,
    username: String,
    amount: String,
    lapCPU: String,
    lapGraph: String,
    amount: Number,
    status: String

});