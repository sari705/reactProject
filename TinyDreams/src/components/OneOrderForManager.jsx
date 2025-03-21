import { TableRow, TableCell, Chip } from "@mui/material";

const OneOrderForManager = ({ order }) => {
    return (
        <TableRow hover>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {order.userId || "משתמש לא זמין"}
            </TableCell>
            <TableCell align="center">{order._id}</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", color: "#BF7069" }}>
                ₪{order.finalPrice.toFixed(2)}
            </TableCell>
            <TableCell align="center">
                {order.date ? new Date(order.date).toLocaleString("he-IL") : "תאריך לא זמין"}
            </TableCell>
            <TableCell align="center">
                <Chip
                    label={order.isSetOff ? "שולם" : "לא שולם"}
                    sx={{
                        backgroundColor: order.isSetOff ? "#84B1D9" : "#D32F2F",
                        color: "white",
                        fontWeight: "bold"
                    }}
                />
            </TableCell>
        </TableRow>
    );
}

export default OneOrderForManager;
