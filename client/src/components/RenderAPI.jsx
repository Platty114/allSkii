//mock data assuming API looks like this
import React, {useState, useEffect} from 'react';

function RenderAPI({selectedTrail, handleSelectedTrail, firstHalfFeatures, secondHalfFeatures}) {

  console.log(selectedTrail);

    const [prevHill, setprevHill] = useState(null);
 
  
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
