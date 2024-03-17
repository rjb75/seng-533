import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
        { duration: '30m', target: 200 }, // stay at higher 200 users for 30 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
};

export default function() {

    const locations = [
        "Canada",
        "Malta",
        "Australia",
        "Japan",
        "France",
        "Brazil",
        "South%20Africa",
        "Italy",
        "Thailand",
        "United%20Arab%20Emirates",
    ];

    const location = locations[Math.floor(Math.random() * locations.length)];

    const url = `http://test.xplored:8000/api/v1/recommendations?location_name=${location}`;
    const params = {
        headers: {
            'Authorization': '8d7ef110325a18c5267a72af04449fffa471291faddce844bc4c3c0481034de7',
            'X-User': 'nbq52RSCA2NLfkNc77Kkl4e2ot03',
        },
    };


    http.get(url, params);
    sleep(1);
}
