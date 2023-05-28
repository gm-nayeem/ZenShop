import './newSubCategory.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userRequest, publicRequest } from '../../utils/makeRequest';

const NewUser = () => {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // set selected categories
  const handleCategories = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategory(value);
  };

  // sumbit user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSubCategory = {
      title, 
      categories: selectedCategory
    }
    // console.log(newSubCategory);

    try {
      const res = await userRequest.post("/subcategories", newSubCategory);
      res && navigate("/subcategories");
    } catch (err) {
      console.log(err);
    }
  };

  // fetch all categories
  useEffect(() => {
    const getAllCategories = async () => {
      const res = await publicRequest.get('/categories/all');
      res.data && setCategories(res.data);
    }
    getAllCategories();
  }, []);


  return (
    <div className='newSubCategory'>
      <div className="top">
        <h1>ADD NEW SUB CATEGORY</h1>
      </div>
      <div className="bottom">
        <form>
          <div className="formInput">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="t-shirt"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="formInput">
            <label>Categories</label>
            <select
              multiple name="categories" id="categories"
              onChange={handleCategories}
            >
              {
                categories && categories?.map((cat, i) => (
                  <option value={cat.title} key={i}>{cat.title}</option>
                ))
              }
            </select>
          </div>
          <button className="subCategoryUpdateButton" onClick={handleSubmit}>Update</button>
        </form>
      </div>
    </div>
  )
}

export default NewUser;

