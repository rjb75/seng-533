import http from "k6/http";
import { sleep } from "k6";

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

export default function () {
  const tags = [
    "good",
    "bad",
    "tasty",
    "filling",
    "interesting",
    "boring",
    "quick",
    "long",
    "walking",
    "outdoors",
    "indoors",
    "snack",
    "lunch",
    "dinner",
  ];

  const params = {
    headers: {
      Authorization:
        "8d7ef110325a18c5267a72af04449fffa471291faddce844bc4c3c0481034de7",
      "X-User": "nbq52RSCA2NLfkNc77Kkl4e2ot03",
    },
  };

  const tag = tags[Math.floor(Math.random() * tags.length)];

  const url = `http://test.xplored:8000/api/v1/reviews?tags=${tag}`;

  http.get(url, params);
  sleep(1);
}
