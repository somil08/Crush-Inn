const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const Listing = require("./models/listing.js")
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const {listingSChema}=require("./schema.js")
// mongoDb setup :----------------------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const { Console } = require("console");
const MONGO_url =  'mongodb://127.0.0.1:27017/crush1'
main().then(res => {
    console.log("connection is successfull")
}).catch(err => console.log(err));
 
async function main() {
    await mongoose.connect(MONGO_url);
} 
// ---------------------------------------------------------------------------------------------------------------------
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate); 
// -----------------------------------------------------------------------------------------------------------------------
// const validatelisting = (req,res,next)=>{
//     let{error} = listingSchema.validate(req.body);
//     if(error){
//         let errMsg= error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(404,errMsg)

//     }else{
//         next();
//     }
// }; 
// ----------------------------------------------------------------------------------------------------------------------- 
// index Route 
app.get("/listings",wrapAsync( async(req,res,)=>{
   const AllListings = await Listing.find({});
   res.render("listings/index.ejs",{AllListings});
}))
// create(new) Route 
app.get("/listings/new",wrapAsync(async (req,res,)=>{
    res.render("listings/new.ejs")
}))

// show Route
app.get("/listings/:id",wrapAsync(async (req,res,)=>{
const {id} = req.params;
 const listing = await Listing.findById(id)
res.render("listings/show.ejs",{listing})
}))
// create Route
app.post("/listings",wrapAsync(async(req,res,next)=>{
    if(!req.body.listing){
    throw new ExpressError(400,"send valid data from listings") 
    }
const  newListing = await new Listing(req.body.listing)
await newListing.save() 
    res.redirect("/listings")
}))
// edit Route
app.get("/listing/:id/edit",wrapAsync(async (req,res,)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id)
res.render("listings/edit.ejs",{listing});
}))
// update Route 
app.put("/listings/:id",wrapAsync(async(req,res,)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listings")
    }
    const {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}))
// delete Route
app.delete("/listing/:id",wrapAsync(async (req,res,)=>{
    const {id}= req.params;
    const listing = await Listing.findByIdAndDelete(id);
    res.redirect(`/listings`);

}))
// ------------------------------------------------------------------------------------------------------------------
app.all("*",(req,res,next)=>{
next( new ExpressError (404,"page not found!"))
})
app.use((err,req,res,next)=>{
    // console.log(err)
    let {statuscode= 505,message="something want wrong"} = err 
// res.status(statuscode).send(message)
res.render("listings/error.ejs" ,{err})

})
app.listen(port,()=>{
    console.log("app was listenning");
})
     