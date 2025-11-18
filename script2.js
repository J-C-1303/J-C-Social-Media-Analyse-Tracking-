// Dropdown-Menüs für Navigation und Sprache
document.addEventListener('DOMContentLoaded', function() {
  // Navigation Dropdowns
  document.querySelectorAll('.nav-item.has-dropdown > a').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      var parent = trigger.parentElement;
      var open = parent.classList.contains('open');
      document.querySelectorAll('.nav-item.has-dropdown.open').forEach(function(item) {
        item.classList.remove('open');
      });
      if (!open) parent.classList.add('open');
    });
    // Optional: Schließen bei Klick außerhalb
    document.addEventListener('click', function(e) {
      if (!trigger.parentElement.contains(e.target)) {
        trigger.parentElement.classList.remove('open');
      }
    });
  });

  // Sprachwahl Dropdown
  var langBtn = document.querySelector('.language-select .btn');
  var langSelect = document.querySelector('.language-select');
  if (langBtn && langSelect) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      langSelect.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!langSelect.contains(e.target)) {
        langSelect.classList.remove('open');
      }
    });
  }
});
// script.js — J&C Social Analysé Logic
// Mock data for ticket system
const tickets = [
  { 
    id: 1, 
    subject: 'API-Zugriffsproblem bei TikTok-Integration', 
    customer: 'TechStart GmbH',
    status: 'open', 
    priority: 'high', 
    category: 'technical', 
    createdAt: '2025-11-15T14:30:00',
    updatedAt: '2025-11-17T09:15:00',
    messages: [
      { 
        id: 1, 
        author: 'Julia Schmidt', 
        role: 'customer', 
        content: 'Seit gestern erhalte ich Fehlermeldungen beim Abrufen der TikTok-Daten. Die API gibt einen 403-Fehler zurück.', 
        timestamp: '2025-11-15T14:30:00'
      },
      { 
        id: 2, 
        author: 'Max Mustermann', 
        role: 'agent', 
        content: 'Hallo Julia, danke für Ihre Meldung. Wir untersuchen das Problem und melden uns sobald wir mehr wissen.', 
        timestamp: '2025-11-15T15:45:00'
      },
      { 
        id: 3, 
        author: 'Julia Schmidt', 
        role: 'customer', 
        content: 'Danke für die schnelle Antwort. Das Problem tritt bei allen unseren TikTok-Accounts auf.', 
        timestamp: '2025-11-15T16:20:00'
      }
    ]
  },
  { 
    id: 2, 
    subject: 'Frage zur Sentiment-Analyse Genauigkeit', 
    customer: 'StyleBrand AG',
    status: 'pending', 
    priority: 'medium', 
    category: 'question', 
    createdAt: '2025-11-16T10:20:00',
    updatedAt: '2025-11-16T14:30:00',
    messages: [
      { 
        id: 1, 
        author: 'Markus Weber', 
        role: 'customer', 
        content: 'Wir haben bemerkt, dass die Sentiment-Analyse bei ironischen Kommentaren oft falsch liegt. Gibt es Möglichkeiten, dies zu verbessern?', 
        timestamp: '2025-11-16T10:20:00'
      }
    ]
  },
  { 
    id: 3, 
    subject: 'Neue Instagram API-Anforderungen', 
    customer: 'Influencer Collective',
    status: 'resolved', 
    priority: 'high', 
    category: 'technical', 
    createdAt: '2025-11-10T09:15:00',
    updatedAt: '2025-11-14T16:45:00',
    messages: [
      { 
        id: 1, 
        author: 'Sarah Müller', 
        role: 'customer', 
        content: 'Instagram hat neue API-Anforderungen veröffentlicht. Wann wird SocialInsight diese unterstützen?', 
        timestamp: '2025-11-10T09:15:00'
      },
      { 
        id: 2, 
        author: 'Support Team', 
        role: 'agent', 
        content: 'Hallo Sarah, danke für den Hinweis. Wir arbeiten bereits an der Integration der neuen Instagram API. Die Aktualisierung ist für nächste Woche geplant.', 
        timestamp: '2025-11-10T11:30:00'
      },
      { 
        id: 3, 
        author: 'Sarah Müller', 
        role: 'customer', 
        content: 'Das klingt großartig! Danke für die schnelle Rückmeldung.', 
        timestamp: '2025-11-10T12:05:00'
      },
      { 
        id: 4, 
        author: 'Support Team', 
        role: 'agent', 
        content: 'Die neue Instagram API-Integration ist jetzt live! Bitte aktualisieren Sie Ihre Verbindungen in den Einstellungen.', 
        timestamp: '2025-11-14T16:45:00'
      }
    ]
  },
  { 
    id: 4, 
    subject: 'Rechnungskorrektur für November', 
    customer: 'MediaHub GmbH',
    status: 'closed', 
    priority: 'low', 
    category: 'billing', 
    createdAt: '2025-11-12T11:45:00',
    updatedAt: '2025-11-13T15:20:00',
    messages: []
  },
  { 
    id: 5, 
    subject: 'Feature-Anfrage: TikTok Analytics Export', 
    customer: 'Digital Solutions UG',
    status: 'open', 
    priority: 'medium', 
    category: 'feature', 
    createdAt: '2025-11-17T08:30:00',
    updatedAt: '2025-11-17T08:30:00',
    messages: []
  }
];

