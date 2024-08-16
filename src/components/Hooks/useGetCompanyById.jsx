import { setSingleCompany } from '@/Redux/companySlice';
import { setAllJobs } from '@/Redux/jobSlice';
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utilsHidder/Constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const {token} = useSelector(store=>store.auth)
    console.log("usegetIDCompany"+ token);
    
    
    const dispatch = useDispatch();
   useEffect(()=>{
    const fetchSingleCompany = async ()=>{
        try {
             const res = await axios.get(`${COMPANY_API_END_POINT}/getCompanyById/${companyId}`, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer ${token}`
      
                },
                withCredentials: true,
              },




             );
            //  console.log(res.data.company);
             
             if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
             }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchSingleCompany();
   },[companyId,dispatch])
}

export default useGetCompanyById;