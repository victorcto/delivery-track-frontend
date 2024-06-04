import { OrderItem } from "./OrderItem";

export const OrderList = ({orderList=[{name:"luiz"}]}) => {
        
    const orderItens = [];
    console.log(orderList);
    for (let index = 0; index < orderList.length; index++) {
        if(index === 4){
            break;
        }
        orderItens.push(<OrderItem clientName={orderList[index].customer.name} key={orderList[index].id} date="22/04/2024" imgName={`apple.png`}/>)
    }

    return ( 
    <>
        {orderItens}
    </> 
    );
}