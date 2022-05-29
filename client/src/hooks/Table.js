
export default async function Table() {
    
    const response = await fetch ("http://localhost/rooms/P");
    const rooms = await response.json();
    rooms.map((room) =>{
        return (<tr>
            <td>{room.name}</td>
            <td>{room.type}</td>
            <td onClick={room.name}>Join</td>
        </tr>)
    });
}