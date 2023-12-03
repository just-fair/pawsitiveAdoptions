import { useState, useContext } from "react";
import SucessAdopt from "../Components/SucessAdopt";
import { DogsContext } from '../context/DogsContext';


const Form = ({dog, setShowForm}) => {

    const {dogs, dispatch}=useContext(DogsContext);

    const [lastName, setLastName]=useState("");
    const [firstName, setFirstName]=useState("");
    const [reason, setReason]=useState("");
    const [age, setAge]=useState("");
    const [address, setAddress]=useState("");
    const [contact, setContact]=useState("");
    const [emailAddress, setEmailAdress]=useState("");

    const [succesful, setSuccessful]= useState(false);
    const [error, setError]=useState("");
    const [requestDetails, setRequestDetails]=useState(null);

    const handleSubmit=async(e)=>{
        e.preventDefault()

        
        const requestForm={lastName, firstName, reason, age, address, contact, emailAddress};
        //dagdagan mo to pagtapos kana sa iba
        const {image, ...tempObj}=dog;
        const updatedDog = { ...tempObj, reqNum: dog.reqNum + 1 };

        const response= await fetch('https://pawsitive-adoptions.vercel.app/pawsitiveadoptions/form/'+dog._id, {
            method:'POST',
            body: JSON.stringify(requestForm),
            headers:{
                'Content-type':'application/json'
            } 
        });  

        const json= await response.json();
        setRequestDetails(json);

        if(!response.ok){
            setError(json.message);
        }else{
            setSuccessful(true);
            setFirstName("");
            setLastName("");
            setReason("");
            setAge("");
            setAddress("");
            setContact("");
            setEmailAdress("");
            setError(null);


            const updatedResponse= await fetch('https://pawsitive-adoptions.vercel.app/pawsitiveadoptions/dogs/'+dog._id, {
            method:'PATCH' ,          
            body: JSON.stringify(updatedDog),
             headers:{
                 'Content-type':'application/json'
             } 
            });  

            if(updatedResponse.ok){
                dispatch({type: 'update_dog', payload: updateDog})
            }
           
        }

        
        console.log(succesful);

    
    }

    

    

    return ( 
        <div className="form">
            <form className="reqForm" onSubmit={handleSubmit}>
                <h3>Adopt</h3>

                <label>Last Name:</label>
                <input type="text" onChange={(e)=> setLastName(e.target.value)}  value={lastName}/>

                <label>First Name:</label>
                <input type="text" onChange={(e)=> setFirstName(e.target.value)}  value={firstName}/>

                <label>Reason:</label>
                <input type="text" onChange={(e)=> setReason(e.target.value)}  value={reason}/>

                <label>Age:</label>
                <input type="text" onChange={(e)=> setAge(e.target.value)}  value={age}/>

                <label>Address:</label>
                <input type="text" onChange={(e)=> setAddress(e.target.value)}  value={address}/>

                <label>Contact:</label>
                <input type="text" onChange={(e)=> setContact(e.target.value)}  value={contact}/>

                <label>Email Address:</label>
                <input type="text" onChange={(e)=> setEmailAdress(e.target.value)}  value={emailAddress}/>

                <button>OK</button>

            </form>

            {succesful && <SucessAdopt requestDetails={requestDetails} dog={dog}/>}
        </div>
     );
}
 
export default Form;
