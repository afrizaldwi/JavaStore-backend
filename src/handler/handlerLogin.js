import Users from "../../db/model/dbUsers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      const response = {
        status: "fail",
        message: "Username telah ada. Silahkan gunakan username lain",
      };
      res.json(response);
    } else {
      bcrypt.hash(password.toString(), 10, async (err, hash) => {
        if (err) {
          const response = {
            status: "fail",
            message: "Error in hashing password",
          };
          res.json(response);
        }

        const newUser = new Users({
          username,
          password: hash,
        });
        await newUser.save();

        const response = {
          status: "success",
          message: "berhasil menambahkan user baru",
          data: {
            newUser,
          },
        };
        res.status(201).json(response);
      });
    }
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await Users.findOne({ username });
    if (!existingUser) {
      const response = {
        status: "fail",
        message: "Username atau password salah",
      };
      res.json(response);
    } else if (existingUser.role !== "user") {
      const response = {
        status: "fail",
        message: "Account is not valid",
      };
      res.json(response);
    } else {
      bcrypt.compare(password, existingUser.password, (err, result) => {
        if (result) {
          const username = existingUser.username;
          const role = existingUser.role;
          const token = jwt.sign({ username, role }, "jwt-secret-key", { expiresIn: "24h" });
          res.cookie("cookieToken", token, { httpOnly: true, secure: true });
          const response = {
            status: "success",
            role,
            username,
          };
          res.json(response);
        } else {
          const response = {
            status: "fail",
            message: "Wrong Password",
          };
          res.json(response);
        }
      });
    }
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await Users.findOne({ username });
    if (!existingUser) {
      const response = {
        status: "fail",
        message: "Username atau password salah",
      };
      res.json(response);
    } else if (existingUser.role !== "admin") {
      const response = {
        status: "fail",
        message: "Account is not valid",
      };
      res.json(response);
    } else {
      bcrypt.compare(password, existingUser.password, (err, result) => {
        if (result) {
          const username = existingUser.username;
          const role = existingUser.role;
          const id = existingUser._id;
          const token = jwt.sign({ id, username, role }, "jwt-secret-key", { expiresIn: "1d" });
          res.cookie("cookieToken", token, { httpOnly: true, secure: true });
          const response = {
            status: "success",
            role,
            id,
            username,
          };
          res.json(response);
        } else {
          const response = {
            status: "fail",
            message: "Wrong Password",
          };
          res.json(response);
        }
      });
    }
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
};

const logout = (req, res) => {
  res.clearCookie("cookieToken");
  const response = {
    status: "success",
  };
  res.json(response);
};

const deleteUser = async (req, res) => {
  try {
    const _id = req.params._id;

    await Users.findByIdAndDelete({ _id });

    const response = {
      status: "success",
      message: "User berhasil dihapus",
    };
    res.json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.json(response);
  }
};

export { loginUser, registerUser, loginAdmin, logout, deleteUser };
