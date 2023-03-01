const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const { read_file, write_file } = require("../fs/fs_api")
let userData = read_file("jwt.json")

let Course = {
    
    GET: (req, res) => {

        let { id } = userData[0]
        let courses = read_file("courses.json").filter(user => user.user_id === id) 
        res.status(200).json(courses)
    },

    CREATE: async (req, res) => {
        try {
            let { id } = userData[0]
                let courses = read_file("courses.json")

                courses.push({
                    id: uuid.v4(),
                    user_id: id,
                    ...req.body
                })

                write_file("courses.json", courses)

                 res.status(201).send({
                    msg: "Created Course!"
                })

        } catch (error) {
            res.send(error.message)

        }

    },

    UPDATE: (req, res) => {
        let courses = read_file("courses.json")

        const { title, price, author } = req.body

        courses.forEach((course) => {
            if (course.id === req.params.id) {
                course.title = title ? title : course.title
                course.price = price ? price : course.price
                course.author = author ? author : course.author
            }
        })

        write_file("courses.json", courses)

        res.status(200).send({
            msg: "Updated course!"
        })
    },

    DELETE: (req, res) => {
        let courses = read_file("courses.json")

        const { title, price, author } = req.body

        courses.forEach((course, idx) => {
            if (course.id === req.params.id) {
                courses.splice(idx, 1)
            }
        })

        write_file("courses.json", courses)

        res.status(200).send({
            msg: "Deleted course!"
        })
    }
}

module.exports = Course