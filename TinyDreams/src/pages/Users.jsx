// import { useEffect, useState } from "react";
// import { getAllUsers } from "../api/userService";
// import OneUser from "../components/OneUser";

// const Users = () => {
//     const [users, setUsers] = useState([])
//     const [error, setError] = useState({})
//     const token = localStorage.getItem("token")

//     const getUsers = async () => {
//         try {        
//             if(token){
//                 const response = await getAllUsers(token)
//                 console.log(response.data.usersWithoutPassword);
                
//                 if (response) {
//                     setUsers(response.data.usersWithoutPassword)
//                 }
//             }  
//             else{
//                 alert("login first")
//             }            
//         }
//         catch (error) {
//             setError({ title: "Server error", message: error.message })
//         }

//     }

//     useEffect(() => {
//         getUsers()
//     }, [])

//     return (
//         <>
//             {users.length ? <ul>
//                 {users.map((user) => (
//                     <li>
//                         <OneUser user={user}></OneUser>
//                     </li>
//                 ))}
//             </ul> :
//                 <div>
//                     <h1>{error.title}</h1>
//                     <h2>{error.message}</h2>
//                 </div>
//             }
//         </>
//     );
// }

// export default Users;

import { useEffect, useState } from "react";
import { getAllUsers } from "../api/userService";
import OneUser from "../components/OneUser";
import { Typography, Alert, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box } from "@mui/material";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const getUsers = async () => {
        try {
            if (token) {
                const response = await getAllUsers(token);
                if (response) {
                    setUsers(response.data.usersWithoutPassword);
                }
            } else {
                alert("Login first");
            }
        } catch (error) {
            setError({ title: "Server error", message: error.message });
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Box sx={{marginRight:"auto", marginLeft:"auto", width:"100%", alignItems: "center"}}>
            <Typography variant="h3" sx={{marginRight:"auto", marginLeft:"auto", width:"30%", color: "#590202", fontWeight: "bold", marginBottom: "24px" }}>
                רשימת משתמשים
            </Typography>

            {error ? (
                <Alert severity="error" sx={{ backgroundColor: "#590202", color: "white", padding: "16px", borderRadius: "8px" }}>
                    <Typography variant="h6">{error.title}</Typography>
                    <Typography>{error.message}</Typography>
                </Alert>
            ) : (
                <TableContainer component={Paper} sx={{ marginRight:"auto", marginLeft:"auto", width:"100%",maxWidth: "90%", boxShadow: 3, borderRadius: "12px" }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#D9B1A3" }}>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>שם משתמש</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>אימייל</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>תאריך יצירה</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>מזהה משתמש</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>פעולות</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <OneUser key={user._id} user={user} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
            
    );
};

export default Users;




