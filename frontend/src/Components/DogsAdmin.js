import { useState, useContext } from "react";
import Request from "./Request";
import {RequestContext} from "../context/RequestContext"

const DogsAdmin = ({dog, dispatch}) => {

    const [name, setName]=useState("");
    const [breed, setBreed]=useState("");
    const [color, setColor]=useState("");
    const [age, setAge]=useState("");
    const [personality, setPersonality]=useState("");
    const [height, setHeight]=useState("");
    const [weight, setWeight]=useState("");


    const [showInfo, setShowInfo]=useState(false);
    const [editMode, setEditMode]=useState(false);

    const [editted, setEditted]=useState(false);
    const [deleted, setDeleted]=useState(false);

    const {request, deploy}=useContext(RequestContext);
    const [showReq, setShowReq]=useState(false);

    let updatedDogsInfo={name, breed, color, age, personality, height, weight};

    const uint8Array = new Uint8Array(dog.image.data.data);
    const blob = new Blob([uint8Array], { type: 'image/jpg' });
    const imgUrl = URL.createObjectURL(blob);

    

    const handleSubmitButton=async(e)=>{
        e.preventDefault()

        const response=await fetch('https://pawsitive-adoptions.vercel.app/pawsitiveadoptions/dogs/'+dog._id, {
            method:'PATCH',
            body: JSON.stringify(updatedDogsInfo),
            headers:{
                'Content-type':'application/json'
            } 
        })

        const json= await response.json();

        if(response.ok) dispatch({type: 'update_dog', payload: dog})

        setEditted(!editted);
    }


    const handleEditDogInfoBtn=()=>{
        setName(dog.name);
        setBreed(dog.breed);
        setColor(dog.color);
        setAge(dog.age);
        setPersonality(dog.personality);
        setHeight(dog.height);
        setWeight(dog.weight);

        setEditMode(!editMode);

    }


    const handleDogImageClick=()=>{
        setShowInfo(!showInfo);
    }

    const handleDeleteDogBtn=async()=>{
        const response= await fetch('https://pawsitive-adoptions.vercel.app/pawsitiveadoptions/dogs/'+dog._id, {
            method: 'DELETE'
        })

        if(response.ok) dispatch({type:'delete_dog', payload:dog})

        setDeleted(!deleted);

        
    }

    const handleShowAllReqBtn=async()=>{
        const response = await fetch('https://pawsitive-adoptions.vercel.app/pawsitiveadoptions/forms/'+dog.name)

        const json= await response.json();

        if(response.ok){
            if(json.length === 0) alert("No Request");
            deploy({type:'set_request', payload:json})
            setShowReq(!showReq);
            
        }else{
           console.log(json.message);
        }

        
    }

    return ( 
        <div className="dogsAdminInfo">
            <img src={imgUrl} alt="dog image" onClick={handleDogImageClick}/>
            <h2 onClick={handleDogImageClick}>{dog.name}</h2>

            {showInfo && 
                <div className="adminDogInfo">
                <h3>Dog Information</h3>
                <p>Name: {dog.name}</p>
                <p>Breed: {dog.breed}</p>
                <p>Color: {dog.color}</p>
                <p>Age: {dog.age}</p>
                <p>Personality: {dog.personality}</p>                
                <p>Height: {dog.height}</p>
                <p>Weight: {dog.weight}</p>
                
                <p>Number of request: {dog.numOfReq}</p>

                <button onClick={handleEditDogInfoBtn}>Edit Information</button>
                <button onClick={handleDeleteDogBtn}>Delete Dog</button>
                <button onClick={handleShowAllReqBtn}>Show All Request</button>
                {/* {showForm && <Form dog={dog} />} */}
                </div>
            }


            {editMode && 
                <div className="adminEditDogForm">
                    <form onSubmit={handleSubmitButton}>
                        <h3>Edit Dog Info</h3>

                        <label>Name:</label>
                        <input type="text" onChange={(e)=> setName(e.target.value)}  value={name}/>

                        <label>Breed:</label>
                        <input type="text" onChange={(e)=> setBreed(e.target.value)}  value={breed}/>

                        <label>Color:</label>
                        <input type="text" onChange={(e)=> setColor(e.target.value)}  value={color}/>

                        <label>Age:</label>
                        <input type="number" onChange={(e)=> setAge(e.target.value)}  value={age}/>

                        <label>Personality:</label>
                        <input type="text" onChange={(e)=> setPersonality(e.target.value)}  value={personality}/>

                        <label>Height:</label>
                        <input type="text" onChange={(e)=>setHeight(e.target.value)}  value={height}/>

                        <label>Weight:</label>
                        <input type="text" onChange={(e)=> setWeight(e.target.value)}  value={weight}/>

                        <button>OK</button>
                    </form>

                    {editted && <h2>Successfully Editted</h2>}
                </div>

            }

            {deleted && <h2>Successfully Deleted</h2>}

            {showReq && 
                
                    <div className="dogsRequest">
                        {request && request.map((request)=>(
                            <Request key={request._id} request={request} deploy={deploy}/>
                        ))}
                    </div>
                
            }
        </div>
     );
}
 
export default DogsAdmin;