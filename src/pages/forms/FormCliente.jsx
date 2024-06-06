import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CheckBox } from "@mui/icons-material";
import { useState } from "react";
import { tokens } from "../../theme";

const FormCliente = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isPending, setIsPending] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  const handleFormSubmit = (values) => {
    setIsPending(true);
    fetch('http://localhost:8080/api/v1/customer',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    }
    ).then(()=>{
      setIsPending(false);
      setIsSend(true);
      console.log(JSON.stringify(values))
    });
  };

  return (
    <Box m="20px">
      <Typography
                variant="h3"
                sx={{ mt: "15px" }}
                mb="20px"
                fontWeight="600"
              >
              CADASTRAR NOVO CLIENTE
        </Typography>
      {
      isSend? 
      (
      <>
        <Typography variant="h4" fontWeight="600" sx={{textAlign:"center", color:colors.greenAccent[500]}}>
          Cliente Cadastrado!
        </Typography>

        <Box display="flex" justifyContent="center" mt="20px">
          <Button type="submit" color="primary" variant="contained" onClick={()=>{setIsSend(false)}} sx={{justifyContent:"center"}}>
          Cadastrar Novo Cliente
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
                  label="Empresa"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
              
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Número de contato"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 3" }}
                />

              <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                  <label>
                      <Field type="checkbox" name="favorite" />
                      Favorito
                  </label>
              </Box>
            
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="primary" variant="contained">
                  {isPending? "Cadastrando" : isSend ? "Enviado" :"Cadastrar cliente"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>)
      }
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
    favorite: yup.string().required("required")
});
const initialValues = {
  name: "",
  email: "",
  phone: "",
  favorite: false
};

export default FormCliente;