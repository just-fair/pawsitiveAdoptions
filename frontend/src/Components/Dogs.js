import DogInfo from '../Components/DogInfo'
import { useState } from "react";

const Dogs = ({dog}) => {
    
    //converting array image to urlsrc
    const uint8Array = new Uint8Array(dog.image.data.data);
    const blob = new Blob([uint8Array], { type: 'image/jpg' });
    const imgUrl = URL.createObjectURL(blob);
    console.log(imgUrl);

    const [showDogInfo, setShowDogInfo] = useState(false)

    
    const handleClick=()=>{
        setShowDogInfo(!showDogInfo);
    }


    return ( 
        <div className="dogs">
            <img src={imgUrl} alt="Dog image" onClick={handleClick}/>
            {showDogInfo && <DogInfo dog={dog}/>}
        </div>
     );
}
 
export default Dogs;