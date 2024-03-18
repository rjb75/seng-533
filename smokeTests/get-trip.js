import http from 'k6/http';
import { sleep, check } from 'k6';


// General error handler to log error details.
class ErrorHandler {
    // Instruct the error handler how to log errors
    constructor(logErrorDetails) {
      this.logErrorDetails = logErrorDetails;
    }
  
    // Logs response error details if isError is true.
    logError(isError, res, tags = {}) {
      if (!isError) return;
  
      // the Traceparent header is a W3C Trace Context
      const traceparentHeader = res.request.headers['Traceparent'];
  
      // Add any other useful information
      const errorData = Object.assign(
        {
          url: res.url,
          status: res.status,
          error_code: res.error_code,
          traceparent: traceparentHeader && traceparentHeader.toString(),
        },
        tags
      );
      this.logErrorDetails(errorData);
    }
  }
  
  // Set up the error handler to log errors to the console
  const errorHandler = new ErrorHandler((error) => {
    console.error(error);
  });

  export const options = {
    scenarios: {
      ramp: {
        executor: "ramping-vus",
        stages: [
          { duration: "30s", target: 100 },
          { duration: "30s", target: 500 },
          { duration: "30s", target: 500 },
          { duration: "30s", target: 0 },
          { duration: "30s", target: 1000 },
          { duration: "30s", target: 1000 },
          { duration: "30s", target: 0 },
          { duration: "30s", target: 1500 },
          { duration: "30s", target: 1500 },
          { duration: "30s", target: 0 },
          { duration: "30s", target: 2000 },
          { duration: "30s", target: 2000 },
          { duration: "30s", target: 0 },
        ],
      },
    },
  };

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function() {

    const url = `http://test.xplored:8000/api/v1/trip?id=65f5f3058e075f40e4ea943c`;
    const params = {
        headers: {
          'Authorization': '8d7ef110325a18c5267a72af04449fffa471291faddce844bc4c3c0481034de7',
          'X-User': 'nbq52RSCA2NLfkNc77Kkl4e2ot03',
        },
      };

    let res = http.get(url, params);
    // let checkStatus = check(res, { 'status is 200': (res) => res.status === 200 });
    // errorHandler.logError(!checkStatus, res);
    
    sleep(1);
};
