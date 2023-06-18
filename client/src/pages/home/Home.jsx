import React, { useEffect } from 'react'
import "./home.scss";
import Categories from '../../components/categories/Categories'
import Widget from '../../components/widget/Widget'
import FeaturedProducts from '../../components/featuredProducts/FeaturedProducts'
import Slider from '../../components/slider/Slider'
import { useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const refresh = location.state?.refresh;

    useEffect(() => {
        if(refresh) {
            console.log("Refreshed!!");
            const hasRefreshed = localStorage.getItem('hasRefreshed');
    
            if (!hasRefreshed) {
                localStorage.setItem('hasRefreshed', 'true');
                window.location.reload();
            }
        }
    }, [refresh]);

    return (
        <div className='home'>
            <Slider />
            <FeaturedProducts type="featured" />
            <Categories />
            <FeaturedProducts type="trending" />
            <Widget />
        </div>
    )
}

export default Home;