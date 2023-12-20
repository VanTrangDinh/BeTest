const mqtt = require('mqtt');
const fs = require('fs');
const axios = require('axios');

class MQTTService {
  constructor(options) {
    this.mqttClient = null;
    this.options = options;
  }

  async downloadFile(url, localPath) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(localPath, response.data);
  }

  async initialize() {
    const { caFileUrl, certFileUrl, keyFileUrl, caFilePath, certFilePath, keyFilePath } = this.options;

    await this.downloadFile(caFileUrl, caFilePath);
    await this.downloadFile(certFileUrl, certFilePath);
    await this.downloadFile(keyFileUrl, keyFilePath);

    this.connect();
  }

  connect() {
    this.mqttClient = mqtt.connect(this.options.host, this.options);

    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.mqttClient.subscribe(this.options.topic);
    });

    this.mqttClient.on('message', this.handleMQTTMessage.bind(this));

    this.mqttClient.on('error', (error) => {
      console.error('Error:', error);
      this.mqttClient.end();
    });

    this.mqttClient.on('close', () => {
      console.log('Connection closed');
    });
  }

  handleMQTTMessage(receivedTopic, message) {
    console.log(`Received message on topic ${receivedTopic}: ${message.toString()}`);
    // Xử lý thông tin cơn bão ở đây
  }

  end() {
    if (this.mqttClient) {
      this.mqttClient.end();
    }
  }
}

// Thay đổi các giá trị dưới đây theo nhu cầu của bạn
const options = {
  host: process.env.MQTT_HOST || 'mqtts://a3lafbeca71eu5-ats.iot.ap-southeast-1.amazonaws.com',
  port: process.env.MQTT_PORT || 8883,
  topic: process.env.MQTT_TOPIC || 'back-end-exam',
  caFileUrl:
    process.env.MQTT_CA_URL || 'https://test-upload-image-file.s3.ap-southeast-1.amazonaws.com/back-end-exam/root_ca.pem',
  certFileUrl:
    process.env.MQTT_CERT_URL ||
    'https://test-upload-image-file.s3.ap-southeast-1.amazonaws.com/back-end-exam/certificate.crt',
  keyFileUrl:
    process.env.MQTT_KEY_URL ||
    'https://test-upload-image-file.s3.ap-southeast-1.amazonaws.com/back-end-exam/private_key.key',
  caFilePath: 'path/to/root_ca.pem',
  certFilePath: 'path/to/certificate.crt',
  keyFilePath: 'path/to/private_key.key',
  clientId: 'mqtt-client',
  username: process.env.MQTT_USERNAME || 'your-username', // Nếu cần xác thực
  password: process.env.MQTT_PASSWORD || 'your-password', // Nếu cần xác thực
};

module.exports = MQTTService;

// const mqttService = new MQTTService(options);
// mqttService.initialize();

// // Đợi một khoảng thời gian sau đó đóng kết nối (chỉ để minh họa)
// setTimeout(() => {
//   mqttService.end();
// }, 60000); // Đóng kết nối sau 1 phút

// const mqtt = require('mqtt');

// class MQTTService {
//   constructor(host, messageCallback) {
//     this.mqttClient = null;
//     this.host = host;
//     this.messageCallback = messageCallback;
//   }

//   connect() {
//     this.mqttClient = mqtt.connect(this.host);

//     // MQTT Callback for 'error' event
//     this.mqttClient.on('error', this.handleMQTTError.bind(this));

//     // MQTT Callback for 'connect' event
//     this.mqttClient.on('connect', this.handleMQTTConnect.bind(this));

//     // Call the message callback function when message arrived
//     this.mqttClient.on('message', this.handleMQTTMessage.bind(this));

//     this.mqttClient.on('close', this.handleMQTTClose.bind(this));
//   }

//   // Publish MQTT Message
//   publish(topic, message, options) {
//     this.mqttClient.publish(topic, message);
//   }

//   // Subscribe to MQTT Message
//   subscribe(topic, options) {
//     this.mqttClient.subscribe(topic, options);
//   }

//   // Handle MQTT 'error' event
//   handleMQTTError(err) {
//     console.log(err);
//     this.mqttClient.end();
//   }

//   // Handle MQTT 'connect' event
//   handleMQTTConnect() {
//     console.log(`MQTT client connected`);
//   }

