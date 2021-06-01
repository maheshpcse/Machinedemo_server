const fs = require('fs');
const mysql = require('mysql');
const readXlsxFile = require('read-excel-file/node');
const multer = require('multer');
const fileread = require('./authenticate-controller');
const config = require('./config');

// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + `/document`)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({
    storage: storage,
}).single('file');

// File upload
module.exports.fileupload = function (req, res, next) {
    upload(req, res, function (err, result) {
        if (err) {
            console.log("Error in file receiving", err);
            res.status(500).json({
                success: false,
                message: "Error in file receiving",
                data: err
            });
        } else if (!req.file) {
            console.log("No file received");
            res.status(404).json({
                success: false,
                message: "No file received",
                data: null
            });
        } else {
            var file = req.file.path;
            console.log("file received", file);
            let finaldata = [];
            readXlsxFile(file).then((rows) => {
                if (rows != '') {
                    for (let i = 0; i < rows.length; i++) {
                        // console.log(rows[i].length);
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
                    }

                    const arraytitle = [reversearray[0][0], reversearray[1][0], reversearray[2][0], reversearray[3][0]];
                    newarray.push(arraytitle);
                    // newarray.push(newsuparay);
                    // newarray.push(newsuparay);
                    for (let k = 1; k < reversearray.length; k++) {
                        //for (let k = 1; k < 2; k++) {

                        for (let l = 1; l < reversearray[k].length; l++) {

                            if (l < reversearray[k].length - 1) {
                                let dataarray = [];
                                if (reversearray[k][l + 1] < reversearray[k][l]) {
                                    //console.log('greater value', reversearray[k][l] );
                                    dataarray.push(reversearray[0][l], reversearray[1][l], reversearray[2][l], reversearray[3][l]);
                                    newarray.push(dataarray);
                                    l = l + 1;
                                }
                            }
                        }
                    }
                    // let finalarray=  transpose(newarray);
                    console.log(newarray);

                    var arrF = [];
                    var arrX = [];
                    // var arrY = [];
                    // var arrZ = [];
                    for (let i = 0; i < finaldata.length; i++) {
                        arrF.push(finaldata[i][0]);
                        arrX.push(finaldata[i][1]);
                    }

                    // push the first elemnt in array since it is name
                    // if the next element is less then current element save it in array
                    res.status(200).json({
                        status: true,
                        message: "success",
                        data: newarray,
                        faxis: arrF,
                        xaxis: arrX
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Empty file data found",
                        data: null
                    });
                }
            });
        }
    });
}

function transpose(arr) {
    return Object.keys(arr[0]).map(function (c) {
        return arr.map(function (r) {
            return r[c];
        });
    });
}