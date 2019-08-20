
import React from 'react'

export class SearchCount extends React.Component{
    oneMin = 60; // 60 seconds
    constructor(props){
        super(props)
        this.state = {
            searchCount: 0,
            lastSearchTime: new Date(),
            showAlert: false
        }
        
    }

    componentDidMount(){
        if(!localStorage.getItem("searchLimit")){
           this.resetSearchCounter()
        }else{
           let newState = JSON.parse(localStorage.getItem("searchLimit"));
           this.setState({...newState})
        }
    }

    componentDidUpdate(oldProps){
        const newProps = this.props
        if(oldProps.triggerLimitizerCount !== newProps.triggerLimitizerCount) {
            this.increaseSearchCount()
        }
    }

    checkIfUserReachedOneMinLimit(){
        let currentTime = new Date().getTime();
        let startTimer = new Date(this.state.lastSearchTime).getTime()
        if(currentTime >= startTimer && ((Math.abs(currentTime - startTimer)/ 1000) < this.oneMin)){
            return true
        }else{
            if(((Math.abs(currentTime - startTimer)/ 1000) > this.oneMin)){
                this.setState({
                    lastSearchTime : new Date() 
                })
            }
            return false
        }

    }

    setCounterToReset(){
        let current = new Date().getTime();
        let lastSearched = new Date(this.state.lastSearchTime).getTime()
        let timerToResetTime = ((this.oneMin * 1000) - ((Math.abs(current - lastSearched)/ 1000)) * 1000);
        setTimeout(()=> {
            this.resetSearchCounter()
        }, timerToResetTime);
    }

    increaseSearchCount(){
        let count =  this.state.searchCount;
        let current_Time = new Date().getMinutes();
        let lastTimeSearch = new Date(this.state.lastSearchTime).getMinutes();
        console.warn(this.checkIfUserReachedOneMinLimit());
        if((count >= this.props.searchLimit ) && (current_Time === lastTimeSearch) && this.checkIfUserReachedOneMinLimit()){
            //alert("Resetting")
            this.setState({
                showAlert : true
            })
            this.props.isSearchAllowed(false);
            this.setCounterToReset();
        }else{
            //alert("Else ")
            this.setState({
                searchCount: ++count,
                //lastSearchTime : new Date()
            })
            this.props.isSearchAllowed(true)
        }
        
    }

    resetSearchCounter(){
        this.setState({
            searchCount: 0,
            lastSearchTime: new Date(),
            showAlert: false
        })
        localStorage.setItem("searchLimit", JSON.stringify(this.state));
        this.props.isSearchAllowed(true);
    }

    render(){
        return (
            <>
                {this.state.showAlert && <div className="alert alert-danger" role="alert">
                You have Reached your Search Limit. Only Luke is allowed to search 5 consecutive search in 1 min. For rest of the users limit is 3 in one minute.
            </div>}
            </>
        )
    }
}
