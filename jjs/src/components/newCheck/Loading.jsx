import React from 'react'
import s from "./Loading.module.css"

export default function Loading() {
  return (
    <>
      <div className={s.container}>
        <div >L o a d i n g . . .</div>
        <div className={s.guide}>30초 정도 소요됩니다.</div>
      </div>
    </>
  )
}
