# Ibrahim Al-Obaide - Portfolio Website

A modern, responsive portfolio website showcasing professional profile, projects, skills, and experience. Built with Tailwind CSS and deployed automatically to GitHub Pages.

🌐 **Live Site**: [https://micodev.github.io/portfolio](https://micodev.github.io/portfolio)

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Multi-language Support**: English and Arabic language toggle
- **Dark Mode**: Light/dark theme switching
- **Interactive Navigation**: Smooth scrolling between sections  
- **Portfolio Projects**: Detailed showcase of mobile and web applications
- **Professional Profile**: Complete work experience, education, and skills
- **Media Gallery**: Video demos and project screenshots
- **Contact Integration**: Easy access to all contact details and social links
- **Auto Deployment**: Automatically deployed to GitHub Pages on push

## Technologies Used

- HTML5 & CSS3
- Tailwind CSS (via CDN)
- Font Awesome Icons
- Vanilla JavaScript
- GitHub Actions (for deployment)
- GitHub Pages (hosting)

## File Structure

```
portfolio/
├── index.html                    # Main portfolio page
├── projects.html                 # Projects showcase page
├── style.css                     # Additional custom styles
├── rtl-fixes.css                # RTL language support styles
├── theme-lang.js                # Theme and language switching
├── translations.js              # Multi-language translations
├── README.md                    # Project documentation
├── .gitignore                   # Git ignore file
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment
└── assets/
    ├── 1668403469306.jpg        # Profile image
    └── video/                   # Project demo videos and images
        ├── cinema/              # Shashety app demos
        ├── e-commerece/         # E-commerce app demos
        └── thahb/               # Thahb jewelry app demos
```

## How to Use

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/micodev/portfolio.git
   cd portfolio
   ```

2. Start a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have it)
   npx serve .
   
   # Using PHP (if you have it)
   php -S localhost:8000
   ```

3. Open your browser and go to `http://localhost:8000`

### Automatic Deployment
The site is automatically deployed to GitHub Pages whenever changes are pushed to the main branch.

### Manual Deployment Setup
If you fork this repository, enable GitHub Pages:
1. Go to repository Settings
2. Scroll to "Pages" section  
3. Source: "Deploy from a branch"
4. Branch: `main` / `(root)`
5. Click "Save"

The GitHub Actions workflow will automatically deploy your site to `https://[username].github.io/portfolio`

## Sections

### Main Page (index.html)
1. **Hero Section**: Introduction with profile image and main call-to-action
2. **About**: Professional profile and activities/interests  
3. **Work Experience**: Detailed work history with company info
4. **Education**: Academic background and achievements
5. **Technical Skills**: Programming languages, databases, tools
6. **Awards**: Professional recognition and achievements
7. **Contact**: Complete contact information and social links

### Projects Page (projects.html)
1. **Featured Projects**: 
   - **Shashety Cinema App**: Flutter-based movie streaming app
   - **Thahb Jewelry Shop**: E-commerce app for gold jewelry
   - **E-Commerce Platform**: Complete shopping platform
2. **Technologies**: Tech stack used in projects
3. **Call to Action**: Contact and collaboration invite

## Contact Information

- **Address**: Al-Hadi Street, Al-Shaab, Baghdad, Iraq, 10044
- **Phone**: +964 770 045 9826 / +964 783 840 9805
- **Email**: Ibrahimayad321@gmail.com
- **Telegram**: [@anime19](https://t.me/anime19)
- **All Links**: [linktr.ee/anime19](https://linktr.ee/anime19)

## Performance & SEO

- ⚡ Lightweight and fast loading
- 📱 Mobile-first responsive design  
- 🎨 Optimized images and media assets
- 🔍 SEO-friendly structure
- 🌐 CDN-based resources for global availability
- ♿ Accessibility considerations

---

Built with ❤️ by Ibrahim Al-Obaide | Deployed with GitHub Pages & Actions

## Browser Support

This portfolio works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Performance

- Lightweight and fast loading
- Optimized images and assets
- Minimal JavaScript for better performance
- CDN-based resources for global availability

## GitHub Actions Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

- **Triggers**: Automatically runs on push to main branch
- **Permissions**: Sets up proper GitHub Pages permissions
- **Deployment**: Uploads the entire repository as static files
- **URL**: Deploys to `https://[username].github.io/portfolio`

### Workflow Features:
- ✅ Zero-configuration deployment
- ✅ Automatic SSL certificate
- ✅ Global CDN distribution
- ✅ Custom domain support (optional)
- ✅ Branch protection compatible

---

Built with ❤️ using Tailwind CSS