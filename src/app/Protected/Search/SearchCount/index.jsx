
import React from 'react'
import { LoggerService } from '../../../helpers/logger-service';

export class SearchCount extends React.Component{
    timeLimit = 60; // 60 seconds
    intervalTime = null
    constructor(props){
        super(props)
        //LoggerService.log("SearchCount:: constructor")
        this.state = {
            searchCount: 0,
            lastSearchTime: '', //new Date(),
            showAlert: false,
            searchStartTime: '',
            remainingTime: ''
        }
        
    }

    componentDidMount(){
        if(!localStorage.getItem("searchLimit")){
            //alert("resetSearchCounter")
           this.resetSearchCounter()
        }else{
            //alert("resetSearchCounter ELse")
           let newState = JSON.parse(localStorage.getItem("searchLimit"));
           console.log(newState)
           this.setState({...newState})
        }
    }

    componentDidUpdate(oldProps){
        const newProps = this.props
        if(oldProps.triggerLimitizerCount !== newProps.triggerLimitizerCount) {
            console.log("componentDidUpdate")
            this.increaseSearchCount()
        }
    }

    checkIfUserReachedOneMinLimit(){
        let count =  this.state.searchCount;
        let search_start_time = new Date(this.state.searchStartTime).getTime()
        let lastSearched = new Date(this.state.lastSearchTime).getTime()
        //LoggerService.log(new Date(search_start_time), new Date(lastSearched) , search_start_time >= lastSearched , (Math.abs(search_start_time - lastSearched)/ 1000) ,((Math.abs(search_start_time - lastSearched)/ 1000) < 60))
        if((count >= this.props.searchLimit ) && lastSearched > search_start_time && ((Math.abs(lastSearched - search_start_time )/ 1000) < this.timeLimit)){
            console.log("checkIfUserReachedOneMinLimit:: If")
            return true
        }else{
            console.log("checkIfUserReachedOneMinLimit:: Else")
            return false
        }

    }

    setCounterToReset(){
        let search_start_time = new Date(this.state.searchStartTime).getTime()
        let current_time = new Date().getTime()
        let timerToResetTime = ((this.timeLimit * 1000) - ((Math.abs(current_time - search_start_time)/ 1000)) * 1000);
        LoggerService.log("=====>>>" ,new Date(search_start_time), new Date(current_time), timerToResetTime, "<<<<=====")
        LoggerService.log("Seconds remaining to Reset Search::",timerToResetTime);
        if(timerToResetTime <= 0){
            this.resetSearchCounter()
            return;
        }
        
        this.showAlertAndStartTimer(timerToResetTime)
        setTimeout(() => {
            this.resetSearchCounter()
        }, timerToResetTime);
    }

    showAlertAndStartTimer(seconds_remaining){
        let time_remaining = seconds_remaining / 1000;
        if(this.intervalTime){
            clearInterval(this.intervalTime);
        };
        
        this.intervalTime = setInterval( () => {
            time_remaining = Math.round(time_remaining - 1) ;
            this.setState({
                remainingTime : time_remaining
            })
        }, 1000);
        
        this.setState({
            showAlert : true,
            remainingTime :  Math.round(time_remaining)
        })
    }

    increaseSearchCount(){
        console.log(this.state);
        if(this.state.searchCount === 0){
            this.updateSearchState()
            return;
        }

        //let current_Time = new Date(this.state.searchStartTime).getMinutes();
        //let lastTimeSearch = new Date(this.state.lastSearchTime).getMinutes();
        //LoggerService.warn(this.checkIfUserReachedOneMinLimit());
        if(this.checkIfUserReachedOneMinLimit()){
            console.log("increaseSearchCount:: If")
            //Following is done to make sure that if Page reloads then user should not be allowed to search within the Timelimit
            this.props.isSearchAllowed(false);
            this.setCounterToReset();
            localStorage.setItem("searchLimit", JSON.stringify(this.state));
        }else{
            console.log("increaseSearchCount:: else")
            this.updateSearchState()
            this.props.isSearchAllowed(true)
        }
        
    }

    updateSearchState(){
        let temp_state = {};
        let count =  this.state.searchCount;
        //Set Search Start Time
        if(count === 0){
            temp_state.searchStartTime = new Date()
        }
        temp_state.searchCount = ++count;
        temp_state.lastSearchTime = new Date() 
        this.setState(temp_state)
        console.log(this.state)

    }

    resetSearchCounter(){
        if(this.intervalTime){
            clearInterval(this.intervalTime);
        };
        this.setState({
            searchCount: 0,
            lastSearchTime: '',//new Date(),
            showAlert: false,
            searchStartTime: '',
            remainingTime: ''
        })
        
        localStorage.setItem("searchLimit", JSON.stringify(this.state));
        this.props.isSearchAllowed(true);
    }

    render(){
        
        //LoggerService.log("####+++++SearchCount:: Render+++++###")
        return (
            <>
                {this.state.showAlert && <div className="alert alert-danger" role="alert">
                You have reached maximum search limit of <strong>{this.props.searchLimit} search</strong>. Time remaining: {this.state.remainingTime}s.
                {/* You have Reached your Search Limit. Only Luke is allowed to search 5 consecutive search in 1 min. For rest of the users limit is 3 in one minute. */}
            </div>}
            </>
        )
    }
}
