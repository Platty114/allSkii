import React, {useState, useEffect} from 'react';
import { MemoryRouter } from 'react-router-dom';


const ReviewFrom = ({ isOpen, onClose, coordinates, setReviews }) => {
    const [userName, setUserName] = useState('');
    const [category, setCategory] = useState('skiing');
    const [comments, setComments] = useState('');
    let [rating, setRating] = useState(0);
    const [clickCounts, setClickCounts] = useState(Array(5).fill(0)); 
    let mountain = null;


    if (JSON.stringify(coordinates) === JSON.stringify([-115.1511,50.9427])) {
        mountain = "LakeLouise";
      } else if (JSON.stringify(coordinates) === JSON.stringify([-115.0873, 49.4627])) {
        mountain = "Fernie";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-117.0483, 51.2976])) {
        mountain = "KickingHorse";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-115.7765, 51.0785])) {
        mountain = "Sunshine";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-118.1631, 50.9584])) {
        mountain = "Revelstoke";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-116.238157, 50.460374])) {
        mountain = "Panorama";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-115.6068, 51.2053])) {
        mountain = "Norquay";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-116.0048, 49.6879])) {
        mountain = "Kimberley";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-119.0610, 50.3598])) {
        mountain = "SilverStar";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-119.8891, 50.8837])) {
        mountain = "SunPeaks";
    } else if (JSON.stringify(coordinates) === JSON.stringify([-118.93528, 49.7160])) {
        mountain = "BigWhite";
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

    const onSubmit = () => {
        if (userName === ''){
            window.alert("Please fill in your name");
        } else if (comments === ''){
            window.alert("Please leave a comment");
        } else if (rating === 0){
            window.alert("Please rate from 1-5 by clicking the stars");
        } else {
            const newReview = {
                userName,
                rating,
                comments,
                mountain
            };
            setReviews((prevReviews) => [...prevReviews, newReview]);
            setClickCounts(Array(5).fill(0));
            setComments('');
            setUserName('');
            setRating(0);
            mountain = null;
            
            onClose();
        }

    }
  
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <form>
            <div className='user-row'>
              <div className='user'>Name:</div>
              <textarea type="text" class="input" value={userName} onChange={(e) => setUserName(e.target.value)} />
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
  