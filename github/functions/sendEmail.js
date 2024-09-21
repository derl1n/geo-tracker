const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    const { userAgent, latitude, longitude } = JSON.parse(event.body);

    // Настройка Nodemailer для отправки почты
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'demonfil0512@gmail.com',  // Ваша почта
            pass: 'key_cloud',       // Пароль приложения (App Password)
        },
    });

    // Настройка письма
    const mailOptions = {
        from: 'demonfil0512@gmail.com',
        to: 'demonfil0512@gmail.com',
        subject: 'New Visitor on Your Website',
        text: `Device Info: ${userAgent}\nLocation: Latitude ${latitude}, Longitude ${longitude}`,
    };

    // Отправка письма
    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' }),
        };
    }
};
