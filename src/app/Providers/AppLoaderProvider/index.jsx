import React, { Component} from 'react';

import {AppContextLoader} from '../Context';

export default class AppLoaderProvider extends Component{
    state = {
        displayLoader: false
    }

    showLoader(){
        this.setState({
            displayLoader: true
          });
        document.body.classList.add("modal-open")
    }

    hideLoader(){
        this.setState({
            displayLoader: false
        })
        document.body.classList.remove("modal-open")
    }

    render(){
        return (
            <AppContextLoader.Provider value={{
                state: this.state,
                showLoader: () => this.showLoader(),
                hideLoader: () => this.hideLoader() 
              }}>
            {this.props.children}
            </AppContextLoader.Provider>
            
        )
    }
}


