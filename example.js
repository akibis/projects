var mongoose = require('mongoose'), 
  Schema = mongoose.Schema;

// User schema contructor
var UserSchema = new Schema({
  website: {
    type: String,
    get: function(url) {
      if (!url) {
        return url;
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }
        return url;
        }
    }
  },
  firstName: String,
  lastName: String,
  email: String,
  username: {
    type: String,
    trim: true,   // trim whitespace
    unique: true  // usernames are indexes and unique
  }
  password: String,
  // add user creation date
  created: {
    type: Date,
    default: Date.now
  }
});

// return FullName field as a virtual attribute composed of
// first and last name
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

// enable virtual attributes (ie concatenation), and data change 
// on query prior to display to client
UserSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('User', UserSchema);
