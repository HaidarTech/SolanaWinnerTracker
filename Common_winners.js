var fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');
const { createOrAppendExcel } = require("./Append_excel.js");

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}




function findingWinnersAndRemovingDuplicates(folder){
    var dirname = `./${folder}`;
    // console.log("Going to get file info!");
    tokenAddress = "";
    data_lib = [];
    data_set = new Set();
    counter = 0;

    fs.readdir(dirname, function (err, files) {
        if (err) 
            console.log(err); 
        else { 
            //console.log("\nCurrent directory filenames:"); 
            files.forEach(file => { 
                if (path.extname(file) === '.xlsx') {
                    //console.log(`\nReading file: ${file}`);
                    const workbook = XLSX.readFile(path.join(dirname, file));
            
                    workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    internal_counter = 0;
                    //console.log(`Contents of sheet "${sheetName}":`);
                    for (const data of jsonData) {
                        if (counter == 0){
                            tokenAddress = data.Address; 
                            // console.log("TOKEN INFO: ",tokenAddress);
                            counter++;
                        }
                        else {
                            // console.log("Current address: ",data.Address);
                            // console.log("Profit: ",data.Profit);
                            // console.log("Time: ",data.time);
                            data_lib.push({Address: data.Address, Profit: data.Profit, Time: data.time, TokenAddress: tokenAddress});
                        }


                        counter++;
                    }                 
                    });
                }
                });

                
                console.log(data_lib.length); 

                data_lib.forEach(data => {
                    internal_counter = 0; 
                    TotalProfit = 0;
                    data_lib.forEach(data2 => {
                        if (data.Address == data2.Address){
                            internal_counter++;
                            TotalProfit += parseFloat(data2.Profit);
                        }

                    });


                    data_set.add({address: data.Address, count: internal_counter, profit: TotalProfit});

                });
            createOrAppendExcel(data_lib, "All_winners_data");
            createOrAppendExcel(data_set, "winners_occurances");
            return data_set; 
            }
            });
        }
