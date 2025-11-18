// script.js — J&C Social Analysé Logic
// Mock data (same as original)
const mockProfiles = [
  { id: 1, platform: 'Facebook', name: 'Tech Insights', url: 'facebook.com/techinsights', followers: 12500 },
  { id: 2, platform: 'Instagram', name: 'Design Trends', url: 'instagram.com/designtrends', followers: 28700 },
  { id: 3, platform: 'TikTok', name: 'Quick Hacks', url: 'tiktok.com/@quickhacks', followers: 104200 },
  { id: 4, platform: 'Pinterest', name: 'Home Ideas', url: 'pinterest.com/homeideas', followers: 45300 },
  { id: 5, platform: 'Tumblr', name: 'Art Collective', url: 'artcollective.tumblr.com', followers: 8750 }
];

const mockPosts = [
  { id: 1, platform: 'Instagram', description: 'Neue UI-Design-Trends, die 2025 beliebt sind', timestamp: '2025-11-15T14:30:00', url: 'instagram.com/p/abc123', commentsCount: 42, likes: 387, commentLikes: 156 },
  { id: 2, platform: 'TikTok', description: '5-Sekunden-CSS-Übergangstricks, die Sie kennen sollten', timestamp: '2025-11-16T09:15:00', url: 'tiktok.com/@quickhacks/video/def456', commentsCount: 128, likes: 9450, commentLikes: 1230 },
  { id: 3, platform: 'Facebook', description: 'Wie wir unser Analyse-Dashboard für bessere UX neu gestaltet haben', timestamp: '2025-11-17T16:45:00', url: 'facebook.com/techinsights/posts/ghi789', commentsCount: 87, likes: 1250, commentLikes: 432 }
];

const mockComments = [
  { id: 1, author: 'Jane Doe', text: 'Dieses Design ist absolut atemberaubend! Die Farbkombination gefällt mir sehr.', timestamp: '2025-11-15T15:20:00', sentiment: 'positive', sentimentScore: 0.89 },
  { id: 2, author: 'John Smith', text: 'Der Übergangseffekt ist glatt, aber die Ladezeit könnte besser sein.', timestamp: '2025-11-15T16:05:00', sentiment: 'neutral', sentimentScore: 0.45 },
  { id: 3, author: 'Alex Johnson', text: 'Nicht beeindruckt. Fühlt sich an wie eine Kopie des Designs vom letzten Jahr.', timestamp: '2025-11-15T17:30:00', sentiment: 'negative', sentimentScore: 0.21 },
  { id: 4, author: 'Sarah Williams', text: 'Würde gerne ein Tutorial sehen, wie Sie diesen Effekt erreicht haben!', timestamp: '2025-11-15T18:15:00', sentiment: 'positive', sentimentScore: 0.78 },
  { id: 5, author: 'Mike Brown', text: 'Die Animationen sind zu ablenkend. Bitte fügen Sie eine Option hinzu, um sie auszuschalten.', timestamp: '2025-11-16T10:30:00', sentiment: 'negative', sentimentScore: 0.32 }
];

// State
let activePlatform = 'all';
let activeCategory = 'profil';
let selectedProfile = mockProfiles[0];
let selectedPost = mockPosts[0];
let comments = [...mockComments];

// DOM Elements
const platformTabs = document.querySelectorAll('.platform-tab');
const categoryTabs = document.querySelectorAll('.category-tab');
const sections = {
  profil: document.getElementById('profilContent'),
  beitrag: document.getElementById('beitragContent'),
  kommentare: document.getElementById('kommentareContent'),
  textanalyse: document.getElementById('textanalyseContent')
};
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');
const profilesTableBody = document.getElementById('profilesTableBody');
const postsTableBody = document.getElementById('postsTableBody');
const commentsTableBody = document.getElementById('commentsTableBody');
const selectedProfileDetails = document.getElementById('selectedProfileDetails');
const selectedPostDetails = document.getElementById('selectedPostDetails');
const overallSentimentEl = document.getElementById('overallSentiment');
const textToAnalyze = document.getElementById('textToAnalyze');
const analyzeBtn = document.getElementById('analyzeBtn');
const analysisResult = document.getElementById('analysisResult');

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

// Helper: Sentiment Icons & Badges
function getSentimentIcon(sentiment) {
  const icons = {
    positive: '<i class="fas fa-smile sentiment-positive"></i>',
    neutral: '<i class="fas fa-meh sentiment-neutral"></i>',
    negative: '<i class="fas fa-frown sentiment-negative"></i>'
  };
  return icons[sentiment] || icons.neutral;
}

