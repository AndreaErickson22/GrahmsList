import JobService from "./jobService.js"
let _js = new JobService()

function draw() {
  let jobs = _js.Jobs
  let template = ''
  jobs.forEach(job => {
    template += job.getTemplate()
  })
  document.getElementById('available-content').innerHTML = template
  document.getElementById('form-content').innerHTML = `
  <form onsubmit="app.controllers.jobController.addJob(event)">
        <input type="text" name="company" placeholder="Company" required>
        <input type="text" name="jobTitle" placeholder="Position" required>
        <input type="number" name="hours" placeholder="Hours" required>
        <input type="number" name="rate" placeholder="Rate" required>
        <input type="text" name="description" placeholder="Description" required>
        <button class="btn-primary" type="submit">Submit</button>
    </form>
    `
}
function logJobs() {
  console.log('jobs Updated!!')
}

//PUBLIC
export default class JobController {
  constructor() {
    _js.addSubscriber('jobs', draw)
    _js.getApiJobs()
  }
  //in any form submission do not forget to prevent the default action
  addJob(event) {
    event.preventDefault();
    let form = event.target
    let newJob = {
      company: form.company.value,
      jobTitle: form.jobTitle.value,
      hours: form.hours.value,
      rate: form.rate.value,
      description: form.description.value
    }
    _js.addJob(newJob)
    form.reset()
  }
  deleteJob(id) {
    _js.deleteJob(id)
  }
  bid(id) {
    _js.bid(id)
  }
  getJobs() {
    _js.getApiJobs()
  }
}