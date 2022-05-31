
 import { useState } from "react";

 export default function Table(){ 
   const [list, setlist] = useState([]);
   const getRooms = async () => {
    const response = await fetch ("http://localhost:3000/api/rooms/P");
    setlist(await response.json());
   } 
    const getUserRooms = async (id) =>{ 
     const response = await fetch (`http://localhost:3000/api/room/${id}`);
     setlist(await response.json());
    } 
   return {list, getRooms, getUserRooms};
}