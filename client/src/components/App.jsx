import React from 'react';
import Login from './Login.jsx';
import SignUp from './Signup.jsx';
import Home from './Home.jsx'
import axios from 'axios';
import ForgetAccount from './ForgotAccount.jsx';
import Profil from './Profil.jsx'




var FormData = require('form-data');
const INPUT_TIMEOUT = 250;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {}, //user 
            items: [],// selection of results
            view: 'home', //principal views 
            viewoption: 1,// new goal view
            value: '', //airport name
            predictions: [],// selection airports name
            airportdata: {},//all the data of api
            viewAirport: 1,// view airports 
            airportselected: [],// selection airport
            iata: '',
            alertlogin: 1
        }
        this.onChange = this.onChange.bind(this);
        this.change = this.change.bind(this)
        this.changefile = this.changefile.bind(this)
        this.newAccount = this.newAccount.bind(this)
        this.enterAccount = this.enterAccount.bind(this)
        this.changeView = this.changeView.bind(this)
        this.changeViewOptions = this.changeViewOptions.bind(this)
        this.onChangeselection = this.onChangeselection.bind(this)
        this.addgoal = this.addgoal.bind(this)
        this.search = this.search.bind(this)
        this.disconnect = this.disconnect.bind(this)
        this.selectPersonSearch = this.selectPersonSearch.bind(this)
        this.deletegoal = this.deletegoal.bind(this)

    }
    componentDidMount() {
        axios.get('https://raw.githubusercontent.com/mwgg/Airports/master/airports.json')
            .then(result => {
                this.setState({ airportdata: result.data })
                console.log(this.state.airportdata)
            })
        let person = JSON.parse(localStorage.getItem('person'))
        console.log(person);
        if (person !== null) {
            this.setState({ person: person })
        }

    }
    onChangeselection(e) {
        this.setState({ value: e.target.value })
    }
    changeView(option) {
        this.setState({
            view: option
        })
    }
    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e.target.value);
    }
    changefile(e) {

        let image = e.target.files[0]
        console.log(image);

        const formData = new FormData()
        formData.append("file", image);
        formData.append("upload_preset", "nt1uphup");

        axios.post("http://api.cloudinary.com/v1_1/magico/image/upload", formData)
            .then(result => {
                this.setState({
                    image: result.data.public_id
                })
                console.log(result.data)
            })
    }


    getPredictions(value) {
        // let's say that it's an API call
        var array = []
        var airportname = []
        if (value.length > 2) {
            for (var key in this.state.airportdata) {
                if (this.state.airportdata[key].tz.toLowerCase().includes(value.toLowerCase())
                    && this.state.airportdata[key].iata !== '' &&
                    this.state.airportdata[key].name.includes('Inter')) {
                    airportname.push(this.state.airportdata[key].name)
                    array.push(this.state.airportdata[key])
                    console.log(airportname)
                }
            }
            this.setState({
                airportselected: array
            })
            return airportname.slice(0, 10)
        }
    }


    onChange(e) {
        // clear timeout when input changes value
        clearTimeout(this.timeout);
        const value = e.target.value;
        this.setState({
            value
        });

        if (value.length > 2) {
            // make delayed api call
            this.timeout = setTimeout(() => {
                const predictions = this.getPredictions(value);
                this.setState({
                    predictions,
                    viewAirport: 1
                });
            }, INPUT_TIMEOUT);
        } else {
            this.setState({
                predictions: [],
                viewAirport: 0
            });
        }
    }

    enterAccount() {
        // if (this.state.email) {
        var obj = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(`/api/user/login`, obj)
            .then(result => {
                if (result.data === "user not found") {
                    console.log(result.data);
                } else if (result.data === "bad password") {
                    console.log(result.data);
                } else {
                    let data = result.data

                    localStorage.setItem('person', JSON.stringify(data))

                    let person = JSON.parse(localStorage.getItem('person'))
                    console.log(person, 'this');
                    this.setState({
                        person: person,
                        view: 'home'
                    })
                    console.log(this.state.person, 'that')

                }
            })
        // }

    }
    newAccount() {
        console.log('new');
        // if (this.state.firstname && this.state.email && this.state.password) {
        var person = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            dob: this.state.dob,
            country: this.state.country,
            phoneNumber: this.state.phoneNumber,
            image: this.state.image

        }
        console.log(person);
        axios.post('/api/user/signUp', person)
            .then(res => {
                let data = result.data

                localStorage.setItem('person', JSON.stringify(data))

                let person = JSON.parse(localStorage.getItem('person'))
                console.log(person, 'this');
                this.setState({
                    person: person,
                    view: 'home'
                })
                console.log(this.state.person, 'that')
            })
        // }

    }
    disconnect() {
        localStorage.removeItem('person')
        this.setState({
            view: 'home',
            person: {}
        })
    }
    selectPersonSearch(e) {
        this.setState({ items: this.state.person.search[e.target.value].result })
    }


    search() {
        console.log('ok');

        // if (this.state.departure && this.state.budget && this.state.from && this.state.to) {

        console.log(this.state.airportselected)
        var iata
        for (var i = 0; i < this.state.airportselected.length; i++) {
            if (this.state.airportselected[i].name === this.state.nameAirport) {
                iata = this.state.airportselected[i].iata
                this.setState({
                    iata: iata
                })
            }
        }
        console.log(iata);
        var maxPrice = this.state.budget
        if (iata !== undefined) {
            if (maxPrice === '')
                maxPrice = undefined
            axios.post('/api/user/iata', { iata: iata, maxPrice: maxPrice })
                .then(res => {
                    console.log(res.data)
                    var array = []
                    var arr = []
                    var arrayres = res.data
                    if (typeof arrayres === 'object') {

                        for (var i = 0; i < arrayres.length; i++) {
                            var obj = {
                                origin: arrayres[i].origin,
                                destination: arrayres[i].destination,
                                departureDate: arrayres[i].departureDate,
                                returnDate: arrayres[i].returnDate,
                                price: arrayres[i].price.total
                            }
                            arr.push(obj)
                        }
                        if (!this.state.from && !this.state.to) {
                            array = arr
                        } else {
                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i].departureDate >= this.state.from && arr[i].returnDate <= this.state.to) {
                                    array.push(arr[i])
                                }
                            }
                        }
                        for (var i = 0; i < array.length; i++) {
                            for (var key in this.state.airportdata) {
                                if (array[i].origin === this.state.airportdata[key].iata) {
                                    array[i].origin = this.state.airportdata[key].tz
                                }
                                if (array[i].destination === this.state.airportdata[key].iata) {
                                    array[i].destination = this.state.airportdata[key].tz
                                }
                            }

                        }
                        this.setState({ items: array })
                        console.log(this.state.items);
                    }

                })

            //     
            //     this.setState({ viewoption: 0 })
            // }
        }

    }

    addgoal() {
        if (this.state.person.lastName !== undefined) {
            if (this.state.iata !== '') {
                var array = this.state.person.search
                var newsearch = {
                    iata: this.state.iata,
                    departure: this.state.value,
                    from: this.state.from,
                    to: this.state.to,
                    budget: this.state.budget,
                    result: this.state.items
                }
                array.push(newsearch)
                axios.put(`/api/user/${this.state.person.email}`, { search: array })
                    .then(result => {
                        console.log(result.data);
                        this.setState({})
                        this.state.person.search = array
                        console.log(this.state.person);
                        localStorage.setItem('person', JSON.stringify(this.state.person))
                    })
            }
        } else {
            this.setState({
                alertlogin: 0
            })
        }

    }
    deletegoal(e) {
        var array = this.state.person.search
        var i = e.target.value
        array.splice(i, 1)
        axios.put(`/api/user/${this.state.person.email}`, { search: array })
            .then(result => {
                console.log(result.data);
                this.setState({})
                this.state.person.search = array
                console.log(this.state.person);
                localStorage.setItem('person', JSON.stringify(this.state.person))
            })
    }

    changeViewOptions(option) {
        console.log('hi');
        this.setState({
            viewoption: option
        })
    }

    render() {
        return (
            <div className='app'>


                {this.state.view === 'login' && <Login change={this.change} enterAccount={this.enterAccount} changeView={this.changeView} />}
                {this.state.view === 'forgetaccount' && <ForgetAccount changeView={this.changeView} change={this.change} />}
                {this.state.view === 'signup' && <SignUp change={this.change} changefile={this.changefile} newAccount={this.newAccount} changeView={this.changeView} />}

                {this.state.view === 'home' && <Home deletegoal={this.deletegoal} selectPersonSearch={this.selectPersonSearch} disconnect={this.disconnect} alertlogin={this.state.alertlogin} search={this.search} items={this.state.items} changeView={this.changeView} onChangeselection={this.onChangeselection} viewAirport={this.state.viewAirport}
                    predictions={this.state.predictions} value={this.state.value} onChange={this.onChange} viewoption={this.state.viewoption}
                    changeViewOptions={this.changeViewOptions} changevalue={this.change} change={this.change} addgoal={this.addgoal.bind(this)}
                    person={this.state.person} items={this.state.items} />}
                {this.state.view === 'profil' && <Profil changeView={this.changeView} person={this.state.person} />}

            </div>


        )
    }
}
export default App