var express=require("express");
var mongoose=require("mongoose");
const { defaultConfiguration } = require("../app");
var schema=mongoose.Schema;
var router=express.Router();

//define schema
var prodschema=new schema({
    prodid:String,
    pname:String,
    qty:Number,
    price:Number
});

//to retrieve the data from collection prodtab
var Product=mongoose.model('prodtab',prodschema,'prodtab');

//define all URL
//read all products from prodtab collection using Product model
router.get("/products",function(req,resp){
    Product.find().exec(function(err,data){
       if(err){
           resp.status(500).send({message:"no data found"});
       }
       if(data.length ==0){
        resp.status(200).send({message:"collection is empty"});
       }else{
        //return data in json format
         resp.send(data);
       }
    });
    

});

//to retrive only one object
router.get("/products/product/:prodid",function(req,resp){
    Product.findOne({prodid:req.params.prodid}).exec(function(err,doc){
        if(err){
            resp.status(500).send({message:"error occured"});
        }
        console.log(doc);
        if(doc==null){
            resp.status(200).send({message:"no match found"});
        }
        resp.send(doc);
    })
});





//add data in the producttab

router.post("/products/:prodid",function(req,resp){
    /// create a object using data from request body
     var prod=new Product({prodid:req.body.prodid,
        pname:req.body.pname,
        qty:parseInt(req.body.qty),
        price:parseInt(req.body.price)});

        //to save the object
        prod.save(function(err,data){
            if(err){
                resp.status(500).send({message:"no data added"});
            }
            
            resp.send(data);

        });
       

});

router.put("/products/:prodid",function(req,resp){
    Product.findOne({prodid:req.params.prodid}).exec(function(err,doc){
        if(err){
            resp.status(500).send({message:"error occured"});
        }
        console.log(doc);
        if(doc==null){
            resp.status(200).send({message:"no match found"});
        }
        else{
            doc.prodid=req.body.prodid;
            doc.pname=req.body.pname;
            doc.qty=parseInt(req.body.qty);
            doc.price=parseInt(req.body.price);
            doc.save(function(err,data){
                if(err){
                    resp.status(500).send({message:"error occured"});
                }
                else{
                    resp.send(data);  
                }
            })
        }
       
    });
});

router.delete("/products/:pid",function(req,resp){
    Product.remove({prodid:req.params.pid},function(err,doc){
        if(err){
            resp.status(500).send({message:"no data found"});
        } 
        /*if(doc.CommandResult.result.n==0){
            console.log("no match found");
            resp.send({message:"no match found"});
        }*/
        console.log("in deleted")
        console.log(doc);
        resp.send({message:"product deleted successfully"});
    })
})

router.patch("/products/:prodid",function(req,resp){
    console.log("in patch method")
    Product.findOne({prodid:req.params.prodid}).exec(function(err,doc){
        if(err){
            resp.status(500).send({message:"error occured"});
        }
        console.log(doc);
        if(doc==null){
            resp.status(200).send({message:"no match found"});
        }
        else{
            doc.prodid=req.body.prodid;
            if(req.body.pname){
                doc.pname=req.body.pname;
            }
            if(req.body.qty){
                doc.qty=parseInt(req.body.qty);
            }
            if(req.body.price){
                doc.price=parseInt(req.body.price);
            }
            doc.save(function(err,data){
                if(err){
                    resp.status(500).send({message:"error occured"});
                }
                else{
                    resp.send(data);  
                }
            })
        }
       
    });
});




module.exports=router;