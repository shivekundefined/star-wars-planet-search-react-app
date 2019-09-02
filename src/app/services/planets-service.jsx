
import { handleResponse } from '../helpers';
import * as Config from '../../Config';
import { LoggerService } from '../helpers/logger-service';

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
            LoggerService.log(error);
            throw new Error('Some Error occured. Please try again');
        })
}

const planet_search = (searchText, page = 1) => {
    let apiURL = Config.API.PLANET_SEARCH_API
    return fetch(apiURL + searchText + `&page=${page}&format=json`)
        .then(handleResponse)
        .then(response => {
            if(response.results.length) {
                return response;
            }else{
                return []
            }
        }, error => {
            LoggerService.log(error);
            throw new Error('Some Error occured. Please try again');
        })
}

export const planetService = {
    planet_details,
    planet_search
};