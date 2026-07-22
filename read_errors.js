const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\nik94\\Desktop\\Agency Portfolio\\compile_errors.txt', 'utf16le');
console.log('=== COMPILE ERRORS ===');
console.log(content.slice(0, 10000));
console.log('=== END ===');
