const fenway = {
  lat: 42.345573,
  lng: -71.098326
};
var inMapView = true;
var pos = fenway;
var heading = 270;
var pitch = 0;

function initPano() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: pos,
      zoom: 14,
      disableDefaultUI: true,
    });
  
    const marker = new google.maps.Marker({
      position: pos,
      map,
      title: "Fenway",
    });
  
  
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"), {
        position: pos,
        pov: {
          heading: heading,
          pitch: pitch,
        },
        visible: true,
        disableDefaultUI: true,
      }
    );
    panorama.addListener("pano_changed", () => {
      const panoCell = document.getElementById("pano-cell");
      panoCell.innerHTML = panorama.getPano();
    });
    panorama.addListener("links_changed", () => {
      const linksTable = document.getElementById("links_table");
  
      while (linksTable.hasChildNodes()) {
        linksTable.removeChild(linksTable.lastChild);
      }
      const links = panorama.getLinks();
  
      for (const i in links) {
        const row = document.createElement("tr");
        linksTable.appendChild(row);
        const labelCell = document.createElement("td");
        labelCell.innerHTML = "<b>Link: " + i + "</b>";
        const valueCell = document.createElement("td");
        valueCell.innerHTML = links[i].description;
        linksTable.appendChild(labelCell);
        linksTable.appendChild(valueCell);
      }
    });
    panorama.addListener("position_changed", () => {
      pos = panorama.getPosition();
    });
    panorama.addListener("pov_changed", () => {
      heading = panorama.getPov().heading;
      pitch = panorama.getPov().pitch;
    });
  
  
    marker.addListener("click", () => {
      const panoE = document.getElementById("pano");
      panoE.setAttribute("style","display:block");
      const overlayE= document.getElementById("overlay");
      overlay.setAttribute("style","display:block");
      const mapE = document.getElementById("map");
      mapE.setAttribute("style","display:none");
      panorama.setVisible(false);
      panorama.setVisible(true);
      inMapView = false;
      pos = marker.position;
      panorama.setPosition(marker.position);
    });
    
    document.getElementById("returnToMap").addEventListener("click", () =>{
      const panoE = document.getElementById("pano");
      panoE.setAttribute("style","display:none");
      const overlayE = document.getElementById("overlay");
      overlayE.setAttribute("style","display:none");
      const mapE = document.getElementById("map");
      mapE.setAttribute("style","display:block");
      panorama.setVisible(false);
      panorama.setVisible(true);
      inMapView = true;
    });
  }

function GetStreetViewInfo(){
  return ({"pos":pos, "heading":heading, "pitch":pitch, "inMapView":inMapView});
}
  