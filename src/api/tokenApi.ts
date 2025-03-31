import axios from 'axios';
import { TokenDetails } from '../types/token-details';
import { API_BASE_URL } from '../config';

interface TokenResponse {
  success: boolean;
  token: TokenDetails;
}

const tokenApi = {
  // Fetch token details by mint address
  getTokenDetails: async (mintAddress: string): Promise<TokenDetails | null> => {
    try {
      const response = await axios.get<TokenResponse>(`${API_BASE_URL}/api/token/${mintAddress}`);
      return response.data.success ? response.data.token : null;
    } catch (error) {
      console.error('Error fetching token details:', error);
      return null;
    }
  }
};

export default tokenApi; 