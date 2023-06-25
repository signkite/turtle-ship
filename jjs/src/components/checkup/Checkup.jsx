import Header from 'components/Header'
import React, { useEffect, useState } from 'react'
import s from './Checkup.module.css'
import { useNavigate } from 'react-router-dom'
// import { db } from '../../firebase'
import { getDatabase, ref, child, get, set } from 'firebase/database'
import { collection, getDocs } from 'firebase/firestore'

const resultColor = {
  3: "#F00",
  2: "#F90",
  1: "#FFE600",
  0: "#A6DAAF"
}

const dbUrl = "https://turtleship-ba94b-default-rtdb.asia-southeast1.firebasedatabase.app/"

export default function Checkup({ authUser }) {
  const navigate = useNavigate();

  // useEffect(async () => {
  //   const querySnapshot = getDocs(collection(db, "checkUpResult"));
  //   console.log(querySnapshot)
  //   Array.from(querySnapshot).forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
  // }, [])
  // const db = getDatabase();

  // set(ref(db, "results/hyshin1997"), {
  //   date: "2023.06.15",
  //   result: 3,
  //   hospital: "우리들병원 청담"
  // });
  // console.log("dasfsg")


  const [checkupList, setCheckupList] = useState([
    {
      date: "2023.06.15",
      result: 3,
      hospital: "우리들병원 청담"
    },
    {
      date: "2023.06.16",
      result: 2,
      hospital: "강남베드로병원 신관"
    },
    {
      date: "2023.06.17",
      result: 1,
      hospital: "강남베드로병원 신관"
    },
    {
      date: "2023.06.19",
      result: 3,
      hospital: "세란 병원"
    }
  ])
  if (!authUser)
    navigate('/sign-in');
  else
    return (
      <div className={s.background}>
        <Header navSelect={1} />
        <div className={s.container}>
          <div className={s.checkupTable}>
            <div className={s.tableIndex}>
              <div className={s.dateIndex}>검진 날짜</div>
              <div className={s.resultIndex}>검진 결과</div>
              <div className={s.hospitalIndex}>예약 병원</div>
            </div>

            <ul>
              {checkupList.map((e) => {
                return (
                  <li>
                    <div className={s.date}>{`${e.date}`}</div>
                    <div className={s.result}>
                      <div style={{ margin: "auto", width: "20px", height: "20px", backgroundColor: resultColor[e.result] }}></div>
                    </div>
                    <div className={s.hospital}>{`${e.hospital}`}</div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
}
