const cors_proxy = require('cors-anywhere');
const http = require('http');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

// השרת הזה יסכים להעביר מידע רק אם ה-Token נכון
cors_proxy.createServer({
    originWhitelist: [], // מאפשר לכולם, אבל נחסום עם ה-Token
    requireHeader: ['x-my-token'],
    handleInitialRequest: (req, res, location) => {
        if (req.headers['x-my-token'] !== '12345-secret') { // שים פה את הסיסמה שלך
            res.writeHead(403);
            res.end('Access Denied');
            return true;
        }
        return false;
    }
}).listen(port, host, () => {
    console.log('Running on ' + host + ':' + port);
});
