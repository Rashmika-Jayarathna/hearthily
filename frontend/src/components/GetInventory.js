import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/GetOrder.css';
import '../css/GetInventory.css';

export default function GetInventory() {
    const [inventory, setInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        const fetchInventory = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:3500/inventory/');
                setInventory(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };
  
        fetchInventory();
    }, []);
  
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };
  
    // Filtered inventory based on the search term
    const filteredInventory = inventory.filter(item =>
        item._id.toLowerCase().includes(searchTerm) ||
        item.ingredient.toLowerCase().includes(searchTerm) ||
        item.qty.toString().includes(searchTerm)
    );
  
    return (
        <div className='inventory-main'>
            <div className="inventory-record">
                <div className="top-bar">
                    <div className="container-title-text">Inventory Records</div>
                    <div className="search-container">
                        <input
                            type="text"
                            className="search"
                            placeholder='Search..'
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                {isLoading ? (
                    <div className='loading-inventory'>Beep boop boop...</div>
                ) : (
                    <div className='content'>
                        <div className="inventoryTitles">
                            <ul>
                                <li className='itemId'>Item ID</li>
                                <li className='ingredient'>Ingredient</li>
                                <li className='qtys'>Quantity</li>
                            </ul>
                        </div>
                        <div className="get-inventory-container">
                            {filteredInventory.length > 0 ? (
                                filteredInventory.map((inventoryItem) => (
                                    <div className="inven-item" key={inventoryItem._id}>
                                        <Link to={`/inventory-record/inventory/${inventoryItem._id}`} className="in-item">
                                            <ul>
                                                <li className='itemId'>{inventoryItem._id}</li>
                                                <li className="ingredient">{inventoryItem.ingredient}</li>
                                                <li className="qtys">{inventoryItem.qty}kg</li>
                                            </ul>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div>No inventory record found.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
