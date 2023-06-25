import React, { useEffect, useState } from 'react';
import mainLogo from '../images/logo.png'
import s from './Header.module.css'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ navSelect }) {
  /* navSelect
  0: nav bar가 아무 것도 선택 안됨
  1: 내 간이 검진 기록 선택
  2: 새 검사 진행 선택
  3: 집주변 병원 찾기 선택
  */
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    })
  }, []);

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log('sign out successful')
    }).catch(error => console.log(error))
  }

  return (
    <>
      {/* header container */}
      <div className={s.headerContainer}>
        <img className={s.logo} src={mainLogo} alt="logo" onClick={() => navigate('/')} />

        <div className={s.titles} onClick={() => navigate('/')}>
          <h1 className={s.mainTitle}>거 북 선</h1> {/* main title */}
          <h2 className={s.subTitle}>거북목 간편 진단 서비스</h2>{/* sub title */}
        </div>

        {/* user 표시 */}
        {authUser
          ? <div className={s.userStateContainer}>
            <div className={s.user}>{`${authUser.email}`}</div>
            <div className={s.divBar}></div>
            <Link className={s.user} onClick={userSignOut} to="/">로그 아웃</Link>
          </div>
          : <div className={s.userStateContainer}>
            <Link className={s.user} to="/sign-in">로그인</Link>
          </div>
        }
      </div>

      {/* nav */}
      <nav className={s.subMenu}>
        <div
          style={navSelect === 1 ? { color: "#25D" } : { cursor: "pointer" }}
          onClick={() => navigate('/check-up')}
        >내 간이 검진 기록</div>
        <div className={s.sepBar}></div>
        <div
          style={navSelect === 2 ? { color: "#25D" } : { cursor: "pointer" }}
          onClick={()=> navigate('/new-check')}
        >새 검사 진행</div>
        <div className={s.sepBar}></div>
        <div
          style={navSelect === 3 ? { color: "#25D" } : { cursor: "pointer" }}
          onClick={() => navigate('/hospital')}
        >집주변 병원 찾기</div>
      </nav>
    </>
  );
}
