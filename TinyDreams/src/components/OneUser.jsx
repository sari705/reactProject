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

