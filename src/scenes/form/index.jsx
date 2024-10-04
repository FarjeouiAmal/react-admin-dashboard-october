
import { Box, Button, TextField } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
 import Header from "../../components/Header";

const Form = () => {
 
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // const handleFormSubmit = (values, { setSubmitting }) => {
  //   // Ajoutez ici la logique pour envoyer les données (vous pouvez utiliser fetch ou axios, par exemple)

  //   // Après avoir traité les données, redirigez vers la page des listes de restaurants
   

  //   // Indiquez à Formik que la soumission est terminée
  //   setSubmitting(false);
  // };

  return (
    <Box m="5px">
      <Header title="Ajouter un Restaurent" />

      <Formik
        
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
        //isSubmitting, // Ajout de la propriété isSubmitting
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
                type="string"
                label="Matricule"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id}
                name="id"
                error={!!touched.id && !!errors.id}
                helperText={touched.id && errors.id}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom Resto"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nom}
                name="nom"
                error={!!touched.nom && !!errors.nom}
                helperText={touched.nom && errors.nom}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numéro de Téléphone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Région"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}

              />
                <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date d'inscription"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="30px">
              <Link
               to={"/listeResto"}
               
                 // Désactive le bouton pendant la soumission
              >
               <Button variant="contained" color="success">Ajouter</Button>
              </Link>
            </Box>

           
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  id: yup.string().required("Matricule non valide"),
  nom: yup.string().required("nom non valide"),
  email: yup.string().email("email non valide").required("required"),
  téléphone: yup
    .string()
    .matches(phoneRegExp, "le numéro de téléphone n'est pas valide")
    .required("required"),
  city: yup.string().required("région non valide"),
  address: yup.string().required("address non valide"),
  date: yup.date().required("Date d'inscription non valide"),
});
const initialValues = {

  nom: "",
  email: "",
   contact: "",
  city: "",
  address: "",
  date: new Date().toLocaleDateString(), // Ajoutez cette ligne pour la date initiale
};

export default Form;
