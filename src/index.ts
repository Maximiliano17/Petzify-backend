import app from './app';
import './database';
import dotenv from 'dotenv';
dotenv.config();

// Settings

function main() {
    app.listen(app.get('PORT'), () => {
        console.log("Server on PORT: " + app.get('PORT'));
    })
}

main();