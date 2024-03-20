import React, {useState} from 'react';
import MapboxSkiRuns from '../components/Map';
import lakeLouiseImage from '../media/LakeLouisePhoto.png';
import nakiskaImage from '../media/NakiskaPhoto.png';

function Trails() {
  const [coordinates, setCoordinates] = useState(null);
  const [hideText, setHideText] = useState(null);
  const [map, setMap] = useState(null);
  const [view, setView] = useState(true);
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

    if (map) {
      map.flyTo({
        center: [-116.828430, 50.605912], // Example coordinates
        zoom: 6,
        essential: true,
        bearing: 0,
        pitch: 45
      });
    }

  };
  //mock data
  const Legacy = {
            "type": "Feature",
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  -115.175208,
                  50.945534
                ],
                [
                  -115.174549,
                  50.945173
                ],
                [
                  -115.173549,
                  50.944204
                ],
                [
                  -115.173041,
                  50.944014
                ],
                [
                  -115.17172,
                  50.943945
                ],
                [
                  -115.169572,
                  50.943686
                ],
                [
                  -115.167154,
                  50.9432
                ]
              ]
            },
            "properties": {
              "name": "Legacy",
              "piste:difficulty": "advanced",
              "piste:type": "downhill"
            }
          }

 const LowerMightyPeace = {
            "type": "Feature",
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [
                  -115.16735,
                  50.946025
                ],
                [
                  -115.166098,
                  50.945944
                ],
                [
                  -115.16544,
                  50.945902
                ],
                [
                  -115.164311,
                  50.945695
                ],
                [
                  -115.163423,
                  50.945487
                ],
                [
                  -115.162294,
                  50.945294
                ],
                [
                  -115.161023,
                  50.944942
                ],
                [
                  -115.159971,
                  50.944679
                ],
                [
                  -115.159,
                  50.944629
                ],
                [
                  -115.157473,
                  50.9446
                ],
                [
                  -115.156132,
                  50.944536
                ],
                [
                  -115.155828,
                  50.944495
                ],
                [
                  -115.155117,
                  50.9444
                ],
                [
                  -115.153447,
                  50.944054
                ]
              ]
            },
            "properties": {
              "name": "Lower Mighty Peace",
              "piste:difficulty": "intermediate",
              "piste:type": "downhill"
            }
          }


  const checkCoordinatesCase = (coords) => {
    if (JSON.stringify(coords) === JSON.stringify([-115.1511,50.9427])) {
      return (
      <div style={{textAlign: 'center'}}>
        <img src={nakiskaImage} alt="Nakiska" width="200px" height="120px"/>
        <h2>Nakiska</h2>
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
      <div className="Trail-Menu">
        <div className="Trail-column1">
          <div className="Trail">Lower Homesteader  ●</div>
          <div className="Trail">Upper Mighty Peace ■</div>
          <div className="Trail">Maverick           ■</div>


        </div>
        <div className="Trail-column2">
          <div className="Trail">Lower Mighty Peace ■</div>
          <div className="Trail">Lower North Axe    ■</div>
          <div className="Trail">Lower Legacy       ◆</div>

        </div>
        <div className="Trail-column3">
          <div className="Trail">Legacy             ◆</div>
          <div className="Trail">Upper Eye Opener ■</div>
          <div className="Trail">Arrow       ◆◆</div>



        </div>

      </div>
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

              {!hideText && (<h1>Click on a ski resort to view the trails</h1>)}
              {hideText && coordinates && (<div>{coordinatesCase}
              <div className='Menu'>
                <div className='OverView' onClick={changeView}>OverView</div>
                <div className='Review' onClick={changeViewReview}>Review</div>
              </div>
              {view && <div className='Trails'>{coordinatesTrail}</div>}
              {!view && <div className='Reviews'>Reviews</div>}
              <div className='back-button' onClick={handleBackClick}>Back</div>
              </div>)}
          </div>

          <div className='right-footer'></div>
        </div>
      </div>




  );
}

export default Trails;
