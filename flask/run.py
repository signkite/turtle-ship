from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import cv2
from os.path import splitext, exists
import os
import pose_init
import pose_calc


app = Flask(__name__)
cors = CORS(app)


@app.route('/')
@cross_origin()
def home():
    return 'This is home!!!'


@app.route('/upload1', methods=['POST'])
def upload1():
    if 'video' not in request.files:
        print(request.files)
        print('비디오 파일 전송 실패')
        return {'error': 'No video uploaded'}, 400

    print('비디오 파일 전송 성공')
    video = request.files['video']
    if not exists('./data'):
        os.mkdir('./data')
    video.save('./data/init' + splitext(video.filename)[1])

    # Handle the video file, e.g., save it to disk or process it further
    return {'message': 'Upload successful'}, 200


@app.route('/upload2', methods=['POST'])
def upload2():
    if 'video' not in request.files:
        print(request.files)
        print('비디오 파일 전송 실패')
        return {'error': 'No video uploaded'}, 400

    print('비디오 파일 전송 성공')
    video = request.files['video']
    video.save('./data/normal' + splitext(video.filename)[1])

    # Handle the video file, e.g., save it to disk or process it further
    return {'message': 'Upload successful'}, 200


@app.route('/dangerous', methods=['GET'])
def get_dangerous():
    l_angle, r_angle = pose_init.angle_from_init()
    print('***** init.mp4 계산 결과 *****')
    print(l_angle, r_angle)
    print()
    result = pose_calc.result_from_angle(l_angle, r_angle)
    return jsonify(result)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)  # 서버 열고 계속 청취
