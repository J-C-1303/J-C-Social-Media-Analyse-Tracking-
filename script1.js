// script.js — J&C Admin Dashboard Logic
// Mock data
const mockCustomers = [
  { id: 1, name: 'TechStart GmbH', email: 'kontakt@techstart.de', plan: 'Business', status: 'active', accounts: 5, lastActive: '2025-11-17', joinDate: '2024-03-15' },
  { id: 2, name: 'StyleBrand AG', email: 'info@stylebrand.de', plan: 'Enterprise', status: 'active', accounts: 12, lastActive: '2025-11-18', joinDate: '2023-11-22' },
  { id: 3, name: 'Influencer Collective', email: 'hello@influencer-collective.de', plan: 'Pro', status: 'active', accounts: 8, lastActive: '2025-11-16', joinDate: '2024-07-08' },
  { id: 4, name: 'MediaHub GmbH', email: 'support@mediahub.de', plan: 'Business', status: 'trial', accounts: 3, lastActive: '2025-11-10', joinDate: '2025-10-30' },
  { id: 5, name: 'Digital Solutions UG', email: 'info@digitalsolutions.de', plan: 'Starter', status: 'inactive', accounts: 1, lastActive: '2025-10-05', joinDate: '2024-12-01' }
];

const mockTrackedAccounts = [
  { id: 1, platform: 'Instagram', name: 'Tech Insights', customerId: 1, followers: 28700, engagement: 4.2, sentiment: 0.85, lastUpdated: '2025-11-18' },
  { id: 2, platform: 'TikTok', name: 'Quick Hacks', customerId: 1, followers: 104200, engagement: 8.7, sentiment: 0.92, lastUpdated: '2025-11-18' },
  { id: 3, platform: 'Facebook', name: 'Tech Insights', customerId: 1, followers: 12500, engagement: 3.1, sentiment: 0.78, lastUpdated: '2025-11-17' },
  { id: 4, platform: 'Instagram', name: 'Design Trends', customerId: 2, followers: 45300, engagement: 5.6, sentiment: 0.81, lastUpdated: '2025-11-18' },
  { id: 5, platform: 'TikTok', name: 'Style Hacks', customerId: 2, followers: 89700, engagement: 9.3, sentiment: 0.88, lastUpdated: '2025-11-18' },
  { id: 6, platform: 'Pinterest', name: 'Home Ideas', customerId: 2, followers: 32400, engagement: 2.8, sentiment: 0.75, lastUpdated: '2025-11-16' },
  { id: 7, platform: 'Instagram', name: 'Influencer Tips', customerId: 3, followers: 67800, engagement: 6.2, sentiment: 0.83, lastUpdated: '2025-11-17' },
  { id: 8, platform: 'TikTok', name: 'Content Creator Hub', customerId: 3, followers: 215600, engagement: 11.4, sentiment: 0.89, lastUpdated: '2025-11-18' }
];

const mockSubscriptions = [
  { id: 1, customerId: 1, plan: 'Business', price: 99, period: 'monthly', nextBilling: '2025-12-15', status: 'active' },
  { id: 2, customerId: 2, plan: 'Enterprise', price: 499, period: 'monthly', nextBilling: '2025-12-22', status: 'active' },
  { id: 3, customerId: 3, plan: 'Pro', price: 49, period: 'monthly', nextBilling: '2025-12-08', status: 'active' },
  { id: 4, customerId: 4, plan: 'Business', price: 99, period: 'monthly', nextBilling: '2025-11-30', status: 'trial' },
  { id: 5, customerId: 5, plan: 'Starter', price: 19, period: 'monthly', nextBilling: '2025-11-01', status: 'past_due' }
];

