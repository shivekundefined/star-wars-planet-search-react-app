
import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers';
import * as Config from '../../Config';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    isLoggedIn: false,
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    /* const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    */

    let apiURL = Config.API.LOGIN
    return fetch(apiURL + username + '&format=json')
        .then(handleResponse)
        .then(result => {
            result = result.results.filter(user => user.name === username && user.birth_year === password);
            if (result.length > 0) {
                localStorage.setItem('currentUser', JSON.stringify(result[0]));
                currentUserSubject.next(result[0]);
                authenticationService.isLoggedIn = true
                return result[0];
            }
            else {
                throw new Error('User/Password is incorrect');
            }
        }, error => {
            throw new Error('Some Error occured. Please try again');
        })/* .catch( error => {
            console.log(error);
            alert("User/Password is incorrect 2")
        }); */    
}

function logout() {
    // remove user from local storage to log user out
    authenticationService.isLoggedIn = false
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}