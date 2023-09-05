import HttpRequest from '../index';

export const LoginApi = params => {
  return HttpRequest.post('/geeker/login', params);
};
