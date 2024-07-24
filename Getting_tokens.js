const axios = require('axios');

async function getTokens(){ 
    const options = {
    method: 'GET',
    url: 'https://www.dextools.io/shared/analytics/pairs',
    params: {limit: '51', interval: '5m', page: '1', chain: 'solana', minFdv: '20000', minVolume: '10000', creationLowerTimeRange: '43200000'},
    headers: {
        cookie: '__cf_bm=x3MBDhympnPV2hX9hOmZAxLo7y9B9x6W24AeDWcFrzo-1721775755-1.0.1.1-6cAo9ix8b7Vz86Ot7xtUwBgXamEHpzf1_tAewS_zC3Polssz6wQhKvRakF5h2QjLd8UUOXKe9qNGP_.GCCkVvQ',
        accept: 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        '^cookie': '_pk_id.1.b299=a21af1570444e52f.1721426104.; _pk_id.5.b299=2e253faadf9dbea6.1721426104.; __cf_bm=OAVQTDasom4FH9PZ.Ldo38ItSQzId7P.1VsbkCrkHas-1721774781-1.0.1.1-1wfICYv6wisx_ukpyIZzoi4pWEi2alQr7h5Zd9gXhE0EbtAIMcYvwj.t_bo1ORSXvMvLvGZTe8dyJIrxoNIvPA; cf_clearance=VRjV2fFD2JhYsOHJ3EELGdvKBzNA.jI9Zz1l9ylUxZo-1721774782-1.0.1.1-v6uTBP1jShZg4v73DDs1nLjfsOnQaxY9aWqAx3DF.WnTaZjxwjrv7iCEvAd6tds7FikuRDiR7gC9QIvvPkArMg; _pk_ref.1.b299=^%^5B^%^22^%^22^%^2C^%^22^%^22^%^2C1721774784^%^2C^%^22https^%^3A^%^2F^%^2Fwww.google.com^%^2F^%^22^%^5D; _pk_ses.1.b299=1; _pk_ref.5.b299=^%^5B^%^22^%^22^%^2C^%^22^%^22^%^2C1721774784^%^2C^%^22https^%^3A^%^2F^%^2Fwww.google.com^%^2F^%^22^%^5D; _pk_ses.5.b299=1^',
        '^if-none-match': 'W/^\^23a88-6GtCd7T5zHcvOPfLTHBYo4gJC2s^^^',
        priority: 'u=1, i',
        referer: 'https://www.dextools.io/app/en/solana/pairs',
        '^sec-ch-ua': '^\^Not/A',
        'sec-ch-ua-mobile': '?0',
        '^sec-ch-ua-platform': '^\^Windows^^^',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    }
    };
    try{
        const response = await axios.request(options);
        if (response.data.error) {
            throw new Error(response.data.error.message);
        }


        const current_data = response.data.data;
        // console.log(current_data.length);
        // for (const token of current_data) {
        //     console.log(token._id.token);
        //     console.log(token._id.pair);
        //     console.log(token.pair.name);
        //     console.log(token.token.metrics.mcap);
        //     console.log(token.token.metrics.fdv);

        // }
        return response.data.data;
    } catch (error) {
            console.error("Error fetching token largest accounts:", error.response ? error.response.data : error.message);
            return [];
        }


}

module.exports = { getTokens };

// getTokens().then((response) => {
//   });


  //const marketCap = totalSupply * currentPrice;
// Name
// Market-cap == mcap, if not shown take fdv

// reponse.data.data for each data._id.token = token address