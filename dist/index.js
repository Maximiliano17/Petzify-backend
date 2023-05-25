"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("./database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Settings
function main() {
    app_1.default.listen(app_1.default.get('PORT'), () => {
        console.log("Server on PORT: " + app_1.default.get('PORT'));
    });
}
main();
