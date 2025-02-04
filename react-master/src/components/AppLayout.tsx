import { Outlet } from "react-router"
import NavBar from "./NavBar";

const AppLayout = () => {
    return (<>
       <div  >
            <div style={{backgroundColor:"#4e342e"}}>
                <NavBar/>
            </div>     
            <div>
                <Outlet/>
            </div>
            </div>
        
    </>)
}
export default AppLayout;


