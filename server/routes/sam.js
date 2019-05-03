const router = require('express').Router();
const { db } = require('../../database/index');
const axios = require('axios');

router.get('/', (req, res) => {
    console.log('request made')
    axios.get('https://api.data.gov/sam/v3/registrations',{
        params: {
            'api_key': process.env.SAM_API_KEY,
            'qterms': '(minorityOwned:true)+AND+(samAddress.zip:70119)'
        },
    })
    .then((results) => {
        const dataList = results.data.results.slice(0, 2);
        const links = dataList.map((listing) => {
            return listing.links[0].href
        })
        console.log(links);
        const promises = links.map((link) => {
            return axios.get(link, {
                params: {
                    'api_key': process.env.SAM_API_KEY,
                }
            })
        })
        return Promise.all(promises)
    })
    .then((results) => {
        results.forEach((result) => {
            console.log(result.data['sam_data'].registration.businessTypes)
        })
    })
})

module.exports = router;