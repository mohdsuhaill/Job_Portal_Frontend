import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { data } from 'autoprefixer';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/Redux/jobSlice';

const filterData =[
    {
        filterType:"Loaction",
        array:[ "Chennai","Delhi","Bangalore","Hyderabad","Pune","Mumbai"]
    },
    {
        filterType:"Industry",
        array:["FrontEnd Developer","Backend Developer","Fullstack Developer","Data Science"]
    },
    {
        filterType:"Salary",
        array:["0-40k","42-11k","1lakh to 5lakh"]
    }

]

const FilterCard = () => {
    const [selectedValue,setselectedValue] = useState("");
    const dispatch = useDispatch();

    const Changehandled = (value)=>{
        setselectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
        
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Job </h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={Changehandled}>
               {
                filterData.map((data, index)=> (
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                            data.array.map((item,idx)=>{
                                const itemId = `r${index}-${idx}`
                                return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={itemId}/>
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                ))
               }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;