import React,{useState, useEffect} from 'react';
import { addDoc, collection, Timestamp, doc, setDoc} from "firebase/firestore";
import { db } from '../../firebase';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, FormControl, Box} from '@mui/material';
import {  query, getDocs, } from 'firebase/firestore';
import AllBatches from './AllBatches';




const AddTrainers = () => {
    const [allBatches, setAllBatches] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [batches, setBatches] = useState([]);


    useEffect(() => {
        const fetchItems = async () => {
        const q = query(collection(db, 'bs'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllBatches(data);
        console.log(data);
        };
        fetchItems();
  }, []);


  const [checkedValues, setCheckedValues] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setBatches([...batches, value]);
    } else {
      setBatches(batches.filter((item) => item !== value));
    }
  };

 



    const handleSubmit = async (event) => {


        event.preventDefault();
        console.log(batches);

        const docRef = await setDoc(doc(db, "trainers", phone), {
            name: name,
            email:email,
            phone: phone,
            batches : batches,

          });
      };
      


    return(
        <div className="container">

    
            <form 
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}>

            <h3 style={{width:"100%", textAlign:"left"}}>ADD TRAINERS</h3>

            

              

                <TextField
                    value={name}
                    label="Trainer Name"
                    onChange={(e) => {setName(e.target.value)}}
                    style={{ marginTop: 12, marginLeft: 8, marginRight: 8 }}
                    variant="outlined"
                    required
                />

                <TextField
                    value={email}
                    label="Trainer Email"
                    onChange={(e) => {setEmail(e.target.value)}}
                    style={{ marginTop: 12, marginLeft: 8, marginRight: 8 }}
                    variant="outlined"
                    required
                />


                <TextField
                    value={phone}
                    label="Phone"
                    onChange={(e) => {setPhone(e.target.value)}}
                    style={{ marginTop: 12, marginLeft: 8, marginRight: 8 }}
                    variant="outlined"
                    required
                />   

                
                      <FormGroup variant="outlined" label="Batches">
                        <p>Batches</p>
                          {allBatches.map((item) => (
                              <FormControlLabel
                              // key={item.id}
                              control={
                                  <Checkbox
                                    checked={batches.includes(item.code)}
                                    onChange={handleCheckboxChange}
                                    value={item.code}
                                  />
                              }
        
                              label={item.name}
                              
                              />
                          ))}
                      </FormGroup>
                

                


                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    style={{ marginTop: 12, marginLeft: 8, marginRight: 8 }}>
                    SAVE 
                </Button>

            </form>

            

        </div>
    )
}

export default AddTrainers;


