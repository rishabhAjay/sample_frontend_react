import * as React from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useMutation } from "react-query";
import { queryClient } from "../../App";
import TodoFormModal from "../TodoFormModal";
import { deleteRequest, patchRequest } from "../../utils/axiosHandler";
interface Item {
  id: string;
  title: string;
  description: string;
}
type Props = { book: Item };
export default function TodoCard(props: Props) {
  const [editButtonClicked, setEditButtonClicked] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const { title, description } = props.book;
  const [value, setValue] = React.useState(props.book);
  console.log("PROPS::", props.book)
  const mutation: any = useMutation(
    (newBook: object) => {
      return patchRequest("api/book", value.id, newBook);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("getData");
      },
    }
  );

  const handleEditDialogClose = () => setEditDialogOpen(false);
  const handleEditDialogOpen = () => setEditDialogOpen(true);

  const deleteMutation: any = useMutation(
    (name) => {
      return deleteRequest("api/book", value.id);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("getData");
      },
    }
  );

  const editDescription = () => {
    setEditButtonClicked((prev) => !prev);
  };

  const submitDescription = () => {
    mutation.mutate(value);
    editDescription();
  };

  const deleteTodo = () => {
    deleteMutation.mutate();
  };
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ wordBreak: "break-word" }}
          >
            {title}
          </Typography>

          {editButtonClicked ? (
            <CardContent>
              <TextField
                size="small"
                multiline
                value={value.description}
                id="standard-basic"
                variant="standard"
                onChange={(event) =>
                  setValue({ ...value, description: event.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={submitDescription}>
                        <SendIcon />
                      </IconButton>
                      <IconButton onClick={editDescription}>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
          ) : (
            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
              {description}{" "}
              <IconButton
                color="primary"
                size="small"
                aria-label="menu"
                sx={{ ml: -1, mt: -0.5 }}
                onClick={editDescription}
              >
                <EditIcon sx={{ width: 23 }} />
              </IconButton>
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ mt: -3 }}>
          <CardActions>
            <Button onClick={deleteTodo} variant="contained" color="error">
              <DeleteIcon />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditDialogOpen}
            >
              <EditIcon />
            </Button>
          </CardActions>
        </CardActions>
      </Card>
      <TodoFormModal
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        type="edit"
        book={value}
      />
    </>
  );
}
