import React from 'react'
import turtleNeckImg from './images/메인 거북목.jpeg'
import phoneTurtle from './images/폰보는거북이.png'
import Header from 'components/Header'
import s from 'Main.module.css'

const turtleNeckDef = "거북목 증후군은 잘못된 자세로 인해 목, 어깨의 근육과 인대가 늘어나 통증이 생기는 증상을 의미합니다. 평소 컴퓨터 모니터를 많이 보는 사람, 특히 낮은 위치에 있는 모니터를 내려다보는 사람에게 많이 발생합니다. 거북이가 목을 뺀 상태와 비슷하다 하여 거북목 증후군이라는 이름이 붙여졌습니다."
const dangerOfTurtleNeck = "거북목 자세가 오래 지속되면 목 뼈 주변의 근육 및 인대, 디스크의 미세 손상 및 노화로 작은 외력에도 부상이 쉽게 발생하고, 만성적인 통증이 쉽게 유발되며 목 디스크로 이어질 수 있습니다. 심각해지기 전까지 별다른 증상이 없어 위험 단계까지 방치하는 경우가 많아 거북목이 의심되면 즉시 진단해 보아야 합니다."

export default function Main() {
  return (
    <div className={s.background}>
      <Header />
      <div className={s.headLine}>거북목 목디스크를 부른다!</div>
      <div className={s.title}>거북목 증후군(Turtle neck syndrome)이란?</div>
      <div className={s.hLine}></div>
      <div className={s.turtleNeckDef}>{turtleNeckDef}</div>
      <img src={turtleNeckImg} alt="거북목 이미지" width="100%" className={s.centerImg}/>
      <div className={s.title}>거북목 증후군의 위험성</div>
      <div className={s.hLine}></div>
      <div className={s.turtleNeckDef}>{dangerOfTurtleNeck}</div>
      <div className={s.guideContainer}>
        <div className={s.guideTitle}>거북목이 의심되나요? 거북선으로 손쉽게 진단하세요!</div>
        <div style={{display: "flex"}}>
          <img src={phoneTurtle} alt="거북이 이미지" width="300px"/>
          <div className={s.guide}>
            <div>화면 앞에 앉아 잠시만 기다리면 거북목을 진단해드립니다!</div>
            <ul>
              <li>1분 미만 소요</li>
              <li>언제 어디서든 접속만 하면</li>
              <li>가까운 병원 위치까지 확인</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
