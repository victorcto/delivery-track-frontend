import { useEffect, useState } from "react";
import { ClientItem } from "./ClientItem";

export const ClientList = ({clientList}) => {
    
    const clientItens = [];
    for (let index = 0; index < clientList.length; index++) {
        if(index === 4) break;
        clientItens.push(<ClientItem customerName={clientList[index].name} customerEmail={clientList[index].email} customerPhone={clientList[index].phone}/>);

    }
    console.log("clientList[VECTOR]>>>>>>");
    console.log(clientItens);

    return ( 
    <>
        {clientItens}
    </> 
    );
}