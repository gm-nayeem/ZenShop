import { useState } from "react";
import "./newProduct.css";
import { addProduct } from "../../redux/apiCalls";
import {useDispatch} from 'react-redux';
// import {useNavigate} from 'react-router-dom'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from "../../utils/firebase";

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","))
  }

  const handleClick = (e) => {
    e.preventDefault();

    // firebase setup for upload file(image) and get file url
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {...inputs, img: downloadURL, categories}
          // console.log(product)
          addProduct(dispatch, product);
          // navigate("/products");
        });
      }
    );
  }


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" name="file" id="file"
            onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="Apple Airpods"
            onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="desc" placeholder="description"
            onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" name="price" placeholder="100"
            onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" name="categories"
            placeholder="jeans, skirts" onChange={handleCategories} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Choose one</option>
            <option value="true">Yes</option>
            <option value="false">False</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewProduct;