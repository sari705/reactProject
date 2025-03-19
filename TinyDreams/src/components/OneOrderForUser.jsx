import { TableRow, TableCell } from "@mui/material";

function OneOrderForUser({ order }) {
    const isBeforeToday = new Date(order.deadline) < new Date();
    
    return (
        <TableRow>
            <TableCell align="right">{order.address}</TableCell>
            <TableCell align="right">{order.minimalProduct.length}</TableCell>
            <TableCell align="right">{order.finalPrice.toFixed(2)}</TableCell>
            <TableCell align="right">
                {/* {order.deadline && isBeforeToday
                    ? `עד ${new Date(order.deadline).toLocaleDateString()}`
                    : "בדרך"} */}
                    {new Date(order.deadline).toLocaleDateString()}
            </TableCell>
        </TableRow>
    );
}

export default OneOrderForUser;
