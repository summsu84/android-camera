/**
 * Created by JJW on 2017-07-20.
 */


var EmotionLogic = require('./emotion-service');
var ImageDetectionLogic = require('./image-rekognition-request-service');
var RequestHandlerBase = require("./RequestHandlerBase");
var _ = require('lodash');
var Const = require('./util/const');
var Utils = require('./util/Utils');
var ActionHandler = function(){

}

_.extend(ActionHandler.prototype,RequestHandlerBase.prototype);

ActionHandler.prototype.processAction = function(action, param, res){

    var self = this;
    /**
     *  Desc : DB로부터 감정 문구 가져오기
     */
    if(action ==='action-emotion-service')
    {

        EmotionLogic.selectEmotionResult(param, function(result){
            //result 값 가져오기
            //var restObj = result.commentList[0];
            self.successResponse(res,Const.responsecodeSucceed, Const.responseMessageFromDB, {
                retMsg : result.msg
            });

        },function(err,code){
            // Error 발생 시
            if(err){
                self.errorResponse(
                    response,
                    Const.httpCodeSeverError
                );
            }else{
                // Error 가 나지 안은 경우
                self.successResponse(res,code,Const.responseMessageFromDBError, {
                    retMsg : {
                        SPCH_CONT_MSG: 'DB 연동 오류'
                    }
                } );

            }

        });
    }
    /**
     *  Desc : DB로부터 감정 문구 가져오기
     */
    else if(action === 'action-detect-image-service')
    {

        ImageDetectionLogic.requestRekognitionService(param, function(result){
            // 결과 값을 바탕으로 DB쿼리 한다.
            const passParam = result.data;
            // FaceDetection 결과 체크 하기,
            if(passParam.FaceDetails.length === 0)
            {
                // Exception 처리 한다.
                self.successResponse(res, Const.responsecodeSucceed, Const.responseMessageFaceNotFound, {
                    retMsg : {
                        SPCH_CONT_MSG: Const.responseMessageFaceNotFound
                    }
                });
            }else {
                const faceDetails = passParam.FaceDetails[0];
                const emotions = faceDetails.Emotions;
                // 가장 Confidence가 높은 것을 가져온다.
                emotions.sort((a, b) => {
                    return b.Confidence - a.Confidence;
                });
                const emotion = emotions[0];
                const age = faceDetails.AgeRange;
                const gender = faceDetails.Gender;
                const bubbleParam = {
                    emotion: emotion.Type,
                    age: Math.floor(age.Low / 10) * 10,
                    gender: gender.Value.substring(0, 1),
                }

                EmotionLogic.selectEmotionResult(bubbleParam, function (result) {
                    //result 값 가져오기
                    //var restObj = result.commentList[0];
                    self.successResponse(res, Const.responsecodeSucceed, Const.responseMessageFromDB, {
                        retMsg: result.msg
                    });

                }, function (err, code) {
                    if (err) {
                        self.errorResponse(
                            response,
                            Const.httpCodeSeverError
                        );
                    } else {
                        self.successResponse(res, code, Const.responseMessageFromDBError, {
                            retMsg : {
                                SPCH_CONT_MSG: 'DB 연동 오류'
                            }
                        });
                    }
                });
            }
        },function(err,code){
            if(err){

                self.errorResponse(
                    response,
                    Const.httpCodeSeverError
                );
            }else{
                self.successResponse(res,code,Const.responseMessageFaceDetectionError, {
                    retMsg : {
                        SPCH_CONT_MSG: Const.responseMessageFaceDetectionError
                    }
                } );
            }
        });
    }
}

module["exports"] = new ActionHandler();