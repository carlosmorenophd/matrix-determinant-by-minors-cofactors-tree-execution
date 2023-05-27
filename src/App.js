import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { TitleBar } from "./components/TitleBar";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import { useCofactor } from "./code/use-Cofactor";
import Tree from "react-d3-tree";

function App() {
  const { calculateDeterminant, getTree } = useCofactor();
  const [tree, setTree] = useState(
    {
      name: "Determinant",
      attributes: {
        tag: "Parent",
      },
      children: [],
    }
  )
  const [matrix, setMatrix] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  const [matrixSize, setmatrixSize] = useState(3);
  const [result, setResult] = useState("");

  const handleClick = () => {
    setResult(calculateDeterminant(matrix));
    setTree(getTree());
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <TitleBar title="Matrix Determinant by Minors and Cofactors" />
        <Box sx={{ m: 1, p: 2 }}>
          <Typography variant="body1" component="div">
            Matrix
          </Typography>
        </Box>
        <Card>
          <CardContent>
            <Table>
              <TableBody>
                {matrix.map((row, indexRow) => {
                  return (
                    <TableRow key={`row-${indexRow}`}>
                      {row.map((cell, indexCell) => (
                        <TableCell key={`cell-${indexCell}`}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>
            <Grid
              container
              component="div"
              direction="row"
              justifyContent="flex-end"
              alignItems="stretch"
            >
              <Grid item component="div">
                <Button variant="contained" color="primary">
                  <AddSharpIcon />
                </Button>
                <Button variant="contained" color="secondary">
                  <RemoveSharpIcon />
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        <Box sx={{ m: 2 }} >
          <Grid
            container
            component="div"
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-end"
            spacing={2}
          >
            <Grid item component="div">
              <Button variant="contained" color="primary" onClick={handleClick}>
                Calculate
              </Button>
            </Grid>
            <Grid item component="div">
              <TextField
                id="result"
                label="Result"
                value={result}
                InputLabelProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
        <Tree data={tree} orientation="vertical" />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
