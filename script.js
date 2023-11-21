import { check, group } from 'k6';
import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


export let options = {
    scenarios: {
      contacts: {
        executor: 'ramping-arrival-rate',
        startRate: 5,
        timeUnit: '1s',
        preAllocatedVUs: 50,

        stages: [
          { target: 5, duration: '5m' },
          { target: 10, duration: '5m' },
        ],
      },
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