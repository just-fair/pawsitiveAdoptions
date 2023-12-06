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
    const dogsPerPage = 6;
    
    console.log(dogs.length);

    const handleNextBtn=()=>{
            setPresentIndex(presentIndex+dogsPerPage);
    }

    const handlePrevBtn=()=>{
        setPresentIndex(presentIndex-dogsPerPage);
    }

    


    return ( 
        <div className="adopt">
                <Link to="/admin" id='admin'>Admin</Link>

                <div className="dogs-grid">
                    {loading && <h2>Loading...</h2>}
                    
                    {dogs && dogs.slice(presentIndex, presentIndex+dogsPerPage).map((dog)=>(
                        <div className="dogsPic" key={dog._id}>
                            <Dogs dog={dog}/>
                        </div>
                    ))}
                </div>

                <div className="pagination-buttons">
                    <button onClick={handlePrevBtn} disabled={presentIndex + dogsPerPage ==6} >Prev</button>
                    <button onClick={handleNextBtn} disabled={presentIndex + dogsPerPage >= dogs.length} >Next</button>
                </div>
  
        </div>
     );
}
 
export default Adopt;