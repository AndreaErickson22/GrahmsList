export default class Job {
  constructor(data) {
    this._id = data._id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description || 'No Description Provided'

  }
  getTemplate() {
    return `
       <div class="card col-lg-3 col-md-6 col-sm-3">
        <div class="card-body">
            <h5 class="card-title">${this.company}company ${this.jobTitle}jobTitle - ${this.hours}hours</h5>
            <p class="card-text">${this.description} -- $${this.rate}</p>
             <button class="btn-primary" onclick="app.controllers.jobController.deleteJob('${this._id}')">Remove</button>
        </div>
    </div>
    `
  }
}