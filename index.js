const posElement = document.getElementById('position-cell');
const headingElement = document.getElementById('heading-cell');
const pitchElement = document.getElementById('pitch-cell');
var inMapView = true;

function initPano() {

    const fenway = {
      lat: 42.345573,
      lng: -71.098326
    };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: fenway,
      zoom: 14,
      disableDefaultUI: true,
    });
  
    const marker = new google.maps.Marker({
      position: fenway,
      map,
      title: "Hello World!",
    });
  
  
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"), {
        position: fenway,
        pov: {
          heading: 270,
          pitch: 0,
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
      const positionCell = document.getElementById("position-cell");
      positionCell.firstChild.nodeValue = panorama.getPosition() + "";
    });
    panorama.addListener("pov_changed", () => {
      const headingCell = document.getElementById("heading-cell");
      const pitchCell = document.getElementById("pitch-cell");
      headingCell.firstChild.nodeValue = panorama.getPov().heading + "";
      pitchCell.firstChild.nodeValue = panorama.getPov().pitch + "";
    });
  
  
    marker.addListener("click", () => {
      var x = document.getElementById("pano");
      x.setAttribute("style","display:block");
      var x = document.getElementById("overlay");
      x.setAttribute("style","display:block");
      var x = document.getElementById("map");
      x.setAttribute("style","display:none");
      panorama.setVisible(false);
      panorama.setVisible(true);
      inMapView = false;
      panorama.setPosition(marker.position);
    });
    
    document.getElementById("returnToMap").addEventListener("click", () =>{
      var x = document.getElementById("pano");
      x.setAttribute("style","display:none");
      var x = document.getElementById("overlay");
      x.setAttribute("style","display:none");
      var x = document.getElementById("map");
      x.setAttribute("style","display:block");
      panorama.setVisible(false);
      panorama.setVisible(true);
      inMapView = true;
    });
  }

function GetStreetViewInfo(){
  var pos = posElement.innerText;
  var heading = headingElement.innerText;
  var pitch = pitchElement.innerText;
  return ({"pos":pos, "heading":heading, "pitch":pitch, "inMapView":inMapView});
}
  