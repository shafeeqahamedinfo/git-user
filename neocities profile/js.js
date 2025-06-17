// Project data
const projects = [
    {
        id: 1,
        title: 'Loan Calculator',
        description: 'A sophisticated financial tool for calculating loan payments, interest rates, and amortization schedules.',
        url: 'https://recyclezone.neocities.org/Loan%20calculator/',
        icon: 'calculator',
        category: 'Financial Tools',
        color: 'green'
    },
    {
        id: 2,
        title: 'Box',
        description: 'An interactive box manipulation game with physics and creative gameplay mechanics.',
        url: 'https://recyclezone.neocities.org/BOX/',
        icon: 'box',
        category: 'Interactive',
        color: 'purple'
    },
    {
        id: 3,
        title: 'Calculator',
        description: 'A fully functional calculator with advanced operations and a clean, intuitive interface.',
        url: 'https://recyclezone.neocities.org/Calculator/inex',
        icon: 'calculator',
        category: 'Utilities',
        color: 'blue'
    },
    {
        id: 4,
        title: 'Drawing App',
        description: 'A creative digital canvas for drawing, sketching, and creating digital art with various tools.',
        url: 'https://recyclezone.neocities.org/Drawing%20App/',
        icon: 'palette',
        category: 'Creative Tools',
        color: 'pink'
    },
    {
        id: 5,
        title: 'Square Game',
        description: 'An engaging puzzle game featuring square-based gameplay with challenging levels.',
        url: 'https://recyclezone.neocities.org/GAMER%2001/',
        icon: 'dice-1',
        category: 'Games',
        color: 'orange'
    },
    {
        id: 6,
        title: 'Rock Paper Scissors',
        description: 'The classic game reimagined with modern design and interactive gameplay features.',
        url: 'https://recyclezone.neocities.org/GAMER%2004/Rock%20Paper%20Scissors%20Game',
        icon: 'gamepad-2',
        category: 'Games',
        color: 'indigo'
    },
    {
        id: 7,
        title: 'Tic Tac Toe',
        description: 'A timeless strategy game with AI opponent and multiplayer capabilities.',
        url: 'https://recyclezone.neocities.org/GAMER%2005/Tic%20Tac%20Toe.HTML',
        icon: 'gamepad-2',
        category: 'Games',
        color: 'teal'
    },
    {
        id: 8,
        title: 'Pairs Game',
        description: 'A memory-testing game where players match pairs of cards to test their cognitive skills.',
        url: 'https://recyclezone.neocities.org/GAMER%2006/INDEX',
        icon: 'gamepad-2',
        category: 'Games',
        color: 'emerald'
    },
    {
        id: 9,
        title: 'Love Project',
        description: 'A heartfelt interactive experience exploring themes of love, connection, and emotion.',
        url: 'https://recyclezone.neocities.org/LoveProject-master/',
        icon: 'heart',
        category: 'Interactive',
        color: 'red'
    },
    {
        id: 10,
        title: 'Car Game',
        description: 'An exciting racing game with dynamic controls and challenging obstacle courses.',
        url: 'https://recyclezone.neocities.org/car/',
        icon: 'car',
        category: 'Games',
        color: 'yellow'
    },
    {
        id: 11,
        title: 'Shoe Shop',
        description: 'An e-commerce showcase featuring a modern shoe shopping experience with cart functionality.',
        url: 'https://recyclezone.neocities.org/project%204%20ok/MY%20SHOE.HTML',
        icon: 'shopping-bag',
        category: 'E-commerce',
        color: 'slate'
    },
    {
        id: 12,
        title: 'New Year Wish',
        description: 'A festive interactive experience for sharing New Year greetings and wishes.',
        url: 'https://recyclezone.neocities.org/project%206%20ok/',
        icon: 'heart',
        category: 'Seasonal',
        color: 'violet'
    }
];

// State management
let currentSection = 'home';
let currentCategory = 'All';
let isMobileMenuOpen = false;

// DOM elements
const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('.nav-btn, .nav-btn-mobile');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.nav-mobile');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectsGrid = document.getElementById('projectsGrid');
const heroButtons = document.querySelectorAll('[data-section]');

// Initialize the application
function init() {
    setupEventListeners();
    renderProjects();
    lucide.createIcons();
}

// Event listeners
function setupEventListeners() {
    // Navigation
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            if (section) {
                navigateToSection(section);
                if (isMobileMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Hero buttons
    heroButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            if (section) {
                navigateToSection(section);
            }
        });
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Category filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterProjects(category);
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMobileMenuOpen && !e.target.closest('.header')) {
            toggleMobileMenu();
        }
    });
}

// Navigation
function navigateToSection(sectionId) {
    currentSection = sectionId;
    
    // Update sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation buttons
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionId) {
            btn.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    mobileMenu.classList.toggle('active');
    
    const icon = mobileMenuBtn.querySelector('i');
    if (isMobileMenuOpen) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
}

// Project filtering
function filterProjects(category) {
    currentCategory = category;
    
    // Update filter buttons
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    renderProjects();
}

// Render projects
function renderProjects() {
    const filteredProjects = currentCategory === 'All' 
        ? projects 
        : projects.filter(project => project.category === currentCategory);
    
    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div class="project-icon ${project.color}">
                    <i data-lucide="${project.icon}"></i>
                </div>
                <div class="project-category">
                    <span>${project.category}</span>
                </div>
            </div>
            
            <h3 class="project-title">${project.title}</h3>
            
            <p class="project-description">${project.description}</p>
            
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                <span>Visit Project</span>
                <i data-lucide="external-link"></i>
            </a>
        </div>
    `).join('');
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}

// Smooth scrolling for anchor links
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.glass-card, .feature-card, .project-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Handle window resize
function handleResize() {
    if (window.innerWidth > 768 && isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    smoothScroll();
    setupAnimations();
    window.addEventListener('resize', handleResize);
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        lucide.createIcons();
    }
});

// Export for potential external use
window.NeocitiesPortfolio = {
    navigateToSection,
    filterProjects,
    projects
};