import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LastestJobs from './LastestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from './Hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    useGetAllJobs();
    const {user} = useSelector(store=>store.auth)
    const navigate = useNavigate();
    useEffect(()=>{
        if(user?.role === "recruiter"){
            navigate("/admin/companies")
        }
    },[])
    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LastestJobs />
            <Footer />
        </div>
    );
};

export default Home;