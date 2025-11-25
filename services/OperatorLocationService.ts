const BASE_URL = 'https://gatewaysgar.onrender.com/ApiNavegacion/operator-locations';

export async function getOperatorLocations() {
  const response = await fetch(`${BASE_URL}/`);
  return response.json();
}

export async function getOperatorLocationById(operatorId: number) {
  const response = await fetch(`${BASE_URL}/operator/${operatorId}`);
  return response.json();
}
