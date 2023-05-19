import React, { useState , useEffect} from 'react';
import { Grid, TextField, Button } from '@mui/material';

import { collection, updateDoc, serverTimestamp, doc, setDoc, getDoc, query, getDocs, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';

import { Box, IconButton, InputAdornment, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Add as AddIcon, PhotoCamera, PersonAdd, Edit, CameraAltOutlined  } from '@mui/icons-material';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditAdmin = (props) => {

    const [allBatches, setAllBatches] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [timestamp, setTimestamp] = useState('');
    
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);




    useEffect(() => {
        fetchData();
    
      }, []);
    
      const fetchData = async () => {
        const docRef = doc(db, "trainers/" ,props.id,);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name)
          setPhone(data.phone)
          setEmail(data.email)
          setImagePreview(data.imageUrl)
          setTimestamp(data.timestamp)

          console.log(docSnap.data());
        }
        else{
          console.log("no dattatatataatata");
        }
    
      };


    const handlePhoneChange = (event) => {
        const value = event.target.value;
        const cleanedValue = value.replace(/\D/g, "");
        setPhone(cleanedValue);
    };





    function capitalizeString(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }



    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        setImage(e.target.files[0]);
    
        reader.onload = () => {
          setImagePreview(reader.result);
        };
    
        reader.readAsDataURL(file);
      };




 


      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (name && email && phone) {
          try {
            let imageLink = imageUrl;
    
      
            if (image) {
              const storageRef = ref(storage, `users/${image.name}`);
              await uploadBytes(storageRef, image);
              imageLink = await getDownloadURL(storageRef);
            }

            else{
              imageLink= imagePreview;
            }
      
            const userRef = doc(db, "trainers/" , props.id );
            const newUser = {
              name: name ? name : "",
              email: email ? email : "",
              // phone: '+91'+phone ? phone : "",
              timestamp: timestamp ? timestamp : "",
              imageUrl: imageLink,
            };
      
            await updateDoc(userRef, newUser,  { merge: true });
            console.log("User edited successfully!");
            props.handleSubmit();
          } catch (error) {
            console.error("Error adding project: ", error);
          }
        } else {
          toast.error('Please fill in all fields', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
    
    
    
         
  



  return (
    <div>
      <br/>

      <Grid container spacing={2}>


      <Grid item xs={2.5}>
  <div style={{ marginBottom: "10px", width: "120px", height: "120px", borderRadius: "50%", overflow: "visible", position: "relative" }}>
    <img src={imagePreview ? imagePreview : "https://via.placeholder.com/120x120"} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
    <input
      accept="image/*"
      type="file"
      id="image-upload"
      onChange={handleImageUpload}
      style={{ display: "none" }}
    />
    <label htmlFor="image-upload" style={{ position: "absolute", bottom: "-15%", right: "-15%", display: "flex", justifyContent: "center", alignItems: "center", width: "40%", height: "40%", borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)", cursor: "pointer" }}>
      <IconButton component="span" size="small" style={{ color: "#2196f3" }}>
        <CameraAltOutlined />
      </IconButton>
    </label>
  </div>
</Grid>



      <Grid item xs={9.5}>
        <TextField
          sx={{mt:5}}
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Edit />
              </InputAdornment>
            ),
          }}
        />
      </Grid>


        <Grid item xs={12} md={12}>
            <TextField
                value={phone}
                fullWidth
                label="Phone Number"
                // onChange={handlePhoneChange}
                variant="outlined"
                defaultValue="Initial Value"
                
                
                InputProps={{
                    readOnly: true,
                    // startAdornment: (
                    //   <InputAdornment position="start">+91</InputAdornment>
                    // ),
                }}

            />
        </Grid>


        <Grid item xs={12} md={12}>
            <TextField
                value={email}
                fullWidth
                label="Email Address"
                type="email"
                onChange={(e) => {setEmail(e.target.value)}}
                variant="outlined"
                required
            /> 
        </Grid>

    



        <Grid container justifyContent="flex-end">
            <Grid item>
              <Button endIcon={<PersonAdd/>} style={{marginTop:"20px"}} variant="contained" onClick={handleSubmit}>Edit Profile</Button>
            </Grid>
        </Grid>

      </Grid>

      <ToastContainer position={toast.POSITION.TOP_CENTER} />

    </div>
  );
};

export default EditAdmin;
