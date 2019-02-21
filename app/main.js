import CarController from "./components/car/carController.js";
import HouseController from "./components/house/houseController.js";
import JobController from "./components/job/jobController.js";




class App {
    constructor() {
        this.controllers = {
            carController: new CarController(),
            houseController: new HouseController(),
            jobController: new JobController()
        }
    }
}



window.app = new App()