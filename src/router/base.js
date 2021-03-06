import ClassManage from "@/views/base/ClassManage.vue"
import ModifyPassword from "@/views/base/ModifyPassword.vue"
import StudentManage from "@/views/base/StudentManage.vue"
import TeacherManage from "@/views/base/TeacherManage.vue"

export default [
    {
        path:"ClassManage",
        components:{
            right:ClassManage
        }
    },
    {
        path:"ModifyPassword",
        components:{
            right:ModifyPassword
        }
    },
    {
        path:"StudentManage",
        components:{
            right:StudentManage
        }
    },
    {
        path:"TeacherManage",
        components:{
            right:TeacherManage
        }
    }
]