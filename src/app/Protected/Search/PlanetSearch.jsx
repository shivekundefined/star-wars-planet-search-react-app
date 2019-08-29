

import React, { useContext } from 'react'
import { SearchBar } from './SearchBar';
import { planetService } from '../../services/planets-service';
import { LoggerService } from '../../helpers/logger-service';
import { PlanetsList } from './PlanetsList';
import { SearchCount } from './SearchCount';


export class PlanetSearch extends React.Component{
    debounceTimeout = null;
    searchLimit = 3;
    displayResultFlag = false;
    constructor(props){
        super(props);
        LoggerService.warn("==============", props);
        this.state = {
            filterText: '',
            planets : [],
            allowSearch : true,
            triggerLimitizerCount : 0
        };

        if(props.user.name === "Luke Skywalker"){
            this.searchLimit = 5
        }
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSearchAllowed = this.handleSearchAllowed.bind(this);
        
    }

    handleSearchTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
        this.handleInputDebounce(filterText)
    }

    handleInputDebounce(textToSearch) {
        LoggerService.log(textToSearch)
        if(this.debounceTimeout)
            clearTimeout(this.debounceTimeout)

        this.debounceTimeout = setTimeout(() => {
            this.searchPlanet(textToSearch)
        }, 500)
    }

    searchPlanet = (searchedText) => {
        searchedText = searchedText.trim() || '';
        if(!searchedText.length){
            this.displayResultFlag = false
            this.resetPlanetList()
            return
        }
        let count = this.state.triggerLimitizerCount;
        this.setState({
            triggerLimitizerCount: ++count
        })

        //Make API Call to get Data and Add Loader screen
        this.props.context.showLoader()
        planetService.planet_search(searchedText).then( planetsList => {
            this.props.context.hideLoader()
            if(planetsList.length){
                this.displayResultFlag = true
                this.setState({
                    planets: planetsList

                });
                LoggerService.warn(this.state)
            }else{
                this.displayResultFlag = true
                this.resetPlanetList()
            }
            
        }, error => {
            this.props.context.hideLoader()
            LoggerService.log(error);
            this.displayResultFlag = false
            this.resetPlanetList()
            alert(error.message)
        })
    }

    resetPlanetList(){
        
        this.setState({
            planets: []
        })

    }

    handleSearchAllowed(isAllowed){
        this.setState({
            allowSearch : isAllowed
        })
    }

    render(){
        let planetList;
        const {planets, triggerLimitizerCount, filterText, allowSearch} = this.state;

        LoggerService.log(this.displayResultFlag)
        if(planets.length > 0 && this.displayResultFlag){
            planetList = planets.length > 0 && <PlanetsList planets={planets}/>
        }else if(this.displayResultFlag){
            planetList = <h4 className="text-center"> No planet with this name </h4>
        }


        return(
            <>
                <SearchBar filterText={filterText} onPlanetSearch={this.handleSearchTextChange} allowSearch={allowSearch}/>
                <SearchCount triggerLimitizerCount={triggerLimitizerCount} isSearchAllowed={this.handleSearchAllowed} searchLimit={this.searchLimit} />
                { planetList }
            </>
        )
    }
}

export default PlanetSearch