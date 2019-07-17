/**
 * Created by JJW on 2017-07-14.
 */

var EmotionResultModel = require("../../../modules/db/model/emotionResultModel");

//현재 위치 주변의 장소를 검색 하는 로직
var EmotionLogic = {
    selectEmotionResult : function(param, onSuccess, onError){

        EmotionResultModel.selectEmotion(param, function (err, rows) {

            if (err) {
                if (onError)
                    onError(err, null);
            } else {
                if (onSuccess)
                    onSuccess({
                        msg: rows,
                        params: param
                    })
            }

        });

    }
}

module["exports"] = EmotionLogic;