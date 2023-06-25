import axios from 'axios';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import s from './NewCheck.module.css'

export default function NewCheck({ authUser }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  const handleUpload = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('video', file);

      try {
        const response = await axios.post(
          '/upload1',
          formData,
          {
            baseURL: "http://127.0.0.1:5001/",
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        );
        console.log('Upload successful:', response.data);
        // Handle the response from the server
        navigate('/new-check-next')
      } catch (error) {
        console.error('Error:', error);
        alert('동영상 업로드에 실패했습니다. 다시 시도해주세요.');
        // Handle any errors that occurred during the upload
      }
    }
  };

  return (
    <>
      <Header navSelect={2} authUser={authUser} />
      <div className={s.container}>
        <div className={s.guide}>목을 세워 정자세로 약 5초간 촬영한 동영상을 업로드 해주세요.</div>
        <form onSubmit={handleUpload} encType="multipart/form-data">
          <input type="file" name="file" accept="video/*" onChange={handleFile} />
          <button type='submit'>확인</button>
        </form>
      </div>
    </>
  )
}
