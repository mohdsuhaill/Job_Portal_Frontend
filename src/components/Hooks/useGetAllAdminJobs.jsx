import { setAllAdminJobs, setAllJobs } from '@/Redux/jobSlice';
import { JOB_API_END_POINT } from '@/utilsHidder/Constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllAdminJobs = () => {
    const {token} = useSelector(store=>store.auth)
    const dispatch = useDispatch();
   useEffect(()=>{
    const fetchAllAdminJobs = async ()=>{
        try {
             const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
        
                  },
                withCredentials:true});
             if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs));
             }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllAdminJobs();
   },[])
};

export default useGetAllAdminJobs;