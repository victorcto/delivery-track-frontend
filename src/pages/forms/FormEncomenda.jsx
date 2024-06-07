import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CheckBox } from "@mui/icons-material";
import { useEffect, useState } from "react";
import data from './data'
import { tokens } from "../../theme";

const FormEncomenda = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isPending, setIsPending] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cl,setCl] = useState([]);
  const [mt,setMt] = useState([]);

  const handleFormSubmit = (values) => {
    setIsPending(true);
    fetch('http://localhost:8080/api/v1/order',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        parcel: {
            description: values.description,
            width: values.width,
            height: values.height,
            length: values.length,
            weight: values.weight
        },
        address: values.adress,
        customerId: values.customerId,
        driverId: values.driverId,
        price: values.price
      })
    }
    ).then(()=>{
      setIsPending(false);
      setIsSend(true);
      console.log(JSON.stringify(values))
    });
  };

  useEffect(() => {
    const clients = [];

    fetch("http://localhost:8080/api/v1/customer")
    .then(res=>{
      return res.json();
    }).then(data => {
      console.log("CLIENTEE BEFORE");
      console.log(clients);
      for (let index = 0; index < data.length; index++) {
        clients.push(<MenuItem value={data[index].id}>{data[index].name}</MenuItem>);
      }
      console.log("CLIENTEE AFTER");
      setCl(clients);
      console.log(clients);
    });
  },[]);

  console.log("drivers before for")
  useEffect(() => {
    const drivers = [];

    fetch("http://localhost:8080/api/v1/driver")
    .then(res=>{
      return res.json();
    }).then(data => {
      console.log("MOTORISTA");
      console.log("Lengthb: "+ data.length)
      for (let index = 0; index < data.length; index++) {
        drivers.push(<MenuItem value={data[index].id}>{data[index].name}</MenuItem>);
      }
      console.log("Lengtha: "+ data.length)
      setMt(drivers);
      console.log("drivers content");
      console.log(drivers);
    });
  },[]);

  return (
    <Box m="20px">
      <Typography
                variant="h3"
                sx={{ mt: "15px" }}
                mb="20px"
                fontWeight="600"
              >
              CADASTRAR NOVA ENCOMENDA
      </Typography>
        {
      isSend? 
      (
      <>
      <Typography variant="h4" fontWeight="600" sx={{textAlign:"center", color:colors.greenAccent[500]}}>
        Encomenda Cadastrada!
      </Typography>

        <Box display="flex" justifyContent="center" mt="20px">
          <Button type="submit" color="primary" variant="contained" onClick={()=>{setIsSend(false)}} sx={{justifyContent:"center"}}>
          Cadastrar Nova Encomenda
          </Button>
        </Box>
      </>
      ): (
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descrição"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Endereço"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adress}
                name="adress"
                error={!!touched.adress && !!errors.adress}
                helperText={touched.adress && errors.adress}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Preço"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Largura"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.width}
                name="width"
                error={!!touched.width && !!errors.width}
                helperText={touched.width && errors.width}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Comprimento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.length}
                name="length"
                error={!!touched.length && !!errors.length}
                helperText={touched.length && errors.length}
                sx={{ gridColumn: "span 2" }}
              />


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Altura"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.height}
                name="height"
                error={!!touched.height && !!errors.height}
                helperText={touched.height && errors.height}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Peso"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.weight}
                name="weight"
                error={!!touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
                sx={{ gridColumn: "span 2" }}
              />   

              <FormControl  sx={{ gridColumn: "span 2"}}
              error={!!touched.driverId && !!errors.driverId}
              onBlur={handleBlur}
              helperText={touched.driverId && errors.driverId} >
                <InputLabel id="driverInput" sx={{marginTop:"10px"}}>Motorista</InputLabel>
                <Select
                  labelid="driver"
                  id="driverSelect"
                  value={values.driverId}
                  name="driverId"
                  variant="filled"
                  onChange={handleChange}

                  
                >
                  {mt}
                </Select>
                {!!errors.driverId && !!touched.driverId && <Typography fontSize={10} sx={{ml:2,mt:0.5, color:"#D32F2F"}}>Obrigatório</Typography>}
              </FormControl>  

              <FormControl  
                sx={{ gridColumn: "span 2"}}
                error={!!touched.customerId && !!errors.customerId}
                onBlur={handleBlur}
                helperText={touched.customerId && errors.customerId} >
                <InputLabel id="clientInput" sx={{marginTop:"10px"}}>Cliente</InputLabel>
                <Select
                  labelid="client"
                  id="clientSelect"
                  value={values.customerId}
                  name="customerId"
                  variant="filled"
                  onChange={handleChange}
                >
                  {cl}
                </Select>
                {!!errors.customerId && !!touched.customerId && <Typography fontSize={10} sx={{ml:2,mt:0.5, color:"#D32F2F"}}>Obrigatório</Typography>}
              </FormControl>  

            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Cadastrar Encomenda
              </Button>
            </Box>
          </form>
        )}
      </Formik>)
      }
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  description: yup.string().required("Obrigatório"),
  adress: yup.string().required("Obrigatório"),
  weight: yup.string().required("Obrigatório"),
  height: yup.string().required("Obrigatório"),
  length: yup.string().required("Obrigatório"),
  width: yup.string().required("Obrigatório"),
  price: yup.string().required("Obrigatório"),
  driverId: yup.string().required("Obrigatório"),
  customerId: yup.string().required("Obrigatório"),
  
});

const initialValues = {
  description: "",
  adress: "",
  weight: "",
  height: "",
  length: "",
  width: "",
  price: "",
  driverId: "",
  customerId: "",
};

export default FormEncomenda;