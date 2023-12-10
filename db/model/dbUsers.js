import mongoose from "mongoose";

const Users = mongoose.model("users", {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});
// const product1 = new Users({
//   username: "afrizal",
//   password: "rajimo",
// });

// product1.save().then((data) => console.log(data));

export default Users;
