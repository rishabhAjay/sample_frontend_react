import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField, DialogContent, DialogActions, Stack } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import { useMutation } from "react-query";
import { queryClient } from "../../App";
import { postRequest, putRequest } from "../../utils/axiosHandler";

const defaultValue = {
  title: "",
  description: "",
};

export default function TodoFormModal(props: any) {
  const { onClose, open, type, book } = props;
  const [value, setValue] = React.useState(defaultValue);
  const mutation: any = useMutation((newBook: object) => {
    return postRequest("api/book", "", newBook);
  });

  React.useEffect(() => {
    if (type === "edit") setValue(book);
  }, [type, book]);

  const editMutation: any = useMutation(
    (newbook: object) => {
      console.log("ID::", book.id)
      return putRequest("api/book", book.id, newbook);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("getData");
      },
    }
  );

  const handleSubmit = () => {
    if (type === "edit") {
      editMutation.mutate(value);
    } else mutation.mutate(value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box>
        <DialogTitle>
          <Stack direction="row" alignItems={"center"} justifyContent="center">
            <AddBoxIcon />
            <Typography variant="h6">
              {type === "add" ? "Add" : "Edit"} Item
            </Typography>
          </Stack>
        </DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
          //   sx={{ mt: 2 }}
        >
          <DialogContent>
            <TextField
              value={value?.title}
              required
              fullWidth
              label="Title"
              type="text"
              id="title"
              autoFocus
              onChange={(event) =>
                setValue({ ...value, title: event.target.value })
              }
            />
            <TextField
              value={value && value.description}
              sx={{ mt: 1 }}
              required
              fullWidth
              id="description"
              label="Description"
              type="text"
              onChange={(event) =>
                setValue({ ...value, description: event.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              //   disabled={disableInput}
              fullWidth
              type="submit"
              startIcon={<SendIcon />}
              variant="contained"
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
}
