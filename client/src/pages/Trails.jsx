import React, {useState, useEffect} from 'react';
import MapboxSkiRuns from '../components/Map';
import lakeLouiseImage from '../media/LakeLouisePhoto.png';
import nakiskaImage from '../media/NakiskaPhoto.png';
import fernieImage from '../media/ferniePhoto.png';
import kickingHorseImage from '../media/kickingHorsePhoto.png';
import sunshineImage from '../media/sunShinePhoto.png';
import revelstokeImage from '../media/revelstokePhoto.png';
import panoramaImage from  '../media/panoramaPhoto.png';
import norquayImage from  '../media/norquayPhoto.png';
import kimberleyImage from  '../media/kimberleyPhoto.png';
import silverStarImage from "../media/silverStarPhoto.png"
import sunPeaksImage from "../media/sunPeaksPhoto.png"
import bigWhiteImage from "../media/bigWhitePhoto.png"
import RenderAPI from '../components/RenderAPI';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import MouseIcon from '@mui/icons-material/Mouse';
import feather from 'feather-icons';
import ReviewForm from '../components/ReviewForm';



  
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
  const [showReviewsLayer, setShowReviewsLayer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);




  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  const handleSetHideText = (hideText) => {
    setHideText(hideText);
  };

  const changeView = (e) => {
    setView(e.target.innerHTML);
    setShowReviewsLayer(false);

  }

  const changeViewReview = (e) => {
    setView(!e.target.innerHTML);
    setShowReviewsLayer(true);

  }

  const handleBackClick = () => {
    setHideText(!hideText);
    setView(true);
    setPrevTrail(null);
    setSelectedTrail(null);
    setShowReviewsLayer(false);

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
            'line-width': 9,
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
            'line-width': 9,
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
        <img style={{textAlign: 'center'}} src={lakeLouiseImage} alt="LakeLouise" width="460px" height="200px"/>
        <div className="hillTitle">Lake Louise Ski Area Ltd.</div>
      </div>
      );
    } else if (JSON.stringify(coords) === JSON.stringify([-115.0873, 49.4627])) {
      return (
      <div style={{textAlign: 'center'}}>
        <img style={{textAlign: 'center'}} src={fernieImage} alt="Fernie" width="460px" height="200px"/>
        <div className="hillTitle">Fernie Ski Hill</div>
      </div>
      ); 
  } else if (JSON.stringify(coords) === JSON.stringify([-117.0483, 51.2976])) {
    return (
    <div style={{textAlign: 'center'}}>
      <img style={{textAlign: 'center'}} src={kickingHorseImage} alt="Kickinghorse" width="460px" height="200px"/>
      <div className="hillTitle">Kicking Horse Mountain Resort</div>
    </div>
    );
} else if (JSON.stringify(coords) === JSON.stringify([-115.7765, 51.0785])) {
  return (
  <div style={{textAlign: 'center'}}>
    <img style={{textAlign: 'center'}} src={sunshineImage} alt="sunshine" width="460px" height="200px"/>
    <div className="hillTitle">Banff Sunshine Village Ski Resort</div>
  </div>
  );
}  else if (JSON.stringify(coords) === JSON.stringify([-118.1631, 50.9584])) {
  return (
  <div style={{textAlign: 'center'}}>
    <img style={{textAlign: 'center'}} src={revelstokeImage} alt="revelstoke" width="460px" height="200px"/>
    <div className="hillTitle">Revelstoke Mountain Resort</div>
  </div>
  ); 
} else if (JSON.stringify(coords) === JSON.stringify([-116.238157, 50.460374])) {
  return (
  <div style={{textAlign: 'center'}}>
    <img style={{textAlign: 'center'}} src={panoramaImage} alt="panorama" width="460px" height="200px"/>
    <div className="hillTitle">Panorama Mountain Resort</div>
  </div>
  );
  } else if (JSON.stringify(coords) === JSON.stringify([-115.6068, 51.2053])) {
    return (
    <div style={{textAlign: 'center'}}>
      <img style={{textAlign: 'center'}} src={norquayImage} alt="norquay" width="460px" height="200px"/>
      <div className="hillTitle">Mount Norquay</div>
    </div>
    );
    }
    else if (JSON.stringify(coords) === JSON.stringify([-116.0048, 49.6879])) {
      return (
      <div style={{textAlign: 'center'}}>
        <img style={{textAlign: 'center'}} src={kimberleyImage} alt="kimberley" width="460px" height="200px"/>
        <div className="hillTitle">Kimberley Alpine Resort</div>
      </div>
      );
      }
      else if (JSON.stringify(coords) === JSON.stringify([-119.0610, 50.3598])) {
        return (
        <div style={{textAlign: 'center'}}>
          <img style={{textAlign: 'center'}} src={silverStarImage} alt="silverStar" width="460px" height="200px"/>
          <div className="hillTitle">SilverStar Mountain Resort</div>
        </div>
        );
      }
      else if (JSON.stringify(coords) === JSON.stringify([-119.8891, 50.8837])) {
        return (
          <div style={{textAlign: 'center'}}>
            <img style={{textAlign: 'center'}} src={sunPeaksImage} alt="sunPeaks" width="460px" height="200px"/>
            <div className="hillTitle">Sun Peaks Resort</div>
          </div>
        );
        }
        else if (JSON.stringify(coords) === JSON.stringify([-118.93528, 49.7160])) {
          return (
            <div style={{textAlign: 'center'}}>
              <img style={{textAlign: 'center'}} src={bigWhiteImage} alt="bigWhite" width="460px" height="200px"/>
              <div className="hillTitle">Big White Ski Resort</div>
            </div>
          );
          }
}
  const coordinatesCase = coordinates ? checkCoordinatesCase(coordinates) : '';

  const fetchReviews = async (coords) => {
    try {
      let endpoint = 'http://localhost:8080/read/hill/Nakiska'; 
      if (coords){
        if (JSON.stringify(coords) === JSON.stringify([-115.0873, 49.4627])) {
          endpoint = 'http://localhost:8080/read/hill/Fernie';
        } else if (JSON.stringify(coords) === JSON.stringify([-117.0483, 51.2976])) {
          endpoint = 'http://localhost:8080/read/hill/KickingHorse';
        } else if (JSON.stringify(coords) === JSON.stringify([-115.7765, 51.0785])) {
          endpoint = 'http://localhost:8080/read/hill/Sunshine';
        } else if (JSON.stringify(coords) === JSON.stringify([-116.1622, 51.4419])) {
          endpoint = 'http://localhost:8080/read/hill/LakeLouise';
        } else if (JSON.stringify(coords) === JSON.stringify([-118.1631, 50.9584])) {
          endpoint = 'http://localhost:8080/read/hill/Revelstoke';
        } else if (JSON.stringify(coords) === JSON.stringify([-116.238157, 50.460374])) {
          endpoint = 'http://localhost:8080/read/hill/Panorama';
        } else if (JSON.stringify(coords) === JSON.stringify([-115.6068, 51.2053])) {
          endpoint = 'http://localhost:8080/read/hill/Norquay';
        } else if (JSON.stringify(coords) === JSON.stringify([-116.0048, 49.6879])) {
          endpoint = 'http://localhost:8080/read/hill/Kimberley';
        } else if (JSON.stringify(coords) === JSON.stringify([-119.0610, 50.3598])) {
          endpoint = 'http://localhost:8080/read/hill/SilverStar';
        } else if (JSON.stringify(coords) === JSON.stringify([-119.8891, 50.8837])) {
          endpoint = 'http://localhost:8080/read/hill/SunPeaks';
        } else if (JSON.stringify(coords) === JSON.stringify([-118.93528, 49.7160])) {
          endpoint = 'http://localhost:8080/read/hill/BigWhite';
        } 
      } 
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching GeoJSON data:', error);
      return null;
    }
  };


  useEffect(() => {
    const fetchReviewData = async () => {
      const reviewData = await fetchReviews(coordinates);
      if (reviewData) {
        setReviews(reviewData)
      }
    };
    fetchReviewData();
  }, [coordinates]);

  console.log(reviews);


  const fetchGeoJsonData = async (coords) => {
    try {
      let endpoint = 'http://localhost:8081/runs/nakiska'; //nakiska is default endpoint
      if (coords){
        if (JSON.stringify(coords) === JSON.stringify([-115.0873, 49.4627])) {
          endpoint = 'http://localhost:8081/runs/fernie';
        } else if (JSON.stringify(coords) === JSON.stringify([-117.0483, 51.2976])) {
          endpoint = 'http://localhost:8081/runs/kickinghorse';
        } else if (JSON.stringify(coords) === JSON.stringify([-115.7765, 51.0785])) {
          endpoint = 'http://localhost:8081/runs/sunshine';
        } else if (JSON.stringify(coords) === JSON.stringify([-116.1622, 51.4419])) {
          endpoint = 'http://localhost:8081/runs/lakelouise';
        } else if (JSON.stringify(coords) === JSON.stringify([-118.1631, 50.9584])) {
          endpoint = 'http://localhost:8081/runs/revelstoke';
        } else if (JSON.stringify(coords) === JSON.stringify([-116.238157, 50.460374])) {
          endpoint = 'http://localhost:8081/runs/panorama';
        } else if (JSON.stringify(coords) === JSON.stringify([-115.6068, 51.2053])) {
          endpoint = 'http://localhost:8081/runs/norquay';
        } else if (JSON.stringify(coords) === JSON.stringify([-116.0048, 49.6879])) {
          endpoint = 'http://localhost:8081/runs/kimberley';
        } else if (JSON.stringify(coords) === JSON.stringify([-119.0610, 50.3598])) {
          endpoint = 'http://localhost:8081/runs/silverStar';
        } else if (JSON.stringify(coords) === JSON.stringify([-119.8891, 50.8837])) {
          endpoint = 'http://localhost:8081/runs/sunPeaks';
        } else if (JSON.stringify(coords) === JSON.stringify([-118.93528, 49.7160])) {
          endpoint = 'http://localhost:8081/runs/bigWhite';
        } 
      } 
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching GeoJSON data:', error);
      return null;
    }
  };

  const [firstHalfFeatures, setFirstHalfFeatures] = useState([]);
  const [secondHalfFeatures, setSecondHalfFeatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const geoJsonData = await fetchGeoJsonData(coordinates);
      if (geoJsonData) {
        const halfIndex = Math.ceil(geoJsonData.features.length / 2);
        setFirstHalfFeatures(geoJsonData.features.slice(0, halfIndex));
        setSecondHalfFeatures(geoJsonData.features.slice(halfIndex));
      }
    };
    fetchData();
  }, [coordinates]);

  const reviewWindow = () => {
    setIsModalOpen(true);

  }


  const checkCoordinatesTrail = (coords) => {
      return (
        <RenderAPI selectedTrail={selectedTrail} handleSelectedTrail={handleSelectedTrail} firstHalfFeatures={firstHalfFeatures} secondHalfFeatures={secondHalfFeatures}
        />
      );
  };

  const coordinatesTrail = coordinates ? checkCoordinatesTrail(coordinates) : '';
  const arrowRightIcon = feather.icons['mouse-pointer'].toSvg();
  const rotateIcon = feather.icons['refresh-cw'].toSvg();
  const maximizeIcon = feather.icons['maximize-2'].toSvg();
  const moveIcon = feather.icons['move'].toSvg();

  const fiveStarReviews = reviews.filter(review => review.rating === 5);
  const fiveStarPercentage = (fiveStarReviews.length / reviews.length) * 100;
  const fourStarReviews = reviews.filter(review => review.rating === 4);
  const fourStarPercentage = (fourStarReviews.length / reviews.length) * 100;
  const threeStarReviews = reviews.filter(review => review.rating === 3);
  const threeStarPercentage = (threeStarReviews.length / reviews.length) * 100;
  const twoStarReviews = reviews.filter(review => review.rating === 2);
  const twoStarPercentage = (twoStarReviews.length / reviews.length) * 100;
  const oneStarReviews = reviews.filter(review => review.rating === 1);
  const oneStarPercentage = (oneStarReviews.length / reviews.length) * 100;
  const averageRating = (
    (5 * fiveStarReviews.length +
      4 * fourStarReviews.length +
      3 * threeStarReviews.length +
      2 * twoStarReviews.length +
      1 * oneStarReviews.length) /
    reviews.length
  ).toFixed(1);
  

  return (


      <div className='map-container'>
        <div className='map-container-left'>
          <MapboxSkiRuns 
          onCoordinatesChange={handleCoordinatesChange} 
          hideText={handleSetHideText}
          onMapLoad={setMap}
          />
          {showReviewsLayer && (
    <div className="reviews-layer">
      <div class="review-list">
      {reviews.map((review, index) => (
              <div key={index} className="review">
                <div className="review-user">{review.user}</div>
                <div class="stars3">
<div class="star3"style={{  color: review.rating >= 1 ? '#ffcc00' : '#656565' }}></div>
<div class="star3"style={{  color: review.rating >= 2 ? '#ffcc00' : '#656565' }}></div>
<div class="star3"style={{  color: review.rating >= 3 ? '#ffcc00' : '#656565' }}></div>
<div class="star3"style={{  color: review.rating >= 4 ? '#ffcc00' : '#656565' }}></div>
<div class="star3"style={{  color: review.rating >= 5 ? '#ffcc00' : '#656565' }}></div>
</div>
                <div className="review-comment">{review.comments}</div>
              </div>
            ))}


      </div>
      <div className="write-review" onClick={reviewWindow}>Write a Review</div>
      <ReviewForm
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      coordinates={coordinates}
      setReviews={setReviews}
    />

    </div>
  )}
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
                <div className={'OverView' + (hideText && view ? ' active' : '')} onClick={changeView}>Overview</div>
                <div className={'Review' + (hideText && !view ? ' active' : '')} onClick={changeViewReview}>Review</div>
              </div>
              {view && <div className='Trails'>{coordinatesTrail}</div>}
              {!view && <div className='Reviews'>
              <div className='table'>

    <div class="progress-row">
      <div class="star-rating">5</div>
      <div class="progress-bar-container">
        <div class="progress-bar" style={{ width: `${fiveStarPercentage}%`}}></div>
      </div>
    </div>
    <div class="progress-row">
      <div class="star-rating">4</div>
      <div class="progress-bar-container">
        <div class="progress-bar" style={{ width: `${fourStarPercentage}%`}}></div>
      </div>
    </div>
    <div class="progress-row">
      <div class="star-rating">3</div>
      <div class="progress-bar-container">
        <div class="progress-bar" style={{ width: `${threeStarPercentage}%`}}></div>
      </div>
    </div>
    <div class="progress-row">
      <div class="star-rating">2</div>
      <div class="progress-bar-container">
        <div class="progress-bar" style={{ width: `${twoStarPercentage}%`}}></div>
      </div>
    </div>
    <div class="progress-row">
      <div class="star-rating">1</div>
      <div class="progress-bar-container">
        <div class="progress-bar" style={{ width: `${oneStarPercentage}%`}}></div>
      </div>
    </div>
</div>
<div class="stats-review-container">
<div class="rating">{averageRating}</div>
<div class="stars">
<div class="star"style={{  color: averageRating >= 0 ? '#ffcc00' : '#656565'}}></div>
<div class="star"style={{  color: averageRating >= 1.5 ? '#ffcc00' : '#656565'}}></div>
<div class="star"style={{  color: averageRating >= 2.5 ? '#ffcc00' : '#656565'}}></div>
<div class="star"style={{  color: averageRating >= 3.5 ? '#ffcc00' : '#656565'}}></div>
<div class="star"style={{  color: averageRating >= 4.5 ? '#ffcc00' : '#656565'}}></div>
</div>
<div class="numbers">({reviews.length})</div>
     </div>           
                </div>}
              <div className='back-button' onClick={handleBackClick}>Back</div>
              </div>)}
          </div>
        </div>
      </div>


  );
}

export default Trails;
