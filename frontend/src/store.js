import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer 
} from "./reducers/productReducers";

import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/userReducers";


import {cartReducer} from "./reducers/cartReducers"

import {newOrderReducer, myOrdersReducer, orderDetailsReducer } from "./reducers/orderReducer"

const rootreducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct : newProductReducer,
  newReview: newReviewReducer,
  auth: authReducer,
  userR: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder:newOrderReducer,
  myOrders: myOrdersReducer ,
  orderDetails: orderDetailsReducer
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
}
};

const middleware = [thunk];

const store = createStore(
  rootreducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// import React from "react";
// import { Grid, Paper, Avatar, TextField, Button, Box } from "@mui/material";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
// import { useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// // // import Message from "../components/Message.jsx";
// // // import Loader from "../components/Loader.jsx";

// import { login } from "../actions/userActions";

// const LoginScreen = () => {

//   const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

//   const initialValues = {
//     username: "",
//     password: "",
//   }

//   const validationSchema = Yup.object().shape({
//     username: Yup.string().min(5, "Minimum characters should be 5").required("Required"),
//     password: Yup.string().min(8, "Minimum characters should be 8")
//     .matches(passwordRegExp,"Password must have one upper, lower case, number, special symbol")
//     .required("Required")

//   })

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => {
//     return state.userLogin;
//   });

//   // const { error, userInfo, loading } = userLogin;
//     const { userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo) {
//       navigate("/services");
//     }
//   }, [userInfo, navigate]);

//   const onSubmit = (values, props) => {

//     const {username, password} = values;

//     dispatch(login(username, password));

//     setInterval(()=>{
//       props.resetForm()
//     }, 2000)

//   };

//   return (
//     <>
//       <Grid>
//         <Box
//           component='img'
//           className='imageContainer'
//           alt='The house from the offer.'
//           src='/logo.png'
//         />

//         <Paper elevation={6} className='paperStyle'>
//           <Grid align='center' sx={{ mb: 4 }}>
//             <Avatar className='avatarStyle'>
//               <LockPersonOutlinedIcon />{" "}
//             </Avatar>

//             <h1> Sign In</h1>
//           </Grid>
//           <Formik initialValues = {initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//             {(props) => (
//               <Form noValidate>

//                 {/* {console.log(props)} */}

//                 <Field as= {TextField}
//                   sx={{ mt: 1.5 }}
//                   label='username'
//                   name='username'
//                   placeholder='Enter username'
//                   margin='dense'
//                   variant='outlined'
//                   color='secondary'
//                   fullWidth
//                   required
//                   error = {props.errors.username && props.touched.username}
//                   helperText={<ErrorMessage name= "username" />}

//                 />
//                 < Field as = {TextField}
//                   sx={{ mt: 1.5 }}
//                   label='password'
//                   name="password"
//                   placeholder="Enter password"
//                   type='password'
//                   margin='dense'
//                   variant='outlined'
//                   color='secondary'
//                   fullWidth
//                   required
//                   error = {props.errors.password && props.touched.password}
//                   helperText={<ErrorMessage name="password" />}

//                 />
//                 <Button
//                   sx={{ mt: 4 }}
//                   type='submit'
//                   variant='contained'
//                   fullWidth
//                 >
//                   {" "}
//                   Submit{" "}
//                 </Button>
//               </Form>
//             )}
//           </Formik>
//         </Paper>
//       </Grid>
//     </>
//   );
// };

// export default LoginScreen;

// //  import React from "react";
// // import { useState, useEffect } from "react";
// // import { Form, Button } from "react-bootstrap";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";

// // // import Message from "../components/Message.jsx";
// // // import Loader from "../components/Loader.jsx";

// // import { login } from "../actions/userActions";
// // // import FormContainer from "../components/FormContainer";

// // const LoginScreen = () => {

// //  const [name, setName] = useState("");
// //  const [password, setPassword] = useState("");

// //  const navigate = useNavigate();

// // const dispatch = useDispatch();

// // const userLogin = useSelector((state)=>{
// //   return state.userLogin
// // })

// // const {error, userInfo, loading} = userLogin;

// // useEffect(()=>{
// //   if(userInfo){
// //     navigate("/services")
// //   }

// // }, [userInfo, navigate])

// //  const submitHandler = (e) =>{
// //   e.preventDefault();
// //   dispatch(login(name, password))
// //  }

// //   return (
// //     <>
// //       <FormContainer>
// //       <h1> Sign In </h1>

// //       {error && <Message variant="danger">{error}</Message>}
// //       {loading && <Loader />}
// //         <Form onSubmit={submitHandler}>
// //           <Form.Group controlId='nameLogin'>
// //             <Form.Label> UserName </Form.Label>
// //             <Form.Control
// //               type='string'
// //               placeholder='Enter userName'
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //             ></Form.Control>
// //           </Form.Group>

// //           <Form.Group controlId='password'>
// //             <Form.Label> Password</Form.Label>
// //             <Form.Control
// //               type='password'
// //               placeholder='Enter password'
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             ></Form.Control>
// //           </Form.Group>

// //           <Button className='my-3' type='submit' variant='primary'>
// //             {" "}
// //             Sign In
// //           </Button>
// //         </Form>
// //       </FormContainer>
// //     </>
// //   );
// // };

// // export default LoginScreen;

// import React from "react";
// import { Grid, Paper, TextField, Button, Box, Typography } from "@mui/material";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const SensorScreen = () => {
//   const initialValues = {
//     confidence_threshold: "",
//     occupancy_sensitivity: "",
//     width: "",
//     height: "",
//     degree: "",
//     model_input_threshold: "",
//     IOU_threshold: "",
//     sleep_time: "",
//   };

//   const validationSchema = Yup.object().shape({
//     confidence_threshold: Yup.number().typeError("Confidence Threshold should be number").required("Required"),
//     occupancy_sensitivity: Yup.number().typeError("Occupancy Sensitivity should be number").required("Required"),
//     width: Yup.number().typeError("Width should be number").required("Required"),
//     height: Yup.number().typeError("Height should be number").required("Required"),
//     degree: Yup.number().typeError("Degree should be number").required("Required"),
//     model_input_threshold: Yup.number().typeError("Model Input Threshold should be number").required("Required"),
//     IOU_threshold: Yup.number().typeError("IOU threshold should be number").required("Required"),
//     sleep_time: Yup.number().typeError("Sleep Time should be number").required("Required"),
//   });

//   const onSubmit = (values, props) => {
//     const {confidence_threshold, occupancy_sensitivity,  width,  height, degree,  model_input_threshold,  IOU_threshold,  sleep_time } = values;
//     console.log(confidence_threshold, occupancy_sensitivity,  width,  height, degree,  model_input_threshold,  IOU_threshold,  sleep_time);

//     setInterval(() => {
//       props.resetForm();
//     }, 2000);
//   };

//   return (
//     <>
//       {/* <Typography
//         style={{ marginTop: "20px" }}
//         gutterBottam
//         variant='h4'
//         align='center'
//       >
//         Welcome To Sensor Screen
//       </Typography> */}

//       <Grid>
//         <Paper
//           style={{ maxWidth: 950, padding: "30px 20px", margin: "15px auto" }}
//           elevation={20}
//         >
//           <Box
//             component='img'
//             className='imageContainer'
//             alt='The house from the offer.'
//             src='/logo.png'
//           />

//           <Box>
//             {/* <CardContent> */}
//             <Typography
//               className='sectionHeading'
//               variant='h5'
//               component='p'
//               gutterBottom
//             >
//               Sensor Description
//             </Typography>

//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={onSubmit}
//             >
//               {(props) => (
//                 <Form noValidate>
//                   <Grid container spacing={2}>
//                     <Grid xs={12} item>
//                       <Typography
//                         variant='body2'
//                         color='grey'
//                         component='p'
//                         gutterBottom
//                       >
//                         Configure sensor sensitivity{" "}
//                       </Typography>
//                       <Grid container spacing={1}>
//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='purple'
//                             component='p'
//                           >
//                             Confidence Threshold
//                           </Typography>
//                           <Field
//                             as={TextField}
//                             placeholder='Enter confidence threshold'
//                             name='confidence_threshold'
//                             // label='Confidence Threshold'
//                             variant='standard'
//                             fullWidth

//                             type="number"
//                             required
//                             error = {props.errors.confidence_threshold && props.touched.confidence_threshold}
//                             helperText={<ErrorMessage name= "confidence_threshold" />}
//                           />
//                         </Grid>

//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='purple'
//                             component='p'
//                           >
//                             Occupancy Sensitivity
//                           </Typography>
//                           <Field
//                             as={TextField}
//                             placeholder='Enter occupancy sensitivity'
//                             name='occupancy_sensitivity'
//                             // label='Occupancy Sensitivity'
//                             variant='standard'

//                             fullWidth
//                             type="number"
//                             required
//                             error = {props.errors.occupancy_sensitivity && props.touched.occupancy_sensitivity}
//                             helperText={<ErrorMessage name= "occupancy_sensitivity" />}
//                           />
//                         </Grid>
//                       </Grid>
//                     </Grid>

//                     {/* ------- */}

//                     <Grid xs={12} item>
//                       <Typography
//                         variant='body2'
//                         color='grey'
//                         component='p'
//                         gutterBottom
//                       >
//                         Configure resolution
//                       </Typography>
//                       <Grid container spacing={1}>
//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='purple'
//                             component='p'
//                           >
//                             Width
//                           </Typography>
//                           <Field
//                             as={TextField}
//                             placeholder='Enter width'
//                             name='width'
//                             // label='Width'
//                             variant='standard'
//                             fullWidth

//                             type="number"
//                             required
//                             error = {props.errors.width && props.touched.width}
//                             helperText={<ErrorMessage name= "width" />}
//                           />
//                         </Grid>

//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='purple'
//                             component='p'
//                           >
//                             Height
//                           </Typography>
//                           <Field
//                             as={TextField}
//                             placeholder='Enter height'
//                             name='height'
//                             // label='Height'
//                             variant='standard'

//                             type="number"
//                             fullWidth
//                             required
//                             error = {props.errors.height && props.touched.height}
//                             helperText={<ErrorMessage name= "height" />}
//                           />
//                         </Grid>
//                       </Grid>
//                     </Grid>

//                     {/*
//                   --------- */}

//                     <Grid xs={12} item>
//                       <Typography
//                         variant='body2'
//                         color='grey'
//                         component='p'
//                         gutterBottom
//                       >
//                         Best angle for people count
//                       </Typography>
//                       <Grid container spacing={1}>
//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='purple'
//                             component='p'
//                           >
//                             Degree
//                           </Typography>
//                           <Field
//                             as={TextField}
//                             placeholder='Enter Degree'
//                             name='degree'
//                             // label='Degree'
//                             variant='standard'
//                             fullWidth

//                             type="number"
//                             required
//                             error = {props.errors.degree && props.touched.degree}
//                             helperText={<ErrorMessage name= "degree" />}
//                           />
//                         </Grid>

//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='purple'
//                             component='p'
//                           >
//                             Model Input Resolution
//                           </Typography>
//                           <Field
//                             as={TextField}
//                             placeholder='Enter model_input_resolution'
//                             name='model_input_threshold'
//                             // label='Model Input Resolution'
//                             variant='standard'
//                             fullWidth

//                             type="number"
//                             required
//                             error = {props.errors.model_input_threshold && props.touched.model_input_threshold}
//                             helperText={<ErrorMessage name= "model_input_threshold" />}
//                           />
//                         </Grid>
//                       </Grid>
//                     </Grid>

//                     {/* ---------- */}

//                     <Grid xs={12} item>
//                       <Typography
//                         variant='body2'
//                         color='grey'
//                         component='p'
//                         gutterBottom
//                       >
//                         Threshold
//                       </Typography>
//                       <Grid container spacing={1}>
//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='purple'
//                             component='p'
//                           >
//                             IOU Threshold
//                           </Typography>
//                           <Field
//                             as={TextField}
//                             placeholder='Enter IOU threshold'
//                             name='IOU_threshold'
//                             // label='IOU Threshold'
//                             variant='standard'
//                             fullWidth

//                             required
//                             type="number"
//                             error = {props.errors.IOU_threshold && props.touched.IOU_threshold}
//                             helperText={<ErrorMessage name= "IOU_threshold" />}

//                           />
//                         </Grid>

//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='purple'
//                             component='p'
//                           >
//                             Sleep Time
//                           </Typography>
//                           <Field
//                             as={TextField}
//                             placeholder='Enter sleep time'
//                             name='sleep_time'
//                             // label='Sleep Time'
//                             variant='standard'
//                             fullWidth

//                             required
//                             type="number"
//                             error = {props.errors.sleep_time && props.touched.sleep_time}
//                             helperText={<ErrorMessage name= "sleep_time" />}
//                           />
//                         </Grid>
//                       </Grid>

//                       <Button
//                         variant='contained'
//                         type='submit'
//                         sx={{ mt: 4 }}
//                         fullWidth
//                         size='large'
//                       >
//                         {" "}
//                         Save Sensor Configuration{" "}
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Form>
//               )}
//             </Formik>

//             {/* </CardContent> */}
//           </Box>
//         </Paper>
//       </Grid>
//     </>
//   );
// };

// export default SensorScreen;

// import React from "react";
// import {
//   Grid,
//   Paper,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Tooltip,
// } from "@mui/material";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const MqttScreen = () => {

//   const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

//   const initialValues = {
//     broker: "",
//     port: "",
//     people_count: "",
//     device_health: "",
//     username: "",
//     password: "",
//     mqtt_certificate: "",
//     certificate_file: "",
//   };

//   const validationSchema = Yup.object().shape({
//     broker: Yup.number().required("Required"),
//     port: Yup.number().typeError("port should be number").required("Required"),
//     people_count: Yup.string().required("Required"),
//     device_health: Yup.string().required("Required"),
//     username: Yup.string().min(5, "Minimum characters should be 5").required("Required"),
//     password: Yup.string().min(8, "Minimum characters should be 8")
//     .matches(passwordRegExp,"Password must have one upper, lower case, number, special symbol")
//     .required("Required"),
//     mqtt_certificate: Yup.string().required("Required"),
//     certificate_file: Yup.string().required("Required")

//   });

//   const onSubmit = (values, props) => {
//    console.log(values)

//     // setInterval(() => {
//     //   props.resetForm();
//     // }, 2000);
//   };

//   return (
//     <>
//       <Grid>
//         <Paper
//           style={{ maxWidth: 950, padding: "30px 20px", margin: "5px auto" }}
//           elevation={20}
//         >
//           <Box
//             component='img'
//             className='imageContainer'
//             alt='The house from the offer.'
//             src='/logo.png'
//           />

//           <Box>
//             {/* <CardContent> */}
//             <Typography
//               className='sectionHeading'
//               variant='h5'
//               component='p'
//               gutterBottom
//             >
//               MQTT  Description
//             </Typography>

//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={onSubmit}
//             >
//               {(props) => (
//                 <Form>
//                   <Grid container spacing={2}>

//                     {/* ---------- */}

//                     <Grid xs={12} item>
//                       <Typography
//                         variant='body2'
//                         color='grey'
//                         component='p'
//                         gutterBottom
//                       >
//                         Configure SSL Certificate for MQTT
//                       </Typography>
//                       <Grid container spacing={1}>
//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='blue'
//                             component='p'
//                           >
//                             certficate file for mqtt communication
//                           </Typography>
//                           <TextField
//                             placeholder='Submit MQTT certificate'
//                             name="mqtt_certificate"
//                             // label='MQTT certificate'
//                             variant='standard'
//                             fullWidth

//                             required
//                             error = {props.errors.mqtt_certificate && props.touched.mqtt_certificate }
//                             helperText={<ErrorMessage name="mqtt_certificate" />}
//                           />
//                         </Grid>

//                         <Grid xs={6} item>
//                           <Typography
//                             variant='caption'
//                             color='blue'
//                             component='p'
//                           >
//                             MQTT Certificate File
//                           </Typography>
//                           <TextField
//                             placeholder='Enter MQTT certificate File'
//                             name='certificate_file'
//                             // label='MQTT certificate File'
//                             variant='standard'
//                             fullWidth

//                             required
//                             error = {props.errors.certificate_file && props.touched.certificate_file }
//                             helperText={<ErrorMessage name= "certificate_file" />}
//                           />
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                     <Button
//                         variant='contained'
//                         type='submit'
//                         sx={{ mt: 4, mb: 4 }}
//                         size='medium'
//                       >
//                         {" "}
//                         Save MQTT Configuration{" "}
//                       </Button>
//                   </Grid>
//                 </Form>
//               )}
//             </Formik>
//           </Box>

//           {/* --RESET MQTT------- */}

//           <Box>

//             <Typography
//               className='sectionHeading'
//               variant='h5'
//               component='p'
//               gutterBottom
//             >
//               MQTT RESET OUTLINE
//             </Typography>

//             <form>
//               <Grid container spacing={1}>

//                 <Grid xs={12} item>
//                   <Typography
//                     variant='body2'
//                     color='purple'
//                     component='p'
//                     gutterBottom
//                   >
//                     Reset the Mqtt Settings
//                   </Typography>
//                   <Grid container spacing={1}>
//                     <Grid xs={6} item>
//                       <Typography variant='caption' color='grey' component='p'>
//                         Resets MQTT certificate, user name and password
//                       </Typography>
//                       <TextField
//                         placeholder='Type YES if reset is needed'
//                         label='Type YES'
//                         variant='medium'
//                         required
//                       />
//                     </Grid>
//                   </Grid>

//                   <Grid xs={12} item>
//                   <Button
//                     variant='contained'
//                     type='submit'
//                     sx={{ mt: 4 }}
//                     fullWidth
//                     size='large'
//                   >
//                     {" "}
//                     RESET MQTT Configuration{" "}
//                   </Button>

//                      </Grid

//                 </Grid>
//               </Grid>
//             </form>
//           </Box>
//         </Paper>
//       </Grid>
//     </>
//   );
// };

// export default MqttScreen;
