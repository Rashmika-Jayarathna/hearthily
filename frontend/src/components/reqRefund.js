
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/reqRefunds.css';
import { useAuth } from '../Services/Auth/AuthContext';
import { toast } from 'react-toastify';

const ReqRefund = () => {
    const { orderId } = useParams();
    const [payments, setPayments] = useState([]);
    const [mobileNumber,setNumber] =useState("");
    const [reason,setReason] =useState("");
    const [description,setDes] =useState("");
    const { userId } = useAuth();
    const customerId = userId;

    function sendData(e){
        e.preventDefault();


        const newRefund = {

            customerId,
            mobileNumber,
            orderId,
            reason,
            description,
            image: { data: image }

        }
        axios.post("http://localhost:3500/refund/add",newRefund).then(()=>{
            alert("Added");
        }).catch((err)=>{
            alert("err");
        })

        console.log(newRefund);
    }

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3500/payment/get/${orderId}`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setPayments(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (orderId) {
            fetchData();
        }
    }, [orderId]);
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Adjust date format as needed
    }


    const [image, setImage] = useState("");

    console.log(image);


    function converToBase64(e){
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload =() =>{
            console.log(reader.result);
            setImage(reader.result);
        }
      }

      const handleChange = (e) => {
        const inputValue = e.target.value;
        
        setNumber(inputValue);
    };
    
    function handleKeyPress(event) {
        // Get the key that was pressed
        const key = event.key;
        const inputValue = event.target.value;
    
        // Check if the pressed key is a number or a valid character like backspace or delete
        const isValidInput = /^[0-9\b]+$/.test(key);

        const newLength = inputValue.length + 1;

        if (newLength > 10 && key !== '\b') {
            event.preventDefault();
        }
    
        // If the pressed key is not a number or a valid character, prevent it from being entered into the input field
        if (!isValidInput) {
            event.preventDefault();
        }
    }
    
      
    return (
        <div className="refundContainer">
            <div className='heading'>Refund Request</div>

            <div className='details'>

                <div className='orderDetails'>
                    <div className='idContainer'>
                        <div className='title'>Order ID</div>
                        <div className='id'>{orderId}</div>
                    </div>
                    {payments.length > 0 && (
                        <>
                        <div className='timeOrdered'>
                            <div className='title'>Date</div>
                            <div className='time'>{formatDate(payments[0].date)}</div>
                        </div>
                        <div className='usedMethod'>
                            <div className='title'>Payment Method</div>
                            <div className='method'>{payments[0].paymentMethod === 'BT' ? 'Bank Transfer' : 'Cash on Delivery'}</div>
                        </div>
                        <div className='paidAmount'>
                            <div className='title'>Paid Amount</div>
                            <div className='method'>{parseFloat(payments[0].amount).toFixed(2)}</div>
                        </div>
                    </>)}
                    
                </div>
                <form className="refundForm"
                    onSubmit={sendData}
                
                >
                    <div className="inputField">
                        <label for = "number">Mobile Numeber</label>
                        <input id ="number" className="inputBox" type="tel" 
                        onChange={handleChange} onKeyPress={handleKeyPress}
                        ></input>
                    </div>
                    
                    <div className="inputField">
                        <label for="reason">Reason</label>
                        <select  id="reason" name="reason"
                        
                        onChange={(e)=>{

                            setReason(e.target.value);


                        }}
                        >
                            <option value="" disabled selected>Select a reason</option>
                            <option value="wrong_order">Wrong Order</option>
                            <option value="poor_quality">Poor Quality</option>
                            <option value="other">Other</option>
                        </select>

                    </div>
                    <div className='refundImage'>
                        <di>Upload Image</di>
                        <input type="file" id="file" accept="image/*" onChange={converToBase64}/>
                        
                    </div>
                    
                    <div className="inputField">
                        <label for = "description">Description</label>
                        <textarea   name="message" id="description"
                            onChange={(e)=>{

                                setDes(e.target.value);
        
                            }}
                        
                        ></textarea>
                    </div>
                    <div className="inputField">
                        <input className="submitButton" type="submit" onClick={sendData}/>
                    </div>
                    
                </form>

            </div>

        </div>
    );
};

export default ReqRefund;
