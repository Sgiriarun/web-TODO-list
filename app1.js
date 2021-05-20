const express = require('express');
const bodyParser = require('body-parser');


const app= express();
var items=["get exsersize","eat well","practice well"];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


app.get("/", function (req,res) {
var today =new Date();
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


var options={
    day:"numeric",
  weekday: "long",
  year: "numeric",
  month: "long"

    }
    const day=today.toLocaleDateString("ta",options);
  res.render("list1",{
    kindOfDay: day, newListItems: items});

});

app.post("/", function (req,res) {
    const item=req.body.newItem;
    items.push(item);
  res.redirect("/");

  console.log(item);
})

app.listen(3000, function () {
console.log("server is working on port 3000");
});
