const fs = require("fs");
/*
require("fs").readFile("./out", (err, buff) => {
  const a = buff[0];
  const b = buff[2];
  //   console.log(a);
  //   console.log(b);

  buff.forEach((e) => console.log(e));
});

Uint32Array;
*/
// console.log([].slice.call(new Uint32Array(fs.readFileSync("res"))));
fs.readFile("buffer-store", (err, buf) => {
  let restoredData = new Uint32Array(
    buf.buffer,
    buf.offset,
    buf.byteLength / 4
  );
  //   console.log(data[1]);

  restoredData.forEach((e) => console.log(e));
});
