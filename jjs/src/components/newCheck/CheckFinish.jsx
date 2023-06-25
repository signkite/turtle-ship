import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import s from './CheckFinish.module.css'
import image from '../../images/위험도.png'

const resultColor = {
  3: "#F00",
  2: "#F90",
  1: "#FFE600",
  0: "#A6DAAF"
}

export default function CheckFinish({ authUser }) {
  const [checkResult, setCheckResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNumber = async () => {

      try {
        const response = await axios.get('http://localhost:5001/dangerous');
        setCheckResult(response.data);
      } catch (error) {
        console.error('Error:', error);
        alert('알 수 없는 오류가 발생했습니다. 메인 화면으로 이동합니다.');
        navigate('/');
      }

      setLoading(false);
    };

    fetchNumber();
  }, []);

  return (
    <>
      <Header authUser={authUser} navSelect={2} />
      {loading ? (
        <Loading />
      ) : (
        <div className={s.container}>
          <div className={s.resultContainer}>
            <div className={s.title}>간이 검진 결과 :</div>
            <div className={s.resultBox} style={{backgroundColor: resultColor[checkResult]}}></div>
          </div>
          <img src={image} alt="위험도분류" width="600px" style={{margin: "20px"}}/>
          <div className={s.btnContainer}>
            <button style={{marginRight: "20px"}} onClick={()=>{
              navigate('/resolvation');
            }}>가까운 병원 예약하기</button>
            <button className={s.goMainBtn} onClick={()=>{
              navigate('/');
            }}>처음으로</button>
          </div>
        </div>
      )}
    </>
  )
}