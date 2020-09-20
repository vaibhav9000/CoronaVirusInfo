import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './data.css'
import Block from './block'

function Data() {
    const [state, setState] = useState({
        data : null,
        err: null,
        country: 'World',
        countries: null
    })
    const [data, setData] = useState({})

    useEffect(()=>{
        //https://covid19.mathdro.id/api/countries/India
        getRequest('World')
        var link = 'https://covid19.mathdro.id/api/countries';
        axios.get(link, true)
          .then(response =>{
            setState({
                ...state,
                countries: response.data.countries
            })
          })
          .catch(error =>{
              setState({
                  ...state,
                  err: error
              })
          })
    }, [])

    function getRequest(countryName){
        var link = 'https://covid19.mathdro.id/api';
        if(countryName!='World'){
            link = link + '/countries/'+countryName
        }
        axios.get(link, true)
          .then(response =>{
              setState({ 
                  ...state,
                  data: response.data,
                  country: countryName
              })
              console.log(state.data)
          })
          .catch(error =>{
              setState({ 
                  ...state,
                  err: error
              })
          })
    }

    function buttonHandler(){
        const value = document.getElementById('input').value;
        getRequest(value)
    }

    var inf = ['Infected', 'Number of active cases']
    var rec = ['Recovered', 'Number of recovered cases']
    var dea = ['Deaths', 'Number of deaths caused']

    useEffect(()=>{
        if(state.data) {
            setData({
                confirmed: state.data.confirmed.value,
                recovered : state.data.recovered.value,
                deaths : state.data.deaths.value,
                time: state.data.lastUpdate,
                country: state.country
            })
        }
    }, [state.data])

    return (
        !data || !state.countries ? 
        <div>Something Went Wrong</div> :
        <>
        <h2>In {data.country}</h2>
        <div className="section">
            <Block obj={data.confirmed} 
            des={inf} time={data.time} color="gray"/>
            <Block obj={data.recovered} 
            des={rec} time={data.time} color="green"/>
            <Block obj={data.deaths} 
            des={dea} time={data.time} color="red"/>
        </div>
        <div>
            <select onChange={buttonHandler} id="input">
                {state.countries.map(country => (
                <option value={country.name}>{country.name}</option>))}
            </select>
        </div>
        </>
    )
}

export default Data

