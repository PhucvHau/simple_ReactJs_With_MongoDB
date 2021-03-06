/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, {useEffect, useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { config } from '../config/config';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles(() => ({
    formControl: {
      minWidth: 320,
    },
  }));

export default function  updateUser() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [typeWork, settypeWork] = useState('');
    const [gender, setGender] = useState('');
    const [name, setnName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [work, setWork] = useState('')
    const [idCode, setIdcode] = useState(history.location.state.idCode)
    const [iserror, setIserror] = useState(false)
    const respone = useSelector(state =>state.user );
    const [errorMessages, setErrorMessages] = useState([])
    const callApi =  useCallback(
      async () =>  dispatch({ type: "GET_USER", idCode}),
      [dispatch])
    useEffect(() =>{
      
      const getData = async () =>  await  callApi(idCode);
      getData();
      
    },[])

    useEffect(() => {
      setnName(respone[0]?.name)
      setAddress(respone[0]?.address)
      setGender(respone[0]?.gender)
      setWork(respone[0]?.position)
      settypeWork(respone[0]?.typeWork)
      setPhone(respone[0]?.phone)
      console.log(respone)
    }, [respone?.length])
    
    const handleUpdateUser= async () =>{
        const data = {
            name: name,
            gender: gender,
            phone: phone,
            address: address,
            position: work,
            typeWork: typeWork
        }
        let errorList = []
        if(data.idCode === ""){
          errorList.push("Vui l??ng th??m tr?????ng MSNV!")
        }
        if(data.name ===""){
          errorList.push("Vui l??ng th??m tr?????ng h??? v?? t??n")
        }
        if(data.gender === ""){
          errorList.push("Vui l??ng th??m tr?????ng gi???i t??nh")
        }
        if(data.phone === ""){
            errorList.push("Vui l??ng th??m tr?????ng s??? ??i???n tho???i!")
          }
        if(data.position === ""){
          errorList.push("Vui l??ng th??m tr?????ng Ngh??? nghi???p")
        }
        console.log(data)
        console.log(errorList.length)
        if(errorList.length < 1){ //no error
            console.log(data)
            await axios.put(`${config.mongo.hostlocal}/${idCode}`, data)
            .then(() => {
              setErrorMessages([])
              setIserror(false)
              alert("C???p nh???t th??ng tin th??nh c??ng!");
              window.location.reload();
           })
           .catch(() => {
              setErrorMessages(["Cannot add data. Server error!"])
              alert("Vui l??ng ??i???n ?????y ????? th??ng tin nh??n vi??n!");
              setIserror(true)
            })
        }else{
          setErrorMessages(errorList)
          alert("Vui l??ng ??i???n ?????y ????? th??ng tin nh??n vi??n!");   
          setIserror(true)
        }
    }
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
        C???p nh???t h??? s?? nh??n vi??n
      </Typography>
      <Card style={{   width:"40%", padding:20}}>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{position: 'relative', display: 'inline-block'}}>
        <Icon style={{position: 'absolute', right: 0, top: 15, width: 20, height: 20}}/>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="H??? & T??n"
            fullWidth
            value={name}
            autoComplete="given-name"
            onChange={(event) => setnName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="work"
            name="work"
            label="Ngh??? nghi???p"
            
            value={work}
            onChange={(event) => setWork(event.target.value)}
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputLabel id="demo-simple-select-label">Ki???u c??ng vi???c</InputLabel>
            <Select
                className={classes.formControl}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeWork}
                onChange={(event) => settypeWork(event.target.value)}
                >
                <MenuItem value={"Full Time"}>Full Time</MenuItem>
                <MenuItem value={"Part Time"}>Part Time</MenuItem>
    
            </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            label="S??? ??i???n tho???i"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6} >
        <InputLabel id="demo-simple-select-label">Gi???i t??nh</InputLabel>
            <Select
            className={classes.formControl}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            >
            <MenuItem value={"Nam"}>Nam</MenuItem>
            <MenuItem value={"N???"}>N???</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={12} >
             <TextField
            required
            id="country"
            name="country"
            label="?????i ch???"
            value= {address}
            fullWidth
            onChange={(event) => setAddress(event.target.value)}
            autoComplete="shipping country"
          />
         </Grid>
        </Grid>
        <CardActions style={{alignItems:"center", margin:20, justifyContent:"center"}}>
            <Button variant="contained" color="primary"  onClick={()=> handleUpdateUser()}> C???p nh???t th??ng tin</Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}