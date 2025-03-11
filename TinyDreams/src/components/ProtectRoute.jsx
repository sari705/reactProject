import {Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRoute = ({children, role}) => {
    let user = useSelector((state)=>state.user.currentUser);
    if (role === "USER") {
        if (user) {
            return children;
        }
        return <Navigate to="/login"/>;
    }
    else if (user?.role == "MANAGER") {                
        return children;
    }
    return <Navigate to="/login"/>;
    console.log("not ok");
    
}
 
export default ProtectRoute;