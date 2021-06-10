//import React, { useState } from 'react';
import NavBar from "../NavBar";
import Images from "./Images";

function Albums(){
    const pictures = [
        {
            image: 'https://images.unsplash.com/photo-1601933470096-0e34634ffcde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
        },
        {
            image: 'https://images.unsplash.com/photo-1623040594022-bc570093fbcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
        },
        {
            image: 'https://images.unsplash.com/photo-1623166199813-50c57ede030b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
        },
        {
            image: 'https://images.unsplash.com/photo-1623229502229-b244c3481d0a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
        }
    ];
    return (
        <div className="h-auto bg-primary w-full text-white">
            <NavBar />
            <Images pictures={pictures}/>
        </div>
    )
}
export default Albums;
