const router = require('express').Router();
const { db } = require('../../database/index');
const axios = require('axios');

router.get('/', (req, res) => {
    console.log('request made')
    axios.get('https://api.data.gov/sam/v3/registrations',{
        params: {
            'api_key': process.env.SAM_API_KEY,
            'qterms': '(minorityOwned:true)+AND+(samAddress.zip:70116)'
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
            const listing = result.data['sam_data'].registration;
            const businessEntry = {
                name: listing.legalBusinessName,
                address: `${listing.samAddress.line1} ${listing.samAddress.city}, ${listing.samAddress.stateorProvince} ${listing.samAddress.zip}-${listing.samAddress.zipPlus4}`,
                phone_number: listing.electronicBusinessPoc.usPhone,
                email: listing.electronicBusinessPoc.email,
                legal_business_name: listing.legalBusinessName,
            }
            console.log(businessEntry.name)
            console.log(businessEntry.address, businessEntry.phone_number, businessEntry.email)
            console.log(listing.businessTypes)
        })
    })
})

module.exports = router;