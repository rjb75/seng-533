import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: '30m', target: 200 }, // stay at higher 200 users for 30 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function() {

  const url = "http://test.xplored:8000/api/v1/event/create?tripid=65f5f3058e075f40e4ea943c";
  const params = {
    headers: {
      'Authorization': '8d7ef110325a18c5267a72af04449fffa471291faddce844bc4c3c0481034de7',
      'X-User': 'nbq52RSCA2NLfkNc77Kkl4e2ot03',
    },
  };
  
  const body = JSON.stringify({
    "type": "ACC",
    "start_time": "5:00",
    "end_time": "6:00",
    "name": "my event",
    "address": "1234 Street",
    "link": "https://google.com",
    "data": "none",
    "photo_URL": "none",
  });


  http.post(url, body, params);
  sleep(1);
};
