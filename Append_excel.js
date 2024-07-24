const XLSX = require('xlsx');
const fs = require('fs');

// Function to create or update Excel file
function createOrAppendExcel(newData, fileName) {
  const filePath = `${fileName}.xlsx`;
  let workbook;
  let worksheet;
  let existingData = [];

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    if (workbook.SheetNames.includes('MarketData')) {
      worksheet = workbook.Sheets['MarketData'];
      existingData = XLSX.utils.sheet_to_json(worksheet);
    } else {
      workbook = XLSX.utils.book_new();
    }
  } else {
    workbook = XLSX.utils.book_new();
  }

  // Combine existing data with new data
  const combinedData = existingData.concat(newData);

  // Convert combined data to worksheet
  worksheet = XLSX.utils.json_to_sheet(combinedData);

  // Remove the existing sheet if it exists
  if (workbook.SheetNames.includes('MarketData')) {
    workbook.SheetNames.splice(workbook.SheetNames.indexOf('MarketData'), 1);
  }

  // Append the new worksheet
  XLSX.utils.book_append_sheet(workbook, worksheet, 'MarketData');

  // Write workbook to file
  XLSX.writeFile(workbook, filePath);
}

module.exports = { createOrAppendExcel };

// // Example data
// const marketData = [
//   { address: "E9EybKPGDefzAZWjEZC5ACTLFacW4fw3haWXkRJ91J17", isTokenAddress: "Yes", RealizedProfits: "N/A" },
//   { address: "8Yt3eS1nPL1JDsqeBxxudUUvcVVDh7yZ9UjqdXf62tvL", isTokenAddress: "No", RealizedProfits: "398.85419328582265" },
// ];

// // Create or update Excel file
// createOrUpdateExcel(marketData);
