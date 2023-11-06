import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TodoCard from "../TodoCard";
import TodoAddButton from "../TodoAddButton";
import { useQuery } from "react-query";
import { getRequest } from "../../utils/axiosHandler";

export default function TodoCards() {

  const getData = async () => {
    try {
      const response = await getRequest("api/book");
      return response.data;
    } catch (err) {
      console.log('Error getting data');
      return err;
  }
}
const {  isLoading, error, data } = useQuery(
    "getData",
    ()=>getData()
  );

  return (
    <Box>
      <TodoAddButton />
      <Grid container sx={{ padding: "0 20px 0 20px" }} spacing={2}>
        {!isLoading && !error &&
          data?.success?.data?.map((ele: any) => (
            <Grid key={ele.id} item xs={12} md={4} sm={6}>
              <TodoCard book={ele} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
