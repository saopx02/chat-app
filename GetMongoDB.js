var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://saopx02:rtyfgh@ds125994.mlab.com:25994/chatdb";
                       
module.exports = {
  GetAllMessage: function() {
    return MongoClient.connect(url).then(function(db) {
      var collection = db.collection('customers');
      
      return collection.find().toArray();
    }).then(function(items) {
      return items;
    });
  }
};