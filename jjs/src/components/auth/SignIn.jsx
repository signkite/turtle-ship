import React, { useState } from 'react'
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';
import s from './auth.module.css'
import { useNavigate, Link } from 'react-router-dom';
import Header from 'components/Header';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        alert('로그인 오류');
      });
  };

  return (
    <>
      <Header navSelect={0}/>
      <div className={s.container}>
        <div className={s.info}>거북선 서비스 사용을 위해 로그인해 주세요</div>
        <form onSubmit={signIn}>
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

            <button type='submit' className={s.btn}>로그인</button>

            <div className={s.msgContainer}>
              <span style={{ color: "#8D8D8D", fontSize: "13px" }}>거북선이 처음이신가요?</span>
              <Link className={s.msg} to="/sign-up">회원 가입</Link>
            </div>

          </div>

        </form>
      </div>
    </>
  )
}
