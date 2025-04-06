import { Auth } from "../components/Auth"
import { Quote } from "../components/Quotes"

export const Signup = ()=>{
    return <div className="grid grid-cols-2">
        <div>
        <Auth type="signup"/>
        </div>
        <div className="invisible lg:visible">
        <Quote/>
        </div>
        
    </div>
}