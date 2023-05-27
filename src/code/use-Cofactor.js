const useCofactor = () => {
  let tree = [];
  const calculateDeterminant = (matrix) => {
    if (matrix.length !== matrix[0].length) {
      throw new Error("The matrix is not square!");
    }
    // Case 2x2
    if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let determinant = 0;
    for (let i = 0; i < matrix.length; i++) {
      determinant += matrix[0][i] * cofactor(matrix, 0, i);
    }

    return determinant;
  };

  const cofactor = (matrix, row, column) => {
    const submatrix = [];

    for (let i = 1; i < matrix.length; i++) {
      const rowActual = matrix[i];
      const newRow = rowActual
        .slice(0, column)
        .concat(rowActual.slice(column + 1));
      submatrix.push(newRow);
    }
    const sign = (row + column) % 2 === 0 ? 1 : -1;
    return sign * calculateDeterminant(submatrix);
  };

  const getTree = () =>{
    if( tree.length === 0){
      
    }
  }

  const getTreeImplementation = () =>{

  }

  return {
    calculateDeterminant,
    getTree,
  }
};

export { useCofactor };
