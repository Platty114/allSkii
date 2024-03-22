import React, {useState} from 'react';
import MapboxSkiRuns from '../components/Map';
import lakeLouiseImage from '../media/LakeLouisePhoto.png';
import nakiskaImage from '../media/NakiskaPhoto.png';
import RenderAPI from '../components/RenderAPI';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import MouseIcon from '@mui/icons-material/Mouse';
import feather from 'feather-icons';



  
function Trails() {
  const [coordinates, setCoordinates] = useState(null);
  const [hideText, setHideText] = useState(null);
  const [map, setMap] = useState(null);
  const [view, setView] = useState(true);
  const [prevTrail, setPrevTrail] = useState(null);
  const [currentTrail, setCurrentTrail] = useState(null);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedAccomodation, setSelectedAccomodation] = useState(null);

  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  const handleSetHideText = (hideText) => {
    setHideText(hideText);
  };

  const changeView = (e) => {
    setView(e.target.innerHTML);
  }

  const changeViewReview = (e) => {
    setView(!e.target.innerHTML);
  }

  const handleBackClick = () => {
    setHideText(!hideText);
    setView(true);
    setPrevTrail(null);
    setSelectedTrail(null);

    if (map) {
      map.removeLayer(currentTrail);
      map.removeSource(currentTrail);
      setCurrentTrail(null);
      
      map.flyTo({
        center: [-116.828430, 50.605912], // Example coordinates
        zoom: 6,
        essential: true,
        bearing: 0,
        pitch: 45
      });
    }
    
  };

  const handleSelectedTrail = (trail) => {
    const trialName = trail.properties.name;
    setSelectedTrail(trialName);
    //window.alert('Trail selected');
    if (map){
      if (prevTrail === trialName){
        setCurrentTrail(trialName);
      }
      else if (prevTrail === null){
        map.addSource(trialName, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [trail]
          }
        });
        map.addLayer({
          id: trialName,
          type: 'line',
          source: trialName,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#ff0000',
            'line-width': 8,
            'line-opacity': 0.5
          }
        });
        setPrevTrail(trialName);
        setCurrentTrail(trialName);
      } else {
        map.removeLayer(prevTrail);
        map.removeSource(prevTrail);
        map.addSource(trialName, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [trail]
          }
        });
        map.addLayer({
          id: trialName,
          type: 'line',
          source: trialName,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#ff0000',
            'line-width': 8,
            'line-opacity': 0.5
          }
        });
        setPrevTrail(trialName);
        setCurrentTrail(trialName);
      }

    }
  };

  const checkCoordinatesCase = (coords) => {
    if (JSON.stringify(coords) === JSON.stringify([-115.1511,50.9427])) {
      return (
      <div className="trailTitle-container" >
        <img style={{textAlign: 'center'}} src={nakiskaImage} alt="Nakiska" width="460px" height="200px"/>
        <div className="hillTitle">Nakiska Ski Area</div>
      </div>
      );
    } else if (JSON.stringify(coords) === JSON.stringify([-116.1622,51.4419])) {
      return (
      <div style={{textAlign: 'center'}}>
        <img src={lakeLouiseImage} alt="lakeLouise" width="200px" height="120px"/>
        <h2>LakeLouise</h2>
      </div>
      );
    } else {
      return 'No specific case for these coordinates';
    }
  };

  const coordinatesCase = coordinates ? checkCoordinatesCase(coordinates) : '';

  const checkCoordinatesTrail = (coords) => {
    if (JSON.stringify(coords) === JSON.stringify([-115.1511,50.9427])) {
      return (
        <RenderAPI selectedTrail={selectedTrail} handleSelectedTrail={handleSelectedTrail}/>
      );
    } else if (JSON.stringify(coords) === JSON.stringify([-116.1622,51.4419])) {
      return (
      <div className="Trail-Menu">
        <div className="Trail-column1"></div>
        <div className="Trail-column2"></div>
      </div>
      );
    } else {
      return 'No specific case for these coordinates';
    }
  };

  const coordinatesTrail = coordinates ? checkCoordinatesTrail(coordinates) : '';
  const arrowRightIcon = feather.icons['mouse-pointer'].toSvg();
  const rotateIcon = feather.icons['refresh-cw'].toSvg();
  const maximizeIcon = feather.icons['maximize-2'].toSvg();
  const moveIcon = feather.icons['move'].toSvg();


  return (


      <div className='map-container'>
        <div className='map-container-left'>
          <MapboxSkiRuns 
          onCoordinatesChange={handleCoordinatesChange} 
          hideText={handleSetHideText}
          onMapLoad={setMap}
          />
        </div>
        <div className='map-container-right'>
          <div className='map-content-container'>

              {!hideText && (
                <div className='info-container'>
                      <div className="title-container">
        <DownhillSkiingIcon style={{ marginTop: '60px', marginLeft: '40px', marginRight: '10px', fontSize: '5rem', color: '#ffffff'}} />
        <span className="title-default">AllSkii Trail Explorer</span>
      </div>
      <div className="col1"><div dangerouslySetInnerHTML={{ __html: arrowRightIcon }} style={{ marginTop: '20px', marginLeft: '60px', marginRight: '20px', fontSize: '60px', color: '#ffffff'}} />
      <div className="text1">Left click on a ski resort to view trails and reviews</div>
      </div>
      <div className="col1"><div dangerouslySetInnerHTML={{ __html: rotateIcon }} style={{ marginTop: '20px', marginLeft: '60px', marginRight: '20px', fontSize: '60px', color: '#ffffff'}} />
      <div className="text1">Rotate the map by pressing the right click button while moving the mouse</div>
      </div>
      <div className="col1"><div dangerouslySetInnerHTML={{ __html: maximizeIcon }} style={{ marginTop: '20px', marginLeft: '60px', marginRight: '20px', fontSize: '60px', color: '#ffffff'}} />
      <div className="text1">Scroll to zoom in or out of the map</div>
      </div>
      <div className="col1"><div dangerouslySetInnerHTML={{ __html: moveIcon }} style={{ marginTop: '20px', marginLeft: '60px', marginRight: '20px', fontSize: '60px', color: '#ffffff'}} />
      <div className="text1">Pan the map by pressing the left click button while moving the mouse</div>
      </div>
      

      </div>

      )}
              {hideText && coordinates && (<div>{coordinatesCase}
              <div className='Menu'>
                <div className={'OverView' + (hideText && view ? ' active' : '')} onClick={changeView}>OverView</div>
                <div className={'Review' + (hideText && !view ? ' active' : '')} onClick={changeViewReview}>Review</div>
              </div>
              {view && <div className='Trails'>{coordinatesTrail}</div>}
              {!view && <div className='Reviews'>Reviews</div>}
              <div className='back-button' onClick={handleBackClick}>Back</div>
              </div>)}
          </div>
        </div>
      </div>


  );
}

export default Trails;
