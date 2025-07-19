// In handler.js

exports.captureData = async (event) => {
  console.log("v2 - CaptureData function was called!");

  // You MUST return a response object with statusCode and a string body
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Data captured successfully!",
    }),
  };

  return response;
};

// You can add a similar return statement to your processData function
exports.processData = async (event) => {
  console.log("ProcessData function was called!");

  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: "Processing started." }),
  };

  return response;
};
