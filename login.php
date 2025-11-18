<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SocialInsight - Anmeldung</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style2.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="logo">
                <i class="fas fa-chart-bar"></i>
                <span>J&C Social Analysé</span>
            </div>
            <div class="header-actions">
                <div class="user-avatar">A</div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="login-container">
        <div class="login-form">
            <div class="login-header">
                <h1>Anmelden</h1>
                <p>Geben Sie Ihre Zugangsdaten ein</p>
            </div>
            <form id="auth-form">
                <div class="form-group">
                    <label for="email">E-Mail-Adresse</label>
                    <div class="input-with-icon">
                        <i class="fas fa-envelope input-icon"></i>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            class="form-input"
                            placeholder="name@beispiel.de"
                        />
                    </div>
                    <div id="email-error" class="error-message"></div>
                </div>
                <div class="form-group">
                    <label for="password">Passwort</label>
                    <div class="input-with-icon">
                        <i class="fas fa-lock input-icon"></i>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            class="form-input"
                            placeholder="••••••••"
                        />
                        <button type="button" id="toggle-password" class="toggle-password">
                            <i class="fas fa-eye input-icon" id="password-icon"></i>
                        </button>
                    </div>
                    <div id="password-error" class="error-message"></div>
                </div>
                <div class="form-options">
                    <div class="remember-me">
                        <input type="checkbox" id="remember" name="remember">
                        <label for="remember">Angemeldet bleiben</label>
                    </div>
                    <a href="#" class="forgot-password">Passwort vergessen?</a>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Anmelden</button>
                </div>
            </form>
            <div class="divider">
                <span>Oder</span>
            </div>
            <div class="social-login">
                <button class="social-btn google">
                    <i class="fab fa-google"></i>
                    Mit Google anmelden
                </button>
                <button class="social-btn apple">
                    <i class="fab fa-apple"></i>
                    Mit Apple anmelden
                </button>
            </div>
            <div class="register-link">
                <p>Noch kein Konto? <a href="#" id="register-link">Registrieren</a></p>
            </div>
        </div>
    </div>

    <!-- Register Modal -->
    <div class="modal" id="register-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Neuen Account erstellen</h3>
                <button id="close-register" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="register-form">
                    <div class="form-group">
                        <label for="reg-name">Vor- und Nachname</label>
                        <input type="text" id="reg-name" class="form-input" placeholder="Max Mustermann">
                    </div>
                    <div class="form-group">
                        <label for="reg-email">E-Mail-Adresse</label>
                        <input type="email" id="reg-email" class="form-input" placeholder="max@beispiel.de">
                    </div>
                    <div class="form-group">
                        <label for="reg-password">Passwort</label>
                        <input type="password" id="reg-password" class="form-input" placeholder="••••••••">
                    </div>
                    <div class="form-group">
                        <label for="reg-confirm-password">Passwort bestätigen</label>
                        <input type="password" id="reg-confirm-password" class="form-input" placeholder="••••••••">
                    </div>
                    <div class="form-group">
                        <label for="reg-company">Unternehmensname</label>
                        <input type="text" id="reg-company" class="form-input" placeholder="TechStart GmbH">
                    </div>
                    <div class="form-group">
                        <label for="reg-plan">Tarifplan</label>
                        <select id="reg-plan" class="form-select">
                            <option value="starter">Starter (€19/Monat)</option>
                            <option value="pro">Pro (€49/Monat)</option>
                            <option value="business">Business (€99/Monat)</option>
                            <option value="enterprise">Enterprise (€499/Monat)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="reg-terms">AGB</label>
                        <div class="checkbox-group">
                            <input type="checkbox" id="reg-terms" name="terms">
                            <label for="reg-terms">Ich akzeptiere die <a href="#">Allgemeinen Geschäftsbedingungen</a></label>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" id="cancel-register" class="btn-secondary">Abbrechen</button>
                        <button type="submit" class="btn-primary">Account erstellen</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="script2.js"></script>
</body>
</html>