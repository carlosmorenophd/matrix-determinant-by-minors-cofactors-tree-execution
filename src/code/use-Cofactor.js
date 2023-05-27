import dataTree from "data-tree";
import { uid } from "uid";

const useCofactor = () => {
  let tree = [];
  const parent = uid();

  const calculateDeterminant = (matrix) => {
    if (matrix.length !== matrix[0].length) {
      throw new Error("The matrix is not square!");
    }
    const determinant = calculateDeterminantImplementation({
      matrix,
      id: parent,
    });
    console.log("Tree", tree);
    return determinant;
  };

  const matrixToString = ({ data }) => {
    return `[${data.map((row) => `[${row.join(",")}]`).join(",")}]`;
  };

  const calculateDeterminantImplementation = ({ matrix, id }) => {
    const leaf = {
      id: uid(),
      parent: id,
      matrix: matrixToString({ data: matrix }),
    };
    tree.push(leaf);
    // Case 2x2
    if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let determinant = 0;
    for (let i = 0; i < matrix.length; i++) {
      determinant +=
        matrix[0][i] * cofactor({ matrix, row: 0, column: i, parent: leaf.id });
    }
    return determinant;
  };

  const cofactor = ({ matrix, row, column, parent }) => {
    const submatrix = [];

    for (let i = 1; i < matrix.length; i++) {
      const rowActual = matrix[i];
      const newRow = rowActual
        .slice(0, column)
        .concat(rowActual.slice(column + 1));
      submatrix.push(newRow);
    }
    const sign = (row + column) % 2 === 0 ? 1 : -1;
    return (
      sign *
      calculateDeterminantImplementation({ matrix: submatrix, id: parent })
    );
  };

  const getTree = () => {
    if (tree.length === 0) {
      throw new Error('The calculate determinant function must be called before getTree function!');
    }else{
      const result = getTreeImplementation()
      return result.export((data) => {
        return {
          name: `${data.values.id}`,
          attributes: {
            tag: `${data.values.type} - ${data.values.matrix}`,
          },
        };
      });
    }
  };

  const getTreeImplementation = () => {
    let nowParent = parent;
    const oldParent = parent;
    let continueTree = true;
    let panicButton = 0;
    let dataTreeResult = dataTree.create();
    let finishAllLeaf = 1;
    let parentCollectors = [];
    while (continueTree) {
      const nowParentConst = nowParent;
      const children = tree.filter((t) => t.parent === nowParentConst);
      children.forEach((child) => {
        parentCollectors.push(child.id);
        if (child.parent === oldParent) {
          dataTreeResult.insert({
            key: child.id,
            values: {
              id: child.id,
              matrix: child.matrix,
              type: "Parent",
            },
          });
        } else {
          dataTreeResult.insertTo((data) => data.key === nowParentConst, {
            key: child.id,
            values: {
              id: child.id,
              matrix: child.matrix,
              type: "Child",
            },
          });
        }
      });
      finishAllLeaf = finishAllLeaf + children.length;
      nowParent = parentCollectors.pop();
      if (finishAllLeaf === 0) continueTree = false;
      finishAllLeaf--;

      // Panic button to prevent infinite loop only on dev mode
      if( process.env.NODE_ENV === "development"){
        if (panicButton > 100) {
          console.warn("Panic button activate");
          continueTree = false;
        } else {
          panicButton++;
        }
      }
    }
    return dataTreeResult;
  };

  return {
    calculateDeterminant,
    getTree,
  };
};

export { useCofactor };
