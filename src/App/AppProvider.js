import React from 'react';
import  _  from 'lodash';


const cc = require('cryptocompare')



const MAX_FAVORITES = 10;

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 'dashboard',
            favorites: ['BTC','ETH','XMR','DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin:this.addCoin,
            removeCoin:this.removeCoin,
            isInFavorites : this.isInFavorites ,
            setFilteredCoins:this.setFilteredCoins,
            confirmFavourites:this.confirmFavourites
        }
    }



    addCoin = key=>{
        let favorites = [...this.state.favorites]
        if(favorites.length<MAX_FAVORITES)
        {
            favorites.push(key)
            this.setState({favorites})
        }
    }

    removeCoin = key=>{
        let favorites = [...this.state.favorites]
        this.setState({favorites:_.pull(favorites,key)})
    }

    isInFavorites = key=> _.includes(this.state.favorites,key)

    componentDidMount = () => {

        this.fetchCoins();
        this.fetchPrices();
    }
    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList})
        console.log(coinList);
    }
    fetchPrices = async ()=>{
        if(this.state.firstVisit){
            return;
        }
        let prices = await this.prices();
        console.log(prices);
        console.log('hello')
        this.setState({prices})
    }
    
    prices = async ()=>{
        let returnData = [];
        for(let i=0;i<this.state.favorites.length;i++)
        {
            try {
                let priceData = await cc.priceFull(this.state.favorites[i],'USD');
                returnData.push(priceData);
                
            } catch (error) {
                console.warn('Fetch Price Error: ',error)
                
            }
        }
        return returnData;
    }
    savedSettings(){
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData){
            return {page: 'settings',firstVisit:true}


        }

        let {favorites} = cryptoDashData;
        return {favorites};
        
    }
    confirmFavourites=()=>{
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        },()=>{this.fetchPrices();})
        localStorage.setItem('cryptoDash',JSON.stringify({
            favorites: this.state.favorites
        }))
    }
    setPage= page => this.setState({page})

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

    render(){
        return(
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}