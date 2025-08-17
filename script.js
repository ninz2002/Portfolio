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

// Resume download functionality
document.querySelector('.resume-btn').addEventListener('click', function() {
    const googleDriveFileId = '10OYCd71A2PDE-J3XdA_6gp6VjNmEd682';
    const googleDriveDownloadUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;

    const resumeUrl = googleDriveDownloadUrl;
    
    //temporary link and trigger download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Ninz_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

const projectData = {
    calculator: {
        title: "Scientific Calculator",
        description: "This is a desktop application built with Python's Tkinter for the GUI and the math library for advanced functions. It supports both basic arithmetic and scientific operations like trigonometry, logarithms, powers, and factorials. The interface is simple and user-friendly, resembling a real calculator for quick and accurate computations.",
        icon: "fas fa-calculator",
        tools: ["Tkinter","Math"],
        codeUrl: "https://github.com/ninz2002/Scientific_Calculator", 
        projectUrl: ""
    },
    attendance: {
        title: "Student Attendance System", 
        description: "This Java-based system manages student attendance through role-based access for admin, teachers, and students. Admins handle accounts, teachers record and manage attendance, and students can view their records. It ensures accuracy, security, and efficiency compared to manual methods, making attendance tracking more reliable. ",
        icon: "fas fa-user-check",
        tools: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
        codeUrl: "https://github.com/ninz2002/Student_attendance_system",
        projectUrl: ""
    },
    movie: {
        title: "Movie Website",
        description: "A responsive movie database website with search functionality, detailed movie information, ratings, and user reviews. It uses the TMDB API for real-time data and features a modern design with Angular.",
        icon: "fas fa-film", 
        tools: ["Angular","TypeScript", "API Integration"],
        codeUrl: "https://github.com/ninz2002/movies",
        projectUrl: "https://ninz2002.github.io/movies/"
    }
};

// Project modal functionality
const projectModal = document.getElementById('projectModal');
const projectCards = document.querySelectorAll('.project-card');
const closeBtn = document.querySelector('.close');

let currentProject = null;

projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const projectKey = this.getAttribute('data-project');
        const project = projectData[projectKey];
        
        if (project) {
            currentProject = project;
            
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
            
            // Enable/disable View Project button based on projectUrl
            const viewProjectBtn = document.querySelector('.view-project');
            if (project.projectUrl && project.projectUrl.trim() !== '') {
                viewProjectBtn.disabled = false;
                viewProjectBtn.style.opacity = '1';
                viewProjectBtn.style.cursor = 'pointer';
            } else {
                viewProjectBtn.disabled = true;
                viewProjectBtn.style.opacity = '0.5';
                viewProjectBtn.style.cursor = 'not-allowed';
            }
            
            // Show modal
            projectModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// View Code button - opens in new tab
document.querySelector('.view-code').addEventListener('click', function() {
    if (currentProject && currentProject.codeUrl) {
        window.open(currentProject.codeUrl, '_blank');
    }
});

// View Project button - opens full screen in new tab
document.querySelector('.view-project').addEventListener('click', function() {
    if (currentProject && currentProject.projectUrl && currentProject.projectUrl.trim() !== '') {
        // Close the current modal
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Open project in full screen new tab
        window.open(currentProject.projectUrl, '_blank');
        
        // Reset current project
        currentProject = null;
    }
});

// Close modal functionality
closeBtn.addEventListener('click', function() {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProject = null;
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentProject = null;
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