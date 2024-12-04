
const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.get("/signin",(req,res)=>{
    return res.render("signin")
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.post("/signup",async (req,res)=>{
    console.log(`Input data: ${JSON.stringify(req.body)}`)
    const {fullName,email,password} = req.body
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})

router.post("/signin",async (req,res)=>{
   try{
    console.log(`Input data: ${JSON.stringify(req.body)}`)
    const {email,password} = req.body
    const token = await User.matchPasswordAndGenerateToken(email,password)
    console.log("User",token)
    return res.cookie("token",token).redirect("/")

   }catch(error){
    return res.render("signin",{
        error: "Incorrect Email or Password"
    })
   }
})

// router.get("/add-new",async (req,res)=>{
//     return res.render("addBlog")
// })

// router.get("/:id",async (req,res)=>{
//     const blog = await Blog.findById(req.params.id)
//     return res.render("addBlog")
// })

// router.post("/",upload.single("coverImage"), async (req,res)=>{
//     const {title,body} = req.body
//     const blog = await Blog.create({
//         body,
//         title,
//         createdBy: req.user._id,
//         coverImageUrl: `/upload/${req.filter.filename}`

//     })
//     return res.redirect(`/blog/${blog._id}`)
// })
module.exports = router