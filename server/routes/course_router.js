const { Router } = require("express")
const CourseCtr = require("../controller/course_controller")
const authMid = require("../middleware/auth_middleware")

let router = Router()


router.get("/courses", CourseCtr.GET )
router.post("/courses", CourseCtr.CREATE)
router.put("/courses/:id", CourseCtr.UPDATE)
router.delete("/delete_course/:id", CourseCtr.DELETE)


module.exports = router