const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.set('debug', true);
const _=require('lodash');

// const askIt = require(__dirname+"/date.js");



const app= express();


// const items=["get exsersize","eat well","practice well"];
//
// const Work_item=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://0to1arun:Arun*9944@0to1.wlu2e.mongodb.net/todolistDB", {useNewUrlParser: true},{ useUnifiedTopology: true });
  const dbSchema= {
      name: String
        };
const WorkItem=mongoose.model("item",dbSchema);
const item1 = new WorkItem({name: "welcome to your todo list"});
const item2 = new WorkItem({name:"hit the + button to add a new item"});
const item3 = new WorkItem({ name: "hit this to declare an item"});

const defaultItems = [item1,item2,item3];
// WorkItem.insertMany(defaultItems,function (err) {
//   if (err) {
//     console.log(err);
//   }else {
//     console.log("succesfully saved");
//   }
// })

const listSchema ={
    name: "string",
    items: [dbSchema]
};
const ListItem = mongoose.model("list",listSchema);

app.get("/", function (req,res) {
// var currentDay =today.getDay();
// var day="";
//
// switch (currentDay) {
//   case 0:
//     day = "sunday";
//     break;
//   case 1:
//     day = "monday";
//     break;
//   case 2:
//     day = "tuesday";
//     break;
//   case 3:
//     day = "wednesday";
//     break;
//   case 4:
//     day = "thursday";
//     break;
//   case 5:
//     day = "friday";
//     break;
//   case 6:
//     day = "saturday";
//     break;
//
//
//   default:
//     console.log("Error: current day is" + currentDay);
// }







// let today =new Date();
//
// let options={
//     day:"numeric",
//   weekday: "long",
//   year: "numeric",
//   month: "long"
//
//     }
//     let day=today.toLocaleDateString("ta",options);


// const day= askIt.getDate();


WorkItem.find({},function (err,foundItem) {
  console.log(foundItem);

  if(foundItem.length===0){
    WorkItem.insertMany(defaultItems,function (err) {
      if (err) {
        console.log(err);
      }else {
        console.log("succesfully saved");
      }
    });
    res.redirect("/");
  }else{
    res.render("list1",{
      list_Title: "today", newListItems: foundItem});
  }
    // console.log(foundItem);
    // res.render("list1",{
    //   list_Title: "today", newListItems: foundItem});
});

  // res.render("list1",{
  //   list_Title: "today", newListItems: foundItem});  //i have replaced day to "today" to reduce the complexity of day module

});


app.get("/:customRouteName", function (req,res) {
  const routeName= _.capitalize(req.params.customRouteName);

  // const list_1 = new ListItem({
  //   name: routeName,
  //   items: defaultItems
  // });

 // list_1.save();
ListItem.findOne({name:routeName},function (err,foundList) {
  if(!err){
    // console.log(foundList);
    if (!foundList) {
        const list_1 = new ListItem({
          name: routeName,
          items: defaultItems


      // console.log("doest exits! ");
    });
    list_1.save();
    res.redirect("/"+routeName);
  }else {
      res.render("list1",{
        list_Title: foundList.name, newListItems: foundList.items});
      // console.log("exists");
      // console.log(foundList);
    }
  }
  })
});

app.post("/", function (req,res) {

  const itemName= req.body.type_Here;

  const listSelector = req.body.buttonPageSelector;
  const item = new WorkItem({
    name:itemName
  });
  // item.save();
  //  res.redirect("/");

if(listSelector==="today"){
  item.save();
   res.redirect("/");
}else {
  ListItem.findOne({name:listSelector},function (err,foundList) {
    foundList.items.push(item);
    console.log(foundList);
    foundList.save();
    res.redirect("/"+listSelector);
  });
};

  // console.log(req.body);
  //
  //   var item=req.body.type_Here;
  //
  //   if(req.body.button==="work"){
  //     Work_item.push(item);
  //       res.redirect("/work");
  //   }
  // else{
  //   items.push(item);
  //     res.redirect("/");
  // }
  //
  //
  // console.log(item);
});

// app.get("/work",function (req,res) {
//
//   res.render("list1", {
//     list_Title:"work list", newListItems: WorkItem});
//
// });

// app.post("/work", function (req,res) {
//
//   const item = req.body.type_Here;
//   WorkItem.push(item);
//   res.redirect("/work");
// })


app.post("/delete", function (req,res) {
  const toDelete=req.body.checkboxinput;
  const customDelete = req.body.listName;

   if(customDelete==="today"){
     WorkItem.findByIdAndRemove(toDelete,function (err) {
       if (!err) {
         console.log("deleted succesfully");
          res.redirect("/");
       }// console.log(req.body.checkboxinput);
    });
   }else{
        ListItem.findOneAndUpdate({"name":customDelete},{"$pull":{"items":{toDelete}}},{ 'new': true },
function (err,foundList) {
            if(!err){
              res.redirect("/"+customDelete);
              console.log("deleted succesfully");
            }
        });

   }

});

let port = process.env.PORT;
if(port== null|| port==""){
  port=3000;
}

app.listen(port, function () {
console.log("server is started working");
});
