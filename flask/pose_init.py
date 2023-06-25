import cv2
import math


# 모델 파일 path
protoFile = "./data/pose_deploy_linevec_faster_4_stages.prototxt"
weightsFile = "./data/pose_iter_160000.caffemodel"

# init 동영상 파일 경로
video_path = './data/init.mp4'


#각도 계산
def calculate_angle(point1, point2, point3):
    x1, y1 = point1
    x2, y2 = point2
    x3, y3 = point3

    # 벡터1 계산
    dx1 = x2 - x1
    dy1 = y2 - y1

    # 벡터2 계산
    dx2 = x3 - x2
    dy2 = y3 - y2

    # 각 벡터의 크기 계산
    magnitude1 = math.sqrt(dx1*dx1 + dy1*dy1)
    magnitude2 = math.sqrt(dx2*dx2 + dy2*dy2)

    # 내적 계산
    dot_product = dx1*dx2 + dy1*dy2

    # 코사인 값 계산
    cosine_value = dot_product / (magnitude1 * magnitude2)

    # 각도 계산
    angle_rad = math.acos(cosine_value)
    angle_deg = math.degrees(angle_rad)
    if angle_deg > 90 :
        angle_deg = 180-angle_deg
    return angle_deg


# MPII에서 각 파트 번호, 선으로 연결될 POSE_PAIRS
BODY_PARTS = { "Head": 0, "Neck": 1, "RShoulder": 2, "RElbow": 3, "RWrist": 4,
                "LShoulder": 5, "LElbow": 6, "LWrist": 7, "RHip": 8, "RKnee": 9,
                "RAnkle": 10, "LHip": 11, "LKnee": 12, "LAnkle": 13, "Chest": 14,
                "Background": 15 }

POSE_PAIRS = [ ["Head", "Neck"], ["Neck", "RShoulder"], ["RShoulder", "RElbow"],
                ["RElbow", "RWrist"], ["Neck", "LShoulder"], ["LShoulder", "LElbow"],
                ["LElbow", "LWrist"], ["Neck", "Chest"], ["Chest", "RHip"], ["RHip", "RKnee"],
                ["RKnee", "RAnkle"], ["Chest", "LHip"], ["LHip", "LKnee"], ["LKnee", "LAnkle"] ]


def angle_from_init():
    print('angle_from_init execute')
    # 위의 path에 있는 network 불러오기
    net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)

    # 동영상 파일 열기
    video = cv2.VideoCapture(video_path)

    init_count = 0
    l_angle_sum = 0
    r_angle_sum = 0

    while video.isOpened():
        # 현재 프레임 가져오기
        l_shoulder_y = 0
        l_shoulder_x = 0

        m_shoulder_x = 0
        m_shoulder_y = 0

        r_shoulder_x = 0
        r_shoulder_y = 0

        chin_x = 0
        chin_y = 0

        ret, image = video.read()
        # 프레임이 정상적으로 가져와졌는지 확인
        if not ret:
            break
        # frame.shape = 불러온 이미지에서 height, width, color 받아옴
        imageHeight, imageWidth, _ = image.shape

        # 원하는 크기로 이미지 조정
        newWidth, newHeight = 195, 130
        image = cv2.resize(image, (newWidth, newHeight))
        imageHeight, imageWidth, _ = image.shape
        # network에 넣기위해 전처리
        inpBlob = cv2.dnn.blobFromImage(image, 1.0 / 255, (imageWidth, imageHeight), (0, 0, 0), swapRB=False, crop=False)

        # network에 넣어주기
        net.setInput(inpBlob)

        # 결과 받아오기
        output = net.forward()

        # output.shape[0] = 이미지 ID, [1] = 출력 맵의 높이, [2] = 너비
        H = output.shape[2]
        W = output.shape[3]

        # 키포인트 검출시 이미지에 그려줌
        points = []

        for i in range(0,15):
            # 해당 신체부위 신뢰도 얻음.
            probMap = output[0, i, :, :]

            # global 최대값 찾기
            minVal, prob, minLoc, point = cv2.minMaxLoc(probMap)

            # 원래 이미지에 맞게 점 위치 변경
            x = (imageWidth * point[0]) / W
            y = (imageHeight * point[1]) / H

            # 키포인트 검출한 결과가 0.1보다 크면(검출한곳이 위 BODY_PARTS랑 맞는 부위면) points에 추가, 검출했는데 부위가 없으면 None으로
            if prob > 0.1 :
                cv2.circle(image, (int(x), int(y)), 3, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)       # circle(그릴곳, 원의 중심, 반지름, 색)
                cv2.putText(image, "{}".format(i), (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1, lineType=cv2.LINE_AA)
                points.append((int(x), int(y)))
                if i == 1 :
                    chin_x = x
                    chin_y = 255 - y
                if i == 2 :
                    l_shoulder_x = x
                    l_shoulder_y = 255 - y
                if i == 5 :
                    r_shoulder_x = x
                    r_shoulder_y = 255 - y
                    m_shoulder_x = (l_shoulder_x + r_shoulder_x)/2
                    m_shoulder_y = (l_shoulder_y + r_shoulder_y)/2
            else :
                points.append(None)

        if chin_x == 0 or chin_y == 0 or l_shoulder_x == 0 or l_shoulder_y ==0 or r_shoulder_x ==0 or r_shoulder_y ==0 :
            continue
        
        init_count += 1

        point1 = (chin_x, chin_y)
        point2 = (l_shoulder_x, l_shoulder_y)
        point3 = (m_shoulder_x, m_shoulder_y)
        l_angle_sum += calculate_angle(point1, point2, point3)

        point1 = (chin_x, chin_y)
        point2 = (r_shoulder_x, r_shoulder_y)
        point3 = (m_shoulder_x, m_shoulder_y)

        r_angle_sum += calculate_angle(point1, point2, point3)
        print("l_angle",l_angle_sum,"r_angle",r_angle_sum)
        # 이미지 복사
        imageCopy = image

    l_angle = l_angle_sum/init_count
    r_angle = r_angle_sum/init_count

    return l_angle, r_angle
    #turtle
    # with open(result_file, "w") as file:
    #     file.write(f"l_angle: {l_angle}\nr_angle: {r_angle}")