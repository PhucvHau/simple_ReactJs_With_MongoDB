/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useLocation } from "react-router-dom";
import gender from '../assets/gender.png';
import phone from '../assets/phone.png';
import typeWork from '../assets/work.png';
import address from '../assets/address.png';
import userAvatar from '../assets/profile.jpg';
import userAvatarFemale from '../assets/profile_female.png';
const useStyles = makeStyles((theme) => ({
    gridList: {
        flex:1, 
        padding:20,
    },
    rootCard:{
        width:"40%",
        margin:20
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        alignContent:"center"
    },
    content:{
        flexDirection:"row",
        display:"flex"
    },
    img:{
        flex:1,
        marginRight:20
    },
    large: {
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    text:{
        fontSize:18,
        paddingTop:10
    }
}));

function profileUser(){
    const classes = useStyles();
    const location = useLocation();
    const data =  location.state.data;
    console.log(data)
    return(
        <div> 
            <Card className={classes.rootCard}>
            <CardContent className={classes.content}>
                <div className={classes.img}>
                   {data.gender==="Nam" ? <img alt="Remy Sharp" src={userAvatar} className={classes.large} />:
                    <img alt="Remy Sharp" src={userAvatarFemale} className={classes.large} /> }
                </div>
                <div style={{flex:3}}>
                    <Typography variant="h4" component="h2" lassName={classes.pos}>
                    {data.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                   {data.position}
                </Typography>
                <Divider></Divider>
                <Typography className={classes.text} variant="body2" component="p">
                    <img src={gender}/> Giới tính : {data.gender}
                </Typography>
                <Typography  className={classes.text} variant="body2" component="p">
                    <img src={phone}/>  Số điện thoại : {data.phone}
                </Typography>
                <Typography  className={classes.text} variant="body2" component="p">
                    <img src={address}/> Địa chỉ liên hệ : {data.address}
                </Typography>
                <Typography  className={classes.text} variant="body2" component="p">
                    <img src={typeWork}/>  Công Việc  : {data.typeWork}
                </Typography>
                </div>
            </CardContent>
          </Card>
        </div>
    )
}

export default profileUser