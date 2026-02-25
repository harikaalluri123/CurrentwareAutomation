import { test, expect } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io/v2';

test('GET pet by ID - valid petId', async ({ request }) => {
  const petId = 10;

  const response = await request.get(`${BASE_URL}/pet/${petId}`, {
    headers: {
      Accept: 'application/json'
    }
  });

  // Status code validation
  expect(response.status()).toBe(200);
  
  const body = await response.json();

  // Data validations 
  expect(body.id).toBe(petId);
  expect(body.name).toBe('doggie');
});