function getSentimentBadge(sentiment, score) {
  const cls = `sentiment-badge ${sentiment}`;
  return `<span class="${cls}">${sentiment} (${Math.round(score * 100)}%)</span>`;
}

// Calculate overall sentiment
function calculateOverallSentiment() {
  if (comments.length === 0) return { sentiment: 'neutral', score: 0.5 };
  const avg = comments.reduce((sum, c) => sum + c.sentimentScore, 0) / comments.length;
  if (avg > 0.65) return { sentiment: 'positive', score: avg };
  if (avg < 0.35) return { sentiment: 'negative', score: avg };
  return { sentiment: 'neutral', score: avg };
}

// Sentiment analysis mock
function analyzeSentiment(text) {
  const lower = text.toLowerCase();
  let score = 0.5;
  const posWords = ['liebe', 'atemberaubend', 'erstaunlich', 'großartig', 'exzellent', 'beeindruckend', 'wow', 'fantastisch', 'tolle', 'wunderbar'];
  const negWords = ['hasse', 'schrecklich', 'entsetzlich', 'enttäuscht', 'schlimmste', 'ärgerlich', 'nicht gut', 'schlecht', 'nervig'];
  
  posWords.forEach(w => { if (lower.includes(w)) score += 0.2; });
  negWords.forEach(w => { if (lower.includes(w)) score -= 0.25; });
  
  const excl = (text.match(/!/g) || []).length;
  if (excl > 0) score += excl * 0.05;
  
  score = Math.max(0, Math.min(1, score));
  if (score > 0.65) return { sentiment: 'positive', score };
  if (score < 0.35) return { sentiment: 'negative', score };
  return { sentiment: 'neutral', score };
}

