const mqttService = require('../services/mqtt.service');

// Change this to point to your MQTT broker
// const MQTT_HOST_NAME = process.env.MQTT_HOST || 'mqtt://127.0.0.1:1883';

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
  caFilePath: '../../certificates/root_ca.pem',
  certFilePath: '../../certificates/certificate.crt',
  keyFilePath: '../../certificates/private_key.key',
  clientId: 'mqtt-client',
  username: process.env.MQTT_USERNAME || 'your-username', // Nếu cần xác thực
  password: process.env.MQTT_PASSWORD || 'your-password', // Nếu cần xác thực
};

// var mqttClient = new mqttService(options);
const mqttClient = new mqttService(options);
mqttClient.initialize();

// Đợi một khoảng thời gian sau đó đóng kết nối (chỉ để minh họa)
setTimeout(() => {
  mqttClient.end();
}, 60000); // Đóng kết nối sau 1 phút
// mqttClient.connect();

exports.getPublisherPage = async function (req, res) {
  try {
    res.render('pages/publisher');
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.publishMQTTMessage = async function (req, res) {
  try {
    const topic = req.body.topic;
    const message = req.body.message;

    console.log(`Request Topic :: ${topic}`);
    console.log(`Request Message :: ${message}`);

    mqttClient.publish(topic, message, {});
    res.status(200).json({ status: '200', message: 'Sucessfully published MQTT Message' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
