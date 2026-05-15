// ========================================
// GLOBAL VARIABLES AND STATE
// ========================================

// Image gallery data for hero section
const heroImages = [
    { id: 1, url: '/images/hero_first_image.png', alt: 'HDPE Pipes - View 1' },
    { id: 2, url: '/images/hero_second_image.jpg', alt: 'Pipeline Infrastructure - View 2' },
    { id: 3, url: '/images/hero_third_image.jpg', alt: 'Industrial Piping - View 3' },
    { id: 4, url: '/images/hero_fourth_image.jpg', alt: 'Pipeline System - View 4' },
    { id: 5, url: '/images/hero_fifth_image.jpg', alt: 'Modern Pipes - View 5' }
];

// Current image index for hero gallery
let currentImageIndex = 0;

// HDPE Manufacturing Steps data
const hdpeSteps = [
    {
        id: 1,
        title: 'Raw Material',
        heading: 'High-Grade Raw Material Selection',
        content: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.',
        features: [
            'PE100 grade material',
            'Optimal molecular weight distribution'
        ],
        image: '/images/high-grade.svg'
    },
    {
        id: 2,
        title: 'Extrusion',
        heading: 'Advanced Extrusion Process',
        content: 'State-of-the-art extrusion technology ensures consistent quality and optimal material properties.',
        features: [
            'Precision temperature control',
            'Uniform material flow'
        ],
        image: '/images/high-grade.svg'
    },
    {
        id: 3,
        title: 'Cooling',
        heading: 'Controlled Cooling System',
        content: 'Advanced cooling technology maintains structural integrity and dimensional accuracy.',
        features: [
            'Water bath cooling',
            'Temperature monitoring'
        ],
        image: '/images/high-grade.svg'
    },
    {
        id: 4,
        title: 'Sizing',
        heading: 'Precision Sizing Process',
        content: 'Vacuum sizing ensures exact diameter specifications and wall thickness.',
        features: [
            'Automated sizing control',
            'Quality verification'
        ],
        image: '/images/high-grade.svg'
    },
    {
        id: 5,
        title: 'Quality Control',
        heading: 'Comprehensive Quality Testing',
        content: 'Multiple quality checkpoints ensure every pipe meets international standards.',
        features: [
            'Pressure testing',
            'Dimensional inspection'
        ],
        image: '/images/high-grade.svg'
    },
    {
        id: 6,
        title: 'Marking',
        heading: 'Product Identification',
        content: 'Clear marking system for traceability and compliance verification.',
        features: [
            'Standard markings',
            'Batch tracking codes'
        ],
        image: '/images/high-grade.svg'
    },
    {
        id: 7,
        title: 'Cutting',
        heading: 'Precision Cutting Process',
        content: 'Automated cutting ensures accurate lengths and clean edges.',
        features: [
            'Length precision',
            'Clean cut edges'
        ],
        image: '/images/high-grade.svg'
    },
    {
        id: 8,
        title: 'Packaging',
        heading: 'Protective Packaging',
        content: 'Careful packaging ensures safe transportation and storage.',
        features: [
            'Protective wrapping',
            'Secure bundling'
        ],
        image: '/images/high-grade.svg'
    }
];

// Current step index for HDPE section
let currentHdpeStep = 0;

// Last scroll position for sticky header
let lastScrollY = 0;

// ========================================
// STICKY HEADER FUNCTIONALITY
// ========================================

/**
 * Initialize sticky header behavior
 * Shows header when scrolling down past 25% of viewport height
 * Hides header when scrolling back up
 */
function initStickyHeader() {
    const stickyHeader = document.getElementById('stickyHeader');
    
    if (!stickyHeader) return;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        const triggerPoint = window.innerHeight / 4; // 25% of viewport height
        
        // Only activate sticky behavior after scrolling past trigger point
        if (currentScrollY > triggerPoint) {
            // Scrolling down - show header
            if (currentScrollY > lastScrollY) {
                stickyHeader.classList.add('show');
            } 
            // Scrolling up - hide header
            else {
                stickyHeader.classList.remove('show');
            }
        } else {
            // Above trigger point - keep header hidden
            stickyHeader.classList.remove('show');
        }
        
        // Update last scroll position
        lastScrollY = currentScrollY;
    });
}

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

