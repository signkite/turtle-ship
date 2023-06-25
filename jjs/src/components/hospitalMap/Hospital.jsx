import Header from 'components/Header'
import SignIn from 'components/auth/SignIn'
import React, { useEffect, useState } from 'react'
import s from './Hospital.module.css'
import { useNavigate } from 'react-router-dom';
import { MapMarker, Map } from 'react-kakao-maps-sdk';

const { kakao } = window;

export default function Hospital({ authUser, latitude, longitude }) {
  const navigate = useNavigate();
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  if (!authUser)
    navigate('/sign-in');

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch("척추병원", (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []

        for (var i = 0; i < 4; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [map])

  const curLocation = { lat: latitude, lng: longitude }
  return (
    <>
      <div className={s.mapContainer}>
        <Map
          center={curLocation}
          style={{ width: "100%", height: "600px" }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ padding: "5px", width: "140px ", textAlign: "center"  }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}
          <MapMarker position={curLocation}>
            <div style={{ padding: "5px", width: "140px ", textAlign: "center" }}><span style={{margin: "auto"}}>현재 위치</span></div>
          </MapMarker>
        </Map>
      </div>
    </>
  )
}
