//PRIVATE
import Car from "../../models/car.js";

let _api = axios.create({
    baseURL: 'https://bcw-gregslist.herokuapp.com/api'
})

let _state = {
    cars: []
}

let _subscribers = {
    cars: []
}

function setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn());
}


//PUBLIC
export default class CarService {

    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }
    get Cars() {
        return _state.cars.map(c => new Car(c))
    }
    //Initialize or Get all Current Cars
    getApiCars() {
        _api.get('cars')
            .then(res => {
                let carData = res.data.data.map(c => new Car(c))
                setState('cars', carData)
            })
    }
    addCar(rawCar) {
        let newCar = new Car(rawCar)
        _api.post('cars', newCar)
            .then(res => {
                this.getApiCars()
            })
    }
    deleteCar(id) {
        _api.delete('cars/' + id)
            .then(res => {
                this.getApiCars()
            })
    }
    bid(carToFindId) {
        let car = _state.cars.find(c => c._id == carToFindId)
        car.price = parseInt(car.price)
        car.price++
        _api.put('cars/' + car._id, car)
            .then(res => {
                this.getApiCars()
            })
    }
}