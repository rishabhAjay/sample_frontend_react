import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../src/components/Navbar";
import TodoCards from "../src/components/TodoCards";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
export const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
      <div className="App">
          <CssBaseline />
          <Navbar />
          <TodoCards />
      </div>
    </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

