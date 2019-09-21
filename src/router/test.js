import MakeTestPaper from "@/views/test/MakeTestPaper.vue"
import TestPaperManage from "@/views/test/TestPaperManage.vue"
import TestResult from "@/views/test/TestResult.vue"
import TestSetter from "@/views/test/TestSetter.vue"
import ViewTestPaper from "@/views/test/ViewTestPaper.vue"

export default [
    {
        path:"MakeTestPaper",
        components:{
            right:MakeTestPaper
        }
    },
    {
        path:"TestPaperManage",
        components:{
            right:TestPaperManage
        }
    },
    {
        path:"TestResult",
        components:{
            right:TestResult
        }
    },
    {
        path:"TestSetter",
        components:{
            right:TestSetter
        }
    },
    {
        path:"ViewTestPaper",
        components:{
            right:ViewTestPaper
        }
    }
]