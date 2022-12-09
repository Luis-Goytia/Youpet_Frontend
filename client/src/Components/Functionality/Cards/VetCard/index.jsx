import React from "react";
//import { AiFillStar ,AiOutlineStar} from 'react-icons/ai';
//import {BsStarHalf} from 'react-icons/bs'
import "./VetCard.css"
export default function VetCard({ name, lastname, img }) {
    //rating con estrellas
    /* if(rating){
        for(let i = 1; i <= Math.floor(rating); i++){
            rating.push(<AiFillStar />)
        }
        if ((rating - Math.floor(rating))>= 0.5) {
            rating.push(<BsStarHalf/>)
        }
    } */
    return (
        <div className="cardv">
            <div className="cardv_image">
                <img src={img} alt="Not found" />
            </div>
            <div className="cardv_title title-white">
                <p>{name} {lastname}</p>
                {/* {rating ? rating.map(el => (<p id="rating" key={rating + 1 * Math.random()}>{el}</p>)) : <AiOutlineStar />} */}
            </div>
        </div>
    );
}
