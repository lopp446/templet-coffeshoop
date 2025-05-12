document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll Effect for Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Menu Items Filter
    const menuItems = [
        {
            name: "Espresso",
            description: "Strong black coffee made by forcing steam through ground coffee beans.",
            price: 25000,
            category: "coffee",
            image: "assets/images/expresso.jpg"
        },
        {
            name: "Cappuccino",
            description: "Espresso with steamed milk foam, often sprinkled with cocoa powder.",
            price: 26000,
            category: "coffee",
            image: "assets/images/cappuccino.jpg"
        },
        {
            name: "Latte",
            description: "Espresso with a lot of steamed milk and a small amount of foam.",
            price: 4.75,
            category: "coffee",
            image: "assets/images/lla.jpg"
        },
        {
            name: "Green Tea",
            description: "Traditional Japanese green tea with antioxidant properties.",
            price: 3.00,
            category: "tea",
            image: "assets/images/gt.jpg"
        },
        {
            name: "Chamomile Tea",
            description: "Herbal tea made from dried chamomile flowers, known for its calming effects.",
            price: 3.25,
            category: "tea",
            image: "assets/images/ce.jpg"
        },
        {
            name: "Chocolate Croissant",
            description: "Flaky buttery croissant with rich chocolate filling.",
            price: 3.75,
            category: "dessert",
            image: "assets/images/th.jpg"
        },
        {
            name: "Tiramisu",
            description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
            price: 5.50,
            category: "dessert",
            image: "assets/images/tiramisu.jpg"
        },
        {
            name: "Americano",
            description: "Espresso diluted with hot water, similar to drip coffee but with a different flavor profile.",
            price: 3.75,
            category: "coffee",
            image: "assets/images/americano.jpg"
        }
    ];
    
    const menuContainer = document.querySelector('.menu-items');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    function displayMenuItems(category = 'all') {
        menuContainer.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);
        
        filteredItems.forEach((item, index) => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.dataset.category = item.category;
            
            // Add delay for staggered animation
            menuItem.style.transitionDelay = `${index * 0.1}s`;
            
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-price">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;
            
            menuContainer.appendChild(menuItem);
            
            // Trigger animation after a small delay
            setTimeout(() => {
                menuItem.classList.add('visible');
            }, 50);
        });
    }
    
    // Initialize menu
    displayMenuItems();
    
    // Category filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            displayMenuItems(category);
        });
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
                
                if (entry.target.classList.contains('menu-section')) {
                    const menuItems = document.querySelectorAll('.menu-item');
                    menuItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sectionsToObserve = document.querySelectorAll('.about-section, .menu-section');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the data to a server
            console.log({ name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});