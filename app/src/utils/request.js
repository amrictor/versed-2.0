
function parseJSON(response) {
  if(response.headers.get('Content-Type').includes('json'))
  {
    return response.json();
  }
  return response.text();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (response.status === 204) {
      response.json = () => '';
    }
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(path, options) {
  const url = path.includes('http') ? path : `https://localhost:8080${path}`;
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

function getRequestOptions(type, payload) {
  if (type === 'get' || type === 'delete') {
    return {
      method: type,
      credentials: 'same-origin',
      headers: {
        'Accept': '*/*',
      },
    };
  }
  return {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
    body: JSON.stringify(payload),
  };
}

export { request, getRequestOptions };