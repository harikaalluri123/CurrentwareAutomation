import { test, expect } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io/v2';

test('PUT update pet - valid pet object', async ({ request }) => {
  const petData = {
    id: 10,
    category: {
      id: 0,
      name: 'string'
    },
    name: 'doggie',
    photoUrls: ['string'],
    tags: [
      {
        id: 0,
        name: 'string'
      }
    ],
    status: 'available'
  };

  const response = await request.put(`${BASE_URL}/pet`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: petData
  });

  // Status code validation
  expect(response.status()).toBe(200);

  // Parse response body
  const body = await response.json();

  // Data validations
  expect(body.id).toBe(petData.id);
  expect(body.name).toBe(petData.name);
  expect(body.status).toBe(petData.status);
});
