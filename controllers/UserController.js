const bcrypt = require("bcrypt-nodejs")

class UserController {

    constructor(userService) {
        this.userService = userService
    }

    async getUsers(req, res) {
        let page = req.query.page ? req.query.page : 1

        const users = await this.userService.getUsers(page)

        return res.json(users)
    }

    async getUsersById(req, res) {
        const id = req.params.id

        if (id) {
            const user = await this.userService.getUserById(id)
            return res.json(user)
        } else {
            return res.sendStatus(400)
        }
    
    }


    async addUser(req, res) {
        const body = req.body
        const newBody = {
            ...body,
            password: bcrypt.hashSync(body.password)
        }

        if (body) {
            const users = await this.userService.addUser(newBody)
            return res.sendStatus(200)

        } else {
            return res.sendStatus(400)
        }
    }
}



module.exports = UserController