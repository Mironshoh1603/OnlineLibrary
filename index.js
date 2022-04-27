const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

const book = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/book.json`, "utf-8")
);
const user = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/user.json`, "utf-8")
);

const getBook = (request, response) => {
  response.status(200).json({
    status: "Ok",
    data: { book },
  });
};
const addBook = (req, res) => {
  const data = req.body;
  // console.log(data);
  const newId = book[book.length - 1].id + 1;
  const completeObj = Object.assign({ id: newId }, data);
  book.push(completeObj);
  fs.writeFile(
    `${__dirname}/dev-data/book.json`,
    JSON.stringify(book),
    "utf-8",
    (err) => {
      res.status(200).json({
        status: "OK",
        data: completeObj,
      });
    }
  );
};
const getUser = (request, response) => {
  response.status(200).json({
    status: "Ok",
    data: { user },
  });
};
const addUser = (req, res) => {
  const data = req.body;
  // console.log(data);
  const newId = user[user.length - 1].id + 1;
  const completeObj = Object.assign({ id: newId }, data);
  book.push(completeObj);
  fs.writeFile(
    `${__dirname}/dev-data/user.json`,
    JSON.stringify(user),
    "utf-8",
    (err) => {
      res.status(200).json({
        status: "OK",
        data: completeObj,
      });
    }
  );
};
const deleteBook = (req, res) => {
  const id = +req.params.id;
  const newObj = book.filter((val) => {
    return val.id !== id;
  });
  const deleteObj = book.find((val) => {
    return val.id === id;
  });
  fs.writeFile(
    `${__dirname}/dev-data/book.json`,
    JSON.stringify(newObj),
    "utf-8",
    (err) => {
      res.status(204).json({
        status: deleteObj ? "OK" : "Failed",
        data: deleteObj ? "Deleted information" : "Error",
      });
    }
  );
};
const updateBook = (req, res) => {
  const newId = +req.params.id;
  const body = req.body;
  let selectObj = book.find((val) => {
    return val.id === newId;
  });
  const index = book.indexOf(selectObj);
  selectObj = Object.assign({ id: newId }, body);
  book.fill(selectObj, index, index + 1);
  // console.log(students);
  fs.writeFile(
    `${__dirname}/dev-data/book.json`,
    JSON.stringify(book),
    "utf-8",
    (err) => {
      res.status(200).json({
        status: "OK",
        data: selectObj,
      });
    }
  );
};
const deleteUser = (req, res) => {
  const id = +req.params.id;
  const newObj = user.filter((val) => {
    return val.id !== id;
  });
  const deleteObj = user.find((val) => {
    return val.id === id;
  });
  fs.writeFile(
    `${__dirname}/dev-data/user.json`,
    JSON.stringify(newObj),
    "utf-8",
    (err) => {
      res.status(204).json({
        status: deleteObj ? "OK" : "Failed",
        data: deleteObj ? "Deleted information" : "Error",
      });
    }
  );
};
const updateUser = (req, res) => {
  const newId = +req.params.id;
  const body = req.body;
  let selectObj = user.find((val) => {
    return val.id === newId;
  });
  const index = user.indexOf(selectObj);
  selectObj = Object.assign({ id: newId }, body);
  user.fill(selectObj, index, index + 1);
  // console.log(students);
  fs.writeFile(
    `${__dirname}/dev-data/user.json`,
    JSON.stringify(user),
    "utf-8",
    (err) => {
      res.status(200).json({
        status: "OK",
        data: selectObj,
      });
    }
  );
};

const UpdateBookInfo = (req, res) => {
  const newId = +req.params.id;
  const body = req.body;
  let selectObj = book.find((val) => {
    return val.id === newId;
  });
  const index = book.indexOf(selectObj);
  if (selectObj) {
    for (let [key, val] of Object.entries(body)) {
      selectObj[`${key}`] = val;
    }

    book.fill(selectObj, index, index + 1);
  }

  // selectObj.name = fName ? fName : selectObj.name;
  // selectObj.age = age ? age : selectObj.age;

  // console.log(students);
  fs.writeFile(
    `${__dirname}/dev-data/book.json`,
    JSON.stringify(book),
    "utf-8",
    (err) => {
      res.status(selectObj ? 200 : 400).json({
        status: selectObj ? "OK" : "Failed",
        data: selectObj ? selectObj : "No data",
      });
    }
  );
};

const UpdateUserInfo = (req, res) => {
  const newId = +req.params.id;
  const body = req.body;
  let selectObj = user.find((val) => {
    return val.id === newId;
  });
  const index = user.indexOf(selectObj);
  if (selectObj) {
    for (let [key, val] of Object.entries(body)) {
      selectObj[`${key}`] = val;
    }

    user.fill(selectObj, index, index + 1);
  }

  // selectObj.name = fName ? fName : selectObj.name;
  // selectObj.age = age ? age : selectObj.age;

  // console.log(students);
  fs.writeFile(
    `${__dirname}/dev-data/user.json`,
    JSON.stringify(user),
    "utf-8",
    (err) => {
      res.status(selectObj ? 200 : 400).json({
        status: selectObj ? "OK" : "Failed",
        data: selectObj ? selectObj : "No data",
      });
    }
  );
};

const getBookById = (req, res) => {
  const id = +req.params.id;
  const selectObj = book.find((val) => {
    return val.id === id;
  });
  res.status(selectObj ? 200 : 404).json({
    status: selectObj ? "OK" : "Fail",
    data: selectObj ? selectObj : "No data",
  });
};
const getUserById = (req, res) => {
  const id = +req.params.id;
  const selectObj = user.find((val) => {
    return val.id === id;
  });
  res.status(selectObj ? 200 : 404).json({
    status: selectObj ? "OK" : "Fail",
    data: selectObj ? selectObj : "No data",
  });
};

app.route("/api/v1/book").get(getBook).post(addBook);
app
  .route("/api/v1/book/:id")
  .get(getBookById)
  .patch(UpdateBookInfo)
  .put(updateBook)
  .delete(deleteBook);
app.route("/api/v1/user").get(getUser).post(addUser);
app
  .route("/api/v1/user/:id")
  .get(getUserById)
  .patch(UpdateUserInfo)
  .put(updateUser)
  .delete(deleteUser);

app.listen(8000, "127.0.0.1");
