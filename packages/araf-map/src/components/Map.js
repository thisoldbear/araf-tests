import React, { useEffect } from "react";
import Leaflet from "leaflet";
import LeafletGpx from "leaflet-gpx";

import "leaflet/dist/leaflet.css";

export const Map = () => {
  useEffect(() => {
    var map = Leaflet.map("mapid").setView([51.505, -0.09], 13);

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Leaflet.marker([51.5, -0.09])
    //   .addTo(map)
    //   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    //   .openPopup();

    var gpx = "route.gpx"; // URL to your GPX file or the GPX itself

    new LeafletGpx.GPX(gpx, {
      async: true,
      polyline_options: {
        color: "green",
        opacity: 0.75,
        weight: 3,
        lineCap: "round"
      },
      marker_options: {
        startIconUrl: "marker-icon.png",
        endIconUrl: "marker-icon.png"
      }
    })
      .on("loaded", function(e) {
        map.fitBounds(e.target.getBounds());
      })
      .addTo(map);
  }, []);

  return <div id="mapid"></div>;
};
