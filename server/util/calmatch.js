// calculate Number of Factor
export const calMatLength = (len) => {
  let l = len;
  let matlength = 0;
  for (let i = 1; i < len + 1; i++) {
    l = l - i;
    if (l == 0) {
      matlength = i + 1;
    }
  }
  console.log("Matlength: ",matlength)
  return (matlength);
};

// Calculate AHP Matrix 
export const calmatrix = (jsondata) => {
  let matrix = [];
  let matrixlenght = 0;
  let l = jsondata.length;
  for (let i = 1; i < jsondata.length + 1; i++) {
    l = l - i;
    if (l == 0) {
      matrixlenght = i + 1;
    }
  }

  for (let i = 0; i < matrixlenght; i++) {
    for (let j = 0; j < matrixlenght; j++) {
      matrix[i] = [];
    }
  }

  let index = 0;
  for (let i = 0; i < matrixlenght; i++) {
    for (let j = 0; j < matrixlenght; j++) {
      if (i == j) {
        matrix[i][j] = 1;
      } else {
        if (j > i) {
          let id = jsondata[index].factor_ID - 1;
          if (i == id) {
            matrix[i][j] = parseInt(jsondata[index].weight);

            var number = 1 / jsondata[index].weight;
            matrix[j][i] = parseFloat(number.toFixed(2));
            index++;
          } else {
            var number = 1 / jsondata[index].weight;
            matrix[i][j] = parseFloat(number.toFixed(2));

            matrix[j][i] = parseInt(jsondata[index].weight);
            index++;
          }
        }
      }
    }
  }
  console.log(matrix);
  let sum = 0;
  let arraysum = [];
  for (let i = 0; i < matrixlenght; i++) {
    for (let j = 0; j < matrixlenght; j++) {
      sum = sum + matrix[j][i];
    }
    arraysum[i] = sum;
    sum = 0;
  }
  // console.log(arraysum);

  for (let i = 0; i < matrixlenght; i++) {
    for (let j = 0; j < matrixlenght; j++) {
      let value = matrix[j][i] / arraysum[i];
      matrix[j][i] = parseFloat(value.toFixed(2));
    }
  }
  console.log(matrix);

  var arrayWeight = [];
  let sumW = 0;
  for (let i = 0; i < matrixlenght; i++) {
    for (let j = 0; j < matrixlenght; j++) {
      sumW = sumW + matrix[i][j];
    }

    arrayWeight[i] = parseFloat(sumW.toFixed(2));
    sumW = 0;
  }
  // console.log(arrayWeight);

  for (let i = 0; i < arrayWeight.length; i++) {
    arrayWeight[i] = parseFloat((arrayWeight[i] / matrixlenght).toFixed(2));
  }
  console.log(arrayWeight);

  return arrayWeight;
};


// manage Dorm data

export const magDorm = (data,Mlength) =>{
  let scoreDorm = [];
  for (let i = 0; i < data.length; i = i + Mlength) {
      let obj = {};
      let scoreA = [];
      
        obj['dorm_ID'] = data[i].dorm_ID;
        for (let j = i; j < i+Mlength; j++) {
          let scorejson = {};
          scorejson['factor_ID'] = data[j].factor_ID;
          scorejson['score'] = data[j].score;
          scoreA.push(scorejson);
          
          }
      // console.log(scoreA);
      obj['Score_ID'] = scoreA;
      obj['Sui_Value'] = 0;
      scoreDorm.push(obj);
    }
    return (scoreDorm);
};