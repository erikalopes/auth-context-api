interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'asdkjasdkhasj1092312n1si1n2w1i2ns1s12',
        user: {
          name: 'Erika',
          email: 'erika@agendaedu.com',
        },
      });
    }, 2000);
  });
}
