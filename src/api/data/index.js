const Router = require('koa-router');
const dataCtrl = require('./data.ctrl');

const data = new Router();

// crud

// 1. 지출/수입 보여주는 기능
// param : {
//      id(accesstoken):
//      month or sttdate/enddate: 
// }
// response : {
//      array
// }

// 2-1. 지출/수입 입력
// param : {
//      id(accesstoken):
//      pay or earn(bool) : 
//      date / amount / description / category: 
// }
// response : {
//      
// }

// 2-2. 구독 서비스 입력
// param : {
//      id(accesstoken):
//      name / sttdate / paydate / amount / description: 
// }
// response : {
//      
// }

// 3-1. 구독 Status
// param : {
//      id(accesstoken):
//      month: 
// }
// response : {
//      have paid / will pay :     
// }

// 3-2. 구독 List
// param : {
//      id(accesstoken):
// }
// response : {
//      arrary
// }


data.post('/create', dataCtrl.create);

// 검색은 나중

module.exports = data;