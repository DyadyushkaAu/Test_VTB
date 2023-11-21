import { check, group } from 'k6';
import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


export let options = {
    scenarios: {
        constant_request_rate: {
          executor: 'constant-arrival-rate',
          rate: 5,
          timeUnit: '1s',
          duration: '300s',
          preAllocatedVUs: 5,
          maxVUs: 10,
        }
      },
      scenarios: {
        constant_request_rate: {
          executor: 'constant-arrival-rate',
          rate: 10,
          timeUnit: '1s',
          duration: '300s',
          preAllocatedVUs: 10,
          maxVUs: 20,
        }
      },
    thresholds: {
        'http_req_duration': ['p(95)<1000']
    },
};

export default function(){
    let a = randomIntBetween(0, 100);
    let b = randomIntBetween(0, 100);

    group("write_to_kafka", function() {
        group("KafkaWrite", function(){
            let res = http.post('http://localhost:8080/msg',
            {msgId: String(a), msg: String(b)});
            console.log("msgId", a, "id", b);
            check(res, {
                "status code is 200": (res) => res.status == 200,
            });
            check(res, {
                "status code is 404": (res) => res.status == 404,
            });
        });        
    });
};