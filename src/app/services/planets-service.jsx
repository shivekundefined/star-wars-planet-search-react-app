
import { handleResponse } from '../helpers';
import * as Config from '../../Config';

const planet_details = (planetId) => {
    let apiURL = Config.API.PLANET_DETAILS_API + planetId + '/'
    return fetch(`${apiURL}`)
        .then(handleResponse)
        .then(result => {
            if(result) {
                return result;
            }else{
                throw new Error('Invalid Planet. Please try again');
                //return {}
            }
        }, error => {
            throw new Error('Some Error occured. Please try again');
        })
}

const planet_search = (searchText) => {
    let apiURL = Config.API.PLANET_SEARCH_API
    return fetch(apiURL + searchText + '&format=json')
        .then(handleResponse)
        .then(response => {
            if(response.results.length) {
                return response.results;
            }else{
                return []
            }
        }, error => {
            throw new Error('Some Error occured. Please try again');
        })
}

export const planetService = {
    planet_details,
    planet_search
};