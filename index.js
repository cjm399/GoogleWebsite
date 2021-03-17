const fenway = {
  lat: 39.96,
  lng: -75.17
};
var inMapView = true;
var pos = fenway;
var selectedStory = "";
var heading = 270.0;
var pitch = 0.0;

var markers = [];
var map;
var panorama;

function initPano() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: pos,
      zoom: 14,
      disableDefaultUI: true,
    });
  
    panorama = new google.maps.StreetViewPanorama(
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

    document.getElementById("returnToMap").addEventListener("click", ExitStreetView);
    AddMarker(39.9552175,-75.1629796, "TEST");
  }

function GetStreetViewInfo(){
  var obj = {"pos":pos, "heading":heading, "pitch":pitch, "inMapView":inMapView, "selectedStory":selectedStory};
  return JSON.stringify(obj);
}

function AddMarker(_lat, _lng, _title)
{
    var currMarker = new google.maps.Marker({
      position: {
        lat: _lat,
        lng: _lng
      },
      map,
      title: _title,
    });

    currMarker.addListener("click", () => {
      selectedStory = currMarker.title;
    });
    markers.push(currMarker);
}

function EnterStreetView(_lat, _lng)
{
  var position = {
    lat: _lat,
    lng : _lng
  };
  const panoE = document.getElementById("pano");
  panoE.setAttribute("style","display:block");
  const overlayE= document.getElementById("overlay");
  overlay.setAttribute("style","display:block");
  const mapE = document.getElementById("map");
  mapE.setAttribute("style","display:none");
  panorama.setVisible(false);
  panorama.setVisible(true);
  inMapView = false;
  pos = position;
  panorama.setPosition(position);
  panorama.setZoom(0);
}

function ExitStreetView()
{
  const panoE = document.getElementById('pano');
  panoE.setAttribute('style','display:none');
  const overlayE= document.getElementById('overlay');
  overlay.setAttribute('style','display:none');
  const mapE = document.getElementById('map');
  mapE.setAttribute('style','display:block');
  panorama.setVisible(false);
  panorama.setVisible(true);
  inMapView = true;
}