const mockAnalyticsData = {
  dailyActiveUsers: [
    { date: '2025-11-12', users: 1240 },
    { date: '2025-11-13', users: 1320 },
    { date: '2025-11-14', users: 1450 },
    { date: '2025-11-15', users: 1520 },
    { date: '2025-11-16', users: 1680 },
    { date: '2025-11-17', users: 1890 },
    { date: '2025-11-18', users: 2050 }
  ],
  platformDistribution: [
    { platform: 'Instagram', value: 35 },
    { platform: 'TikTok', value: 28 },
    { platform: 'Facebook', value: 20 },
    { platform: 'Pinterest', value: 12 },
    { platform: 'Tumblr', value: 5 }
  ],
  sentimentDistribution: [
    { sentiment: 'Positive', value: 68 },
    { sentiment: 'Neutral', value: 22 },
    { sentiment: 'Negative', value: 10 }
  ],
  revenueData: [
    { month: 'Jun', revenue: 12500 },
    { month: 'Jul', revenue: 15200 },
    { month: 'Aug', revenue: 18700 },
    { month: 'Sep', revenue: 22400 },
    { month: 'Oct', revenue: 28900 },
    { month: 'Nov', revenue: 32500 }
  ]
};

// State
let activeTab = 'dashboard';
let customers = [...mockCustomers];
let trackedAccounts = [...mockTrackedAccounts];
let subscriptions = [...mockSubscriptions];
let searchTerm = '';
let filterStatus = 'all';
let selectedCustomer = null;

// DOM Elements
const dashboardTab = document.getElementById('dashboardTab');
const customersTab = document.getElementById('customersTab');
const accountsTab = document.getElementById('accountsTab');
const subscriptionsTab = document.getElementById('subscriptionsTab');
const analyticsTab = document.getElementById('analyticsTab');
const settingsTab = document.getElementById('settingsTab');

const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = {
  dashboard: dashboardTab,
  customers: customersTab,
  accounts: accountsTab,
  subscriptions: subscriptionsTab,
  analytics: analyticsTab,
  settings: settingsTab
};

const totalCustomersElement = document.getElementById('totalCustomers');
const activeCustomersElement = document.getElementById('activeCustomers');
const totalAccountsElement = document.getElementById('totalAccounts');
const monthlyRevenueElement = document.getElementById('monthlyRevenue');

const customersTableBody = document.getElementById('customersTableBody');
const accountsTableBody = document.getElementById('accountsTableBody');
const subscriptionsTableBody = document.getElementById('subscriptionsTableBody');
const recentActivityList = document.getElementById('recentActivityList');
const customerFilterInfo = document.getElementById('customerFilterInfo');
const filteredCustomerName = document.getElementById('filteredCustomerName');

