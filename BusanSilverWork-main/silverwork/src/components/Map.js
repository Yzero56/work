import React, { useEffect } from "react";

function Map() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 좌표
          level: 10, // 확대 레벨
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // Geolocation으로 현재 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              const locPosition = new window.kakao.maps.LatLng(lat, lon);
              const message =
                '<div style="padding:5px; text-align: center;">현위치</div>';

              displayMarker(locPosition, message, map);
            },
            () => {
              const locPosition = new window.kakao.maps.LatLng(
                33.450701,
                126.570667
              );
              const message = "현위치를 검색할 수 없어요..";
              displayMarker(locPosition, message, map);
            }
          );
        } else {
          // Geolocation을 사용할 수 없는 경우 기본 위치에 마커 표시
          const locPosition = new window.kakao.maps.LatLng(
            33.450701,
            126.570667
          );
          const message = "현위치를 검색할 수 없어요..";
          displayMarker(locPosition, message, map);
        }
      });
    };

    // Cleanup: 스크립트 제거
    return () => document.head.removeChild(script);
  }, []);

  // 마커와 인포윈도우를 표시하는 함수
  function displayMarker(locPosition, message, map) {
    const marker = new window.kakao.maps.Marker({
      map,
      position: locPosition,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: message,
      removable: true,
    });

    infowindow.open(map, marker);
    map.setCenter(locPosition);
  }

  return <div id="map" style={mapContainerStyle}></div>;
}

// 스타일 정의
const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "15px", // 모서리를 둥글게 설정
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // 그림자 효과 추가
  overflow: "hidden", // 둥근 모서리 밖으로 나가는 부분 숨김
  position: "relative",
};

export default Map;
