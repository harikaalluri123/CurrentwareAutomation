import { APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io/v2';

export interface PetData {
  id: number;
  category?: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls: string[];
  tags?: Array<{
    id: number;
    name: string;
  }>;
  status: 'available' | 'pending' | 'sold';
}

/**
 * Get common headers for API requests
 */
export function getCommonHeaders(): Record<string, string> {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
}

/**
 * Get pet by ID
 * @param request - Playwright APIRequestContext
 * @param petId - The ID of the pet to retrieve
 * @returns Response object
 */
export async function getPetById(request: APIRequestContext, petId: number) {
  const response = await request.get(`${BASE_URL}/pet/${petId}`, {
    headers: getCommonHeaders()
  });
  return response;
}

/**
 * Update pet information
 * @param request - Playwright APIRequestContext
 * @param petData - The pet data to update
 * @returns Response object
 */
export async function updatePet(request: APIRequestContext, petData: PetData) {
  const response = await request.put(`${BASE_URL}/pet`, {
    headers: getCommonHeaders(),
    data: petData
  });
  return response;
}

export { BASE_URL };

