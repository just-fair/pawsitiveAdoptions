import {useState} from 'react'
import Form from './Form';

const DogInfo = ({dog,}) => {

    const [showForm, setShowForm] = useState(false)

    
    const handleAdoptButton=()=>{
        setShowForm(!showForm);
    }

    return ( 
        <div className="dogInfo">
            <h3>Dog Information</h3>
            <p>Name: {dog.name}</p>
            <p>Breed: {dog.breed}</p>
            <p>Color: {dog.color}</p>
            <p>Age: {dog.age}</p>
            <p>Personality: {dog.personality}</p>
            <p>Height: {dog.height}</p>
            <p>Weight: {dog.weight}</p>
            <p>Number of request: {dog.numOfReq}</p>

            <button onClick={handleAdoptButton}>Adopt</button>
            {showForm && <Form dog={dog} setShowForm={setShowForm}/>}
        </div>
     );
}
 
export default DogInfo;