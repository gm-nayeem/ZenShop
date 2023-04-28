import axios from "axios";
import {FILE_UPLOAD_URL} from '../private/URL';

// use cloudinary website
const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "zenshop");

    try {
        const res = await axios.post(FILE_UPLOAD_URL,data)

        const { url } = res.data;
        return url;
    } catch (err) {
        console.log(err);
    }
};

export default upload;