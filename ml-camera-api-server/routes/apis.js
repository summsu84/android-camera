var express = require('express');
var router = express.Router();
const ActionHandler = require('../routes/lib/base/ActionHandler');
const Const = require('./lib/base/util/const');
const querystring = require('querystring');

router.get('/bubble/search', function(req, res) {
    processGetRequest('action-emotion-service', req, res);
    // res.json('respond with a resource');
});
router.post('/detect/image/', function(req, res) {
    processPostRequest('action-detect-image-service', req, res);
    // res.json('respond with a resource');
});
router.post('/bubble/upload/image', function(req, res) {
    processPostRequest('action-upload-service', req, res);
});

let processGetRequest = (action, req, res) =>
{
    // res.header("Access-Control-Allow-Origin", "*");
    console.log('processGetRequest [action] : ' + action);
    try {
        //test
        let params = {};
        if(action === 'action-emotion-service')
        {
            //params = querystring.parse(req.query);
            params = req.query;
        }else if(action === 'action-detect-image-service')
        {
            params = req.params.url;
        }
        ActionHandler.processAction(action, params, res);
        //console.log('result: ', speech);
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
}

// Post Action
let processPostRequest = (action, req, res) =>
{
    try {
        //test
        let params = req.body;
        ActionHandler.processAction(action, params, res);
    } catch (err) {
        console.error("Can't process request", err);
        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
}


/*
 router.get('/employee/:id', function(req, res) {
 let empId = req.params.id;
 res.json(`${empId} 직원 상세 보기`);
 });
 //클라이언트에서 변경할 데이터를 json으로 넘겨줌, url id 가 올라옴
 router.put('/employee/:id', function(req, res) {
 //path variable
 let empId = req.params.id;
 let modified = req.body;
 console.log(modified);

 res.json(`${empId} 번 직원 정보 수정정`);});
 router.post('/employee', function(req, res) {
 let fromClient = req.body;   //body에 json이 들어옴
 console.log(fromClient)
 res.json(fromClient);
 });
 router.delete('/employee/:id', function(req, res) {
 let empId = req.params.id;

 res.json(`${empId} 직원 삭제 `);
 });
 */


module.exports = router;
