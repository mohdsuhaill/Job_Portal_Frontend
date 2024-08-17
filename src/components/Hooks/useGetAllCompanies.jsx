import { setCompanies } from '@/Redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utilsHidder/Constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllCompanies = () => {
    const {token} = useSelector(store=>store.auth)
    const dispatch = useDispatch();
   useEffect(()=>{
    const fetchCompanies = async ()=>{
        try {
             const res = await axios.get(`${COMPANY_API_END_POINT}/getAllCompanies`,{
                headers: {
                    "Authorization": `Bearer ${token}`
                  },
                withCredentials:true})
             if(res.data.success){
                dispatch(setCompanies(res.data.companies));
             }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchCompanies();
   },[])
};

export default useGetAllCompanies;