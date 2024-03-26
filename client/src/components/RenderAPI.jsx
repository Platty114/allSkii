//mock data assuming API looks like this
import React, {useState, useEffect} from 'react';

function RenderAPI({selectedTrail, handleSelectedTrail, map}) {

  console.log(selectedTrail);

  const fetchGeoJsonData = async () => {
    try {

      const response = await fetch('http://localhost:8081/runs/nakiska');
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
      const geoJsonData = await fetchGeoJsonData();
      if (geoJsonData) {
        const halfIndex = Math.ceil(geoJsonData.features.length / 2);
        setFirstHalfFeatures(geoJsonData.features.slice(0, halfIndex));
        setSecondHalfFeatures(geoJsonData.features.slice(halfIndex));
      }
    };
    fetchData();
  }, []);
  
    const [prevHill, setprevHill] = useState(null);
 
    if (map) {
      const sourceId = "skiHill";
      const outlineLayerId = "lineOutlineHill";
      const runsLayerId = "skiRunsLines";
    
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: "http://localhost:8081/runs/nakiska",
        });
    
        map.addLayer({
          id: outlineLayerId,
          type: "line",
          source: sourceId,
          paint: {
            "line-width": 6,
            "line-color": "white",
            "line-opacity": 0.6,
          },
        });
    
        map.addLayer({
          id: runsLayerId,
          type: "line",
          source: sourceId,
          paint: {
            "line-color": [
              "match",
              ["get", "piste:difficulty"],
              "easy", "green",
              "intermediate", "blue",
              "advanced", "black",
              "expert", "black",
              "gray", 
            ],
            "line-width": 2,
          },
        });
      } else {
        if (map.getLayer(runsLayerId)) {
          map.removeLayer(runsLayerId);
        }
        if (map.getLayer(outlineLayerId)) {
          map.removeLayer(outlineLayerId);
        }
        map.removeSource(sourceId);
        
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: "http://localhost:8081/runs/nakiska",
        });
    
        map.addLayer({
          id: outlineLayerId,
          type: "line",
          source: sourceId,
          paint: {
            "line-width": 6,
            "line-color": "white",
            "line-opacity": 0.6,
          },
        });
    
        map.addLayer({
          id: runsLayerId,
          type: "line",
          source: sourceId,
          paint: {
            "line-color": [
              "match",
              ["get", "piste:difficulty"],
              "easy", "green",
              "intermediate", "blue",
              "advanced", "black",
              "expert", "black",
              "gray", 
            ],
            "line-width": 2,
          },
        });

      }
      }
    }
    

  
    const renderTrails = (features) => {
        return features.map((feature, index) => {
          let difficultySymbol;
          switch (feature.properties['piste:difficulty']) {
            case 'advanced':
              difficultySymbol = '◆';
              break;
            case 'extreme':
              difficultySymbol = '◆◆';
              break;
            case 'easy':
              difficultySymbol = '●';
              break;
            case 'intermediate':
              difficultySymbol = '■';
              break;
            default:
              difficultySymbol = '◆◆';
          }
    
          return (
            <div
              key={index}
              className={'Trail' + (selectedTrail === feature.properties.name ? ' active' : '')}
              onClick={() => handleSelectedTrail(feature)}
            >
              {feature.properties.name} {difficultySymbol}
            </div>
          );
        });
      };

    return (
    <div className="Trail-Menu">
      <div className="Trail-column1">
        {renderTrails(firstHalfFeatures)}
      </div>
      <div className="Trail-column2">
        {renderTrails(secondHalfFeatures)}
      </div>
    </div>
  );
}

export default RenderAPI;
