var Sequelize = require('sequelize');
var theatre = require('../models').Theatre;
var movie = require('../models').Movie;
var user=require('../models').User;
var ticket=require('../models').Tickets;

const locations=async()=>{
    const ans=await theatre.findAll({ attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('location')), 'location']], raw: true ,order:[['location','ASC']]})
    return ans;
}
const theatres=async(req)=>{
    const ans=await  theatre.findAll({ attributes: ['name'],where:{location:req.body.location}, raw: true,order:[['id','ASC']] });
    return ans;
}
const updateBooking=async(req)=>{
    const ans=await movie.update({booked:req.body.booked},{where:{id:req.body.id}});
    return "Updated";
}
const Movie=async(req)=>{
    var obj1={};
    var obj2={};
    if(req.body.name.length>0)
        obj1['name']=req.body.name;
    if(req.body.location.length>0)
        obj1['location']=req.body.location;
    if(req.body.date.length>0)
        obj2['Date']=req.body.date;
    if(req.body.showtime.length>0)
        obj2['showtime']=req.body.showtime;
    const ans=await theatre.findAll({
        where:obj1,
        include:{
            model:movie,
            where:obj2
        }
    })
    return ans;
}

const logIn=async(req)=>{
    const ans=await user.findAll({raw:true,where:{email:req.body.email,password:req.body.password}});
    console.log(ans);
    if(ans.length>0)
        return "success";
    else
        return "error";
}   
const signIn=async(req)=>{
    const ans=await user.findAll({where:{email:req.body.email}});
    if(ans.length>0)
        return "error";
    else{
        const {name,password,email}=req.body;
        // const {movieName,movieInfo,movieDesc,movieImg,location,theatreName,showTime,date,noOfTickets,price}=req.body;
        // const res=await user.create({movieName,movieInfo,movieDesc,movieImg,location,theatreName,showTime,date,noOfTickets,price});
        const res=await user.create({name,password,email});
        return "success";
    }
}
const addTicket=async(req)=>{
    const {movieName,movieInfo,movieDesc,movieImg,TheatreId,showTime,date,noOfTickets,price,email}=req.body;
    const ans=await user.findOne({where:{email:email},include:ticket})
    const result=await theatre.findOne({where:{id:TheatreId}});
    console.log(TheatreId);    
    const res=await ans.createTicket({movieName,movieInfo,movieDesc,movieImg,location:result.location,theatreName:result.name,showTime,date,noOfTickets,price})
    return "success";
}
const getTickets=async(req)=>{
    const ans=await user.findOne({where:{email:req.body.email},include:ticket});
    return ans;
}

module.exports={locations,theatres,updateBooking,Movie,logIn,signIn,addTicket,getTickets};