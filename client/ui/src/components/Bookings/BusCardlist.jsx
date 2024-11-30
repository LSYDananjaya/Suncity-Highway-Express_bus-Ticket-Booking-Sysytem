import React,{ useState, useEffect} from 'react'
import axios from "axios";

import BusCards from './Buscards';
import './BusList.css';


const BusCardlist = () => {

    const [buscards, setbus] = useState([]);
    const [searchStart, setSearchStart] = useState('');
    const [searchEnd, setSearchEnd] = useState('');

    useEffect(()=>{
        axios.get("http://localhost:3000/api/sheduleRoutes").then((res)=>{
            setbus(res.data);
            console.log(res.data);
        })
        .catch(()=>{
        log("Error while getting data")
    })
},[]);

const filteredBusList = buscards.filter((buscard) =>
    buscard.startLocation.toLowerCase().includes(searchStart.toLowerCase()) &&
    buscard.endLocation.toLowerCase().includes(searchEnd.toLowerCase())
    
);

const buslist = 
(buscards.length === 0 || filteredBusList.length === 0)
? "No reservations found !!!"
:filteredBusList.map((buscard, index)=>
(<BusCards key={index} buscard ={buscard} />)
);
 
  return (
    <div className="Show_Reservationlist">
    <div className="container">
        <h1>Available Buses</h1>
        <div className="search-bar">
            <label htmlFor="startLocation">Search by start location:</label>
            <input
                id="startLocation"
                type="search"
                placeholder="Start location"
                value={searchStart}
                onChange={(e) => setSearchStart(e.target.value)}
            />
        </div>
        <div className="search-bar">
            <label htmlFor="endLocation">Search by end location:</label>
            <input
                id="endLocation"
                type="search"
                placeholder="End location"
                value={searchEnd}
                onChange={(e) => setSearchEnd(e.target.value)}
            />
        </div>
        <br/>
        <br/>
        <div className="list">{buslist}</div>
    </div>
</div>

  )
}

export default BusCardlist
