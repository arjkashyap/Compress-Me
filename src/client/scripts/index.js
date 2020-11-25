let txt = ""; // content of the file uploaded
const URL = "http://localhost:5000";

const reqObject = {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: "", // body data type must match "Content-Type" header Json.stringify(data)
};

// script for reading uploaded file
document.getElementById("input-file").addEventListener("change", getFile);

// get uploaded file on change
function getFile(event) {
  const input = event.target;
  if ("files" in input && input.files.length > 0) {
    console.log(input.files);
    placeFileContent(input.files[0]);
  }
}

// perform operations on file read
function placeFileContent(file) {
  readFileContent(file)
    .then((content) => {
      txt = content;
    })
    .catch((error) => console.log(error));
}

// function returns a promise when file is read
function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

// The function takes the uploaded doc and makes
// a request to the compression endpoint
async function makeRequest() {
  console.log("listen");
  const validator = document.getElementById("cmp-validator");
  const cmpDetails = document.getElementById("cmp-details");
  if (txt.length === 0) {
    validator.innerHTML = "File Empty Error";
    return;
  }

  validator.innerHTML = "";
  const url = URL + "/api/encode-text";
  console.log("Making request to ", url);

  reqObject.body = JSON.stringify({ compressionString: txt });

  let resp;

  await fetch(url, reqObject)
    .then((response) => response.json())
    .then((result) => (resp = result));
  console.log("response: ");
  console.log(resp);

  // console.log(response);
  if (resp.status === 200) {
    validator.innerHTML = "Compression Success. Please check your downloads";
    validator.style.color = "teal";
    // orignalTextSize = resp.orignalTextSize;
    const orignalTextSize = resp.orignalSize;
    const compressedTextSize = resp.textSize;

    const eff = resp.eff;

    const compressedTextArr = resp.text; // This is an array
    const dict = resp.dict;

    console.log(typeof compressedTextArr);

    let compressedTextStr = "";

    // Take the numbers from response array and put them to string
    compressedTextArr.forEach(
      (e) => (compressedTextStr += e.toString() + "\n")
    );

    console.log("compressed text array type", typeof compressedTextStr);
    // console.log(compressedTextArr.lenght());
    // Creating blob
    const blob = new Blob([compressedTextStr], { type: "text/plain" });
    const blobUrl = window.URL.createObjectURL(blob);
    // create a link element
    const link = document.createElement("a");
    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  }
}
