import { Auth } from "../components/Auth"
import { Quote } from "../components/Quotes"

export const Login = ()=>{
    return <div className="grid grid-cols-2">
            <div>
            <Auth type="login"/>
            </div>
            <div className="invisible lg:visible">
            <Quote/>
            </div>        
    </div>
}