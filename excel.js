const XLSX = require('xlsx');
const fs = require('fs');

function createOrUpdateExcel(newData, address) {
  const filePath = `./excel_sheets_token/${address}.xlsx`;
  let workbook;

  // Create a new workbook or read the existing one
  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    // Remove the existing sheet if it exists
    if (workbook.SheetNames.includes('MarketData')) {
      workbook.SheetNames.splice(workbook.SheetNames.indexOf('MarketData'), 1);
      delete workbook.Sheets['MarketData'];
    }
  } else {
    workbook = XLSX.utils.book_new();
  }

  // Convert new data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(newData);

  // Append the new worksheet
  XLSX.utils.book_append_sheet(workbook, worksheet, 'MarketData');

  // Write workbook to file
  XLSX.writeFile(workbook, filePath);
}

module.exports = { createOrUpdateExcel };


// // Example data
// const marketData = [
//   { address: "E9EybKPGDefzAZWjEZC5ACTLFacW4fw3haWXkRJ91J17", isTokenAddress: "Yes", RealizedProfits: "N/A" },
//   { address: "8Yt3eS1nPL1JDsqeBxxudUUvcVVDh7yZ9dXf62tvL", isTokenAddress: "No", RealizedProfits: "398.85418582265" },
//   { address: "8Yt3eS1nPL1JDsqeBxxudUUvcVVDh7yZ9UjqdXf62tvL", isTokenAddress: "No", RealizedProfits: "3.85419328582265" },
//   { address: "8Yt3eS1nPL1JDsqeBxxudUUvcVVDh7yZ9UjqdXf62tvL", isTokenAddress: "No", RealizedProfits: "398.85419325" }
// ];

// // // Create or update Excel file
// createOrUpdateExcel(marketData);
