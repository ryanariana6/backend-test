const db = require("./db");
const helper = require("../helper/helper");
const config = require("../config/config");

async function getAll(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `
    SELECT * FROM news LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}
//query dengan join
// async function getAllnews(page = 1) {
//     const offset = helper.getOffset(page, config.listPerPage);
//     const rows = await db.query(
//       `SELECT * FROM news INNER JOIN jurusan ON news.id_jurusan=jurusan.id_jurusan LIMIT ${offset},${config.listPerPage}`
//     );
//     const data = helper.emptyOrRows(rows);
//     const meta = { page };
  
//     return {
//       data,
//       meta
//     };
//   }

async function create(data) {
  const result = await db.query(
    `INSERT INTO news 
    (name, image, ket, url) 
    VALUES 
    ('${data.name}', '${data.image}', '${data.ket}', '${data.url}')`
  );

  let message = "Gagal Menyimpan Data";

  if (result.affectedRows) {
    message = "Berhasil Ditambahkan";
  }

  return { message };
}

async function update(id, data) {
  const result = await db.query(
    `UPDATE news 
    SET name="${data.name}",url="${data.url}",ket="${data.ket}", nidn=${data.image} WHERE id=${id}`
  );

  let message = "Gagal Mengubah Data";

  if (result.affectedRows) {
    message = "Data Berhasil Diubah!";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM news WHERE id=${id}`
  );

  let message = "Gagal Menghapus Data";

  if (result.affectedRows) {
    message = "Data Berhasil Disimpan";
  }

  return { message };
}

async function search(keyword, page=1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM news WHERE name LIKE '%${keyword}%' `
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}
async function detail(id, page=1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *  FROM news WHERE id = '${id}' `
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

module.exports = {
  getAll,
  create,
  update,
  remove,
  search,
  detail
};