// Update UI
function updateUI() {
  // Update tabs
  platformTabs.forEach(btn => {
    if (btn.dataset.platform === activePlatform) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  categoryTabs.forEach(btn => {
    if (btn.dataset.category === activeCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Show active section
  Object.keys(sections).forEach(key => {
    sections[key].classList.toggle('active', key === activeCategory);
  });
  
  // Update titles
  const titles = {
    profil: 'Profilübersicht',
    beitrag: 'Beitragsübersicht',
    kommentare: 'Kommentaranalyse',
    textanalyse: 'Textanalyse Werkzeug'
  };
  pageTitle.textContent = titles[activeCategory];
  
  pageSubtitle.textContent = activePlatform === 'all' 
    ? 'Daten von allen Plattformen' 
    : `Daten von ${activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)}`;
  
  // Filter data
  const filteredProfiles = activePlatform === 'all' 
    ? mockProfiles 
    : mockProfiles.filter(p => p.platform.toLowerCase() === activePlatform);
  
  const filteredPosts = activePlatform === 'all' 
    ? mockPosts 
    : mockPosts.filter(p => p.platform.toLowerCase() === activePlatform);
  
  // Populate tables
  profilesTableBody.innerHTML = '';
  filteredProfiles.forEach(p => {
    const tr = document.createElement('tr');
    tr.className = selectedProfile && selectedProfile.id === p.id ? 'selected' : '';
    tr.innerHTML = `
      <td>${getPlatformIcon(p.platform)} ${p.platform}</td>
      <td>${p.name}</td>
      <td><a href="https://${p.url}" target="_blank" class="link">${p.url}</a></td>
      <td>${p.followers.toLocaleString()}</td>
    `;
    tr.addEventListener('click', () => {
      selectedProfile = p;
      updateUI();
    });
    profilesTableBody.appendChild(tr);
  });
  
  postsTableBody.innerHTML = '';
  filteredPosts.forEach(p => {
    const tr = document.createElement('tr');
    tr.className = selectedPost && selectedPost.id === p.id ? 'selected' : '';
    tr.innerHTML = `
      <td>${getPlatformIcon(p.platform)} ${p.platform}</td>
      <td>${p.description}</td>
      <td>${new Date(p.timestamp).toLocaleString('de-DE')}</td>
      <td>
        <i class="fas fa-comment"></i> ${p.commentsCount} •
        <i class="fas fa-heart"></i> ${p.likes} •
        <i class="fas fa-thumbs-up"></i> ${p.commentLikes}
      </td>
    `;
    tr.addEventListener('click', () => {
      selectedPost = p;
      updateUI();
    });
    postsTableBody.appendChild(tr);
  });
  
  commentsTableBody.innerHTML = '';
  comments.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.author}</td>
      <td>${c.text}</td>
      <td>${new Date(c.timestamp).toLocaleString('de-DE')}</td>
      <td>${getSentimentIcon(c.sentiment)} ${getSentimentBadge(c.sentiment, c.sentimentScore)}</td>
    `;
    commentsTableBody.appendChild(tr);
  });
  
  // Profile details
  if (selectedProfile) {
    selectedProfileDetails.innerHTML = `
      <h3>Ausgewähltes Profil</h3>
      <div class="profile-grid">
        <div class="detail-card">
          <div class="detail-label">Plattform</div>
          <div class="detail-value">${getPlatformIcon(selectedProfile.platform)} ${selectedProfile.platform}</div>
        </div>
        <div class="detail-card">
          <div class="detail-label">Profilname</div>
          <div class="detail-value">${selectedProfile.name}</div>
        </div>
        <div class="detail-card">
          <div class="detail-label">Profil-URL</div>
          <div class="detail-value link">${selectedProfile.url}</div>
        </div>
        <div class="detail-card">
          <div class="detail-label">Follower</div>
          <div class="detail-value">${selectedProfile.followers.toLocaleString()}</div>
        </div>
      </div>
    `;
    selectedProfileDetails.classList.remove('hidden');
  }
  
  // Post details
  if (selectedPost) {
    selectedPostDetails.innerHTML = `
      <h3>Ausgewählter Beitrag</h3>
      <div class="post-grid">
        <div>
          <p><strong>${getPlatformIcon(selectedPost.platform)} ${selectedPost.platform}</strong></p>
          <p>${selectedPost.description}</p>
          <p class="detail-label">Veröffentlicht am: ${new Date(selectedPost.timestamp).toLocaleString('de-DE')}</p>
          <a href="${selectedPost.url}" target="_blank" class="link">Zum Beitrag</a>
        </div>
        <div class="detail-card">
          <h4>Interaktionen</h4>
          <p><i class="fas fa-comment"></i> Kommentare: <strong>${selectedPost.commentsCount}</strong></p>
          <p><i class="fas fa-heart"></i> Likes: <strong>${selectedPost.likes}</strong></p>
          <p><i class="fas fa-thumbs-up"></i> Kommentar-Likes: <strong>${selectedPost.commentLikes}</strong></p>
        </div>
      </div>
    `;
    selectedPostDetails.classList.remove('hidden');
  }
  
  // Overall sentiment
  const os = calculateOverallSentiment();
  overallSentimentEl.innerHTML = `
    <div>
      <h3>Gesamtbewertung Kommentare</h3>
      <p>${comments.length} Kommentare analysiert</p>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;">
      ${getSentimentIcon(os.sentiment)}
      <div>
        <div class="font-medium">${os.sentiment}</div>
        <div class="detail-label">${Math.round(os.score * 100)}% Übereinstimmung</div>
      </div>
    </div>
  `;
}

// Text analysis
analyzeBtn.addEventListener('click', () => {
  const text = textToAnalyze.value.trim();
  if (!text) return;
  
  const result = analyzeSentiment(text);
  const sentimentClass = 
    result.sentiment === 'positive' ? 'sentiment-positive' :
    result.sentiment === 'negative' ? 'sentiment-negative' : 'sentiment-neutral';
  
  analysisResult.innerHTML = `
    <h4>Analyseergebnis</h4>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1.5rem;">
      <div>
        <p class="detail-label">Eingegebener Text:</p>
        <p class="italic">&quot;${text}&quot;</p>
      </div>
      <div style="text-align:center;min-width:120px;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">${getSentimentIcon(result.sentiment)}</div>
        <div class="font-medium">${result.sentiment}</div>
        <div class="detail-label">${Math.round(result.score * 100)}% Übereinstimmung</div>
        <div style="width:100%;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;margin-top:0.5rem;">
          <div style="width:${result.score * 100}%;height:100%;border-radius:3px;background:linear-gradient(90deg, var(--primary-500), var(--secondary-500));"></div>
        </div>
      </div>
    </div>
  `;
  analysisResult.classList.remove('hidden');
});

// Event listeners
platformTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    activePlatform = btn.dataset.platform;
    updateUI();
  });
});

categoryTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    activeCategory = btn.dataset.category;
    updateUI();
  });
});

// Init
updateUI();