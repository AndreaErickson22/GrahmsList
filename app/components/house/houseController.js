//private
import HouseService from "./houseService.js";

let _hs = new HouseService()

function draw() {
    let houses = _hs.Houses
    let template = ''
    _hs.Houses.forEach(h => {
        template += h.getTemplate()
    })
    document.getElementById('available-content').innerHTML = template
    document.getElementById('form-content').innerHTML = `
    <form onsubmit="app.controllers.carController.addCar(event)">
        <input type="number" name="beds" placeholder="Beds" required>
        <input type="number" name="bath" placeholder="Bath" required>
        <input type="number" name="levels" placeholder="Levels" required>
        <input type="number" name="year" placeholder="Year" required>
        <input type="text" name="description" placeholder="Description">
        <input type="number" name="price" placeholder="Price" required>
        <input type="url" name="imgUrl" placeholder="Image" required>
        <button class="btn-primary" type="submit">Submit</button>
    </form>
    `
}
function logHouses() {
    console.log("houses UPDATED!!!")
}

//public
export default class HouseController {
    constructor() {
        _hs.addSubscriber('houses', draw)
        _hs.getApiHouses()
    }

    //IN ANY SUBMISSION DO NOT FORGET TO REMOVE THE 

    addHouse(event) {
        event.preventDefault();
        let form = event.target
        let newHouse = {
            bedrooms: form.bedrooms.value,
            bathrooms: form.bathrooms.value,
            imgUrl: form.imgUrl.value,
            levels: form.levels.value,
            year: form.year.value,
            price: form.price.value
        }
        _hs.addHouse(newHouse)
        form.reset()
    }
    deleteHouse(id) {
        _hs.deleteHouse(id)
    }
    bid(id) {
        _hs.bid(id)
    }
    getHouses() {
        _hs.getApiHouses()
    }
}