import axios from "axios";

class EventService {
  BASE_URL = 'https://mocki.io/v1/94e36aa1-80c1-44a7-a28f-14bc7aae003f';

  getEvents() {
    return new Promise((resolve, reject) => {
      axios.get(this.BASE_URL).then((response) => {
        return resolve(response?.data);
      }).catch((error) => {
        return reject(error);
      });
    });
  }
}

export default EventService;