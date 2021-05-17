/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import userAvatar from '../assets/profile.jpg';
import userAvatarFemale from '../assets/profile_female.png';
import { useHistory } from "react-router-dom";
import updateImg from '../assets/update.png';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flex:1, 
        padding:20,
    },
    rootCard:{
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
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
      },
}));

function Main() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const respone = useSelector(state => state.data);
    const callApi =  useCallback(
    async () =>  dispatch({ type: "API_CALL_REQUEST" }),
    [dispatch],
    )
    useEffect(() =>  {
        const getData = async () =>  await  callApi();
        getData();
      }, [])
    
    const handleViewProfile = async (dt) =>{
        history.push({
            pathname: '/profile',
            state: { data: dt}
          });
    }
    const handleUpdateUser = async(idCode) =>{
        history.push({
            pathname: '/update',
            state: { idCode: idCode}
          });
    }
    return (
        <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={4}>
            {respone?.map((dt) => (
            <Card className={classes.rootCard}>
            <CardContent className={classes.content}>
                <div style={{flex:3}}>
                    <Typography variant="h5" component="h2" lassName={classes.pos}>
                    {dt.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {dt.position}
                </Typography>
                <Divider></Divider>
                <Typography variant="body2" component="p">
                    Công việc:     {dt.typeWork}
                </Typography>
                <Typography variant="body2" component="p">
                    Số điện thoại: {dt.phone}
                </Typography>
                </div>
                <div className={classes.img}>
                    {dt.gender==="Nam" ? <img alt="Remy Sharp" src={userAvatar} className={classes.large} />:
                    <img alt="Remy Sharp" src={userAvatarFemale} className={classes.large} /> }
                   
                </div>
            </CardContent>
            <CardActions style={{alignItems:"center", justifyContent:"center"}}>
              <Button onClick={() => handleViewProfile(dt)} size="small" style={{marginBottom:30}}>Xem chi tiết...</Button>
              <Button variant="contained" color="primary"  size="small"  style={{marginBottom:30, marginLeft:30}} onClick={() => handleUpdateUser(dt.idCode)} > 
              <img alt="Remy Sharp" src={updateImg} style={{marginRight:10}}/>Cập nhập thông tin
              </Button>
            </CardActions>
          </Card>
            ))}
        </GridList>
        </div>
    );
    
}
 
export default Main