const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// User Property Model Definition
const userPropertySchema = new Schema({
  status:{type:String, default:"STRUGLLING_WEEK"},
  strugglingWeeks: { type: Number },
  bedTime: { type: Number },
  riseTime: { type: Number },
  typicalSleepHour: { type: Number },
  user: { type: mongoose.Types.ObjectId, ref:'User' },
  createdAt: { type: Date, default: Date.now },
});

// Export Module/Schema
module.exports = mongoose.model("UserProperty", userPropertySchema);
