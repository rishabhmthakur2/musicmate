import { Map } from "mapbox-gl";

export const initMap = (
  container: HTMLDivElement,
  coords: [number, number]
) => {
  return new Map({
    container,
    style: "mapbox://styles/mapbox/dark-v10",
    pitchWithRotate: false,
    center: coords,
    zoom: 15,
    accessToken: process.env.REACT_APP_MAP_PK as string,
    doubleClickZoom: false,
  });
};
