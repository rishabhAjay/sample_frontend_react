import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TodoFormModal from "../TodoFormModal";
import { Box } from "@mui/material";
export default function TodoAddButton() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "20px",
      }}
    >
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New
      </Button>

      <TodoFormModal open={open} onClose={handleClose} type="add" />
    </Box>
  );
}
