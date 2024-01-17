import { TIMEOUT_SEC } from '../config.js';

/**@description: Timeout function if server take long time */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**@description: Function for fetching API data  */
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // const res= await  fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} `);
    return data;
  } catch (err) {
    throw err;
  }
};

/**@description: Posting new recipe data from client */
export const sentJSON = async function (url, uploadData) {
  try {
    const fetchURL = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchURL, timeout(TIMEOUT_SEC)]);
    // const res= await  fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} `);
    return data;
  } catch (err) {
    throw err;
  }
};
