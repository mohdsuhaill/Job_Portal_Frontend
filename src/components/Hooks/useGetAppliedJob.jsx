import { setAllAppliedJobs } from "@/Redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utilsHidder/Constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAppliedJobs = ()=>{
    const {token} = useSelector(store=>store.auth)
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async ()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                      },
                    withCredentials:true});
                // console.log(res.data);
                
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAppliedJobs();
    },[])
}

export default useGetAppliedJobs;