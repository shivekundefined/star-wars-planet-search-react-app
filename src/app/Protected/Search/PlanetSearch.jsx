

import React from 'react'
import { SearchBar } from './SearchBar';
import { planetService } from '../../services/planets-service';
import { LoggerService } from '../../helpers/logger-service';
import { PlanetsList } from './PlanetsList';
import { SearchCount } from './SearchCount';


export class PlanetSearch extends React.Component{
    debounceTimeout = null;
    searchLimit = 3;
    displayResultFlag = false;
    nextPageNum;
    constructor(props){
        super(props);
        //LoggerService.warn("==============", props);
        this.state = {
            filterText: '',
            planets : [],
            allowSearch : true,
            triggerLimitizerCount : 0,
            enableLoadMore: false,
            searchText: ''
        };

        if(props.user.name === "Luke Skywalker"){
            this.searchLimit = 5
        }
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSearchAllowed = this.handleSearchAllowed.bind(this);
        this.loadMoreResult = this.loadMoreResult.bind(this);
        
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
            triggerLimitizerCount: ++count,
            searchText: searchedText
        })

        //Allow Search Only if user has not reached limit
        if(this.state.allowSearch){
            //Make API Call to get Data and Add Loader screen
            this.getPlanetsList(searchedText)
            
        }
    }

    getPlanetsList(searchedText, page = 1){
        this.props.context.showLoader()
            planetService.planet_search(searchedText, page).then( response => {
                this.props.context.hideLoader()
                if(response.results && response.results.length){

                    let data = {}
                    this.displayResultFlag = true;
                    if(response.next !== '' && response.next != null){
                        data.enableLoadMore = true;
                        let pageNumString = response.next.split('&').find( str => str.includes("page"));
                        let pageNumSplit = pageNumString.split("=")
                        if(pageNumSplit){
                            this.nextPageNum = pageNumSplit[1]
                        }
                    }else{
                        data.enableLoadMore = false
                    }
                    data.planets = [...this.state.planets, ...response.results ]; 
                    //data.planets = response.results ; 
                    this.setState(data);

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

    loadMoreResult(){
        console.log("loadMoreResult");
        const pageNum = this.nextPageNum
        this.getPlanetsList(this.state.searchText, pageNum)
    }

    resetPlanetList(){
        this.setState({
            planets: [],
            enableLoadMore: false
        })
    }

    handleSearchAllowed(isAllowed){
        this.setState({
            allowSearch : isAllowed
        })
    }

    render(){
        let planetList;
        const {planets, triggerLimitizerCount, filterText, allowSearch, enableLoadMore} = this.state;

        //LoggerService.log(this.displayResultFlag)
        if(planets.length > 0 && this.displayResultFlag){
            planetList = planets.length > 0 && <PlanetsList planets={planets} loadMore={enableLoadMore} fetch={this.loadMoreResult}/>
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