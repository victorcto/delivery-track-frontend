import { Box, Button, TextField, Typography } from "@mui/material";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CheckBox } from "@mui/icons-material";

const FormEncomenda = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

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
           
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Cadastrar Encomenda
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  description: yup.string().required("required"),
  adress: yup.string().required("required"),
  weight: yup.string().required("required"),
  height: yup.string().required("required"),
  length: yup.string().required("required"),
  width: yup.string().required("required"),
  price: yup.string().required("required"),
});

const initialValues = {
  description: "",
  adress: "",
  weight: "",
  height: "",
  length: "",
  width: "",
  price: "",
};

export default FormEncomenda;