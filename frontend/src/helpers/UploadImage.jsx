
import axios from 'axios'

const UploadImage = async (image) => {


    const formData = new FormData();

    formData.append("image", file);
    const dataResponse = await fetch('http://localhost:5000/upload', {
        method:'post',
        body:formData

    })
    return dataResponse.json()
}


export default UploadImage