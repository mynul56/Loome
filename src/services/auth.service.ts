import { User, delay } from './db';

const USERS_KEY = 'loome_users_v5';
const CURRENT_USER_KEY = 'loome_current_user_v5';

export const authService = {
  async login(email: string, password?: string): Promise<User> {
    await delay(500); // Simulate network
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // In a real app, you'd hash and check the password.
    const user = users.find(u => u.email === email && (!password || u.password === password));
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    if (user.isBlocked) {
      throw new Error('This account has been blocked');
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  async register(name: string, email: string, password?: string): Promise<User> {
    await delay(500);
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    if (users.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    
    const newUser: User = {
      id: `buyer-${Date.now()}`,
      name,
      email,
      password, // Plain text just for this mock
      role: 'buyer',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    return newUser;
  },

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },
  
  async getAllUsers(): Promise<User[]> {
    await delay(400);
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  },

  async updateUserStatus(userId: string, isBlocked: boolean): Promise<void> {
    await delay(400);
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].isBlocked = isBlocked;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }
};
