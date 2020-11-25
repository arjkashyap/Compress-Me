const fs = require("fs");

out = fs.createWriteStream("./out");

// const buf = Buffer.alloc(10, 0); // 10 bytes -> 80 bits

// // const buf = Buffer.from([1, 2, 3]);

// // 00000000 00000000 00000000 000000000 00000000 00000000 00000000 00000000 00000000 00000000
// // buf2.writeUInt32BE(5, 0);
// // out.write(new Buffer("01001")); // this writes "0" as string

// const n1 = parseInt("10", 2);
// const n2 = parseInt("1001", 2);

// buf.writeUInt32BE(n1, 0);
// buf.writeUInt32BE(n2, 2);

// out.write(buf);

// console.log(buf);

const b = new Uint32Array(4);
b[0] = 1222;
b[2] = 9;

fs.writeFileSync("buffer-store", Buffer.from(b.buffer));

// fs.writeFileSync("arr", new Buffer(arr)); // <-- HERE
