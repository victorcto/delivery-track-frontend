import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useEffect, useState } from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "trackingNumber", headerName: "Número de rastreio",flex: 1,cellClassName: "name-column--cell" },
    {
      field: "parcel",
      headerName: "Produto",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { parcel } }) => {
        return (
          <>{parcel.description}</>
        );
      },
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { status } }) => {
            return (
              <>{status === "PENDING" ? "Esperando Entrega" : "A Caminho"}</>
            );
          },
    },
    {
        field: "orderDate",
        headerName: "Data do Pedido",
        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { orderDate } }) => {
          return (
            <>{orderDate.slice(8,10)}/{orderDate.slice(5,7)}/{orderDate.slice(0,4)}</>
          );
        },
    },
    {
        field: "deliveryDate",
        headerName: "Data da Entrega",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "address",
        headerName: "Endereço",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "customer",
        headerName: "Cliente",
        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { customer } }) => {
            return (
              <>{customer.name}</>
            );
          },
        },
    {
        field: "driver",
        headerName: "Motorista",
        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { driver } }) => {
            return (
              <>{driver.name}</>
            );
          },
    },
    {
        field: "price",
        headerName: "Preço",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "delivered",
        headerName: "Entregue",
        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { delivered } }) => {
            return (
              <>{delivered? "Entregue" : "Não entregue"}</>
            );
          },
    },
  ];

  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/order")
    .then(res=>{
      return res.json();
    }).then(data => {
      console.log("CLIENTEE");
      setOrderData(data);
      console.log(data);
    });
  },[]);

  return (
    <Box m="20px">
      HISTORICO
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
         
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700] ,
            borderBottom: "none",
          },
        }}
      >
        {orderData && <DataGrid checkboxSelection rows={orderData} columns={columns} components={{Tollbar: GridToolbar}}  />}
      </Box>
    </Box>
  );
};

export default Team;