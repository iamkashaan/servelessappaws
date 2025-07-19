// In handler.js

exports.captureData = async (event) => {
  // Your code to capture data...
  console.log("CaptureData function was called!");
  // ...
};

exports.processData = async (event) => {
  // Your code to process the daily report...
  console.log("ProcessData function was called!");
  // ...
};
// In handler.js
exports.captureData = async (event) => {
  console.log("v2 - CaptureData function was called!"); // <--- ADD "v2"
  // ...
};
