'use strict';

import constants from './constants';

const API_URL = `${constants.BASE_URL}/api`;

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function(uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

function getData(url, token='', generalHeaders={}) {
  if (token) {
      generalHeaders["Authorization"] = `JWT ${token}`;
  }
  return fetch(url, {headers: generalHeaders})
    .then((response) => {
      let json = response.json();
      if (response.status >= 200 && response.status < 300) {
        return json;
      } else {
        return json.then(Promise.reject.bind(Promise));
      }
    })
}

function postData(url, data, method='POST', generalHeaders={}) {
  generalHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (data.token) {
      generalHeaders["Authorization"] = `JWT ${data.token}`;
  }
  return fetch(url, {
    method: method,
    headers: generalHeaders,
    body: JSON.stringify(data)
  })
  .then((response) => {
    let json = response.json();
    if (response.status >= 200 && response.status < 300) {
      return json;
    } else {
      return json.then(Promise.reject.bind(Promise));
    }
  });
}

export default {
  getProfile(token) {
    return getData(`${API_URL}/me/`, token);
  },
  registerUser(user) {
    return postData(`${API_URL}/user/`, user);
  },
  authWithPassword(user) {
    return postData(`${API_URL}/api-token-auth/`, user);
  },
  authWithToken(token) {
    return postData(`${API_URL}/api-token-verify/`, {token: token});
  },
  postSaveFeatures(data) {
    return postData(`${API_URL}/me/step_1/`, data, 'PUT');
  },
  postSavePersonalInfo(data) {
    return postData(`${API_URL}/me/step_2/`, data, 'PUT');
  },
  postCreateAd(data) {
    return postData(`${API_URL}/advertisement/`, data, 'POST');
  },
  updatePersonalInfo(data) {
    return postData(`${API_URL}/me/update_profile/`, data, 'PUT');
  },
  updatePersonalAvatar(data) {
    return postData(`${API_URL}/me/update_picture/`, data, 'PUT');
  },
  updatePersonalCoverPhoto(data) {
    return postData(`${API_URL}/me/update_photo_front/`, data, 'PUT');
  },
  getMyAdvertisements(token) {
    return getData(`${API_URL}/me/get_advertisement/`, token);
  },
  getProfessions() {
    return getData(`${API_URL}/professions/`);
  },
  getNotifications(token) {
    return getData(`${API_URL}/notifications/`, token);
  },
  getLocations(token) {
    return getData(`${API_URL}/locations/`, token);
  },
  getAdvertisements(token) {
    return getData(`${API_URL}/advertisement/`, token);
  },
  postApplyAdvertisement(token, url) {
    return getData(url, token);
  },
  postDeclineAdvertisement(token, url) {
    return getData(url, token);
  }
}
