import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utilsHidder/Constant';
import { setSingleJob } from '@/Redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {

    const {singleJob} = useSelector(store=>store.job)
    const {user,token}= useSelector(store=>store.auth)
    const isIntiallyApplied = singleJob?.applications?.some(application=>application.applicant === user?._id) || false;
    const [isApplied,setIsApplied] = useState(isIntiallyApplied)

    const params = useParams();
    const jobId = params.id; 
    const dispatch = useDispatch();

    const applyJobHandler = async ()=>{
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                  },
                withCredentials:true});
            // console.log(res.data);
            
            if(res.data.success){
                setIsApplied(true)  // state update local 
                const updateSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob)); // this is using for  real time UI update
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }

    useEffect(()=>{
        const fetchSingleJobs = async ()=>{
            try {
                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                //  console.log(res);
                 
                 if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // sync with fetch data 
                 }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchSingleJobs();
       },[jobId,dispatch,user?._id])
    return (
        <div className='max-w-7xl mx-auto my-10 '>
            <div className='flex items-center justify-between'>
            <div>
            <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
               <div className='flex items-center gap-2 mt-4'>
                <Badge className={"text-blue-700"} variant={"ghost"}>{singleJob?.postion}Positions</Badge>
                <Badge className={"text-red-700"} variant={"ghost"}>{singleJob?.jobType}Part Time</Badge>
                <Badge className={"text-black-700"} variant={"ghost"}>{singleJob?.salary}LPA</Badge>
               </div>
            </div>
               <Button onClick={isApplied ? null : applyJobHandler}
               disabled={isApplied} 
               className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#6636ba]"}`}>
                {isApplied ? 'Already Applied ': " Apply Now"}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
              <h1 className='font-bold my-1' >Role: <span className='pl-4 font-normal text-gray-800 '>{singleJob?.title}</span></h1>
              <h1 className='font-bold my-1' >Location: <span className='pl-4 font-normal text-gray-800 '>{singleJob?.location}</span></h1>
              <h1 className='font-bold my-1' >Description: <span className='pl-4 font-normal text-gray-800 '>{singleJob?.description}</span></h1>
              <h1 className='font-bold my-1' >Experience: <span className='pl-4 font-normal text-gray-800 '>{singleJob?.experience}yrs</span></h1>
              <h1 className='font-bold my-1' >Salary: <span className='pl-4 font-normal text-gray-800 '>{singleJob?.salary}LPA</span></h1>
              <h1 className='font-bold my-1' >Total Application: <span className='pl-4 font-normal text-gray-800 '>{singleJob?.applications?.length}</span></h1>
              <h1 className='font-bold my-1' >Posted Data: <span className='pl-4 font-normal text-gray-800 '>{singleJob?.createdAt.split("T")[0]}</span></h1>
              
            </div>

        </div>
    );
};

export default JobDescription;