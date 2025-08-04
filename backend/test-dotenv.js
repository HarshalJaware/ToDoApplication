const path = require('path');
require('dotenv').config({ debug: true });

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
