// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project data
const projectData = {
    calculator: {
        title: 'Scientific Calculator',
        description: 'A comprehensive scientific calculator built with Python using Tkinter for the GUI. Features advanced mathematical functions including trigonometric operations, logarithms, exponentials, and complex calculations. The calculator provides a user-friendly interface with button layouts similar to professional scientific calculators.',
        tools: ['Python', 'Tkinter', 'Math Library'],
        icon: 'fas fa-calculator'
    },
    attendance: {
        title: 'Student Attendance Management System',
        description: 'A comprehensive web-based attendance management system built with Java and styled with Tailwind CSS. The system features three distinct user roles: Admin (can add/remove staff and students, view all attendance records), Staff (can mark attendance for their assigned subjects), and Students (can view their personal attendance records). Features a user-friendly interface with role-based access control.',
        tools: ['Java', 'Tailwind CSS', 'HTML', 'CSS'],
        icon: 'fas fa-user-check'
    },
    movie: {
        title: 'Movie Website',
        description: 'A dynamic movie database website built with Angular and TypeScript, styled with Bootstrap. The platform showcases movies, TV series, and top-rated content with detailed information including posters, ratings, director names, genres, and descriptions. Features movie detail pages with trailer and watch options (UI only). A complete clone of popular movie streaming platforms with responsive design.',
        tools: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Bootstrap'],
        icon: 'fas fa-film'
    },
    todo: {
        title: 'To-Do App',
        description: 'A simple yet functional task management application built with vanilla JavaScript, HTML, and CSS. Features include adding new tasks, marking tasks as complete, deleting tasks, and local storage persistence. The app provides a clean, intuitive interface for daily task management with responsive design for mobile and desktop use.',
        tools: ['JavaScript', 'HTML', 'CSS'],
        icon: 'fas fa-tasks'
    }
};

// Project modal functionality
const projectModal = document.getElementById('projectModal');
const projectCards = document.querySelectorAll('.project-card');
const closeBtn = document.querySelector('.close');

projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const projectKey = this.getAttribute('data-project');
        const project = projectData[projectKey];
        
        if (project) {
            // Update modal content
            document.querySelector('.modal-title').textContent = project.title;
            document.querySelector('.modal-description').textContent = project.description;
            document.querySelector('.modal-icon').className = `modal-icon ${project.icon}`;
            
            // Update tools
            const toolsList = document.querySelector('.tools-list');
            toolsList.innerHTML = '';
            project.tools.forEach(tool => {
                const toolTag = document.createElement('span');
                toolTag.className = 'tool-tag';
                toolTag.textContent = tool;
                toolsList.appendChild(toolTag);
            });
            
            // Show modal
            projectModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal functionality
closeBtn.addEventListener('click', function() {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

const certificateModal = document.getElementById('certificateModal');
const certificateCards = document.querySelectorAll('.certificate-card');
const showMoreBtn = document.getElementById('showMoreBtn');

// Check if modal exists before proceeding
if (certificateModal) {
    const certificateCloseBtn = certificateModal.querySelector('.close');
    const certificateModalContent = certificateModal.querySelector('.certificate-modal-content');
    const modalIframe = document.getElementById('modalCertificateIframe');

    // Open modal and load certificate preview
    certificateCards.forEach(card => {
        card.addEventListener('click', function () {
            const certURL = card.getAttribute('data-cert-url');
            if (certURL && modalIframe) {
                const previewURL = certURL.replace('/view', '/preview');
                modalIframe.src = previewURL;
                certificateModal.style.display = 'block';
                
                if (certificateModalContent) {
                    certificateModalContent.classList.remove('show');
                    setTimeout(() => {
                        certificateModalContent.classList.add('show');
                    }, 10);
                }
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal via close button
    if (certificateCloseBtn) {
        certificateCloseBtn.addEventListener('click', function () {
            if (certificateModalContent) {
                certificateModalContent.classList.remove('show');
            }
            setTimeout(() => {
                certificateModal.style.display = 'none';
                if (modalIframe) modalIframe.src = '';
                document.body.style.overflow = 'auto';
            }, 300);
        });
    }

    // Close modal by clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === certificateModal) {
            if (certificateModalContent) {
                certificateModalContent.classList.remove('show');
            }
            setTimeout(() => {
                certificateModal.style.display = 'none';
                if (modalIframe) modalIframe.src = '';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
}

// Show More / Show Less toggle
if (showMoreBtn) {
    const hiddenCertificates = document.querySelectorAll('.certificate-card.hidden');
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', function () {
        if (!isExpanded) {
            hiddenCertificates.forEach(cert => {
                cert.classList.remove('hidden');
            });
            this.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
            isExpanded = true;
        } else {
            hiddenCertificates.forEach(cert => {
                cert.classList.add('hidden');
            });
            this.innerHTML = 'Show More <i class="fas fa-arrow-right"></i>';
            isExpanded = false;
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// Add smooth animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .certificate-card, .skill-item, .education-card, .internship-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Resume download functionality (placeholder)
document.querySelector('.resume-btn').addEventListener('click', function() {
    alert('Resume download will be implemented with your actual resume file.');
});

// Modal buttons functionality (placeholder)
document.querySelector('.view-code').addEventListener('click', function() {
    alert('This will redirect to your project\'s code repository.');
});

document.querySelector('.view-project').addEventListener('click', function() {
    alert('This will redirect to your live project.');
});