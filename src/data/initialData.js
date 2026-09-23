// Sample data and initialization for Lost & Found portal
export const CATEGORIES = [
  'Electronics',
  'Documents',
  'Wallet',
  'Keys',
  'Bags',
  'Clothing',
  'Books',
  'Accessories',
  'Other'
];

export const LOCATIONS = [
  'A-block',
  'DS-block',
  'D-block',
  'PU-circle',
  'New Foodcourt',
  'Greenzy',
  'Capitol Crust',
  'N-block',
  'L-block',
  'Parking',
  'Utopoia'
];

export const ITEM_IMAGE_URLS = {
  item1: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85',
  item2: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85',
  item3: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
  item4: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=85',
  item5: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=85',
  item6: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=85',
  keys: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85',
  phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85',
  laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
  bottle: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85'
};

export const sampleUsers = [
  {
    id: 'user1',
    email: 'student@university.edu',
    password: 'student123',
    name: 'John Doe',
    studentId: 'STU001234',
    department: 'Computer Science',
    year: 3,
    role: 'user',
    profileImage: null,
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 'user2',
    email: 'admin@university.edu',
    password: 'admin123',
    name: 'Sarah Admin',
    studentId: 'ADM000001',
    department: 'Administration',
    year: 4,
    role: 'admin',
    profileImage: null,
    createdAt: new Date('2024-01-01').toISOString()
  },
  {
    id: 'user3',
    email: 'jane@university.edu',
    password: 'jane123',
    name: 'Jane Smith',
    studentId: 'STU001235',
    department: 'Business',
    year: 2,
    role: 'user',
    profileImage: null,
    createdAt: new Date('2024-02-01').toISOString()
  }
];

export const sampleItems = [
  {
    id: 'item1',
    title: 'Black Wallet',
    type: 'found',
    category: 'Wallet',
    description: 'Black leather wallet found near the A-block entrance. Contains student ID.',
    location: 'A-block',
    date: '2026-08-29',
    time: '14:30',
    color: 'Black',
    brand: 'Coach',
    imageUrl: ITEM_IMAGE_URLS.item1,
    image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23333%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23fff%22 text-anchor=%22middle%22 dy=%22.3em%22%3EBlack Wallet%3C/text%3E%3C/svg%3E',
    tags: ['leather', 'wallet', 'id-card'],
    identifyingFeatures: 'Torn corner on bottom right',
    reportedBy: 'user3',
    status: 'available',
    createdAt: new Date('2026-08-29T14:30:00').toISOString(),
    updatedAt: new Date('2026-08-29T14:30:00').toISOString()
  },
  {
    id: 'item2',
    title: 'Apple AirPods',
    type: 'lost',
    category: 'Electronics',
    description: 'Lost white Apple AirPods Pro with charging case. Had them near PU-circle.',
    location: 'PU-circle',
    date: '2026-08-28',
    time: '11:00',
    color: 'White',
    brand: 'Apple',
    imageUrl: ITEM_IMAGE_URLS.item2,
    image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23000%22 text-anchor=%22middle%22 dy=%22.3em%22%3EAirPods Pro%3C/text%3E%3C/svg%3E',
    tags: ['airpods', 'electronics', 'wireless'],
    identifyingFeatures: 'Serial number starts with 2G',
    reportedBy: 'user1',
    status: 'available',
    createdAt: new Date('2026-08-28T11:00:00').toISOString(),
    updatedAt: new Date('2026-08-28T11:00:00').toISOString()
  },
  {
    id: 'item3',
    title: 'Blue Backpack',
    type: 'found',
    category: 'Bags',
    description: 'Blue backpack with multiple pockets found at New Foodcourt. No identification inside.',
    location: 'New Foodcourt',
    date: '2026-08-30',
    time: '13:45',
    color: 'Blue',
    brand: 'North Face',
    imageUrl: ITEM_IMAGE_URLS.item3,
    image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%231e40af%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23fff%22 text-anchor=%22middle%22 dy=%22.3em%22%3EBlue Backpack%3C/text%3E%3C/svg%3E',
    tags: ['backpack', 'bag', 'blue'],
    identifyingFeatures: 'Small tear on left side',
    reportedBy: 'user2',
    status: 'available',
    createdAt: new Date('2026-08-30T13:45:00').toISOString(),
    updatedAt: new Date('2026-08-30T13:45:00').toISOString()
  },
  {
    id: 'item4',
    title: 'College ID Card',
    type: 'found',
    category: 'Documents',
    description: 'College ID card found at Greenzy. Name and student ID visible on card.',
    location: 'Greenzy',
    date: '2026-08-27',
    time: '16:20',
    color: 'White',
    brand: 'University Issued',
    imageUrl: ITEM_IMAGE_URLS.item4,
    image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23fff%22 width=%22200%22 height=%22200%22 stroke=%22%23000%22 stroke-width=%222%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2214%22 fill=%22%23000%22 text-anchor=%22middle%22 dy=%22.3em%22%3ECollege ID%3C/text%3E%3C/svg%3E',
    tags: ['id', 'document', 'card'],
    identifyingFeatures: 'Photo ID visible',
    reportedBy: 'user1',
    status: 'available',
    createdAt: new Date('2026-08-27T16:20:00').toISOString(),
    updatedAt: new Date('2026-08-27T16:20:00').toISOString()
  },
  {
    id: 'item5',
    title: 'USB Drive',
    type: 'lost',
    category: 'Electronics',
    description: 'Lost red USB drive with important project files. Last seen at D-block.',
    location: 'D-block',
    date: '2026-08-26',
    time: '09:00',
    color: 'Red',
    brand: 'SanDisk',
    imageUrl: ITEM_IMAGE_URLS.item5,
    image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23dc2626%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23fff%22 text-anchor=%22middle%22 dy=%22.3em%22%3EUSB Drive%3C/text%3E%3C/svg%3E',
    tags: ['usb', 'drive', 'storage', 'red'],
    identifyingFeatures: '64GB capacity, metal casing',
    reportedBy: 'user3',
    status: 'available',
    createdAt: new Date('2026-08-26T09:00:00').toISOString(),
    updatedAt: new Date('2026-08-26T09:00:00').toISOString()
  },
  {
    id: 'item6',
    title: 'Scientific Calculator',
    type: 'found',
    category: 'Accessories',
    description: 'Black scientific calculator found at Capitol Crust. Works perfectly.',
    location: 'Capitol Crust',
    date: '2026-08-25',
    time: '15:00',
    color: 'Black',
    brand: 'Casio',
    imageUrl: ITEM_IMAGE_URLS.item6,
    image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23222%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23fff%22 text-anchor=%22middle%22 dy=%22.3em%22%3ECalculator%3C/text%3E%3C/svg%3E',
    tags: ['calculator', 'science', 'tool'],
    identifyingFeatures: 'Solar panel on top',
    reportedBy: 'user2',
    status: 'available',
    createdAt: new Date('2026-08-25T15:00:00').toISOString(),
    updatedAt: new Date('2026-08-25T15:00:00').toISOString()
  }
];

