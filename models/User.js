const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
});
// Static method to create an admin user with username 'admin' and password 'admin'
userSchema.statics.createAdmin = async function () {
    const User = mongoose.model('User');
    const adminUser = await User.findOne({ username: 'admin' });

    if (!adminUser) {
        const hashedPassword = await bcrypt.hash('admin', 10);
        const newAdminUser = new User({
            username: 'admin',
            password: hashedPassword,
        });
        await newAdminUser.save();
        console.log('Admin user created');
    }
};

module.exports = mongoose.model('User', userSchema);
