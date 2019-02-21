import Job from "../../models/job.js";
import Car from "../../models/car.js";

//private
let _api = axios.create({
  baseURL: 'https://bcw-gregslist.herokuapp.com/api'
})

let _state = {
  jobs: []
}
let _subscribers = {
  jobs: []
}

function setState(prop, value) {
  _state[prop] = value
  _subscribers[prop].forEach(fn => fn());
}

//PUBLIC

export default class JobService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get Jobs() {
    return _state.jobs.map(j => new Job(j))
  }
  //Initialize or get all current jobs
  getApiJobs() {
    _api.get('jobs')
      .then(res => {
        let jobData = res.data.data.map(j => new Job(j))
        setState('jobs', jobData)
      })
  }
  addJob(rawJob) {
    let newJob = new Job(rawJob)
    _api.post('jobs', newJob)
      .then(res => {
        this.getApiJobs()
      })
  }
  deleteJob(id) {
    _api.delete('jobs/' + id)
      .then(res => {
        this.getApiJobs()
      })
  }
  // bid(jobToFindId) {
  //   let job = _state.jobs.find(j => j._id == jobToFindId)
  //   job.rate = parseInt(job.rate)
  //   job.rate++
  //   _api.put('jobs/' + Job._id, job)
  //     .then(res => {
  //       this.getApiJobs()
  //     })
  // }
}