import {Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRoute = ({children, role}) => {
    let user = useSelector((state)=>state.user.currentUser);
    if (user && (user.role === role || user.role == "MANAGER")) {                
        return children;
    }
    console.log("not ok");
    return <Navigate to="/login"/>;
}
 
export default ProtectRoute;