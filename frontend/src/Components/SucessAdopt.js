import { useState } from "react";

const SucessAdopt = ({requestDetails, dog}) => {

    const [lastName, setLastName]=useState("");
    const [firstName, setFirstName]=useState("");
    const [reason, setReason]=useState("");
    const [age, setAge]=useState("");
    const [address, setAddress]=useState("");
    const [contact, setContact]=useState("");
    const [emailAddress, setEmailAddress]=useState("");

    const [cancel, setCancel]= useState(false);
    const [edit, setEdit]= useState(false);
    const [ok, setOk]= useState(false);
    const [editMode, setEditMode]= useState(false);

    const handleCancelBtn=async()=>{
        const response=await fetch('https://pawsitive-adoptions.vercel.app/pawsitiveadoptions/form/'+requestDetails._id, {
            method: 'DELETE',
        });

        const json= await response.json();

        if(response.ok) setCancel(!cancel);
        

    }


    const handleEditBtn=()=>{
        setLastName(requestDetails.lastName);
        setFirstName(requestDetails.firstName);
        setReason(requestDetails.reason);
        setAge(requestDetails.age);
        setAddress(requestDetails.address);
        setContact(requestDetails.contact);
        setEmailAddress(requestDetails.emailAddress);

        setEditMode(!editMode);
       
    }

    const handleEditSubmit=async(e)=>{
        e.preventDefault();

        const edittedRequestForm={lastName, firstName, reason, age, address, contact, emailAddress};

        const response= await fetch('https://pawsitive-adoptions.vercel.app/pawsitiveadoptions/form/'+requestDetails._id, {
            method:'PATCH',
            body: JSON.stringify(edittedRequestForm),
            headers:{
                'Content-type':'application/json'
            } 
        });  

        if(response.ok) setEditMode(false);

        const json=await response.json();

        setEdit(!edit);
    }

    const handleOkBtn=()=>{
        setOk(!ok);
    }

    return ( 
        <div className="successAdopt">
            {
                editMode?
                <div className="editForm">
                <form className="editReqForm" onSubmit={handleEditSubmit}>
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
                    <input type="text" onChange={(e)=> setEmailAddress(e.target.value)}  value={emailAddress}/>

                    <button>OK</button>
                    
                </form>
            </div>
                :
                <div className="bts">
                    <ul>
                        <h3>Yey!</h3>
                        <p>Name: {requestDetails.firstName+" "+requestDetails.lastName}</p>
                        <p>Dog name: {dog.name}</p>
                        <h3>We will process your adoption, we will contact you for the update</h3>
                        <h2>Thank you</h2>
                    </ul>

                    <button onClick={handleCancelBtn}>Cancel</button>
                    <button onClick={handleEditBtn}>Edit</button>
                    <button onClick={handleOkBtn}>Ok</button>

                    {cancel && <h3>Your request is canceled</h3>}
                    {edit&&<h3>Your request is editted</h3>}
                    {ok && <h3>Thank you for adopting</h3>}
                </div>
            }
            
        </div>
     );
}
 
export default SucessAdopt;