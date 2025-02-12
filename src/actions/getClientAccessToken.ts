'use server';

type HttpResponseToken = {
  token_type: string;
  expires_in: number;
  access_token: string;
};

export async function getClientAccessToken() {
  return fetch(`${process.env.API_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.API_CLIENT_ID,
      client_secret: process.env.API_CLIENT_SECRET,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `Erro na requisição ao gerar Access Token. HTTP Status: ${response.status}`,
        );
      }
      const responseJson = (await response.json()) as HttpResponseToken;

      return responseJson.access_token;
    })
    .catch((error) => {
      throw new Error(`Erro na requisição: ${error.message}`);
    });
}
