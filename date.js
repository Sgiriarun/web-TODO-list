
exports.getDate = function () {
  //   module.exports.getDate = getDay;
  // function getDatey() {
  const today =new Date();

  const options={
    day:"numeric",
    weekday: "long",
    month: "long",
    year: "numeric"
      }
    return today.toLocaleDateString("ta",options);

  }


exports.getDay =function() {
//   module.exports.getDay = getDay;
// function getDay() {
  const today =new Date();

  const options={

    weekday: "long",


      }
    return today.toLocaleDateString("ta",options);

}
// console.log(module.exports);
