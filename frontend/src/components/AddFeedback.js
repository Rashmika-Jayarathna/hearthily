import React, { useState } from 'react';
import axios from 'axios';
import '../css/GetOrderInfo.css'
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';


export default function GetFeedbackForm() {
    const [rating, setRating] = useState('');
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');
    const { orderId } = useParams(); 
    const navigate = useNavigate();

    const starRating = () => {
        return (
            <div className='star-rating-container'>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                    <label key={ratingValue} required>
                        <input className='ratings-radio' type="radio"
                            name="rating" value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar className='star'
                            size={30} 
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)} 
                            style={{ color: ratingValue <= (hover || rating) ? "#F28638" : "#252836" }}
                        />
                    </label>
                    );
                })}
            </div>
        )
    };

    const handleCancelClick = () => {
            navigate(`/order-history/order/${orderId}`);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8070/feedback/add`, {
                orderId,
                rating,
                comment
            });

            console.log(response.data); 
            navigate(`/order-history/order/${orderId}`); 

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='add-feedback-main'>
            <div className="top-bar">
        <div className="container-title-text">Add Your Feedback</div>
      </div>
        <form onSubmit={handleSubmit} className="add-feedback-form-container">
            <div className='star-rating'>{starRating()}</div>

            <label htmlFor="comment" className="form-label">Comment:</label>
            <textarea id="comment" value={comment} onChange={e => setComment(e.target.value)} className="form-textarea" />
            <div className='form-buttons'>
            <button type="submit" className="submit-button">Submit Feedback</button> 
            <button type="button" className="cancel-button" onClick={handleCancelClick}>Cancel</button> 
            </div>
        </form>
        </div>
    );
}