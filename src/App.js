import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Snackbar,
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
  const [tree, setTree] = useState({
    name: "Determinant",
    attributes: {
      tag: "Parent",
    },
    children: [],
  });
  const [matrix, setMatrix] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  const [result, setResult] = useState("");
  const [open, setOpen] = useState(false);

  const handleResult = () => {
    setResult(calculateDeterminant(matrix));
    setTree(getTree());
  };

  const handleAdd = () => {
    setMatrix((prev) => {
      let newMatrix = prev;
      newMatrix = newMatrix.map((row) => {
        row.push(0);
        return row;
      });
      newMatrix.push(Array(prev.length + 1).fill(0));
      return newMatrix;
    });
  };

  const handleRemove = () => {
    if (matrix.length === 2) {
      setOpen(true);
    } else {
      setMatrix((prev) => {
        let newMatrix = prev;
        newMatrix = newMatrix.map((row) => {
          row.pop();
          return row;
        });
        newMatrix.pop();
        return newMatrix;
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeValue = (event) => {
    const ids = event.target.id.split("-");
    setMatrix((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === parseInt(ids[1])
          ? row.map((cell, cellIndex) =>
              cellIndex === parseInt(ids[2]) ? event.target.valueAsNumber : cell
            )
          : row
      )
    );
  };

  return (
    <Box sx={{ width: "100%", m: 1, p: 1 }} height="100vh">
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
                      <TableCell key={`cell-${indexCell}`}>
                        <TextField
                          type="number"
                          value={cell}
                          name={`textField-${indexRow}-${indexCell}`}
                          id={`textField-${indexRow}-${indexCell}`}
                          onChange={handleChangeValue}
                        />
                      </TableCell>
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
              <Button variant="contained" color="primary" onClick={handleAdd}>
                <AddSharpIcon />
              </Button>
            </Grid>
            <Grid item component="div">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRemove}
              >
                <RemoveSharpIcon />
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <Box sx={{ m: 2 }}>
        <Grid
          container
          component="div"
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
          spacing={2}
        >
          <Grid item component="div">
            <Button variant="contained" color="primary" onClick={handleResult}>
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
      <Box sx={{ height: "100%" }} minHeight="100%">
        <Tree data={tree} orientation="vertical" />
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          The size of matrix must be 2 or more!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
