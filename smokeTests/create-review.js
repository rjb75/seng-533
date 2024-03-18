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

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
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

  const titles = [
    "Great Snack",
    "Quick Lunch",
    "Dinner",
    "Late Night Snack",
    "Early Morning Breakfast",
    "Lunch",
    "Dinner",
    "Late Night Snack",
    "Early Morning Breakfast",
    "Lunch",
    "Dinner",
    "Late Night Snack",
    "Early Morning Breakfast",
  ]

  const descriptions = [
    "Stopped in for a quick snack and it did not disappoint",
    "The food was great and the service was even better",
    "I was in and out in no time",
    "A unique take on my favorite dishes",
    "Friendly staff and great food",
  ]

  const url = "http://test.xplored:8000/api/v1/review/";
  const params = {
    headers: {
      Authorization:
        "8d7ef110325a18c5267a72af04449fffa471291faddce844bc4c3c0481034de7",
      "X-User": "nbq52RSCA2NLfkNc77Kkl4e2ot03",
    },
  };

  // select 3 random tags
  const randomTags = [];
  for (let i = 0; i < 3; i++) {
    randomTags.push(tags[Math.floor(Math.random() * tags.length)]);
  }

  const rating = Math.floor(Math.random() * 5) + 1;

  const title = titles[Math.floor(Math.random() * titles.length)];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];

  const body = {
    first_name: "Robert",
    last_name: "Brown",
    title: title,
    stars: `${rating}`,
    tags: randomTags,
    description: description,
  };

  http.post(url, body, params);
  sleep(1);
}
