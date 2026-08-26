import {
  CompanySettings,
  Product,
  Service,
  Project,
  Offer,
  Enquiry,
  AuthResponse,
  DashboardStats,
  AdminUser
} from '../types';

const TOKEN_KEY = 'omtecho_admin_jwt';

export const authStorage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = authStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(endpoint, {
    ...options,
    headers
  });

  if (!res.ok) {
    let errorMsg = `Request failed (${res.status})`;
    try {
      const json = await res.json();
      if (json.error) errorMsg = json.error;
    } catch {
      // fallback
    }
    throw new Error(errorMsg);
  }

  return res.json() as Promise<T>;
}

export const api = {
  // Public Data
  async getSettings(): Promise<CompanySettings> {
    return apiRequest<CompanySettings>('/api/settings');
  },
  async getProducts(): Promise<Product[]> {
    return apiRequest<Product[]>('/api/products');
  },
  async getProduct(id: string): Promise<Product> {
    return apiRequest<Product>(`/api/products/${id}`);
  },
  async getServices(): Promise<Service[]> {
    return apiRequest<Service[]>('/api/services');
  },
  async getProjects(): Promise<Project[]> {
    return apiRequest<Project[]>('/api/projects');
  },
  async getProject(idOrSlug: string): Promise<Project> {
    return apiRequest<Project>(`/api/projects/${idOrSlug}`);
  },
  async getOffers(all = false): Promise<Offer[]> {
    return apiRequest<Offer[]>(`/api/offers${all ? '?all=true' : ''}`);
  },
  async submitEnquiry(data: Partial<Enquiry>): Promise<{ message: string; data: Enquiry }> {
    return apiRequest<{ message: string; data: Enquiry }>('/api/enquiries', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Admin Auth
  async login(identifier: string, password: string): Promise<AuthResponse> {
    const res = await apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password })
    });
    if (res.token) {
      authStorage.setToken(res.token);
    }
    return res;
  },
  async getMe(): Promise<{ user: AdminUser }> {
    return apiRequest<{ user: AdminUser }>('/api/auth/me');
  },
  async updatePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>('/api/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },
  async updateProfile(username: string, email: string): Promise<{ user: AdminUser; message: string }> {
    return apiRequest<{ user: AdminUser; message: string }>('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ username, email })
    });
  },

  // Admin CMS & CRUD
  async getDashboardStats(): Promise<DashboardStats> {
    return apiRequest<DashboardStats>('/api/dashboard/stats');
  },
  async updateSettings(settings: Partial<CompanySettings>): Promise<CompanySettings> {
    return apiRequest<CompanySettings>('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  },

  // Products
  async createProduct(product: Partial<Product>): Promise<Product> {
    return apiRequest<Product>('/api/products', {
      method: 'POST',
      body: JSON.stringify(product)
    });
  },
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return apiRequest<Product>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product)
    });
  },
  async deleteProduct(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/api/products/${id}`, {
      method: 'DELETE'
    });
  },

  // Services
  async createService(service: Partial<Service>): Promise<Service> {
    return apiRequest<Service>('/api/services', {
      method: 'POST',
      body: JSON.stringify(service)
    });
  },
  async updateService(id: string, service: Partial<Service>): Promise<Service> {
    return apiRequest<Service>(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service)
    });
  },
  async deleteService(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/api/services/${id}`, {
      method: 'DELETE'
    });
  },

  // Projects
  async createProject(project: Partial<Project>): Promise<Project> {
    return apiRequest<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
  },
  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    return apiRequest<Project>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    });
  },
  async deleteProject(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/api/projects/${id}`, {
      method: 'DELETE'
    });
  },

  // Offers
  async createOffer(offer: Partial<Offer>): Promise<Offer> {
    return apiRequest<Offer>('/api/offers', {
      method: 'POST',
      body: JSON.stringify(offer)
    });
  },
  async updateOffer(id: string, offer: Partial<Offer>): Promise<Offer> {
    return apiRequest<Offer>(`/api/offers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(offer)
    });
  },
  async deleteOffer(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/api/offers/${id}`, {
      method: 'DELETE'
    });
  },

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    return apiRequest<Enquiry[]>('/api/enquiries');
  },
  async updateEnquiryStatus(id: string, status: string): Promise<Enquiry> {
    return apiRequest<Enquiry>(`/api/enquiries/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },
  async deleteEnquiry(id: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`/api/enquiries/${id}`, {
      method: 'DELETE'
    });
  },

  // AI Assistance
  async generateAICopy(prompt: string, type: string): Promise<string> {
    const res = await apiRequest<{ result: string }>('/api/ai/generate-copy', {
      method: 'POST',
      body: JSON.stringify({ prompt, type })
    });
    return res.result;
  }
};

// Helper Contact URL generators
export function getCleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export function buildWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = getCleanPhoneNumber(phone) || '919876543210';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function buildMailtoLink(email: string, subject: string, body: string): string {
  const targetEmail = email || 'contact@omtecho.com';
  return `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