const addCustomerBtn = document.getElementById('addCustomerBtn');
const backToCustomersBtn = document.getElementById('backToCustomersBtn');
const addCustomerModal = document.getElementById('addCustomerModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelAddCustomer = document.getElementById('cancelAddCustomer');
const saveNewCustomer = document.getElementById('saveNewCustomer');
const newCustomerName = document.getElementById('newCustomerName');
const newCustomerEmail = document.getElementById('newCustomerEmail');
const newCustomerPlan = document.getElementById('newCustomerPlan');
const newCustomerStatus = document.getElementById('newCustomerStatus');

const customerStatusFilter = document.getElementById('customerStatusFilter');

// Helper: Platform Icons
function getPlatformIcon(platform) {
  const icons = {
    facebook: '<span class="platform-badge facebook">F</span>',
    instagram: '<span class="platform-badge instagram">I</span>',
    tiktok: '<span class="platform-badge tiktok">T</span>',
    pinterest: '<span class="platform-badge pinterest">P</span>',
    tumblr: '<span class="platform-badge tumblr">T</span>'
  };
  return icons[platform.toLowerCase()] || '<span class="platform-badge">?</span>';
}

// Update UI
function updateUI() {
  // Update tabs
  navTabs.forEach(btn => {
    if (btn.dataset.tab === activeTab) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Show active tab
  Object.keys(tabContents).forEach(key => {
    tabContents[key].classList.toggle('active', key === activeTab);
  });

  // Calculate metrics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalAccounts = trackedAccounts.length;
  const totalRevenue = subscriptions.reduce((sum, sub) => 
    sub.status === 'active' ? sum + sub.price : sum, 0
  );

  // Update stats
  totalCustomersElement.textContent = totalCustomers;
  activeCustomersElement.textContent = activeCustomers;
  totalAccountsElement.textContent = totalAccounts;
  monthlyRevenueElement.textContent = `€${totalRevenue}`;

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Render customers table
  customersTableBody.innerHTML = '';
  filteredCustomers.forEach(customer => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="text-sm font-medium text-white">${customer.name}</div>
        <div class="text-sm text-gray-400">Mitglied seit ${new Date(customer.joinDate).toLocaleDateString('de-DE')}</div>
      </td>
      <td>
        <div class="text-sm text-white">${customer.email}</div>
      </td>
      <td>
        <span class="badge badge-${customer.plan.toLowerCase()}">${customer.plan}</span>
      </td>
      <td class="text-sm text-gray-400">
        ${customer.accounts}
      </td>
      <td>
        <span class="status-badge status-${customer.status}">${customer.status === 'active' ? 'Aktiv' : customer.status === 'trial' ? 'Testphase' : 'Inaktiv'}</span>
      </td>
      <td class="text-sm text-gray-400">
        ${new Date(customer.lastActive).toLocaleDateString('de-DE')}
      </td>
      <td class="text-sm font-medium">
        <button class="action-btn" onclick="selectCustomer(${customer.id})">
          <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn" onclick="editCustomer(${customer.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn" onclick="deleteCustomer(${customer.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    customersTableBody.appendChild(row);
  });

  // Render recent activity
  recentActivityList.innerHTML = '';
  customers.slice(0, 5).forEach(customer => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="flex items-center">
        <div class="avatar"></div>
        <div class="ml-4">
          <p class="text-sm font-medium text-white">${customer.name}</p>
          <p class="text-sm text-gray-400">
            ${customer.status === 'active' ? 'Aktiv' : customer.status === 'trial' ? 'Testphase' : 'Inaktiv'} • 
            ${customer.accounts} Accounts
          </p>
        </div>
        <div class="ml-auto text-sm text-gray-400">
          ${new Date(customer.lastActive).toLocaleDateString('de-DE')}
        </div>
      </div>
    `;
    recentActivityList.appendChild(item);
  });

  // Render accounts table (if filtered by customer)
  if (selectedCustomer) {
    const filteredAccounts = trackedAccounts.filter(account => account.customerId === selectedCustomer.id);
    accountsTableBody.innerHTML = '';
    filteredAccounts.forEach(account => {
      const customer = customers.find(c => c.id === account.customerId);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="flex items-center">
            ${getPlatformIcon(account.platform)}
            <span class="ml-2 text-sm font-medium text-white">${account.platform}</span>
          </div>
        </td>
        <td>
          <div class="text-sm font-medium text-white">${account.name}</div>
        </td>
        <td>
          <div class="text-sm text-white">${customer?.name}</div>
        </td>
        <td class="text-sm text-gray-400">
          ${account.followers.toLocaleString()}
        </td>
        <td class="text-sm text-gray-400">
          ${account.engagement}%
        </td>
        <td>
          <div class="flex items-center">
            <div class="w-16 bg-gray-700 rounded-full h-2 mr-2">
              <div class="h-2 rounded-full bg-green-500" style="width: ${account.sentiment * 100}%;"></div>
            </div>
            <span class="text-sm text-gray-400">${Math.round(account.sentiment * 100)}%</span>
          </div>
        </td>
        <td class="text-sm text-gray-400">
          ${new Date(account.lastUpdated).toLocaleDateString('de-DE')}
        </td>
      `;
      accountsTableBody.appendChild(row);
    });
    customerFilterInfo.classList.remove('hidden');
    filteredCustomerName.textContent = selectedCustomer.name;
  } else {
    accountsTableBody.innerHTML = '';
    customerFilterInfo.classList.add('hidden');
  }

  // Render subscriptions table
  subscriptionsTableBody.innerHTML = '';
  subscriptions.forEach(subscription => {
    const customer = customers.find(c => c.id === subscription.customerId);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="text-sm font-medium text-white">${customer?.name}</div>
        <div class="text-sm text-gray-400">${customer?.email}</div>
      </td>
      <td>
        <span class="badge badge-${subscription.plan.toLowerCase()}">${subscription.plan}</span>
      </td>
      <td class="text-sm text-gray-400">
        €${subscription.price}
      </td>
      <td class="text-sm text-gray-400">
        ${subscription.period}
      </td>
      <td class="text-sm text-gray-400">
        ${new Date(subscription.nextBilling).toLocaleDateString('de-DE')}
      </td>
      <td>
        <span class="status-badge status-${subscription.status}">${subscription.status === 'active' ? 'Aktiv' : subscription.status === 'trial' ? 'Testphase' : 'Zahlung ausstehend'}</span>
      </td>
      <td class="text-sm font-medium">
        <button class="action-btn" onclick="editSubscription(${subscription.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn" onclick="deleteSubscription(${subscription.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    subscriptionsTableBody.appendChild(row);
  });

  // Render charts
  renderDailyActiveUsersChart();
  renderPlatformDistributionChart();
  renderRevenueChart();
  renderSentimentChart();
}

// Render Charts
function renderDailyActiveUsersChart() {
  const container = document.getElementById('dailyActiveUsersChart');
  container.innerHTML = '';
  mockAnalyticsData.dailyActiveUsers.forEach(day => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${(day.users / 2100) * 100}%`;
    bar.innerHTML = `<div class="label">${Math.round(day.users / 1000)}K</div>`;
    container.appendChild(bar);
  });
}

function renderPlatformDistributionChart() {
  const container = document.getElementById('platformDistributionChart');
  container.innerHTML = '';
  mockAnalyticsData.platformDistribution.forEach(platform => {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.innerHTML = `
      <label>${platform.platform}</label>
      <div class="progress">
        <div class="progress-fill" style="width: ${platform.value}%"></div>
      </div>
      <span class="value">${platform.value}%</span>
    `;
    container.appendChild(bar);
  });
}

function renderRevenueChart() {
  const container = document.getElementById('revenueChart');
  container.innerHTML = '';
  mockAnalyticsData.revenueData.forEach(month => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${(month.revenue / 35000) * 100}%`;
    bar.innerHTML = `<div class="label">€${Math.round(month.revenue / 1000)}K</div>`;
    container.appendChild(bar);
  });
}

function renderSentimentChart() {
  const container = document.getElementById('sentimentChart');
  container.innerHTML = '';
  mockAnalyticsData.sentimentDistribution.forEach(sentiment => {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.innerHTML = `
      <label>${sentiment.sentiment}</label>
      <div class="progress">
        <div class="progress-fill" style="width: ${sentiment.value}%"></div>
      </div>
      <span class="value">${sentiment.value}%</span>
    `;
    container.appendChild(bar);
  });
}

// Event Listeners
navTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    activeTab = btn.dataset.tab;
    updateUI();
  });
});

