import { useState } from "react";


const Request = ({request, deploy}) => {

    const [showEachInfo, setShowEachInfo]= useState(false)
    const [deleted, setDeleted]= useState(false)

    const handleClick=()=>{
        setShowEachInfo(true);
    }

    const handleDeleteBtn=async()=>{
        const response= await fetch('https://pawsitive-adoptions.vercel.app/pawsitiveadoptions/form/'+request._id, {
            method: 'DELETE'
        })

        const json = await response.json();

        if(response.ok){
            deploy({type:'delete_request', payload: json})
            setDeleted(true);
        }
    }

    return ( 
        <div className="eachRequest">
            <p onClick={handleClick}>Person to adopt: {request.firstName+" "+request.lastName}</p>
            {showEachInfo && 
                <div className="reqInfo">
                    <p>Last name: {request.lastName}</p>
                    <p>First name: {request.firstName}</p>
                    <p>Middle name: {request.middleName}</p>
                    <p>Suffix: {request.suffix}</p>
                    <p>Age: {request.age}</p>
                    <p>Address: {request.address}</p>
                    <p>Contact: {request.contact}</p>
                    <p>Email Address: {request.emailAdress}</p>
                    <p>Reason: {request.reason}</p>
                    <p>Dog to adopt: {request.nameOfDog}</p>

                    <button onClick={handleDeleteBtn}>Delete</button>
                </div>
            }

            {deleted && <h2>Request Successfully Deleted</h2>}
        </div>
     );
}
 
export default Request;