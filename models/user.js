const mongoose = require("mongoose");

const StatsSchema = mongoose.Schema({
  Date: Date,

  Hydratation_quantity: Number,
  Thirsty_feel: Boolean,
  Energy_level: Number,
  Sleep_quality: Number,
  Night_wakeup: Boolean,
  No_sleep: Boolean,
  Morning_fatigue: Boolean,
  Motivation: Number,
  Training_feel: Number,
  Training_injury: Boolean,
  Training_fatigue: Boolean,
  Muscle_pain: Boolean,
  Bloating: Boolean,
  Appetit_lack: Boolean,
  Hungry_feel: Boolean,
  Intestin_Pain: Boolean,
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  token: String,
  FavRecipe_id: [Number],
  NotifHydro: Boolean,
  NotifRecup: Boolean,
  NotifFeedback: Boolean,
  Statistiques: [StatsSchema],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
