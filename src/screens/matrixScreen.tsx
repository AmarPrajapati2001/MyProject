import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MatrixScreen = () => {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [matrix, setMatrix] = useState([]);

  const handleGenerateMatrix = () => {
    const numRows = parseInt(rows, 10);
    const numColumns = parseInt(columns, 10);

    if (isNaN(numRows) || isNaN(numColumns) || numRows <= 0 || numColumns <= 0) {
      alert('Please enter valid positive numbers for rows and columns.');
      return;
    }

    const generatedMatrix = generateSpiralMatrix(numRows, numColumns);
    setMatrix(generatedMatrix);
  };

  const generateSpiralMatrix = (rows, columns) => {
    const matrix = Array.from({ length: rows }, () => Array(columns).fill(0));
    let counter = 1;
    let top = 0;
    let bottom = rows - 1;
    let left = 0;
    let right = columns - 1;

    console.log("*******matrix",matrix); 

    while (top <= bottom && left <= right) {
      for (let i = left; i <= right; i++) {
console.log("*******matrix[top][i]",matrix[top][i]);
matrix[top][i] = counter++;

      }
      top++;

      for (let i = top; i <= bottom; i++) {
        matrix[i][right] = counter++;
      }
      right--;

      if (top <= bottom) {
        for (let i = right; i >= left; i--) {
          matrix[bottom][i] = counter++;
        }
        bottom--;
      }

      if (left <= right) {
        for (let i = bottom; i >= top; i--) {
          matrix[i][left] = counter++;
        }
        left++;
      }
    }

    return matrix;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matrix Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of rows"
        keyboardType="numeric"
        value={rows}
        onChangeText={setRows}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter number of columns"
        keyboardType="numeric"
        value={columns}
        onChangeText={setColumns}
      />
      <Button title="Generate Matrix" onPress={handleGenerateMatrix} />
      <View style={styles.matrixContainer}>
        {matrix.length > 0 &&
          matrix.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((col, colIndex) => (
                <Text key={colIndex} style={styles.cell}>
                  {col}
                </Text>
              ))}
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  matrixContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red'
  },
  cell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default MatrixScreen;