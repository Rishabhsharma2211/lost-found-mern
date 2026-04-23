const router = require("express").Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

router.post("/", auth, async (req,res)=>{
 const item = await Item.create({...req.body,userId:req.user.id});
 res.json(item);
});

// 🔍 SEARCH (must be before /:id)
router.get("/search/:name", async (req,res)=>{
 const items = await Item.find({
   name: { $regex: req.params.name, $options: "i" }
 });
 res.json(items);
});

router.get("/", async (req,res)=>{
 const items = await Item.find();
 res.json(items);
});

router.get("/:id", async (req,res)=>{
 const item = await Item.findById(req.params.id);
 res.json(item);
});

router.put("/:id", auth, async (req,res)=>{
 const item = await Item.findByIdAndUpdate(req.params.id,req.body,{new:true});
 res.json(item);
});

router.delete("/:id", auth, async (req,res)=>{
 await Item.findByIdAndDelete(req.params.id);
 res.json("Deleted");
});

module.exports = router;