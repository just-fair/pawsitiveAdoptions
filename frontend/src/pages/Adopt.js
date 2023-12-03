import {useContext, useEffect, useState} from 'react';
import Dogs from '../Components/Dogs';
import { DogsContext } from '../context/DogsContext';
import {Link} from 'react-router-dom';


const Adopt = () => {

    const {dogs, dispatch}=useContext(DogsContext);
    const [loading, setLoading] = useState(false);
    

    useEffect(()=>{
        const fetchDogs= async()=>{
            if(dogs.length===0) setLoading(!loading);
            const response= await fetch('https://pawsitive-adoptions.vercel.app/pawsitiveadoptions/dogs/');
            const json= await response.json();

            console.log(json);

            if(response.ok){
                dispatch({type: 'set_dog', payload: json})
            }

            setLoading(false);

        }
        fetchDogs();
    },[dispatch])


    const [presentIndex, setPresentIndex] = useState(0);
    const dogsPerPage = 5;
    
    console.log(dogs.length);

    const handleNextBtn=()=>{
            setPresentIndex(presentIndex+dogsPerPage);
    }

    const handlePrevBtn=()=>{
        setPresentIndex(presentIndex-dogsPerPage);
    }

    


    return ( 
        <div className="adopt">
                {loading && <h2>Loading...</h2>}
                <Link to="/admin">Admin</Link>
                {dogs && dogs.slice(presentIndex, presentIndex+dogsPerPage).map((dog)=>(
                    <div className="dogsPic" key={dog._id}>
                        <Dogs dog={dog}/>
                    </div>
                ))}

                <button onClick={handlePrevBtn} disabled={presentIndex + dogsPerPage ==5} >Prev</button>
                <button onClick={handleNextBtn} disabled={presentIndex + dogsPerPage >= dogs.length} >Next</button>
            
  
        </div>
     );
}
 
export default Adopt;