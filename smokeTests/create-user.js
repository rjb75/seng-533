import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 3,
  // A string specifying the total duration of the test run.
  duration: '30s',
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function() {

  const url = "http://test.xplored:8000/api/v1/trip/user";
  const params = {
    headers: {
      'Authorization': '8d7ef110325a18c5267a72af04449fffa471291faddce844bc4c3c0481034de7',
      'X-User': 'nbq52RSCA2NLfkNc77Kkl4e2ot03',
    },
  };
  
  const body = JSON.stringify({
    "authId": "nbq52RSCA2NLfkNc77Kkl4e2ot03",
    "trips": [],
  });


  http.post(url, body, params);
  sleep(1);
};
