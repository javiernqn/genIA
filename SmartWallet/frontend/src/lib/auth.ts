export const validateUser = async (username: string) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username,
        latitude: -34.6037,
        longitude: -58.3816
      })
    });
    
    if (!response.ok) {
      throw new Error('Usuario inexistente');
    }
    
    const data = await response.json();
    return data.user;
  } catch (error) {
    throw new Error('Usuario inexistente');
  }
};