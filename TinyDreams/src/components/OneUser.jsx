// const OneUser = ({ user }) => {
//     return (
//         <div>
//             <h2>{user.username}</h2>
//             <h2>{user.email}</h2>
//             <h2>{user.date}</h2>
//             <h2>{user._id}</h2>
//         </div>
//     );
// }

// export default OneUser;
import { TableRow, TableCell, Button } from "@mui/material";

const OneUser = ({ user }) => {



    return (
        <TableRow hover>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {user.username || "משתמש ללא שם"}
            </TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">
                {user.date ? new Date(user.date).toLocaleString("he-IL") : "תאריך לא זמין"}
            </TableCell>
            <TableCell align="center" sx={{ color: "gray" }}>{user._id}</TableCell>
            <TableCell align="center">
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#BF7069",
                        color: "white",
                        "&:hover": { backgroundColor: "#590202" },
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontSize: "14px"
                    }}
                >
                    ניהול משתמש
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default OneUser;

