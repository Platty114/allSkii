//mock data assuming API looks like this

const NakiskaAPI={
    "type": "NakiskaCollection",
    "features": [{
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
  },
  
  {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [
          -115.188362,
          50.946646
        ],
        [
          -115.18753,
          50.946821
        ],
        [
          -115.185918,
          50.947269
        ],
        [
          -115.185381,
          50.94748
        ],
        [
          -115.18457,
          50.948053
        ],
        [
          -115.183925,
          50.948732
        ],
        [
          -115.183657,
          50.948968
        ]
      ]
    },
    "properties": {
      "name": "Little Hunter",
      "piste:difficulty": "advanced",
      "piste:type": "downhill"
    }
  },
  

  {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [
          -115.16652,
          50.9503
        ],
        [
          -115.166131,
          50.949992
        ],
        [
          -115.165396,
          50.949577
        ],
        [
          -115.164416,
          50.948796
        ],
        [
          -115.163992,
          50.948375
        ],
        [
          -115.163356,
          50.94801
        ],
        [
          -115.161775,
          50.94757
        ]
      ]
    },
    "properties": {
      "name": "Eye Opener Connector",
      "piste:difficulty": "intermediate",
      "piste:type": "downhill"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [
          -115.166098,
          50.945944
        ],
        [
          -115.165299,
          50.94644
        ],
        [
          -115.164477,
          50.946816
        ],
        [
          -115.163726,
          50.946938
        ],
        [
          -115.163174,
          50.946903
        ],
        [
          -115.162788,
          50.946879
        ],
        [
          -115.161687,
          50.946684
        ],
        [
          -115.160688,
          50.946562
        ],
        [
          -115.160013,
          50.946376
        ],
        [
          -115.159037,
          50.94583
        ],
        [
          -115.158246,
          50.945419
        ],
        [
          -115.157239,
          50.945229
        ],
        [
          -115.156464,
          50.94495
        ],
        [
          -115.155828,
          50.944495
        ]
      ]
    },
    "properties": {
      "name": "Maverick",
      "piste:difficulty": "advanced",
      "piste:type": "downhill"
    }
  },

{
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
]
}

function RenderAPI({selectedTrail, handleSelectedTrail}) {
    const halfIndex = Math.ceil(NakiskaAPI.features.length / 2);
    const firstHalfFeatures = NakiskaAPI.features.slice(0, halfIndex);
    const secondHalfFeatures = NakiskaAPI.features.slice(halfIndex);

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
            default:
              difficultySymbol = '■';
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
