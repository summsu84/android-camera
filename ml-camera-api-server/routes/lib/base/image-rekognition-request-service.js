/**
 * Created by JJW on 2017-07-14.
 */

const request = require('request').defaults({ encoding: null });;
const aws = require('aws-sdk');
aws.config.update({region: 'us-east-2'})
const rekognition = new aws.Rekognition();

// 이미지 URL을 통해서 Rekognition을 요청한다.
var ImageRekognitionRequestLogic = {

    // AWS-Rekognition을 요청한 후, 쿼리적용
    requestRekognitionService : function(param, onSuccess, onError){

        const reqUrl = param.url;

        request.get(reqUrl, (error, response, body) => {

            //base 64 encoding
            if (!error && response.statusCode === 200) {
                const data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                const data1 = new Buffer(body, 'base64');
                const params = {
                    Image: {
                        Bytes: body
                    },
                    Attributes: [
                        'ALL',
                    ],
                };
                /*
                const s3params = {
                    Image: {
                        S3Object: {
                            Bucket: 'mlcamera',
                            Name: 'demo_img1.jpg',
                        },
                    },
                    Attributes: [
                        'ALL',
                    ],
                }
                */
                rekognition.detectFaces(params, (err, data) => {
                    if (err) {
                        onError(err, null);
                        console.log(err, err.stack);
                    } // an error occurred
                    else {
                        if (onSuccess)
                            onSuccess({
                                data: data
                            });
                        console.log(data);           // successful response
                    }
                });
            }
        });
    }
}

module["exports"] = ImageRekognitionRequestLogic;