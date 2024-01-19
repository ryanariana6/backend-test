const db = require("./db");
const helper = require("../helper/helper");
const config = require("../config/config");
const argon2 = require('argon2');

async function Login(payload) {
  try {
    // Gunakan parameterized query untuk menghindari SQL injection
    const admin = await db.query(
      `
      SELECT * FROM users WHERE email = ? LIMIT 1`,
      [payload.email]
    );

    if (admin.length === 0) {
      throw new Error("User not found");
    }

    const match = await argon2.verify(admin[0].password, payload.password);

    if (!match) {
      throw new Error("Invalid password");
    }

    const { uuid, name, email, role } = admin[0];

    // Gunakan objek langsung untuk mengembalikan data
    const data = helper.emptyOrRows(admin[0]);
    return {
      data,
    };
  } catch (error) {
    // Tangani kesalahan dengan memberikan pesan kesalahan yang sesuai
    return {
      error: error.message,
    };
  }
}
module.exports = {
  Login,
};