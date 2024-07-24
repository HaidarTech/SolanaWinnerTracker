const axios = require('axios');


async function getTopTraders(TokenAddress){ 
const options = {
  method: 'GET',
  url: `https://core-api.dextools.io/maker/top/solana/${TokenAddress}`,
  headers: {
    cookie: '__cf_bm=XfbtDy3fyuKGF2EYgww3LUWfENaP_uk3b9dk7wczt4A-1721426285-1.0.1.1-5P6nsoDUGfWU6CHx9MuyRAIJ1TBjot0bb7CgLsoqVfHnuTFBDRG47DNmoS6Esf1QiZrBuxUmiturg2k2llFcxQ',
    accept: 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    '^if-none-match': 'W/^\^2b939-Mt3dxtVUug/1dX1XrZzaOzVNHFE^^^',
    origin: 'https://www.dextools.io',
    priority: 'u=1, i',
    referer: 'https://www.dextools.io/',
    '^sec-ch-ua': '^\^Not/A',
    'sec-ch-ua-mobile': '?0',
    '^sec-ch-ua-platform': '^\^Windows^^^',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'x-api-version': '1'
  }
};
    try{
        const response = await axios.request(options);
        if (response.data.error) {
            throw new Error(response.data.error.message);
          }

          const profits = response.data.data.byRealizedProfit;

          const data_lib = [];
          for (const holder of profits) {
              const data = holder.realizedProfit;
              if (data < 0){
                  continue;
              }
              const address = holder.address;
              data_lib.push({address: holder.address, profit: data});
          }


          return data_lib;
    } catch (error) {
            console.error("Error fetching token largest accounts:", error.response ? error.response.data : error.message);
            return [];
          }

}

module.exports = { getTopTraders };





// const address = "E9EybKPGDefzAZWjEZC5ACTLFacW4fw3haWXkRJ91J17";
// getTopTraders(address).then((response) => {
//     for (const holders of response){
//         console.log(holders.address);
//         console.log(holders.profit);

//     }
//   });