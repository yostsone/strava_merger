/*
  Get data by key from browser local storage
 */
export function getStorageData<T>(key:string): T | string | boolean {
  const data = window.localStorage.getItem(key);

  if (!data) {
    return false;
  }

  const parsedData = stringParse<T>(data);

  if (!parsedData) {
    return data;
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
export function setStorageData<T extends object>(key: string, data: T | string ): void {
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

/**
 * Parse provided value if possible. Returns parsed value or false.
 * @param value
 */
function stringParse<T>(value: string): T | boolean  {
  let result: T | boolean = false;

  try {
    result = JSON.parse(value);
  } catch (e) {
    return false;
  }

  return result;
}