// DOM Elements
const ticketListView = document.getElementById('ticketListView');
const ticketDetailView = document.getElementById('ticketDetailView');
const ticketsTableBody = document.getElementById('ticketsTableBody');
const ticketSidebarList = document.getElementById('ticketSidebarList');
const ticketIdElement = document.getElementById('ticketId');
const ticketStatusElement = document.getElementById('ticketStatus');
const ticketSubjectElement = document.getElementById('ticketSubject');
const ticketCustomerElement = document.getElementById('ticketCustomer');
const messagesContainer = document.getElementById('messagesContainer');
const replyTextarea = document.getElementById('replyTextarea');
const newTicketBtn = document.getElementById('newTicketBtn');
const backToListBtn = document.getElementById('backToListBtn');
const cancelReplyBtn = document.getElementById('cancelReplyBtn');
const sendReplyBtn = document.getElementById('sendReplyBtn');
const newTicketModal = document.getElementById('newTicketModal');
const cancelTicketBtn = document.getElementById('cancelTicketBtn');
const createTicketBtn = document.getElementById('createTicketBtn');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const priorityFilter = document.getElementById('priorityFilter');
const categoryFilter = document.getElementById('categoryFilter');
const navItems = document.querySelectorAll('.nav-item');
const openCountElement = document.getElementById('openCount');

// Status, priority and category mappings
const statusMap = {
  'open': 'Offen',
  'pending': 'In Bearbeitung',
  'resolved': 'Gelöst',
  'closed': 'Geschlossen'
};
const priorityMap = {
  'low': 'Niedrig',
  'medium': 'Mittel',
  'high': 'Hoch'
};
const categoryMap = {
  'technical': 'Technisches Problem',
  'billing': 'Abrechnung',
  'question': 'Frage',
  'feature': 'Feature-Anfrage',
  'other': 'Sonstiges'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadTickets();
  updateOpenCount();
  
  // Event listeners
  newTicketBtn.addEventListener('click', showNewTicketModal);
  backToListBtn.addEventListener('click', showTicketList);
  cancelReplyBtn.addEventListener('click', showTicketList);
  sendReplyBtn.addEventListener('click', sendReply);
  cancelTicketBtn.addEventListener('click', hideNewTicketModal);
  createTicketBtn.addEventListener('click', createTicket);
  searchInput.addEventListener('input', filterTickets);
  statusFilter.addEventListener('change', filterTickets);
  priorityFilter.addEventListener('change', filterTickets);
  categoryFilter.addEventListener('change', filterTickets);
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      navItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      filterTickets();
    });
  });
});

