import React, { useState } from 'react'
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import s from "./auth.module.css"
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header';

export default function SignUp() {
  const navigte = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert('성공적으로 회원가입 되었습니다.\n가입한 정보로 로그인 해주세요.');
        navigte('/sign-in');
      })
      .catch((error) => {
        console.log(error);
        alert('회원가입 오류');
      });
  };

  return (
    <>
      <Header/>
      <div className={s.container}>
      <div className={s.info}>거북선 회원가입</div>
      <form onSubmit={signUp}>
        <div className={s.box}>
          <div>
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type='submit' className={s.btn}>회원 가입</button>

          <div className={s.msgContainer}>
            <span style={{ color: "#8D8D8D", fontSize: "13px" }}>이미 거북선 회원이신가요?</span>
            <Link className={s.msg} to="/sign-in">로그인</Link>
          </div>

        </div>

      </form>
    </div>    
    </>
  )
}
