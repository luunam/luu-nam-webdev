module.exports = function () {
  var mongoose = require('mongoose');

  var websiteSchema = mongoose.Schema({
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
    dateCreated: Date
  }, {collection: 'website'});

  return websiteSchema;
};