//   // Handle MQTT 'message' event
//   handleMQTTMessage(topic, message) {
//     console.log(message.toString());
//     if (this.messageCallback) this.messageCallback(topic, message);
//   }

//   // Handle MQTT 'close' event
//   handleMQTTClose() {
//     console.log(`MQTT client disconnected`);
//   }
// }

// module.exports = MQTTService;

// const mqtt = require('mqtt');

// class MQTTService {
//   constructor(host, messageCallback) {
//     this.mqttClient = null;
//     this.host = host;
//     this.messageCallback = messageCallback;
//   }

//   connect() {
//     this.mqttClient = mqtt.connect(this.host);

//     // MQTT Callback for 'error' event
//     this.mqttClient.on('error', (err) => {
//       console.log(err);
//       this.mqttClient.end();
//     });

//     // MQTT Callback for 'connect' event
//     this.mqttClient.on('connect', () => {
//       console.log(`MQTT client connected`);
//     });

//     // Call the message callback function when message arrived
//     this.mqttClient.on('message', function (topic, message) {
//       console.log(message.toString());
//       if (this.messageCallback) this.messageCallback(topic, message);
//     });

//     this.mqttClient.on('close', () => {
//       console.log(`MQTT client disconnected`);
//     });
//   }

//   // Publish MQTT Message
//   publish(topic, message, options) {
//     this.mqttClient.publish(topic, message);
//   }

//   // Subscribe to MQTT Message
//   subscribe(topic, options) {
//     this.mqttClient.subscribe(topic, options);
//   }
// }

// module.exports = MQTTService;

// const mqtt = require('mqtt');
// const fs = require('fs');

// const host = process.env.MQTT_HOST || 'a3lafbeca71eu5-ats.iot.ap-southeast-1.amazonaws.com';
// const port = process.env.MQTT_PORT || 8883;
// const topic = process.env.MQTT_TOPIC || 'back-end-exam';
// const caFileUrl =
//   process.env.MQTT_CA_URL || 'https://test-upload-image-file.s3.ap-southeast-1.amazonaws.com/back-end-exam/root_ca.pem';
// const certFileUrl =
//   process.env.MQTT_CERT_URL ||
//   'https://test-upload-image-file.s3.ap-southeast-1.amazonaws.com/back-end-exam/certificate.crt';
// const keyFileUrl =
//   process.env.MQTT_KEY_URL || 'https://test-upload-image-file.s3.ap-southeast-1.amazonaws.com/back-end-exam/private_key.key';

// // Tải xuống các tệp chứng chỉ và khóa riêng tư từ URL
// const caFilePath = '../../certificates/root_ca.pem';
// const certFilePath = '../../certificates/certificate.crt';
// const keyFilePath = '../../certificates/private_key.key';

// // Hàm tải xuống từ URL
// const downloadFile = async (url, localPath) => {
//   const axios = require('axios');
//   const response = await axios.get(url, { responseType: 'arraybuffer' });
//   fs.writeFileSync(localPath, response.data);
// };

// // Tải xuống các tệp chứng chỉ và khóa riêng tư
// downloadFile(caFileUrl, caFilePath);
// downloadFile(certFileUrl, certFilePath);
// downloadFile(keyFileUrl, keyFilePath);

// const options = {
//   port,
//   clientId: 'mqtt-client',
//   username: process.env.MQTT_USERNAME || 'your-username', // Nếu cần xác thực
//   password: process.env.MQTT_PASSWORD || 'your-password', // Nếu cần xác thực
//   ca: fs.readFileSync(caFilePath),
//   cert: fs.readFileSync(certFilePath),
//   key: fs.readFileSync(keyFilePath),
// };

// const client = mqtt.connect(`mqtts://${host}`, options);

// client.on('connect', () => {
//   console.log('Connected to MQTT broker');
//   client.subscribe(topic);
// });

// client.on('message', (receivedTopic, message) => {
//   // Xử lý thông tin cơn bão ở đây
//   console.log(`Received message on topic ${receivedTopic}: ${message.toString()}`);
// });

// client.on('error', (error) => {
//   console.error('Error:', error);
//   client.end(); // Đóng kết nối khi có lỗi
// });

// client.on('close', () => {
//   console.log('Connection closed');
// });

// // Đợi một khoảng thời gian sau đó đóng kết nối (chỉ để minh họa)
// setTimeout(() => {
//   client.end();
// }, 60000); // Đóng kết nối sau 1 phút
