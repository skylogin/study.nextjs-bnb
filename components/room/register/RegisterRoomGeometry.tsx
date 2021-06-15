import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import throttle from "lodash/throttle";

import styled from "styled-components";
import palette from "../../../styles/palette";

import { useSelector } from "../../../store";

import RegisterRoomFooter from "./RegisterRoomFooter";
import { registerRoomActions } from "../../../store/registerRoom";




const Container = styled.div`
  padding: 62px 30px 100px;
  h2{
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3{
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-geometry-map-wrapper {
    width: 487px;
    height: 280px;
    margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
  }

  .gmnoprint .gm-style-mtc {
    display: none;
  }
  .gm-svpc{
    display: none;
  }
  .gm-fullscreen-control{
    display: none;
  }
`;

declare global {
  interface Window {
    initMap: () => void;
  }
}

const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};


const RegisterRoomGeometry: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

  const loadMap = async () => {
    await loadMapScript();
  };

  window.initMap = () => {
    if(mapRef.current){
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436
        },
        zoom: 14,
      });
      const marker = new window.google.maps.Marker({
        position: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436
        },
        map,
      });
      map.addListener("center_changed", throttle(() => {
        const centerLat = map.getCenter().lat();
        const cetnerLng = map.getCenter().lng();
        marker.setPosition({ lat: centerLat, lng: cetnerLng });
        dispatch(registerRoomActions.setLatitude(centerLat));
        dispatch(registerRoomActions.setLongitude(cetnerLng));
      }, 150));
    }
  };

  useEffect(() => {
    loadMap();
  }, [])

  return (
    <Container>
      <h2>핀이 놓인 위치가 정확한가요?</h2>
      <h3>4단계</h3>
      <p>필요한경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요.</p>
      <div className="register-room-geometry-map-wrapper">
        <div ref={mapRef} id="map" />
      </div>

      <RegisterRoomFooter
        prevHref="/room/register/location"
        nextHref="/room/register/amentities"
      />
    </Container>
  );
};

export default RegisterRoomGeometry;