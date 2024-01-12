const mongoose = require("mongoose");
const Users = require("./user.schema");

const initData = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/codewars");

  if ((await Users.collection.countDocuments()) != 0) return;

  Users.create([
    {
      token: "fdc9772e-eb42-437d-af77-f06540c0942b",
    },
    {
      token: "4c0929c2-572e-4b9e-9d37-e3850269f734",
    },
    {
      token: "18595ab4-1d23-411a-9d6f-1a24a4299da8",
    },
    {
      token: "4283ab2f-1f88-4a70-9e7a-cc25573d0766",
    },
    {
      token: "358a48db-3df8-4479-a4e2-3bd2e435fa45",
    },
    {
      token: "21c121ee-1f75-400a-a7e4-f0a91112d418",
    },
    {
      token: "d0cf3ecb-01a3-4b94-a72d-7f976a01e753",
    },
  ]);
};

module.exports = initData;
