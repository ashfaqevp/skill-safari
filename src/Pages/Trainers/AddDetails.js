import React, { useState , useEffect} from 'react';

import { where, collection, getDocs, query, updateDoc,  doc, getDoc,setDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';

import { TextField, Button, Box, Typography, Grid,  IconButton , InputAdornment, Avatar} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

import { Add as AddIcon, PhotoCamera, PersonAdd, CameraAltOutlined  } from '@mui/icons-material';
import { Email, Phone, LocationOn, Description, Edit, EmojiObjects, LinkedIn, GitHub, Facebook, Twitter, Instagram, Telegram } from '@mui/icons-material';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(() => ({
  container: {
    margin: '2rem auto',
    padding: '2rem',
    paddingTop:0,
    marginTop: 0,
    maxWidth: '800px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  inputField: {
    marginBottom: '1rem',
  },
  plusButton: {
    marginLeft: '0.5rem',
  },
  removeButton: {
    marginLeft: '0.5rem',
    color: 'red',
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
  },
  uploadInput: {
    display: 'none',
  },
  imagePreview: {
    width: '200px',
    height: 'auto',
    marginTop: '1rem',
  },
  root: {
    '& > *': {
      margin: useTheme().spacing(1),
      width: '100%',
    },
  },
  avatar: {
    width: useTheme().spacing(20),
    height: useTheme().spacing(20),
    margin: useTheme().spacing(1),
    cursor: 'pointer',
  },
  

}));


const AddDetails = (props) => {

  
  const classes = useStyles();

  const [student, setStudent] = useState({});
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [li, setLi] = useState("");
  const [gh, setGh] = useState("");
  const [fb, setFb] = useState("");
  const [ig, setIg] = useState("");
  const [tw, setTw] = useState("");
  const [tg, setTg] = useState("");
  const [about, setAbout] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [address, setAddress] = useState("");
 


  useEffect(() => {
    fetchData();

  }, []);

  const fetchData = async () => {
    const docRef = doc(db, "batches/"+props.id+"/students" ,props.std);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setStudent(docSnap.data());
      setName(data.name)
      setPhone(data.phone)
      setImageUrl(data.imageUrl)
      setImagePreview(data.imageUrl)
      setEmail(data.email)
      setAbout(data.about)
      setHobbies(data.hobbies)
      setAddress(data.address)
      setIg(data.instagram)
      setTg(data.telegram)
      setFb(data.facebook)
      setTw(data.twitter)
      setLi(data.linkedin)
      setGh(data.github)
      console.log(docSnap.data());
    }
    else{
      console.log("no dattatatataatata");
    }

  };






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
          const storageRef = ref(storage, `students/${image.name}`);
          await uploadBytes(storageRef, image);
          imageLink = await getDownloadURL(storageRef);
        }

        const facebook = fb.startsWith('http://') || fb.startsWith('https://') ? fb : 'http://' + fb;
        const github = gh.startsWith('http://') || gh.startsWith('https://') ? gh : 'http://' + gh;
        const linkedin = li.startsWith('http://') || li.startsWith('https://') ? li : 'http://' + li;
        const instagram = ig.startsWith('http://') || ig.startsWith('https://') ? ig : 'http://' + ig;
        const twitter = tw.startsWith('http://') || tw.startsWith('https://') ? tw : 'http://' + tw;
        const telegram = tg.startsWith('http://') || tg.startsWith('https://') ? tg : 'http://' + tg;
        



  
        const projectRef = doc(db, "batches/"+props.id+"/students" ,props.std);
        const newProject = {
          name: name ? name : "",
          email: email ? email : "",
          phone: phone ? phone : "",
          imageUrl: imageLink,
          github: gh ? github : "",
          linkedin: li ? linkedin : "",
          instagram: ig ? instagram : "",
          telegram: tg ? telegram : "",
          facebook: fb ? facebook : "",
          twitter: tw ? twitter : "",
          address: address ? address : "",
          about: about ? about : "",
          hobbies: hobbies ? hobbies : "",
        };
  
        await updateDoc(projectRef, newProject, {merge: true});
        console.log("Student edited successfully!");
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
    <Box className={classes.container}>



    <Grid container spacing={2} className={classes.root}>


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

    <br/>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Email"
          value={email}
          required
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <br/>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Phone"
          required
          value={phone}
        
          fullWidth
            // onChange={handlePhoneChange}
            variant="outlined"
            defaultValue="Initial Value"
            
            
            InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
               )
            }}
 
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="About"
          onChange={(e) => setAbout(e.target.value)}
          multiline
          value={about}
          rows={4}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Description />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Address"
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          value={address}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Hobbies"
          onChange={(e) => setHobbies(e.target.value)}
          multiline
          value={hobbies}
          rows={4}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmojiObjects />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="LinkedIn"
          onChange={(e) => setLi(e.target.value)}
          fullWidth
          value={li}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkedIn />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Github"
          onChange={(e) => setGh(e.target.value)}
          fullWidth
          value={gh}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GitHub />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Facebook"
          fullWidth
          value={fb}
          onChange={(e) => setFb(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Facebook />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Twitter"
          onChange={(e) => setTw(e.target.value)}
          fullWidth
          value={tw}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Twitter />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      
      <Grid item xs={12} sm={6}>
        <TextField
          label="Instagram"
          onChange={(e) => setIg(e.target.value)}
          fullWidth
          value={ig}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Instagram />
              </InputAdornment>
            ),
          }}
        />
      </Grid>


      
      <Grid item xs={12} sm={6}>
        <TextField
          label="Telegram"
          onChange={(e) => setTg(e.target.value)}
          fullWidth
          value={tg}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Telegram />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

          

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button endIcon={<PersonAdd />} style={{marginTop:"20px"}} variant="contained" onClick={handleSubmit}>SAVE STUDENTS</Button>
            </Grid>
          </Grid>


          </Grid>


 <ToastContainer position={toast.POSITION.TOP_CENTER}  style={{ marginTop: '100px' }}/>
      
          </Box>
  );
};

export default AddDetails;



