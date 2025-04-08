
const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your actual deployed URL

const callApi = async (endpoint: string, method: 'POST' | 'GET' = 'POST', body: any = null) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const config: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    };
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.detail || `HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error: any) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
};

export const startChat = (userId: string) => {
  return callApi('/start_chat/', 'POST', { user_id: userId });
};

export const sendMessage = (sessionId: string, message: string) => {
  return callApi('/send_message/', 'POST', { session_id: sessionId, message: message });
};

export const getSingleResponse = (message: string) => {
  return callApi('/get_single_response/', 'POST', { message: message });
};

export const endChat = (userId: string, sessionId: string) => {
  return callApi('/end_chat/', 'POST', { user_id: userId, session_id: sessionId });
};

export const getCorrelations = (userId: string, startDate: string, endDate: string) => {
  return callApi('/get_correlations/', 'POST', { user_id: userId, start_date: startDate, end_date: endDate });
};

export const addUser = (userId: string, userData: { name: string }) => {
  return callApi('/add_user/', 'POST', { user_id: userId, user_data: userData });
};

export const addEntries = (userId: string, journal_entries: any[]) => {
  return callApi('/add_entries/', 'POST', { user_id: userId, journal_entries: journal_entries });
};

export const healthCheck = () => {
  return callApi('/health/', 'GET');
};