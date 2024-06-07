import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { OrderItem } from "../../components/OrderItem";
import { OrderList } from "../../components/OrderList";
import { ClientItem } from "../../components/ClientItem";
import { useEffect, useState } from "react";
import { ClientList } from "../../components/ClientList";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orderList, setOrderList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [deliveredPercentage, setDeliveredPercentage] = useState({delivered: "Carregando", undelivered: "Carregando"});
  const [orderIspending, setOrderIspending] = useState(true);
  const [customeIspending, setCustomerIspending] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/order")
    .then(res=>{
      return res.json();
    }).then(data => {
      setOrderIspending(false);
      setOrderList(data);
      // console.log(data[0].customer.name);
    }).catch((error)=>{
      console.log("server is down!")
    })
  },[]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/customer")
    .then(res=>{
      return res.json();
    }).then(data => {
      setCustomerIspending(false);
      setClientList(data);
      // console.log(data[0].customer.name);
    }).catch((error)=>{
      console.log("server is down!")
    });
  },[]);
  
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/order/deadline-control")
    .then(res=>{
      return res.json();
    }).then(data => {
      setDeliveredPercentage({delivered: data.deliveredPercentage, undelivered: data.latePercentage});
      // console.log(data[0].customer.name);
    }).catch((error)=>{
      console.log("server is down!")
    });
  },[]);

  return (
    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
                variant="h3"
                sx={{ mt: "15px" }}
                mb="10px"
                pl="30px"
                fontWeight="600"
              >
              DASHBOARD
        </Typography>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="100px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          
          // backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={8}
          overflow="auto"
          borderBottom={`1px solid ${colors.primary[400]}`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quod veritatis tenetur perferendis magni veniam porro aliquid, sit debitis quo quisquam unde accusantium sed explicabo accusamus dignissimos. Soluta minus voluptate maiores eos ut provident nostrum assumenda voluptates architecto esse tempora optio, exercitationem, perspiciatis ipsam cupiditate amet perferendis accusantium quibusdam rerum. Similique repudiandae, maiores laborum ullam iusto aperiam modi! Quis iusto eos omnis id, eaque voluptatem minima commodi facere blanditiis perspiciatis magni eum consequatur eveniet ex exercitationem libero autem doloremque nemo iure cupiditate dicta! Pariatur perferendis ratione ex neque qui, vitae eveniet eligendi quam accusantium. Nihil nisi autem dolor architecto accusantium!
        </Box>
    
        {/* ROW 2 */}
        {/* CONTROLE DE PRAZOS */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          // backgroundColor={colors.primary[400]}
          p="30px"
        >

          <Typography variant="h5" fontWeight="600">
            Controle de Prazos
          </Typography>
          <Typography variant="h6" fontWeight="300" color = {colors.primary[200]}>
            controle mensal dos prazos de encomenda
          </Typography>
          
          <Box
            mt="25px"
          >
            {/* ENTREGUES */}
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
              display="flex"
              alignItems="center"
            >
              <Box width="10px" height="10px" borderRadius="9999999999px" backgroundColor="#7FD993"></Box> <Box pl={1}>
                Entregues
              </Box>
            </Typography>
            <Box pl={"18px"}>{deliveredPercentage.delivered}%</Box>

            {/* NÃO ENTREGUES */}
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
              display="flex"
              alignItems="center"
            >
              <Box width="10px" height="10px" borderRadius="9999999999px" backgroundColor="#CE5656">
              {/* circulo vermelho */}
              </Box> 
              <Box pl={1}>Não entregues</Box>
            </Typography>
            <Box pl={"18px"}>{deliveredPercentage.undelivered}%</Box>

          </Box>
        </Box>

        {/* ULTIMAS ENCOMENDAS */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          // backgroundColor={colors.primary[400]}
          borderLeft={`1px solid ${colors.primary[400]}`}
          borderRight={`1px solid ${colors.primary[400]}`}
          p="30px"
        >
          
          <Typography variant="h5" fontWeight="600">
          Últimas Encomendas
          </Typography>
          <Typography variant="h6" fontWeight="300" color = {colors.primary[200]}>
            4 últimas encomendas cadastradas
          </Typography>

          <Box mt="25px">
              {orderIspending ? "Carregando" : <OrderList orderList={orderList}/>} 
          </Box>
        </Box>

        {/* CLIENTES FIXADOS */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          // backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Clientes Fixados
          </Typography>
          <Typography variant="h6" fontWeight="300" color = {colors.primary[200]}>
            4 Últimos clientes fixados
          </Typography>

          <Box mt="25px">
            {customeIspending ? "Carregando" : <ClientList clientList={clientList}/>}
            {/* s */}
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;