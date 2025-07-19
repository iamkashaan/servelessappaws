// handler.js
'use strict';

const AWS = require('aws-sdk'); // Import the AWS SDK
const s3 = new AWS.S3();

// This is your original function, you can keep it for testing
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Function executed successfully!' }),
  };
};

// =================================================================
// ✨ NEW FUNCTION 1: Captures data and stores it in S3
// =================================================================
module.exports.captureData = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const params = {
      Bucket: process.env.DATA_BUCKET_NAME, // Get bucket name from environment
      Key: `incoming-data/${new Date().toISOString()}.json`, // Use a unique name
      Body: JSON.stringify(data, null, 2),
      ContentType: 'application/json',
    };

    await s3.putObject(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data captured successfully!', receivedData: data }),
    };
  } catch (error) {
    console.error("Error capturing data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error capturing data.' }),
    };
  }
};

// =================================================================
// ✨ NEW FUNCTION 2: Runs daily to generate a report
// =================================================================
module.exports.generateReport = async (event) => {
  console.log('Daily report generation triggered!');
  
  // For the assignment, we'll create a simple summary report.
  // A more advanced version would read and aggregate data from the 'incoming-data/' prefix in S3.
  const reportContent = `This is the automated daily report for ${new Date().toLocaleDateString('en-IN')}.`;

  const params = {
    Bucket: process.env.DATA_BUCKET_NAME,
    Key: `daily-reports/report-${new Date().toISOString().split('T')[0]}.txt`,
    Body: reportContent,
  };

  await s3.putObject(params).promise();

  console.log('Report successfully generated and saved to S3.');
  return { status: 'Success' };
};
