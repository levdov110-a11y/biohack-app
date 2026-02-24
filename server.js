const cors_proxy = require('cors-anywhere');
const http = require('http');

cors_proxy.createServer({
    requireHeader: ['x-my-token'],
    handleInitialRequest: (req, res, location) => {
        if (req.headers['x-my-token'] !== '23603892') { 
            res.writeHead(403);
            res.end('No Access');
            return true;
        }
        return false;
    }
}).listen(process.env.PORT || 8080, '0.0.0.0');
