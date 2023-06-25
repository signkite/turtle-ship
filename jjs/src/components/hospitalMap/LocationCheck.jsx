import React, { useMemo, useState } from 'react'
import Header from 'components/Header';
import s from './LocationCheck.module.css'
import Hospital from './Hospital';
import { useNavigate } from 'react-router-dom';

export default function LocationCheck({ authUser, fromMain }) {
  const navigate = useNavigate();

  // 현재위치 담는 곳
  const [location, setLocation] = useState("");

  // 현재위치 세부조정
  const options = {
    enableHighAccuracy: true,
    timeout: 5000 * 1000,
    maximumAge: 1000 * 3600 * 24,
  };

  // 현재 위치 가져오기
  useMemo(()=> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  
    function success(position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }
  
    function error(e) {
      setLocation(null);
      console.log("위치 받기 실패");
      alert(`위치 받기 실패\n${e}`);
    }
  }, [navigator.geolocation.getCurrentPosition])
  

  if (!authUser) 
    navigate('/sign-in');
  else if (location)
    return (
      <>
        <Header navSelect={fromMain ? 3 : 2} />
        <Hospital authUser={authUser} latitude={location.latitude} longitude={location.longitude} />
      </>
    )
  else
    return (
      <>
        <Header navSelect={fromMain ? 3 : 2} />
        <div className={s.warningContainer}>
          <div className={s.warningTitle}>위치 받아오기 오류</div>
          <div className={s.warningMsg}>위치 사용이 차단되어있다면 허용해주세요.</div>
        </div>
      </>
    )
}
