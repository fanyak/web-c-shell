import express from "express";
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// work around for using __dirname when using ES6 modules
/* eslint-disable no-alert */
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.port || 3000;

const WEB_PATH = join(__dirname, '');

const MODULE_PATH = join(__dirname, 'node_modules');

//@ TODO move this to file
const fileServer = express.static(WEB_PATH, { // OPTIONS OBJECT 
    setHeaders(res, path) {
        const parts = path.split('.');
        if (parts[parts.length - 1] == 'mjs') {
            console.log(path)
            // JUST TO MAKE SURE THAT IT IS SERVED AS JAVASCRIPT
            // REF: https://v8.dev/features/modules#mjs
            res.setHeader('Content-Type', 'text/javascript');
        }
    }
});


// ALLOW LOADING FROM MODULES
// First set the path,
// then use middleware see @L68
// const ModuleServer = express.static(MODULE_PATH, { // OPTIONS OBJECT 
//     setHeaders(res, path) {
//         const parts = path.split('.');
//         if (parts[parts.length - 1] == 'mjs') {
//             // JUST TO MAKE SURE THAT IT IS SERVED AS JAVASCRIPT
//             // REF: https://v8.dev/features/modules#mjs
//             res.setHeader('Content-Type', 'text/javascript');
//         }
//     }
// });

// Enable ALL cors requests
// REF: https://www.npmjs.com/package/cors
app.use(cors());

// app.use(ModuleServer);

app.use('/node_modules/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.status(200).sendFile(`${MODULE_PATH}/${req.url}`);
});

app.use(fileServer);

app.use((req, res) => res.sendFile(`${WEB_PATH}/index.html`));


app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
})
