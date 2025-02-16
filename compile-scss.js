const sass = require("sass");
const fs = require("fs");
const path = require("path");

// const inputPath = "scss/style.scss"; // Arquivo SCSS de entrada
const inputPath = path.join(__dirname, "src/public/assets/scss/style.scss"); // Arquivo SCSS de entrada
// const outputPath = "public/css/style.css"; // Arquivo CSS compilado
const outputPath = path.join(__dirname, "src/public/assets/css/style.css"); // Arquivo CSS compilado

console.log(inputPath);
console.log(outputPath);


// Compilar SCSS para CSS
const result = sass.compile(inputPath, { style: "compressed" });

// Salvar CSS no arquivo de saída
fs.writeFileSync(outputPath, result.css);

console.log("✅ SCSS compilado para CSS!");