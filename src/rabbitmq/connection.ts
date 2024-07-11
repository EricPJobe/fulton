import client, { Connection, Channel } from 'amqplib';
import { AMQP_SERVER } from '../config';

class RabbitMQConnection {
    connection!: Connection;
    channel!: Channel;
    private connected!: Boolean;

    constructor() {

    }

    async connect() {
        if (this.connected && this.channel) return;
        else this.connected = true;

        try {
            console.log("[*] Connecting to RabbitMQ Server...");
            this.connection = await client.connect(AMQP_SERVER);
            console.log("[*] Connection succeeded. RabbitMQ is ready!");
        } catch (error) {
            console.error(error);
            console.error("[x] Failed to connect to RabbitMQ Server.");
        }
    }

    async sendToQueue(queue: string, message: any) {
        try {
            if (!this.channel) {
                await this.connect();
            }

            this.channel.sendToQueue(queue, Buffer.from(message.toString()));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;