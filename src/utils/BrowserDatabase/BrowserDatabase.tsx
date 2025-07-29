import { BrowserDatabaseType } from './BrowserDatabaseType';

/*
  Get data by key from browser local storage
 */
export function getStorageData(key:string): BrowserDatabaseType | boolean {
  const data = window.localStorage.getItem(key);

  if (!data) {
    return false;
  }

  const parsedData = stringParse(data);

  if (!parsedData) {
    return { data };
  }

  return parsedData;
}

/*
  Remove data by key from browser local storage
 */
export function deleteStorageData(key: string):void {
  window.localStorage.removeItem(key);
}

/*
  Set provided key and data to browser local storage
 */
export function setStorageData(key: string, data: BrowserDatabaseType | string ): void {
  let dataToString: object = {};

  if (typeof data === 'string') {
    dataToString = { value: data };
  } else {
    dataToString = data;
  }

  if (key !== '') {
    window.localStorage.setItem(key, JSON.stringify(dataToString));
  }
}

function stringParse(value: string): BrowserDatabaseType | boolean  {
  let result: BrowserDatabaseType | boolean = false;

  try {
    result = JSON.parse(value);
  } catch (e) {
    return false;
  }

  return result;
}