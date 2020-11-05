export const isEmptySetUndefined = (value: string): string | undefined => value === '—' ? undefined : value;

export const getFullPhoneNumber = (prefix: string, phoneNumber: string): string => prefix + '&' + phoneNumber;

export const getFullName = (first: string, last: string): string => {
  function capitalize(str: string) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  return `${capitalize(first)} ${capitalize(last)}`;
};