// Load tickets into table
function loadTickets() {
  ticketsTableBody.innerHTML = '';
  ticketSidebarList.innerHTML = '';
  tickets.forEach(ticket => {
    // Table row
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="font-medium text-gray-900">#${ticket.id}</div>
        <div class="text-gray-500">${ticket.subject}</div>
      </td>
      <td>
        <div class="text-gray-900">${ticket.customer}</div>
        <div class="text-gray-500">${ticket.messages.length} Nachrichten</div>
      </td>
      <td>
        <span class="status-badge status-${ticket.status}">${statusMap[ticket.status]}</span>
      </td>
      <td>
        <span class="priority-badge priority-${ticket.priority}">${priorityMap[ticket.priority]}</span>
      </td>
      <td>
        <span class="category-badge category-${ticket.category}">${categoryMap[ticket.category]}</span>
      </td>
      <td class="text-gray-500">
        ${new Date(ticket.updatedAt).toLocaleDateString('de-DE', { 
          day: '2-digit', 
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </td>
    `;
    row.addEventListener('click', () => showTicketDetail(ticket));
    ticketsTableBody.appendChild(row);
    // Sidebar item
    const sidebarItem = document.createElement('div');
    sidebarItem.className = 'ticket-item';
    sidebarItem.innerHTML = `
      <div class="ticket-item-number">#${ticket.id}</div>
      <div class="ticket-item-subject">${ticket.subject}</div>
      <div class="ticket-item-customer">${ticket.customer}</div>
    `;
    sidebarItem.addEventListener('click', () => showTicketDetail(ticket));
    ticketSidebarList.appendChild(sidebarItem);
  });
}

// Show ticket detail view
function showTicketDetail(ticket) {
  // Update ticket header
  ticketIdElement.textContent = `#${ticket.id}`;
  ticketStatusElement.textContent = statusMap[ticket.status];
  ticketStatusElement.className = `status-badge status-${ticket.status}`;
  ticketSubjectElement.textContent = ticket.subject;
  ticketCustomerElement.textContent = ticket.customer;
  // Update messages
  messagesContainer.innerHTML = '';
  ticket.messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.role}`;
    let authorClass = message.role === 'agent' ? 'text-white' : 'text-gray-900';
    let timeClass = message.role === 'agent' ? 'text-indigo-200' : 'text-gray-500';
    let agentTag = message.role === 'agent' ? '<span class="message-agent-tag">Support</span>' : '';
    messageElement.innerHTML = `
      <div class="message-bubble">
        <div class="message-header">
          <div class="message-author ${authorClass}">${message.author}</div>
          <div class="d-flex align-items-center">
            <div class="message-time ${timeClass}">
              ${new Date(message.timestamp).toLocaleDateString('de-DE', { 
                day: '2-digit', 
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            ${agentTag}
          </div>
        </div>
        <div class="message-content">${message.content}</div>
      </div>
    `;
    messagesContainer.appendChild(messageElement);
  });
  // Switch views
  ticketListView.style.display = 'none';
  ticketDetailView.style.display = 'flex';
  // Scroll to bottom of messages
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 100);
}

// Show ticket list view
function showTicketList() {
  ticketDetailView.style.display = 'none';
  ticketListView.style.display = 'block';
}

// Filter tickets
function filterTickets() {
  const searchTerm = searchInput.value.toLowerCase();
  const status = statusFilter.value;
  const priority = priorityFilter.value;
  const category = categoryFilter.value;
  const activeTab = document.querySelector('.nav-item.active').getAttribute('data-tab');
  // Filter tickets array
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm) || 
                        ticket.customer.toLowerCase().includes(searchTerm);
    const matchesStatus = status === 'all' || ticket.status === status;
    const matchesPriority = priority === 'all' || ticket.priority === priority;
    const matchesCategory = category === 'all' || ticket.category === category;
    const matchesTab = activeTab === 'inbox' ? ticket.status === 'open' :
                     activeTab === 'open' ? ticket.status === 'open' :
                     activeTab === 'pending' ? ticket.status === 'pending' :
                     activeTab === 'resolved' ? (ticket.status === 'resolved' || ticket.status === 'closed') :
                     true;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesTab;
  });
  // Update table
  ticketsTableBody.innerHTML = '';
  filteredTickets.forEach(ticket => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="font-medium text-gray-900">#${ticket.id}</div>
        <div class="text-gray-500">${ticket.subject}</div>
      </td>
      <td>
        <div class="text-gray-900">${ticket.customer}</div>
        <div class="text-gray-500">${ticket.messages.length} Nachrichten</div>
      </td>
      <td>
        <span class="status-badge status-${ticket.status}">${statusMap[ticket.status]}</span>
      </td>
      <td>
        <span class="priority-badge priority-${ticket.priority}">${priorityMap[ticket.priority]}</span>
      </td>
      <td>
        <span class="category-badge category-${ticket.category}">${categoryMap[ticket.category]}</span>
      </td>
      <td class="text-gray-500">
        ${new Date(ticket.updatedAt).toLocaleDateString('de-DE', { 
          day: '2-digit', 
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </td>
    `;
    row.addEventListener('click', () => showTicketDetail(ticket));
    ticketsTableBody.appendChild(row);
  });
  updateOpenCount();
}

// Update open tickets count
function updateOpenCount() {
  const openCount = tickets.filter(ticket => ticket.status === 'open').length;
  openCountElement.textContent = openCount;
}

// Show new ticket modal
function showNewTicketModal() {
  newTicketModal.classList.add('active');
}

// Hide new ticket modal
function hideNewTicketModal() {
  newTicketModal.classList.remove('active');
}

// Create new ticket
function createTicket() {
  const subject = document.getElementById('ticketSubjectInput').value;
  const customer = document.getElementById('ticketCustomerInput').value || 'Neuer Kunde';
  const category = document.getElementById('ticketCategoryInput').value;
  const priority = document.getElementById('ticketPriorityInput').value;
  const message = document.getElementById('ticketMessageInput').value;
  if (subject && message) {
    const newTicket = {
      id: tickets.length + 1,
      subject: subject,
      customer: customer,
      status: 'open',
      priority: priority,
      category: category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [{
        id: 1,
        author: customer,
        role: 'customer',
        content: message,
        timestamp: new Date().toISOString()
      }]
    };
    tickets.unshift(newTicket);
    loadTickets();
    hideNewTicketModal();
    // Reset form
    document.getElementById('ticketSubjectInput').value = '';
    document.getElementById('ticketCustomerInput').value = '';
    document.getElementById('ticketMessageInput').value = '';
  }
}

// Send reply
function sendReply() {
  const message = replyTextarea.value.trim();
  if (message) {
    alert('Nachricht wurde gesendet!');
    replyTextarea.value = '';
  }
}

// Login Form Functionality
const loginForm = document.getElementById('auth-form');
if (loginForm) {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordIcon = document.getElementById('password-icon');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const registerLink = document.getElementById('register-link');
  const registerModal = document.getElementById('register-modal');
  const closeRegister = document.getElementById('close-register');
  const cancelRegister = document.getElementById('cancel-register');
  const registerForm = document.getElementById('register-form');
  const confirmEmailInput = document.getElementById('reg-email');
  const confirmPasswordInput = document.getElementById('reg-confirm-password');
  const confirmPasswordError = document.getElementById('confirm-password-error');
  
  let showPassword = false;
  let showConfirmPassword = false;

  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', () => {
    showPassword = !showPassword;
    passwordInput.type = showPassword ? 'text' : 'password';
    passwordIcon.className = showPassword 
      ? 'fas fa-eye-slash text-gray-400 h-5 w-5' 
      : 'fas fa-eye text-gray-400 h-5 w-5';
  });

  // Validate email
  function validateEmail(email) {
    if (!email) return 'E-Mail ist erforderlich';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Ungültige E-Mail-Adresse';
    return '';
  }

  // Validate password
  function validatePassword(password) {
    if (!password) return 'Passwort ist erforderlich';
    if (password.length < 6) return 'Passwort muss mindestens 6 Zeichen lang sein';
    return '';
  }

  // Validate confirm password
  function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) return 'Passwortbestätigung ist erforderlich';
    if (password !== confirmPassword) return 'Passwörter stimmen nicht überein';
    return '';
  }

  // Form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Validate
    let hasErrors = false;
    
    // Email validation
    const emailErr = validateEmail(email);
    if (emailErr) {
      emailError.textContent = emailErr;
      emailError.classList.remove('hidden');
      hasErrors = true;
    } else {
      emailError.classList.add('hidden');
    }
    
    // Password validation
    const passwordErr = validatePassword(password);
    if (passwordErr) {
      passwordError.textContent = passwordErr;
      passwordError.classList.remove('hidden');
      hasErrors = true;
    } else {
      passwordError.classList.add('hidden');
    }
    
    // If no errors, show success message
    if (!hasErrors) {
      alert('Login erfolgreich!');
      emailInput.value = '';
      passwordInput.value = '';
      emailError.classList.add('hidden');
      passwordError.classList.add('hidden');
    }
  });

  // Clear errors on input
  emailInput.addEventListener('input', () => {
    if (!emailError.classList.contains('hidden')) {
      emailError.classList.add('hidden');
    }
  });

  passwordInput.addEventListener('input', () => {
    if (!passwordError.classList.contains('hidden')) {
      passwordError.classList.add('hidden');
    }
  });

  // Register link click
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.add('active');
  });

  // Close register modal
  closeRegister.addEventListener('click', () => {
    registerModal.classList.remove('active');
  });

  cancelRegister.addEventListener('click', () => {
    registerModal.classList.remove('active');
  });

  // Register form submission
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const company = document.getElementById('reg-company').value;
    const plan = document.getElementById('reg-plan').value;
    const terms = document.getElementById('reg-terms').checked;
    
    let hasErrors = false;
    
    // Validate fields
    if (!name) {
      alert('Bitte geben Sie Ihren Namen ein.');
      hasErrors = true;
    }
    if (!email) {
      alert('Bitte geben Sie Ihre E-Mail-Adresse ein.');
      hasErrors = true;
    }
    if (!password) {
      alert('Bitte geben Sie ein Passwort ein.');
      hasErrors = true;
    }
    if (password !== confirmPassword) {
      alert('Passwörter stimmen nicht überein.');
      hasErrors = true;
    }
    if (!company) {
      alert('Bitte geben Sie Ihren Unternehmensnamen ein.');
      hasErrors = true;
    }
    if (!terms) {
      alert('Bitte akzeptieren Sie die AGB.');
      hasErrors = true;
    }
    
    if (!hasErrors) {
      alert('Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mails.');
      registerModal.classList.remove('active');
      registerForm.reset();
    }
  });
}