customerStatusFilter.addEventListener('change', () => {
  filterStatus = customerStatusFilter.value;
  updateUI();
});

addCustomerBtn.addEventListener('click', () => {
  addCustomerModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  addCustomerModal.classList.add('hidden');
});

cancelAddCustomer.addEventListener('click', () => {
  addCustomerModal.classList.add('hidden');
});

saveNewCustomer.addEventListener('click', () => {
  const name = newCustomerName.value.trim();
  const email = newCustomerEmail.value.trim();
  const plan = newCustomerPlan.value;
  const status = newCustomerStatus.value;
  
  if (name && email) {
    const newCustomer = {
      id: customers.length + 1,
      name: name,
      email: email,
      plan: plan,
      status: status,
      accounts: 0,
      lastActive: new Date().toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0]
    };
    customers.push(newCustomer);
    addCustomerModal.classList.add('hidden');
    newCustomerName.value = '';
    newCustomerEmail.value = '';
    newCustomerPlan.value = 'Starter';
    newCustomerStatus.value = 'active';
    updateUI();
  }
});

backToCustomersBtn.addEventListener('click', () => {
  selectedCustomer = null;
  updateUI();
});

// Customer actions
function selectCustomer(id) {
  selectedCustomer = customers.find(c => c.id === id);
  updateUI();
}

function editCustomer(id) {
  alert(`Bearbeiten von Kunde ${id}`);
}

function deleteCustomer(id) {
  if (confirm(`Wollen Sie Kunde ${id} wirklich löschen?`)) {
    customers = customers.filter(c => c.id !== id);
    if (selectedCustomer && selectedCustomer.id === id) {
      selectedCustomer = null;
    }
    updateUI();
  }
}

function editSubscription(id) {
  alert(`Bearbeiten von Abonnement ${id}`);
}

function deleteSubscription(id) {
  if (confirm(`Wollen Sie Abonnement ${id} wirklich löschen?`)) {
    subscriptions = subscriptions.filter(s => s.id !== id);
    updateUI();
  }
}

// Initialize
updateUI();