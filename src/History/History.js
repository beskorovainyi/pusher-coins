import React, {Component} from 'react'
import './History.css'
import axios from 'axios'
import moment from 'moment'

class History extends Component {
  constructor() {
    super()
    this.state = {
      todayprice: {},
      yesterdayprice: {},
      twodaysagoprice: {},
      threedaysagoprice: {},
      fourdaysagoprice: {},
    }
    this.getBTCPrice = this.getBTCPrice.bind(this)
    this.getETHPrice = this.getETHPrice.bind(this)
    this.getLTCPrice = this.getLTCPrice.bind(this)
  }

  getBTCPrice(date) {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date)
  }

  getETHPrice(date) {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date)
  }

  getLTCPrice(date) {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date)
  }

  getTodayPrice() {
    let t = moment().unix()
    axios.all([this.getBTCPrice(t), this.getETHPrice(t), this.getLTCPrice(t)])
      .then(axios.spread((btc, eth, ltc) => {
        let f = {
          date: moment.unix(t).format('MMMM Do YYYY'),
          btc: btc.data.BTC.USD,
          eth: eth.data.ETH.USD,
          ltc: ltc.data.LTC.USD
        }
        localStorage.setItem('todayprice', JSON.stringify(f))
        this.setState({todayprice: f})
      }))
  }

  getYesterdayPrice() {
    let t = moment().subtract(1, 'days').unix()
    axios.all([this.getBTCPrice(t), this.getETHPrice(t), this.getLTCPrice(t)])
      .then(axios.spread((btc, eth, ltc) => {
        let f = {
          date: moment.unix(t).format('MMMM Do YYYY'),
          btc: btc.data.BTC.USD,
          eth: eth.data.ETH.USD,
          ltc: ltc.data.LTC.USD
        }
        localStorage.setItem('yesterdayprice', JSON.stringify(f))
        this.setState({yesterdayprice: f})
      }))
  }

  getTwoDaysAgoPrice() {
    let t = moment().subtract(2, 'days').unix()
    axios.all([this.getBTCPrice(t), this.getETHPrice(t), this.getLTCPrice(t)])
      .then(axios.spread((btc, eth, ltc) => {
        let f = {
          date: moment.unix(t).format('MMMM Do YYYY'),
          btc: btc.data.BTC.USD,
          eth: eth.data.ETH.USD,
          ltc: ltc.data.LTC.USD
        }
        localStorage.setItem('twodaysagoprice', JSON.stringify(f))
        this.setState({twodaysagoprice: f})
      }))
  }

  getThreeDaysAgoPrice() {
    let t = moment().subtract(3, 'days').unix()
    axios.all([this.getBTCPrice(t), this.getETHPrice(t), this.getLTCPrice(t)])
      .then(axios.spread((btc, eth, ltc) => {
        let f = {
          date: moment.unix(t).format('MMMM Do YYYY'),
          btc: btc.data.BTC.USD,
          eth: eth.data.ETH.USD,
          ltc: ltc.data.LTC.USD
        }
        localStorage.setItem('threedaysagoprice', JSON.stringify(f))
        this.setState({threedaysagoprice: f})
      }))
  }

  getFourDaysAgo() {
    let t = moment().subtract(4, 'days').unix()
    axios.all([this.getBTCPrice(t), this.getETHPrice(t), this.getLTCPrice(t)])
      .then(axios.spread((btc, eth, ltc) => {
        let f = {
          date: moment.unix(t).format('MMMM Do YYYY'),
          btc: btc.data.BTC.USD,
          eth: eth.data.ETH.USD,
          ltc: ltc.data.LTC.USD
        }
        localStorage.setItem('fourdaysagoprice', JSON.stringify(f))
        this.setState({fourdaysagoprice: f})
      }))
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({todayprice: JSON.parse(localStorage.getItem('todayprice'))})
      this.setState({yesterdayprice: JSON.parse(localStorage.getItem('yesterdayprice'))})
      this.setState({twodaysagoprice: JSON.parse(localStorage.getItem('twodaysagoprice'))})
      this.setState({threedaysagoprice: JSON.parse(localStorage.getItem('threedaysagoprice'))})
      this.setState({fourdaysagoprice: JSON.parse(localStorage.getItem('fourdaysagoprice'))})
    }
  }

  componentWillMount() {
    this.getTodayPrice()
    this.getYesterdayPrice()
    this.getTwoDaysAgoPrice()
    this.getThreeDaysAgoPrice()
    this.getFourDaysAgo()
  }

  render() {
    return (
      <div className="history--section container">
        <h2>History (Past 5 days)</h2>
        <div className="history--section__box">
          <div className="history--section__box__inner">
            <h4>{this.state.todayprice.date}</h4>
            <div className="columns">
              <div className="column btc--section__box">
                <p>1 BTC = ${this.state.todayprice.btc}</p>
              </div>
              <div className="column eth--section__box">
                <p>1 ETH = ${this.state.todayprice.eth}</p>
              </div>
              <div className="column ltc--section__box">
                <p>1 LTC = ${this.state.todayprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.yesterdayprice.date}</h4>
            <div className="columns">
              <div className="column btc--section__box">
                <p>1 BTC = ${this.state.yesterdayprice.btc}</p>
              </div>
              <div className="column eth--section__box">
                <p>1 ETH = ${this.state.yesterdayprice.eth}</p>
              </div>
              <div className="column ltc--section__box">
                <p>1 LTC = ${this.state.yesterdayprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.twodaysagoprice.date}</h4>
            <div className="columns">
              <div className="column btc--section__box">
                <p>1 BTC = ${this.state.twodaysagoprice.btc}</p>
              </div>
              <div className="column eth--section__box">
                <p>1 ETH = ${this.state.twodaysagoprice.eth}</p>
              </div>
              <div className="column ltc--section__box">
                <p>1 LTC = ${this.state.twodaysagoprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.threedaysagoprice.date}</h4>
            <div className="columns">
              <div className="column btc--section__box">
                <p>1 BTC = ${this.state.threedaysagoprice.btc}</p>
              </div>
              <div className="column eth--section__box">
                <p>1 ETH = ${this.state.threedaysagoprice.eth}</p>
              </div>
              <div className="column ltc--section__box">
                <p>1 LTC = ${this.state.threedaysagoprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.fourdaysagoprice.date}</h4>
            <div className="columns">
              <div className="column btc--section__box">
                <p>1 BTC = ${this.state.fourdaysagoprice.btc}</p>
              </div>
              <div className="column eth--section__box">
                <p>1 ETH = ${this.state.fourdaysagoprice.eth}</p>
              </div>
              <div className="column ltc--section__box">
                <p>1 LTC = ${this.state.fourdaysagoprice.ltc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default History