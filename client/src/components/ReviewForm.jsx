import React, {useState, useEffect} from 'react';
import { MemoryRouter } from 'react-router-dom';


const ReviewFrom = ({ isOpen, onClose, coordinates, setReviews, setReviewAdded }) => {
    const [user, setUserName] = useState('');
    const [category, setCategory] = useState('skiing');
    const [comments, setComments] = useState('');
    let [rating, setRating] = useState(0);
    const [clickCounts, setClickCounts] = useState(Array(5).fill(0)); 
    let skiHill = null;


    if (JSON.stringify(coordinates) === JSON.stringify([-115.1511,50.9427])) {
        skiHill = "Nakiska";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-116.1622,51.4419])) {
        skiHill = "LakeLouise";
      } else if (JSON.stringify(coordinates) === JSON.stringify([-115.0873, 49.4627])) {
        skiHill = "Fernie";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-117.0483, 51.2976])) {
        skiHill = "KickingHorse";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-115.7765, 51.0785])) {
        skiHill = "Sunshine";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-118.1631, 50.9584])) {
        skiHill = "Revelstoke";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-116.238157, 50.460374])) {
        skiHill = "Panorama";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-115.6068, 51.2053])) {
        skiHill = "Norquay";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-116.0048, 49.6879])) {
        skiHill = "Kimberley";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-119.0610, 50.3598])) {
        skiHill = "SilverStar";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-119.8891, 50.8837])) {
        skiHill = "SunPeaks";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-118.93528, 49.7160])) {
        skiHill = "BigWhite";
    }

    const starClick = (index) => {
        const newClickCounts = [...clickCounts];
        newClickCounts[index] += 1; 
        if (newClickCounts[index] % 2 === 1) {
            rating = rating + 1; 
        } else {
            rating = rating - 1; 
        }
        setClickCounts(newClickCounts);
        setRating(rating); 
    }; 

    const onSubmit = async () => {
        if (user === ''){
            window.alert("Please fill in your name");
        } else if (comments === ''){
            window.alert("Please leave a comment");
        } else if (rating === 0){
            window.alert("Please rate from 1-5 by clicking the stars");
        } else {
            const placeName = skiHill
            const newReview = {
                category,
                comments,
                placeName,
                rating,
                skiHill,
                user,                
            };
            try {
                const response = await fetch('https://reviews-service-7btvt4xvwq-pd.a.run.app/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newReview),
                });
          
                if (response.ok) {
                  const result = await response.json();
                  
                  setReviews((prevReviews) => [...prevReviews, result]);
                  setClickCounts(Array(5).fill(0));
                  setComments('');
                  setUserName('');
                  setRating(0);
                  skiHill = null;
                  setReviewAdded(true);
                  onClose();
                } else {
                  console.error('Failed to create review:', response.status);
                  window.alert('Failed to post review. Please try again.');
                }
              } catch (error) {
                console.error('Network error:', error);
                window.alert('Network error. Please try again.');
              }
            }
          };
  
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <form>
            <div className='user-row'>
              <div className='user'>Name:</div>
              <textarea type="text" class="input" value={user} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="stars2">
  <div className={`star2 ${clickCounts[0] % 2 === 1 ? 'clicked' : ''}`} style={{color: "#2a2a2a"}} onClick={() => starClick(0)}></div>
  <div className={`star2 ${clickCounts[1] % 2 === 1 ? 'clicked' : ''}`} style={{color: "#2a2a2a"}} onClick={() => starClick(1)}></div>
  <div className={`star2 ${clickCounts[2] % 2 === 1 ? 'clicked' : ''}`} style={{color: "#2a2a2a"}} onClick={() => starClick(2)}></div>
  <div className={`star2 ${clickCounts[3] % 2 === 1 ? 'clicked' : ''}`} style={{color: "#2a2a2a"}} onClick={() => starClick(3)}></div>
  <div className={`star2 ${clickCounts[4] % 2 === 1 ? 'clicked' : ''}`} style={{color: "#2a2a2a"}} onClick={() => starClick(4)}></div>
</div>

            <div>
              <textarea class="textbox" placeholder="Share details of your own experience at this place" value={comments} onChange={(e) => setComments(e.target.value)} />
            </div>
            <div className="form-menu-buttons">
            <div class="submit-button" onClick={onSubmit}>Post</div>
            <div class="close-button" onClick={onClose}>Close</div>


            </div>
          </form>
      </div>
    );
  };

  export default ReviewFrom;
  