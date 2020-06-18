const createResponse = (code, body) => {
  if (code === 200) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(convertTimestampsToDates(body))
    };
  }

  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: body.message ? body.message : 'Server Error'
    })
  };
};

module.exports = createResponse;

const convertTimestampsToDates = (object) => {
  const copy = JSON.parse(JSON.stringify(object));

  for (const key of Object.keys(copy)) {
    const value = copy[key];
    if (value._seconds) {
      copy[key] = new Date(value._seconds * 1000);
    } else if (typeof value === 'object') {
      copy[key] = convertTimestampsToDates(value);
    }
  }

  return copy;
};