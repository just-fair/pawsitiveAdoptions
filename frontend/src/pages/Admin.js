import { useContext } from "react";
import { DogsContext } from "../context/DogsContext";
import DogsAdmin from "../Components/DogsAdmin";


const Admin = () => {

    const {dogs, dispatch}=useContext(DogsContext);



    return ( 
        <div className="admin">
            {dogs && dogs.map((dog)=>(
                <DogsAdmin key={dog._id} dog={dog} dispatch={dispatch}></DogsAdmin>
            ))}
        </div>
     );
}
 
export default Admin;