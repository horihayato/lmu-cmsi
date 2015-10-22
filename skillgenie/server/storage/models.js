var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Post = new Schema({

    id:                              { type: Number },
    goalAssoc:                       { type: String },
    doc:                            { type: String },
    timestamp:                       { type: String },
    headline:                        { type: String },
    description:                     { type: String },
    success:                       { type: Boolean },

    difficulty:                      { type: Number },
    priority:                        { type: String }
});

var Goal = new Schema({

    id:                     { type: Number },
    slug:                   { type: String },
    date:                   { type: String },
    timestamp:              { type: String },
    headline:               { type: String },
    description:            { type: String },
    success:              { type: Boolean },

    //all projected
    difficulty:             { type: Number },
    priority:               { type: String },
    doc:                    { type: String }, //date of completion
    fop:                    { type: String }  //frequecy of practice
});

module.exports = {
    Post: mongoose.model('Post', Post),
    Goal: mongoose.model('Goal', Goal)
};