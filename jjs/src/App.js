import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import SignIn from 'components/auth/SignIn';
import SignUp from 'components/auth/SignUp';
import Checkup from 'components/checkup/Checkup';
import Main from 'Main';
import Header from './components/Header';
import AuthDetail from 'components/auth/AuthDetail';
import LocationCheck from 'components/hospitalMap/LocationCheck';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase'
import NewCheck from 'components/newCheck/NewCheck';
import NewCheckNext from 'components/newCheck/NewCheckNext';
import CheckFinish from 'components/newCheck/CheckFinish';
import Loading from 'components/newCheck/Loading';

// 브라우저 스타일 초기화
const GloablStyle = createGlobalStyle`
  ${reset}
`

function App() {
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

  return (
    <>
      <GloablStyle />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/check-up' element={<Checkup authUser={authUser}/>} />
        <Route path='/hospital' element={<LocationCheck authUser={authUser} fromMain={true}/>} />
        <Route path='/resolvation' element={<LocationCheck authUser={authUser} fromMain={false}/>} />
        <Route path='/new-check' element={<NewCheck authUser={authUser}/>} />
        <Route path='/new-check-next' element={<NewCheckNext authUser={authUser}/>} />
        <Route path='/check-finish' element={<CheckFinish authUser={authUser}/>} />

      </Routes>
    </>
  );
}

export default App;
