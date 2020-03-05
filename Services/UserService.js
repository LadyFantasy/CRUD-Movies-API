
const User = require("../models/User")


class UserService {

    constructor(){
        this.limit = 5
    }
    
    getUsers(page) {
        const skip = (page - 1) * this.limit
        const query = User.find().skip(skip).limit(this.limit).exec() 

        return query
    }

    getUsersById(id) {
        const query = User.findOne({user:id}).exec() //searches by user in db

        return query
    }


    addUser(data) {
        const newUser = new User(data)

        return newUser.save()
    }
    
}

module.exports = UserService