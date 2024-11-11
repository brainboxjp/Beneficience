import { ApiConfig, ApiProvider } from './ApiConfig';

export class ApiService {
    protected provider: ApiProvider;

    constructor(providerId: string) {
        const provider = ApiConfig.getProvider(providerId);
        if (!provider) {
            throw new Error(`Provider ${providerId} not configured`);
        }
        this.provider = provider;
    }

    protected async request(endpoint: string, options: RequestInit = {}): Promise<any> {
        const url = `${this.provider.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.provider.authToken}`,
            'X-API-Key': this.provider.apiKey,
            ...options.headers,
        };

        try {
            const response = await fetch(url, { ...options, headers });
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    async authenticate(credentials: { username: string; password: string }): Promise<string> {
        const response = await this.request('/auth', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        if (response.token) {
            this.provider.authToken = response.token;
            return response.token;
        }
        throw new Error('Authentication failed');
    }
}