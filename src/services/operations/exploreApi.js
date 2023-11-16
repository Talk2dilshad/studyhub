import toast from "react-hot-toast"
import { apiConnector } from "../microservices";
import { catalogData } from "../apis";



export const getCatalogPageData = async(categoryId) =>{
    const toastId = toast.loading("loading...");
    let result = [];
    try{
        const response = await apiConnector("POST",
        catalogData.CATALOGPAGEDATA_API,
        {
            categoryId:categoryId,
        })
        if(!response?.data?.success){
            throw new Error("Could not fetch data");
        }
        result= response?.data
    }catch (error) {
        toast.error(error.message)
        result = error.response?.data
    }
    toast.dismiss(toastId)
    return result
}