import React from "react";
import GoogleMapReact from "google-map-react";

import { useStyles } from "../styles/Map";
import mapStyles from "../styles/mapStyles";

const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const classes = useStyles();
  return (
    <div className={classes.cont}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={""}
        onChildClick={""}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
