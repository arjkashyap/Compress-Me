let txt = ""; // content of the file uploaded

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
  let txt = "";
  readFileContent(file)
    .then((content) => {
      txt = content;
      console.log("Here's the content");
      console.log(txt);
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
