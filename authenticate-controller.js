var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const fileUploaded = require('./fileupload-controller');

// Read file function
module.exports.authenticate = function (req, res) {

  //decalre the array 
  let finaldata = [];
  // now get the file from the server
  // gread the file from the server
  let filename = fileUploaded.req.file.path;
  console.log('filename is read here ===>', filename);
  readXlsxFile(filename).then((rows) => {
    if (rows != '') {

      for (let i = 0; i < rows.length; i++) {
        //   console.log(rows[i].length);
        let smalldata = [];
        for (let j = 0; j < rows[i].length; j++) {
          smalldata.push(rows[i][j]);
        }
        finaldata.push(smalldata);

      }

      let reversearray = transpose(finaldata);
      // now read the array and process it
      let newarray = [];
      let newsuparay = [];
      for (let k = 0; k < reversearray.length; k++) {

        newsuparay.push(reversearray[k][0]);

        //        for(let l=0;l<reversearray[k].length;l++){



        //      }

      }

      // newarray.push(newsuparay);
      // for(let k=1;k<reversearray.length;k++){
      for (let k = 1; k < 2; k++) {

        for (let l = 1; l < reversearray[k].length; l++) {

          if (l < reversearray[k].length - 1) {
            let dataarray = [];
            if (reversearray[k][l + 1] < reversearray[k][l]) {
              //console.log('greater value', reversearray[k][l] );
              dataarray.push(reversearray[0][l], reversearray[1][l], reversearray[2][l], reversearray[3][l]);
              newarray.push(dataarray);
            }
          }


        }



      }

      //  let finalarray=  transpose(newarray);
      console.log(newarray);
      //push the first elemnt in array since it is name

      //if the next element is less then current element save it in array


      res.json({
        status: true,
        message: "result",
        data: newarray
      });
    } else {
      // show the error message
      res.json({
        status: false,
        message: "Empty file data found",
        data: ''
      });
    }
  })


  // compute the value
  //write it in array
  //retrun back


}


function transpose(arr) {
  return Object.keys(arr[0]).map(function (c) {
    return arr.map(function (r) {
      return r[c];
    });
  });
}