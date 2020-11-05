export const handlerError = (error: any): string => {
  try {
    if (error?.networkError?.status === 0) return 'The server is not responding. Try later.';
    if (error?.graphQLErrors[0].message) return error?.graphQLErrors[0].message;
  } catch (e) {
    return 'Unknown server error';
  }
  return 'Unknown server error';
};
