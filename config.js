require('dotenv').config();

// const serverPath = process.env.SERVER_PATH;

module.exports = {
    server: {
        server: process.env.HOST,
        port: process.env.PORT
    },
    PTW_UPLOAD_EXTERNAL: '/document/'
}