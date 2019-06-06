export const request = {
  prefix: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  errorHandler: (error) => {
    console.log(error);
  },
};