// Register Modal Functionality
const registerModal = document.getElementById('register-modal');
if (registerModal) {
  const closeRegister = document.getElementById('close-register');
  const cancelRegister = document.getElementById('cancel-register');
  const registerForm = document.getElementById('register-form');
  const confirmPasswordInput = document.getElementById('reg-confirm-password');
  const confirmPasswordError = document.getElementById('confirm-password-error');
  const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');
  const confirmPasswordIcon = document.getElementById('confirm-password-icon');
  
  let showConfirmPassword = false;

  // Toggle confirm password visibility
  toggleConfirmPasswordBtn.addEventListener('click', () => {
    showConfirmPassword = !showConfirmPassword;
    confirmPasswordInput.type = showConfirmPassword ? 'text' : 'password';
    confirmPasswordIcon.className = showConfirmPassword 
      ? 'fas fa-eye-slash text-gray-400 h-5 w-5' 
      : 'fas fa-eye text-gray-400 h-5 w-5';
  });

  // Validate confirm password
  confirmPasswordInput.addEventListener('input', () => {
    const password = document.getElementById('reg-password').value;
    const confirmPassword = confirmPasswordInput.value;
    const error = validateConfirmPassword(password, confirmPassword);
    if (error) {
      confirmPasswordError.textContent = error;
      confirmPasswordError.classList.remove('hidden');
    } else {
      confirmPasswordError.classList.add('hidden');
    }
  });

  // Clear error on input
  document.getElementById('reg-password').addEventListener('input', () => {
    if (!confirmPasswordError.classList.contains('hidden')) {
      confirmPasswordError.classList.add('hidden');
    }
  });
}

// Function to validate confirm password
function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Passwortbestätigung ist erforderlich';
  if (password !== confirmPassword) return 'Passwörter stimmen nicht überein';
  return '';
}