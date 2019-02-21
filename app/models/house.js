export default class House {
    constructor(data) {
        this._id = data._id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.imgUrl = data.imgUrl
        this.levels = data.levels
        this.year = data.year
        this.price = data.price
        this.description = data.description
    }
    getTemplate() {
        return `
        <div class="card col-lg-3 col-md-6 col-sm-3">
        <img class="card-img-top" src="${this.imgUrl}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${this.year} ${this.bedrooms}bed - ${this.bathrooms}bath</h5>
            <p class="card-text">${this.description} -- $${this.price}</p>
                    <button onclick="app.controllers.houseController.bid('${this._id}')">BID</button>
                <button class="btn-primary" onclick="app.controllers.houseController.deleteHouse('${this._id}')">Remove</button>
        </div>
    </div>
    `
    }
}