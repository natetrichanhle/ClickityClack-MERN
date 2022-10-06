const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required."],
            minlength: [2, "Username must be at least 2 characters long."],
            maxlength: [20, "Username cannot be longer than 20 characters."],
        },
        email: {
            type: String,
            required: [true, "Email address is required."],
            unique: true,
            validate: {
                validator: function (email) {
                    const re = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                },
                message: props => `${props.value} is not a valid email address.`
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: function (password) {
                    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
                    return re.test(password);
                },
                message: "Please enter a valid password. Must be at least 8 characters long, contain at least one uppercase and one lowercase character, one number, and one special character."
            }
        },
    },
    { timestamps: true }
);

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
}) 

module.exports = mongoose.model('User', UserSchema);
// Or you can export like this:
// const User = mongoose.model('User', UserSchema);
// module.exports = User;