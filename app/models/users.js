
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "first name is required"],
        unique: false
    },
    lastname: {
        type: String,
        required: [true, 'last name is required'],
        unique: false
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        unique: false
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    photo: {
        type: String,
        required: false,
        unique: false
    },
    admin: {
        type: Boolean,
        required: true,
        default: false,
    }
});

userSchema.methods.generateHash = (password)=> {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
  
userSchema.methods.validPassword = (password, encrypted)=> {
    console.log(`password: ${password}, encrypted: ${encrypted}`);
    // return bcrypt.compareSync(password, encrypted);

    bcrypt.compare(password, encrypted, (error, result)=>{
        console.log('error: ' + error);
        console.log('result: ' + result);
        if (result) {
            return true;
        } else {
            return false;
        }
    });
    // this is always returning false, and I cant figure out why
};

const User = mongoose.model("User", userSchema);

module.exports = User;
