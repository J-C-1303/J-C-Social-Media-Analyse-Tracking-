<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>J-C-Social Media Analyse & Tracking Tool</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style1.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="logo">
                <i class="fas fa-chart-line"></i>
                <span>J&C Admin Dashboard</span>
            </div>
            <div class="header-actions">
                <i class="fas fa-search search-icon"></i>
                <div class="user-avatar">A</div>
            </div>
        </div>
    </header>

    <!-- Sidebar Navigation -->
    <div class="container">
        <div class="sidebar-nav">
            <button data-tab="dashboard" class="nav-tab active">
                <i class="fas fa-tachometer-alt"></i> Dashboard
            </button>
            <button data-tab="customers" class="nav-tab">
                <i class="fas fa-users"></i> Kunden
            </button>
            <button data-tab="accounts" class="nav-tab">
                <i class="fas fa-network-wired"></i> Getrackte Accounts
            </button>
            <button data-tab="subscriptions" class="nav-tab">
                <i class="fas fa-euro-sign"></i> Abonnements
            </button>
            <button data-tab="analytics" class="nav-tab">
                <i class="fas fa-chart-pie"></i> Analysen
            </button>
            <button data-tab="settings" class="nav-tab">
                <i class="fas fa-cogs"></i> Einstellungen
            </button>
        </div>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Dashboard Tab -->
            <div id="dashboardTab" class="tab-content active">
                <h1 class="page-title">Admin Dashboard</h1>
                
                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-users"></i></div>
                        <div>
                            <div class="stat-label">Gesamtkunden</div>
                            <div class="stat-value" id="totalCustomers">5</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                        <div>
                            <div class="stat-label">Aktive Kunden</div>
                            <div class="stat-value" id="activeCustomers">3</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-network-wired"></i></div>
                        <div>
                            <div class="stat-label">Getrackte Accounts</div>
                            <div class="stat-value" id="totalAccounts">8</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-euro-sign"></i></div>
                        <div>
                            <div class="stat-label">Monatlicher Umsatz</div>
                            <div class="stat-value" id="monthlyRevenue">€665</div>
                        </div>
                    </div>
                </div>

                <!-- Charts -->
                <div class="charts-grid">
                    <div class="chart-card">
                        <h3>Tägliche aktive Nutzer</h3>
                        <div class="bar-chart" id="dailyActiveUsersChart"></div>
                    </div>
                    <div class="chart-card">
                        <h3>Plattformverteilung</h3>
                        <div class="progress-bars" id="platformDistributionChart"></div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="card">
                    <h3>Letzte Aktivitäten</h3>
                    <div id="recentActivityList"></div>
                </div>
            </div>

            <!-- Customers Tab -->
            <div id="customersTab" class="tab-content">
                <div class="tab-header">
                    <h2>Kundenverwaltung</h2>
                    <button id="addCustomerBtn" class="btn-primary">
                        <i class="fas fa-plus"></i> Neuer Kunde
                    </button>
                </div>

                <div class="filters">
                    <label>Status:</label>
                    <select id="customerStatusFilter">
                        <option value="all">Alle</option>
                        <option value="active">Aktiv</option>
                        <option value="trial">Testphase</option>
                        <option value="inactive">Inaktiv</option>
                    </select>
                </div>

                <div class="card">
                    <div class="table-container">
                        <table class="data-table" id="customersTable">
                            <thead>
                                <tr>
                                    <th>Kunde</th>
                                    <th>E-Mail</th>
                                    <th>Plan</th>
                                    <th>Accounts</th>
                                    <th>Status</th>
                                    <th>Letzte Aktivität</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                            <tbody id="customersTableBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Accounts Tab -->
            <div id="accountsTab" class="tab-content">
                <div class="tab-header">
                    <h2>Getrackte Accounts</h2>
                    <div class="tab-actions">
                        <button id="backToCustomersBtn" class="btn-secondary">
                            <i class="fas fa-arrow-left"></i> Alle Kunden
                        </button>
                        <button class="btn-primary">
                            <i class="fas fa-plus"></i> Neuer Account
                        </button>
                    </div>
                </div>
                <div id="customerFilterInfo" class="customer-filter-info hidden">
                    <span>Gefiltert nach Kunde: <strong id="filteredCustomerName"></strong></span>
                </div>
                <div class="card">
                    <div class="table-container">
                        <table class="data-table" id="accountsTable">
                            <thead>
                                <tr>
                                    <th>Plattform</th>
                                    <th>Account</th>
                                    <th>Kunde</th>
                                    <th>Follower</th>
                                    <th>Engagement</th>
                                    <th>Stimmung</th>
                                    <th>Letzte Aktualisierung</th>
                                </tr>
                            </thead>
                            <tbody id="accountsTableBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Subscriptions Tab -->
            <div id="subscriptionsTab" class="tab-content">
                <h2>Abonnementverwaltung</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Monatlicher Umsatz</div>
                        <div class="stat-value">€665</div>
                        <div class="stat-change positive">+12.5%</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Aktive Abos</div>
                        <div class="stat-value">3</div>
                        <div class="stat-note">2 in Testphase</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Ø pro Kunde</div>
                        <div class="stat-value">€222</div>
                    </div>
                </div>
                <div class="card">
                    <div class="table-container">
                        <table class="data-table" id="subscriptionsTable">
                            <thead>
                                <tr>
                                    <th>Kunde</th>
                                    <th>Plan</th>
                                    <th>Preis</th>
                                    <th>Zyklus</th>
                                    <th>Nächste Abrechnung</th>
                                    <th>Status</th>
                                    <th>Aktionen</th>
                                </tr>
                            </thead>
                            <tbody id="subscriptionsTableBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Analytics Tab -->
            <div id="analyticsTab" class="tab-content">
                <h2>Analyse & Berichte</h2>
                <div class="charts-grid">
                    <div class="chart-card">
                        <h3>Monatlicher Umsatz</h3>
                        <div class="bar-chart" id="revenueChart"></div>
                    </div>
                    <div class="chart-card">
                        <h3>Stimmungsverteilung</h3>
                        <div class="progress-bars" id="sentimentChart"></div>
                    </div>
                </div>
                <div class="stats-grid">
                    <div class="stat-card large">
                        <div class="stat-icon"><i class="fas fa-comments"></i></div>
                        <div>
                            <div class="stat-label">Analysierte Kommentare</div>
                            <div class="stat-value">245,892</div>
                        </div>
                    </div>
                    <div class="stat-card large">
                        <div class="stat-icon"><i class="fas fa-heart"></i></div>
                        <div>
                            <div class="stat-label">Gesamte Interaktionen</div>
                            <div class="stat-value">1,842,567</div>
                        </div>
                    </div>
                    <div class="stat-card large">
                        <div class="stat-icon"><i class="fas fa-thumbs-up"></i></div>
                        <div>
                            <div class="stat-label">Durchschn. Stimmung</div>
                            <div class="stat-value">84%</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Settings Tab -->
            <div id="settingsTab" class="tab-content">
                <h2>Systemeinstellungen</h2>
                <div class="settings-grid">
                    <div class="card">
                        <h3>Allgemeine Einstellungen</h3>
                        <div class="form-group">
                            <label>Systemname</label>
                            <input type="text" value="J&C Social Analysé">
                        </div>
                        <div class="form-group">
                            <label>Support-E-Mail</label>
                            <input type="email" value="support@jcsocialanalyse.de">
                        </div>
                        <div class="form-group">
                            <label>Zeitzone</label>
                            <select>
                                <option>Europe/Berlin</option>
                                <option>Europe/London</option>
                                <option>UTC</option>
                            </select>
                        </div>
                        <button class="btn-primary">Einstellungen speichern</button>
                    </div>
                    <div class="card">
                        <h3>API-Einstellungen</h3>
                        <div class="form-group">
                            <label>API-Schlüssel</label>
                            <div class="input-group">
                                <input type="text" value="sk_live_*********************" readonly>
                                <button class="copy-btn">Kopieren</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>API-Rate Limit</label>
                            <input type="number" value="100">
                            <small>Anfragen pro Minute</small>
                        </div>
                        <div class="form-group">
                            <label>API-Endpunkt</label>
                            <code>https://api.jcsocialanalyse.de/v1/</code>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Add Customer Modal -->
    <div id="addCustomerModal" class="modal hidden">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Neuen Kunden hinzufügen</h3>
                <button id="closeModalBtn" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Unternehmensname</label>
                    <input type="text" id="newCustomerName" placeholder="TechStart GmbH">
                </div>
                <div class="form-group">
                    <label>E-Mail-Adresse</label>
                    <input type="email" id="newCustomerEmail" placeholder="kontakt@beispiel.de">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Tarifplan</label>
                        <select id="newCustomerPlan">
                            <option value="Starter">Starter (€19/Monat)</option>
                            <option value="Pro">Pro (€49/Monat)</option>
                            <option value="Business">Business (€99/Monat)</option>
                            <option value="Enterprise">Enterprise (€499/Monat)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select id="newCustomerStatus">
                            <option value="active">Aktiv</option>
                            <option value="trial">Testphase</option>
                            <option value="inactive">Inaktiv</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="cancelAddCustomer" class="btn-secondary">Abbrechen</button>
                <button id="saveNewCustomer" class="btn-primary">Kunden erstellen</button>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
                <div class="footer-content">
                    <div class="footer-logo">
                        <i class="fas fa-chart-line"></i>
                        <span>J&C Social Analysé</span>
                    </div>
                    <p>All rights reserved. © 2025 J-C Development<br>
                    J-C Development is not affiliated with Instagram. We do not host any Instagram content on our servers. All rights belong to their respective owners. All Instagram™ logos and trademarks displayed on this application are the property of Instagram.<br>
                </div>
        </div>
    </footer>

    <script src="script1.js"></script>
</body>
</html>