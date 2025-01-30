map.on("singleclick", async (event) => {
    const coordinate = ol.proj.toLonLat(event.coordinate);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinate[1]}&lon=${coordinate[0]}`
      );
      if (response.ok) {
        const data = await response.json();
        popupElement.innerHTML = `<strong>${data.display_name}</strong>`;
        popup.setPosition(event.coordinate);
        
        // Add marker at clicked location
        const marker = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat(coordinate)),
        });
        marker.setStyle(new ol.style.Style({
          image: new ol.style.Icon({
            src: "https://maps.google.com/mapfiles/kml/shapes/placemark_circle.png",
            scale: 0.8,
            anchor: [0.5, 1],
          }),
        }));
        markerSource.addFeature(marker);
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  });