const USERS_KEY = 'lostFoundUsers';

const getStoredUsers = () => {
  const data = localStorage.getItem(USERS_KEY);
  if (data) {
    return JSON.parse(data);
  }

  const legacyData = localStorage.getItem('users');
  if (legacyData) {
    const parsed = JSON.parse(legacyData);
    localStorage.setItem(USERS_KEY, JSON.stringify(parsed));
    return parsed;
  }

  return [];
};

const saveStoredUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem('users', JSON.stringify(users));
};

export const initializeData = () => {
  const keys = ['items', 'claims', 'notifications', 'reports'];
  const dataExists = keys.every(key => localStorage.getItem(key) !== null);
  const userDataExists = localStorage.getItem(USERS_KEY) || localStorage.getItem('users');

  if (dataExists && userDataExists) {
    if (!localStorage.getItem(USERS_KEY) && localStorage.getItem('users')) {
      localStorage.setItem(USERS_KEY, localStorage.getItem('users'));
    }
    return;
  }

  saveStoredUsers(sampleUsers);
  localStorage.setItem('items', JSON.stringify(sampleItems));
  localStorage.setItem('claims', JSON.stringify([]));
  localStorage.setItem('notifications', JSON.stringify([]));
  localStorage.setItem('reports', JSON.stringify([]));
  localStorage.setItem('currentUser', JSON.stringify(null));
};

export const getUsers = () => {
  return getStoredUsers();
};

export const getItems = () => {
  const data = localStorage.getItem('items');
  return data
    ? JSON.parse(data).map(item => ({
        ...item,
        imageUrl: item.imageUrl || ITEM_IMAGE_URLS[item.id]
      }))
    : [];
};

export const getClaims = () => {
  const data = localStorage.getItem('claims');
  return data ? JSON.parse(data) : [];
};

export const getNotifications = () => {
  const data = localStorage.getItem('notifications');
  return data ? JSON.parse(data) : [];
};

export const getReports = () => {
  const data = localStorage.getItem('reports');
  return data ? JSON.parse(data) : [];
};

export const getCurrentUser = () => {
  const data = localStorage.getItem('currentUser');
  return data ? JSON.parse(data) : null;
};

export const saveUser = (user) => {
  const users = getUsers();
  const normalizedUser = {
    ...user,
    name: user.name || user.fullName || '',
    fullName: user.fullName || user.name || ''
  };

  const existingIndex = users.findIndex(u => u.id === normalizedUser.id);

  if (existingIndex >= 0) {
    users[existingIndex] = normalizedUser;
  } else {
    users.push(normalizedUser);
  }

  saveStoredUsers(users);

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === normalizedUser.id) {
    localStorage.setItem('currentUser', JSON.stringify(normalizedUser));
  }

  return normalizedUser;
};

export const saveItem = (item) => {
  const items = getItems();
  const existingIndex = items.findIndex(i => i.id === item.id);
  
  if (existingIndex >= 0) {
    items[existingIndex] = item;
  } else {
    items.push(item);
  }
  
  localStorage.setItem('items', JSON.stringify(items));
};

export const saveClaim = (claim) => {
  const claims = getClaims();
  const existingIndex = claims.findIndex(c => c.id === claim.id);
  
  if (existingIndex >= 0) {
    claims[existingIndex] = claim;
  } else {
    claims.push(claim);
  }
  
  localStorage.setItem('claims', JSON.stringify(claims));
};

export const addNotification = (notification) => {
  const notifications = getNotifications();
  notifications.push({
    id: 'notif_' + Date.now(),
    read: false,
    createdAt: new Date().toISOString(),
    ...notification
  });
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const saveReport = (report) => {
  const reports = getReports();
  reports.push({
    id: 'report_' + Date.now(),
    createdAt: new Date().toISOString(),
    ...report
  });
  localStorage.setItem('reports', JSON.stringify(reports));
};
