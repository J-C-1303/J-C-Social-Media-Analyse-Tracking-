<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>J-C-Social Media Analyse & Tracking Tool</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="style2.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="logo">
                <i class="bi bi-bar-chart"></i>
                <span>SocialInsight Support</span>
            </div>
            <div class="search-bar">
                <i class="bi bi-search search-icon"></i>
                <input type="text" id="searchInput" placeholder="Tickets durchsuchen...">
            </div>
            <div class="user-icon">S</div>
        </div>
    </header>

    <!-- Container -->
    <div class="container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <a href="#" class="nav-item active" data-tab="inbox">
                <i class="bi bi-inbox nav-icon"></i>
                Posteingang
                <span class="badge" id="openCount">3</span>
            </a>
            <a href="#" class="nav-item" data-tab="open">
                <i class="bi bi-exclamation-circle nav-icon"></i>
                Offene Tickets
            </a>
            <a href="#" class="nav-item" data-tab="pending">
                <i class="bi bi-clock nav-icon"></i>
                In Bearbeitung
            </a>
            <a href="#" class="nav-item" data-tab="resolved">
                <i class="bi bi-check-circle nav-icon"></i>
                Gelöst
            </a>
        </aside>

        <!-- Main Content -->
        <main class="main-content" id="mainContent">
            <!-- Ticket List View -->
            <div id="ticketListView">
                <div class="page-header">
                    <h1 class="page-title">Posteingang</h1>
                    <button class="btn btn-primary" id="newTicketBtn">
                        <i class="bi bi-plus btn-icon"></i>
                        Neues Ticket
                    </button>
                </div>
                <!-- Filters -->
                <div class="filters">
                    <div class="filter-grid">
                        <div>
                            <label class="form-label" for="statusFilter">Status</label>
                            <select class="form-select" id="statusFilter">
                                <option value="all">Alle Status</option>
                                <option value="open">Offen</option>
                                <option value="pending">In Bearbeitung</option>
                                <option value="resolved">Gelöst</option>
                                <option value="closed">Geschlossen</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label" for="priorityFilter">Priorität</label>
                            <select class="form-select" id="priorityFilter">
                                <option value="all">Alle Prioritäten</option>
                                <option value="low">Niedrig</option>
                                <option value="medium">Mittel</option>
                                <option value="high">Hoch</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label" for="categoryFilter">Kategorie</label>
                            <select class="form-select" id="categoryFilter">
                                <option value="all">Alle Kategorien</option>
                                <option value="technical">Technisches Problem</option>
                                <option value="billing">Abrechnung</option>
                                <option value="question">Frage</option>
                                <option value="feature">Feature-Anfrage</option>
                                <option value="other">Sonstiges</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- Tickets Table -->
                <table class="tickets-table">
                    <thead>
                        <tr>
                            <th>Ticket</th>
                            <th>Kunde</th>
                            <th>Status</th>
                            <th>Priorität</th>
                            <th>Kategorie</th>
                            <th>Letzte Aktualisierung</th>
                        </tr>
                    </thead>
                    <tbody id="ticketsTableBody">
                        <!-- Tickets will be inserted here by JavaScript -->
                    </tbody>
                </table>
            </div>

            <!-- Ticket Detail View -->
            <div class="ticket-detail-container" id="ticketDetailView" style="display: none;">
                <!-- Ticket Sidebar -->
                <div class="ticket-sidebar">
                    <div class="ticket-sidebar-header">
                        <button class="btn" id="backToListBtn">
                            <i class="bi bi-arrow-left btn-icon"></i>
                            Zurück zur Übersicht
                        </button>
                    </div>
                    <div class="ticket-sidebar-content">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h3 class="h5">Tickets</h3>
                            <span class="badge">5</span>
                        </div>
                        <div id="ticketSidebarList">
                            <!-- Ticket list will be inserted here by JavaScript -->
                        </div>
                    </div>
                </div>

                <!-- Ticket Detail -->
                <div class="ticket-detail">
                    <div class="ticket-header">
                        <div class="ticket-header-top">
                            <div>
                                <div class="d-flex align-items-center">
                                    <span class="ticket-id" id="ticketId">#1</span>
                                    <span class="status-badge status-open" id="ticketStatus">Offen</span>
                                </div>
                                <h2 class="ticket-title" id="ticketSubject">API-Zugriffsproblem bei TikTok-Integration</h2>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="tool-btn">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="tool-btn">
                                    <i class="bi bi-box-arrow-up-right"></i>
                                </button>
                                <button class="tool-btn">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="ticket-meta">
                            <div class="meta-item">
                                <i class="bi bi-person meta-icon"></i>
                                <span id="ticketCustomer">TechStart GmbH</span>
                            </div>
                            <div class="meta-item">
                                <i class="bi bi-calendar meta-icon"></i>
                                <span>Erstellt: 15.11.2025</span>
                            </div>
                            <div class="meta-item">
                                <i class="bi bi-tag meta-icon"></i>
                                <span class="category-badge category-technical">Technisches Problem</span>
                            </div>
                            <div class="meta-item">
                                <i class="bi bi-star meta-icon"></i>
                                <span class="priority-badge priority-high">Hoch</span>
                            </div>
                        </div>
                    </div>
                    <div class="messages-container" id="messagesContainer">
                        <!-- Messages will be inserted here by JavaScript -->
                    </div>
                    <div class="reply-box">
                        <div class="reply-content">
                            <div class="reply-avatar">S</div>
                            <div class="reply-input-container">
                                <textarea class="reply-textarea" id="replyTextarea" placeholder="Schreiben Sie Ihre Antwort..."></textarea>
                                <div class="reply-actions">
                                    <div class="reply-tools">
                                        <button class="tool-btn">
                                            <i class="bi bi-paperclip"></i>
                                        </button>
                                        <button class="tool-btn">
                                            <i class="bi bi-emoji-smile"></i>
                                        </button>
                                    </div>
                                    <div class="reply-buttons">
                                        <button class="btn btn-outline" id="cancelReplyBtn">Abbrechen</button>
                                        <button class="btn btn-primary" id="sendReplyBtn">Senden</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- New Ticket Modal -->
    <div class="modal" id="newTicketModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Neues Ticket erstellen</h3>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label" for="ticketSubjectInput">Betreff *</label>
                    <input type="text" class="form-input" id="ticketSubjectInput" placeholder="Geben Sie einen aussagekräftigen Betreff ein">
                </div>
                <div class="form-group">
                    <label class="form-label" for="ticketCustomerInput">Kunde</label>
                    <input type="text" class="form-input" id="ticketCustomerInput" placeholder="Kundenname (optional)">
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="ticketCategoryInput">Kategorie</label>
                        <select class="form-select" id="ticketCategoryInput">
                            <option value="technical">Technisches Problem</option>
                            <option value="billing">Abrechnung</option>
                            <option value="question">Frage</option>
                            <option value="feature">Feature-Anfrage</option>
                            <option value="other">Sonstiges</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="ticketPriorityInput">Priorität</label>
                        <select class="form-select" id="ticketPriorityInput">
                            <option value="low">Niedrig</option>
                            <option value="medium" selected>Mittel</option>
                            <option value="high">Hoch</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label" for="ticketMessageInput">Nachricht *</label>
                    <textarea class="form-input form-textarea" id="ticketMessageInput" placeholder="Beschreiben Sie Ihr Anliegen detailliert..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" id="cancelTicketBtn">Abbrechen</button>
                <button class="btn btn-primary" id="createTicketBtn">Ticket erstellen</button>
            </div>
        </div>
    </div>

    <script src="script2.js"></script>
</body>
</html>