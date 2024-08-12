import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/Redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

    const [query,setQuery]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () =>{
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
            <span className='mx-auto px-4 py-4 rounded-full bg-gray-100 text-[#37b332] font-medium'>No.1 Job Seeker Website</span>
            <h1 className='text-5xl font-bold '>Search , Apply & <br /> Get Your <span className='text-blue-800'>Dream Jobs</span> </h1>
            <p>Some jobs are more desirable than others. Many people work in positions they hope will lead to their dream job one day. </p>

            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input type="text"
                placeholder='Find Your Dreams Jobs'
                onChange={(e)=>setQuery(e.target.value)}
                className='outline-none border-none w-full'
                />
                <Button className="rounded-r-full bg-blue-600   ">
                    <Search  onClick={searchJobHandler} className='h-5 w-5'/>
                </Button>
            </div>
            </div>
            
        </div>
    );
};

export default HeroSection;