/**
 * Initialize mobile menu toggle functionality
 * Handles opening/closing mobile menu and managing body scroll
 */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    
    if (!hamburgerBtn || !mobileMenu || !mobileMenuOverlay) return;
    
    // Function to open menu
    function openMenu() {
        hamburgerBtn.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    
    // Function to close menu
    function closeMenu() {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    
    // Toggle menu when hamburger button is clicked
    hamburgerBtn.addEventListener('click', function() {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when overlay is clicked
    mobileMenuOverlay.addEventListener('click', closeMenu);
    
    // Close menu when close button is clicked
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMenu);
    }
    
    // Close menu when any menu item is clicked
    const menuItems = mobileMenu.querySelectorAll('.mobile-menu-item, .btn-primary-mobile');
    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
}

// ========================================
// HERO IMAGE GALLERY FUNCTIONALITY
// ========================================

/**
 * Initialize hero image gallery with thumbnails and navigation
 */
function initHeroGallery() {
    const mainImage = document.getElementById('mainImage');
    const imageCounter = document.getElementById('imageCounter');
    const prevBtn = document.getElementById('prevImageBtn');
    const nextBtn = document.getElementById('nextImageBtn');
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    
    if (!mainImage || !thumbnailGallery) return;
    
    // Generate thumbnail buttons
    heroImages.forEach((image, index) => {
        const thumbnailBtn = document.createElement('button');
        thumbnailBtn.className = 'thumbnail-btn';
        thumbnailBtn.setAttribute('type', 'button');
        thumbnailBtn.setAttribute('aria-label', `View ${image.alt}`);
        
        if (index === currentImageIndex) {
            thumbnailBtn.classList.add('active');
            thumbnailBtn.setAttribute('aria-current', 'true');
        }
        
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = image.url;
        thumbnailImg.alt = image.alt;
        thumbnailImg.className = 'thumbnail-img';
        
        thumbnailBtn.appendChild(thumbnailImg);
        thumbnailBtn.addEventListener('click', () => updateMainImage(index));
        thumbnailGallery.appendChild(thumbnailBtn);
    });
    
    // Previous button click handler
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentImageIndex = currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1;
            updateMainImage(currentImageIndex);
        });
    }
    
    // Next button click handler
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentImageIndex = currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1;
            updateMainImage(currentImageIndex);
        });
    }
}

/**
 * Update main image and thumbnails when a new image is selected
 * @param {number} index - Index of the image to display
 */
function updateMainImage(index) {
    const mainImage = document.getElementById('mainImage');
    const imageCounter = document.getElementById('imageCounter');
    const thumbnailButtons = document.querySelectorAll('.thumbnail-btn');
    
    // Update current index
    currentImageIndex = index;
    
    // Update main image
    if (mainImage) {
        mainImage.src = heroImages[index].url;
        mainImage.alt = heroImages[index].alt;
    }
    
    // Update counter
    if (imageCounter) {
        imageCounter.textContent = `${index + 1} / ${heroImages.length}`;
    }
    
    // Update thumbnail active states
    thumbnailButtons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
            btn.setAttribute('aria-current', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-current', 'false');
        }
    });
}

// ========================================
// IMAGE ZOOM ON HOVER FUNCTIONALITY
// ========================================

/**
 * Initialize zoom effect on main image hover
 * Shows zoomed preview in a separate box
 */
function initImageZoom() {
    const mainImageContainer = document.getElementById('mainImageContainer');
    const mainImage = document.getElementById('mainImage');
    const zoomPreview = document.getElementById('zoomPreview');
    
    if (!mainImageContainer || !mainImage || !zoomPreview) return;
    
    // Show zoom preview on mouse enter
    mainImageContainer.addEventListener('mouseenter', function() {
        zoomPreview.style.display = 'block';
        zoomPreview.style.backgroundImage = `url(${mainImage.src})`;
    });
    
    // Update zoom position and background position on mouse move
    mainImageContainer.addEventListener('mousemove', function(e) {
        const rect = mainImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        zoomPreview.style.backgroundPosition = `${x}% ${y}%`;
    });
    
    // Hide zoom preview on mouse leave
    mainImageContainer.addEventListener('mouseleave', function() {
        zoomPreview.style.display = 'none';
    });
}

// ========================================
// FAQ ACCORDION FUNCTIONALITY
// ========================================

/**
 * Initialize FAQ accordion functionality
 * Allows opening/closing individual FAQ items
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');
        
        if (!question) return;
        
        question.addEventListener('click', function() {
            // Check if this item is already open
            const isOpen = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqIcon = faq.querySelector('.faq-icon');
                if (faqIcon) {
                    faqIcon.src = '/images/accordian-close.svg';
                }
            });
            
            // If the clicked item was not open, open it
            if (!isOpen) {
                item.classList.add('active');
                if (icon) {
                    icon.src = '/images/accordian-open.svg';
                }
            }
        });
    });
}

// ========================================
// VERSATILE SECTION CAROUSEL
// ========================================

/**
 * Initialize carousel navigation for versatile applications section
 */
