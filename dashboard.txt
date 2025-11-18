<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>J-C-Social Media Analyse & Tracking Tool</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="logo">
                <i class="fas fa-chart-line"></i>
                <span>J&C Social Analysé</span>
            </div>
            <div class="header-actions">
                <i class="fas fa-search search-icon"></i>
                <div class="user-avatar">A</div>
            </div>
        </div>
    </header>

    <!-- Platform Navigation -->
    <nav class="platform-nav">
        <div class="container">
            <div class="platform-tabs" id="platformTabs">
                <button data-platform="all" class="platform-tab active">
                    <i class="fas fa-home"></i> Alle Plattformen
                </button>
                <button data-platform="facebook" class="platform-tab">
                    <span class="platform-badge facebook">F</span> Facebook
                </button>
                <button data-platform="instagram" class="platform-tab">
                    <span class="platform-badge instagram">I</span> Instagram
                </button>
                <button data-platform="tiktok" class="platform-tab">
                    <span class="platform-badge tiktok">T</span> TikTok
                </button>
                <button data-platform="pinterest" class="platform-tab">
                    <span class="platform-badge pinterest">P</span> Pinterest
                </button>
                <button data-platform="tumblr" class="platform-tab">
                    <span class="platform-badge tumblr">T</span> Tumblr
                </button>
            </div>
        </div>
    </nav>

    <!-- Category Navigation -->
    <div class="category-nav">
        <div class="container">
            <div class="category-tabs" id="categoryTabs">
                <button data-category="profil" class="category-tab active">Profil</button>
                <button data-category="beitrag" class="category-tab">Beitrag</button>
                <button data-category="kommentare" class="category-tab">Kommentare</button>
                <button data-category="textanalyse" class="category-tab">Textanalyse</button>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <main class="container">
        <div class="page-header">
            <h1 id="pageTitle">Profilübersicht</h1>
            <p id="pageSubtitle">Daten von allen Plattformen</p>
        </div>

        <div class="card">
            <!-- Sections will be toggled via JS -->
            <div id="profilContent" class="section active">
                <div class="table-container">
                    <table class="data-table" id="profilesTable">
                        <thead>
                            <tr>
                                <th>Plattform</th>
                                <th>Profilname</th>
                                <th>Profil-URL</th>
                                <th>Follower</th>
                            </tr>
                        </thead>
                        <tbody id="profilesTableBody"></tbody>
                    </table>
                </div>
                <div id="selectedProfileDetails" class="profile-details hidden"></div>
            </div>

            <div id="beitragContent" class="section hidden">
                <div class="table-container">
                    <table class="data-table" id="postsTable">
                        <thead>
                            <tr>
                                <th>Plattform</th>
                                <th>Beschreibung</th>
                                <th>Zeitstempel</th>
                                <th>Interaktionen</th>
                            </tr>
                        </thead>
                        <tbody id="postsTableBody"></tbody>
                    </table>
                </div>
                <div id="selectedPostDetails" class="post-details hidden"></div>
            </div>

            <div id="kommentareContent" class="section hidden">
                <div class="sentiment-overview" id="overallSentiment"></div>
                <div class="table-container">
                    <table class="data-table" id="commentsTable">
                        <thead>
                            <tr>
                                <th>Autor</th>
                                <th>Kommentar</th>
                                <th>Zeitstempel</th>
                                <th>Stimmung</th>
                            </tr>
                        </thead>
                        <tbody id="commentsTableBody"></tbody>
                    </table>
                </div>
            </div>

            <div id="textanalyseContent" class="section hidden">
                <div class="analysis-tool">
                    <h3>Textanalyse Werkzeug</h3>
                    <p>Analysieren Sie beliebige Texte auf Stimmung und Tonfall</p>
                    <textarea id="textToAnalyze" placeholder="Geben Sie einen Text ein, um die Stimmung zu analysieren..."></textarea>
                    <div class="text-analyze-btns">
                        <button id="analyzeBtn" class="btn-primary">Text analysieren</button>
                    </div>
                </div>
                <div id="analysisResult" class="analysis-result hidden"></div>
                <div class="sentiment-guide">
                    <h4>Wie funktioniert die Stimmungsanalyse?</h4>
                    <div class="sentiment-cards">
                        <div class="sentiment-card positive">
                            <i class="fas fa-smile"></i>
                            <h5>Positiv</h5>
                            <p>Wörter wie „wunderbar“, „tolle“, „fantastisch“ und Ausrufezeichen deuten auf positive Stimmung hin.</p>
                        </div>
                        <div class="sentiment-card neutral">
                            <i class="fas fa-meh"></i>
                            <h5>Neutral</h5>
                            <p>Ausgewogene Formulierungen ohne starke Emotionen.</p>
                        </div>
                        <div class="sentiment-card negative">
                            <i class="fas fa-frown"></i>
                            <h5>Negativ</h5>
                            <p>Wörter wie „schlecht“, „enttäuscht“, „nervig“ deuten auf negative Stimmung hin.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

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
                    </p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>