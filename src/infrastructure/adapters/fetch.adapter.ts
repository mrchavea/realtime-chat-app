export class FetchAdapter {

    
    async get(url: string, options: RequestInit = {}): Promise<any> {
      const response = await fetch(url, { ...options, method: 'GET' });
      return this.handleResponse(response);
    }
  
    async post(url: string, data: any, options: RequestInit = {}): Promise<any> {
      const response = await fetch(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      return this.handleResponse(response);
    }
  
    // Similar methods for PUT, DELETE, etc.
  
    private async handleResponse(response: Response): Promise<any> {
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      return response.json();
    }
  }
  