function initVersatileCarousel() {
    const carousel = document.getElementById('versatileCarousel');
    const leftBtn = document.getElementById('versatileLeftBtn');
    const rightBtn = document.getElementById('versatileRightBtn');
    
    if (!carousel || !leftBtn || !rightBtn) return;
    
    // Scroll amount (card width + gap)
    const scrollAmount = 340;
    
    // Left button click handler
    leftBtn.addEventListener('click', function() {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Right button click handler
    rightBtn.addEventListener('click', function() {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// ========================================
// HDPE MANUFACTURING PROCESS SECTION
// ========================================

/**
 * Initialize HDPE manufacturing process step navigation
 */
function initHdpeSection() {
    const desktopChipsContainer = document.getElementById('hdpeChipsDesktop');
    const mobileChip = document.getElementById('hdpeChipsMobile');
    const prevBtn = document.getElementById('hdpePrevBtn');
    const nextBtn = document.getElementById('hdpeNextBtn');
    
    // Generate desktop step chips
    if (desktopChipsContainer) {
        hdpeSteps.forEach((step, index) => {
            // Create chip button
            const chip = document.createElement('button');
            chip.className = index === 0 ? 'chip-active' : 'chip-inactive';
            chip.textContent = step.title;
            chip.setAttribute('type', 'button');
            chip.addEventListener('click', () => updateHdpeStep(index));
            
            desktopChipsContainer.appendChild(chip);
            
            // Add separator line between chips (except after last chip)
            if (index < hdpeSteps.length - 1) {
                const line = document.createElement('div');
                line.className = 'hdpe-step-line';
                desktopChipsContainer.appendChild(line);
            }
        });
    }
    
    // Mobile previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentHdpeStep = currentHdpeStep === 0 ? hdpeSteps.length - 1 : currentHdpeStep - 1;
            updateHdpeStep(currentHdpeStep);
        });
    }
    
    // Mobile next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentHdpeStep = currentHdpeStep === hdpeSteps.length - 1 ? 0 : currentHdpeStep + 1;
            updateHdpeStep(currentHdpeStep);
        });
    }
    
    // Initialize with first step
    updateHdpeStep(0);
}

/**
 * Update HDPE step content and UI
 * @param {number} stepIndex - Index of the step to display
 */
function updateHdpeStep(stepIndex) {
    currentHdpeStep = stepIndex;
    const step = hdpeSteps[stepIndex];
    
    // Update mobile chip
    const mobileChip = document.querySelector('.hdpe-chips-mobile .chip-active');
    if (mobileChip) {
        mobileChip.textContent = `Step ${stepIndex + 1}/${hdpeSteps.length}: ${step.title}`;
    }
    
    // Update desktop chips
    const desktopChips = document.querySelectorAll('#hdpeChipsDesktop button');
    desktopChips.forEach((chip, index) => {
        if (index === stepIndex) {
            chip.className = 'chip-active';
        } else {
            chip.className = 'chip-inactive';
        }
    });
    
    // Update heading
    const heading = document.getElementById('hdpeHeading');
    if (heading) {
        heading.textContent = step.heading;
    }
    
    // Update description
    const description = document.getElementById('hdpeDescription');
    if (description) {
        description.textContent = step.content;
    }
    
    // Update features list
    const featuresList = document.getElementById('hdpeFeatures');
    if (featuresList) {
        featuresList.innerHTML = '';
        step.features.forEach(feature => {
            const li = document.createElement('li');
            
            const img = document.createElement('img');
            img.src = '/images/CheckCircle.svg';
            img.alt = '';
            
            li.appendChild(img);
            li.appendChild(document.createTextNode(feature));
            featuresList.appendChild(li);
        });
    }
    
    // Update image
    const image = document.getElementById('hdpeImage');
    if (image) {
        image.src = step.image;
        image.alt = step.title;
    }
}

// ========================================
// CONTACT FORM HANDLING
// ========================================

/**
 * Initialize contact form submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const companyName = document.getElementById('companyName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted:', {
            fullName,
            companyName,
            email,
            phone
        });
        
        // Show success message (you can customize this)
        alert('Thank you for your inquiry! We will contact you soon.');
        
        // Reset form
        form.reset();
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

/**
 * Add smooth scrolling behavior to all anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// INITIALIZE ALL FUNCTIONALITY
// ========================================

/**
 * Main initialization function
 * Called when DOM is fully loaded
 */
function init() {
    // Initialize all features
    initStickyHeader();
    initMobileMenu();
    initHeroGallery();
    initImageZoom();
    initFaqAccordion();
    initVersatileCarousel();
    initHdpeSection();
    initContactForm();
    initSmoothScroll();
    
    console.log('All features initialized successfully!');
}

// ========================================
// DOM READY EVENT LISTENER
// ========================================

// Wait for DOM to be fully loaded before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already loaded
    init();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function to limit how often a function can be called
 * Useful for scroll and resize events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// WINDOW RESIZE HANDLER
// ========================================

/**
 * Handle window resize events
 * Useful for responsive adjustments
 */
const handleResize = debounce(function() {
    // Add any resize-specific logic here if needed
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);
