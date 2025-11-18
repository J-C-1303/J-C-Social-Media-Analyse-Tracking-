# Copilot Instructions for SocialInsight Codebase

## Overview
This codebase powers **SocialInsight**, a web-based social media analytics platform. It provides insights into social media performance across platforms like Facebook, Instagram, TikTok, Pinterest, and Tumblr. The application is built using PHP for backend logic and TailwindCSS for styling.

## Architecture
- **Frontend**: The UI is heavily styled with TailwindCSS and includes reusable components for buttons, cards, and navigation menus.
- **Pages**: Each PHP file represents a distinct page:
  - `index.php`: Landing page with marketing content.
  - `dashboard.php`: Main analytics dashboard.
  - `login.php`: User authentication page.
  - `ticket.php`: Likely for support or issue tracking (not fully analyzed).
  - `admin.php`: Administrative functionalities (not fully analyzed).
- **Styling**: Inline `<style>` blocks and TailwindCSS configuration scripts are used for custom styles.

## Developer Workflows
### Local Development
1. Ensure you have a local server like XAMPP running.
2. Place the project in the `htdocs` folder.
3. Access the application via `http://localhost/<project-folder>`.

### Debugging
- Use browser developer tools to inspect TailwindCSS classes and JavaScript behavior.
- PHP errors can be debugged by enabling `display_errors` in `php.ini`.

### Testing
- No explicit test framework is set up. Manual testing is required for now.

## Conventions and Patterns
- **TailwindCSS**: Consistent use of utility classes for styling. Custom colors and animations are defined in `<script>` blocks.
- **Icons**: Font Awesome is used for icons.
- **Responsive Design**: Media queries and responsive classes (e.g., `sm:`, `md:`) are used extensively.
- **Platform-Specific Styling**: Classes like `.platform-facebook` and `.platform-instagram` define platform-specific colors.

## Integration Points
- **External Libraries**:
  - Font Awesome for icons.
  - TailwindCSS for styling.
- **Potential Backend**:
  - The backend logic is not fully visible but likely involves PHP sessions and database interactions.

## Key Files
- `index.php`: Entry point for the application.
- `dashboard.php`: Core analytics functionality.
- `login.php`: Handles user authentication.

## Recommendations for AI Agents
- Follow the TailwindCSS utility-first approach for styling.
- Maintain the existing PHP structure for page-specific logic.
- Use consistent naming conventions for classes and IDs.
- When adding new features, ensure responsiveness and cross-browser compatibility.

---
If you have questions or need clarification, please consult the team or refer to the project documentation.