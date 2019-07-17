/**
 * Created by JJW on 2017-07-20.
 */




var EmotionResultModel = function(){

};

EmotionResultModel.prototype.connection = null;

EmotionResultModel.prototype.init = function(connection){

    console.log(">>CommentModel init .. connection value : " + connection)

    this.connection = connection;

}

/**
 *  Comment를 모두 가져온다..
 * @param callback
 */
EmotionResultModel.prototype.selectEmotion = function(param, callback){

    var self = this;

    var score = 10;

    //var strQuerySql = `select CSD.CD_SPH_NM from CM_EMOTION CM, CM_EMOTION_DTL CMD, CM_SPEECH CS, CM_SPEECH_DTL CSD where CM.CD_EMO_CTGRZ_NM_ENG = '${param.emotion}' AND CMD.CD_EMO_SCORE = ${score} AND CMD.CD_EMO_CD = CS.CD_EMO_CD AND CS.CD_SPH_CTGRZ = CSD.CD_SPH_CTGRZ`;;

    var strQuerySql = `select SPCH_CONT_MSG
                        from CM_SPCH_CONT C,
                             (select MP_SPCH_CONT_ID from CM_EMO_SPCH_MP_TBL A,
                                                    (select CD_EMO_CTGRZ from CM_EMOTION
                        where CD_EMO_CTGRZ_NM_ENG LIKE '${param.emotion}') B
                        where A.MP_EMO_CD = B.CD_EMO_CTGRZ 
                        AND A.MP_AGE = '${param.age}'
                        AND A.MP_SEX = '${param.gender}'
                        ) D
                        where C.SPCH_CONT_ID = D.MP_SPCH_CONT_ID`;

    var query = self.connection.query(strQuerySql, function (err, rows){

        if (err)
            console.error(err);
        else {
            // console.log('emotionResultModel : ' + rows);
            console.log(rows);
            if (callback) {
                // 램덤 Aray 한개만
                const length = rows.length;
                if(length == 0)
                {
                    callback(err, {
                        SPCH_CONT_MSG: '메시지가 없어요,,,'
                    });
                }else
                {
                    const randomNumber = Math.floor(Math.random() * length);
                    console.log(">>>");
                    console.log(rows[randomNumber]);
                    callback(err, rows[randomNumber]);
                }

            }
        }
    })

}






module["exports"] = new EmotionResultModel();