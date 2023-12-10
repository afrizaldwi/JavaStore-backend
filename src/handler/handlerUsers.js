import Users from "../../db/model/dbUsers.js";

const getUsers = async (req, res) => {
  const users = await Users.find();

  const response = {
    status: "success",
    users,
  };
  res.json(response);
};

export { getUsers };
