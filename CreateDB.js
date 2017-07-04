var xlsx = require('node-xlsx');
var mongo = require('mongodb');

var obj = xlsx.parse(__dirname + '/Test.xlsx');
var obj_inserted = obj[0].data;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.createCollection("categories", function(err, res) {
    if (err) throw err;
    console.log("Table created!");
    obj_inserted.forEach(function(row_array) {
      console.log("Row is"+JSON.stringify(row_array));
      if(row_array[0] == "Category")
      return;
      var row = {"Category":row_array[0], "Type":row_array[1], "first_branch":row_array[2], "second_branch":row_array[3], "third_branch":row_array[4] };
      db.collection("categories").insertOne(row, function(err, res) {
        if (err) throw err;
         console.log("The row  that is inserted"+JSON.stringify(row));;
       });
    });
    db.close();
  });
 });
