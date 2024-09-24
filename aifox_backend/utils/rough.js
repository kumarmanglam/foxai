// this is in src/utils/rough.js
// env is in src/.evn
require("dotenv").config({ path: '../.env' });

console.log(process.env.AZURE_OPENAI_API_KEY)
console.log(process.env.GOOGLE_API_KEY)
console.log(process.env.JWT_SECRET_KEY)
console.log(process.env.URL)


