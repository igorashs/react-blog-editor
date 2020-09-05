import moment from 'moment';
import { useEffect, useState } from 'react';

// add timestamps to state array (which have date prop)
// doesn't modify the state if it has an invalid type
export function addTimestamps(dataArr) {
  if (dataArr instanceof Array) {
    dataArr.forEach((data) => {
      if (data.date) {
        return (data.timestamp = moment(data.date).calendar());
      }
    });
  }
}

// sort the state array by date
export function sortByDate(dataArr) {
  dataArr.sort((a, b) => {
    if (a.date > b.date) {
      return -1;
    }

    if (a.date < b.date) {
      return 1;
    }

    return 0;
  });
}

// removes invalid token and reloads the page
export function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

// get the token from LocalStorage
export function useToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return token;
}
