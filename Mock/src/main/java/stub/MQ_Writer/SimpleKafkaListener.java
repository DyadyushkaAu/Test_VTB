package stub.MQ_Writer;

import io.micrometer.core.annotation.Timed;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;

@EnableKafka
@SpringBootApplication

public class SimpleKafkaListener {

    @KafkaListener(topics = "msg")
    public void msgListener(String msg) {
        System.out.println(msg);
    }

    public static void main(String[] args){
        SpringApplication.run(SimpleKafkaListener.class, args);
    }

}
