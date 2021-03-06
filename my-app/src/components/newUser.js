/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, {useEffect, useState, useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { config } from '../config/config';
import axios from 'axios';
import Icon from '@material-ui/core/Icon';
const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 320,
    },
  }));

export default function newUser() {
    const classes = useStyles();
    const [typeWork, settypeWork] = useState('');
    const [gender, setGender] = useState('');
    const [name, setnName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [work, setWork] = useState('')
    const [idCode, setIdcode] = useState('')
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])
    
    const handleAddUser= async () =>{
        const data = {
            idCode:idCode,
            name: name,
            gender: gender,
            phone: phone,
            address: address,
            position: work,
            typeWork: typeWork
        }
        let errorList = []
        if(data.idCode === ""){
          errorList.push("Vui lòng thêm trường MSNV!")
        }
        if(data.name ===""){
          errorList.push("Vui lòng thêm trường họ và tên")
        }
        if(data.gender === ""){
          errorList.push("Vui lòng thêm trường giới tính")
        }
        if(data.phone === ""){
            errorList.push("Vui lòng thêm trường số điện thoại!")
          }
        if(data.position === ""){
          errorList.push("Vui lòng thêm trường Nghề nghiệp")
        }
        console.log(data)
        console.log(errorList.length)
        if(errorList.length < 1){ //no error
            console.log(data)
            await axios.post(`${config.mongo.hostlocal}`, data)
            .then(res => {
              setErrorMessages([])
              setIserror(false)
              alert("Thêm thành công!");
              window.location.reload();
           })
           .catch(error => {
              setErrorMessages(["Cannot add data. Server error!"])
              alert("Vui lòng điền đầy đủ thông tin nhân viên!");
              setIserror(true)
            })
        }else{
          setErrorMessages(errorList)
          alert("Vui lòng điền đầy đủ thông tin nhân viên!");   
          setIserror(true)
        }
    }
  return (
    <React.Fragment>
      {}
      <Typography variant="h3" gutterBottom>
        Tạo hồ sơ nhân viên
      </Typography>
      <Card style={{   width:"40%", padding:20}}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
            <TextField
                required
                id="id"
                name="id"
                label="Mã số nhân viên"
                fullWidth
                value={idCode}
                autoComplete="given-name"
                onChange={(event) => setIdcode(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} style={{position: 'relative', display: 'inline-block'}}>
        <Icon style={{position: 'absolute', right: 0, top: 15, width: 20, height: 20}}/>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Họ & Tên"
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
            label="Nghề nghiệp"
            
            value={work}
            onChange={(event) => setWork(event.target.value)}
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputLabel id="demo-simple-select-label">Kiểu công việc</InputLabel>
            <Select
                className={classes.formControl}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeWork}
                onChange={(event) => settypeWork(event.target.value)}
                >
                <MenuItem value={"Full Time"}>Full Time</MenuItem>
                <MenuItem value={"Part Time"}>Part TIme</MenuItem>
    
            </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            label="Số điện thoại"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6} >
        <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
            <Select
            className={classes.formControl}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            >
            <MenuItem value={"Nam"}>Nam</MenuItem>
            <MenuItem value={"Nữ"}>Nữ</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={12} >
             <TextField
            required
            id="country"
            name="country"
            label="Đại chỉ"
            value= {address}
            fullWidth
            onChange={(event) => setAddress(event.target.value)}
            autoComplete="shipping country"
          />
         </Grid>
        </Grid>
        <CardActions style={{alignItems:"center", margin:20, justifyContent:"center"}}>
            <Button variant="contained" color="primary"  onClick={()=> handleAddUser()}> Tạo nhân viên</Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}