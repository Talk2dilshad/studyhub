import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";



export default function Cart() {

    const {total, totalItems} = useSelector((state)=>state.cart);
    console.log("total cart ",total,totalItems);

    return (
        <div className="text-white ml-[50px] md:ml-[100px] gap-2">
            <div className="gap-1 mb-2">
            <h1> Your Cart</h1>
            <p>{totalItems} Courses in Cart</p>
            </div>

            {totalItems > 0 
            ? (<div>
                <RenderCartCourses />
                <RenderTotalAmount />
            </div>)
            : (<p>Your Cart is Empty</p>)}
        </div>
    )
}