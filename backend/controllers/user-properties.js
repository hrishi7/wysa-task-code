const User = require("../models/User");
const UserProperty = require("../models/UserProperty");

exports.updateProperties = async (req, res) => {
  try {
    let {strugglingWeeks,bedTime,riseTime,typicalSleepHour,status} = req.body;
    let {nickname} = req.params;
    let exist = await User.findOne({ nickname });
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found!" });
    }
    let existProperty = await UserProperty.findOne({user:exist._id});
   
    let property = {};
    if(strugglingWeeks){
      property.strugglingWeeks = strugglingWeeks;
    }
    if(bedTime){
      let bedTimeInMinutes = parseInt(bedTime.hour) * 60 + parseInt(bedTime.minute);
      property.bedTime = bedTimeInMinutes;
    }
    if(riseTime){
      let riseTimeInMinutes = parseInt(riseTime.hour) * 60 + parseInt(riseTime.minute);
      property.riseTime = riseTimeInMinutes;
    }
    if(typicalSleepHour){
      property.typicalSleepHour = typicalSleepHour;
    }
    if(status){
      property.status = status;
    }
    property.user = req.userData.userId;

    if (!existProperty) {
      await new UserProperty(property).save(); 
      res
      .status(201)
      .json({ success: true, message: "Thank You We have Added the information" });
    }else{
      await UserProperty.findOneAndUpdate({user:exist._id},{$set:property},{new:true});
      res
      .status(200)
      .json({ success: true, message: "Thank You We have Added the information" });
    }    
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

exports.getStatus = async(req, res) =>{
  try {
    let {nickname} = req.params;
    let exist = await User.findOne({ nickname });
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found!" });
    }

    let existProperty = await UserProperty.findOne({user:exist._id});
   
    if (!existProperty) {
      return  res
      .status(200)
      .json({ success: true, data: "INITIAL" });
    }else{
      res
      .status(200)
      .json({ success: true, data: existProperty.status });
    }    
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
}