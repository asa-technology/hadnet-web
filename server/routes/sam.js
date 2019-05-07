const router = require('express').Router();
const { db } = require('../../database/index');
const axios = require('axios');
const { addBusiness } = require('../../database/helpers')

router.get('/:zip', (req, res) => {
    zip = req.params.zip;
    console.log('request made')
    axios.get('https://api.data.gov/sam/v3/registrations',{
        params: {
            'api_key': process.env.SAM_API_KEY,
            'qterms': `(minorityOwned:true)+AND+(samAddress.zip:${zip})`,
            'start': 1,
            'length': 4,
        },
    })
    .then((results) => {
        const dataList = results.data.results;
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
                phone_number: listing.electronicBusinessPoc.usPhone,
                email: listing.electronicBusinessPoc.email,
                url_homepage: null,
                address: `${listing.samAddress.line1} ${listing.samAddress.city}, ${listing.samAddress.stateorProvince} ${listing.samAddress.zip}-${listing.samAddress.zipPlus4}`,
                latitude: null,
                longitude: null,
                average_rating: 0,
                legal_business_name: listing.legalBusinessName,
            };
            const streetNum = listing.samAddress.line1.split(' ')[0];
            const streetAdd = listing.samAddress.line1.split(' ')
            streetAdd.shift();
            const street = streetAdd.join(' ');
            axios.get('https://api.tomtom.com/search/2/structuredGeocode.json', {
                countryCode: 'USA',
                streetNumber: streetNum,
                streetName: encodeURI(street),
                municipality: 'New%20Orleans',
                countrySubdivision: 'Louisiana',
                postalCode:`${listing.samAddress.zip}-${listing.samAddress.zipPlus4}`,
                extendedPostalCodesFor:'Addr',
                key: process.env.MAPS_API_KEY,
            })
            
            if (listing.businessTypes.includes('OY')){
                addBusiness(businessEntry)
                .then((result) => {
                    console.log(result);
                })
            }
            console.log(businessEntry.name)
            console.log(businessEntry.address, businessEntry.phone_number, businessEntry.email)
            console.log(listing.businessTypes)
        })
    })
    .catch((err) => {
        console.log(err);
    })
})

module.exports = router;