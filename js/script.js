$(document).ready(function() {
    // Variables for image slider
    let currentSlide = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;
    let slideInterval;

    // Click on welcome screen
    $('.welcome-screen').click(function() {
        $(this).fadeOut(800, function() {
            $('.main-content').removeClass('d-none');
            
            // Create confetti
            for (let i = 0; i < 100; i++) {
                createConfetti();
            }
            
            // Create additional bubbles
            createBubbles();
            
            // Start image slider
            startImageSlider();
            
            // Age counter
            $('.counter').counterUp({
                delay: 20,
                time: 2000
            });
            
            // Animate progress bar
            $('.progress-bar').css('width', '100%');
            
            // Auto-play music when card opens
            const audio = $('.birthday-song')[0];
            audio.play().catch(e => {
                console.log("Browser couldn't auto-play audio: ", e);
                $('.music-btn').click(); // Try manual play if auto fails
            });
        });
    });
    
    // Create confetti
    function createConfetti() {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        
        const confetti = $('<div class="confetti"></div>');
        $('.birthday-card').append(confetti);
        
        // Random position
        const leftPos = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 15 + 5;
        const animationDuration = Math.random() * 3 + 3;
        const shape = Math.random() > 0.5 ? '50%' : '0';
        
        // Apply styles
        confetti.css({
            'left': leftPos + '%',
            'background-color': color,
            'width': size + 'px',
            'height': size + 'px',
            'border-radius': shape,
            'animation-delay': Math.random() * 5 + 's',
            'animation-duration': animationDuration + 's'
        });
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
    
    // Create bubbles
    function createBubbles() {
        const bubblesContainer = $('.bubbles-container');
        
        for (let i = 0; i < 15; i++) {
            const bubble = $('<div class="bubble"></div>');
            bubblesContainer.append(bubble);
            
            // Random properties
            const size = Math.random() * 20 + 10;
            const leftPos = Math.random() * 100;
            const animationDuration = Math.random() * 10 + 10;
            const delay = Math.random() * 15;
            
            // Apply styles
            bubble.css({
                'position': 'absolute',
                'width': size + 'px',
                'height': size + 'px',
                'background': 'rgba(255, 255, 255, 0.3)',
                'border-radius': '50%',
                'bottom': '-30px',
                'left': leftPos + '%',
                'animation': `bubbleRise ${animationDuration}s linear infinite ${delay}s`
            });
        }
    }
    
    // Image slider functions
    function startImageSlider() {
        slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }
    
    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }
    
    function prevSlide() {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }
    
    function goToSlide(n) {
        slides.eq(currentSlide).removeClass('active');
        currentSlide = n;
        slides.eq(currentSlide).addClass('active');
    }
    
    // Slider controls
    $('.next-btn').click(function() {
        clearInterval(slideInterval);
        nextSlide();
        startImageSlider();
    });
    
    $('.prev-btn').click(function() {
        clearInterval(slideInterval);
        prevSlide();
        startImageSlider();
    });
    
    // Music play/pause button
    let isPlaying = true; // Music is playing by default
    const audio = $('.birthday-song')[0];
    
    $('.music-btn').click(function() {
        if (isPlaying) {
            audio.pause();
            $(this).html('<i class="fas fa-music"></i> تشغيل الموسيقى');
        } else {
            audio.play();
            $(this).html('<i class="fas fa-pause"></i> إيقاف الموسيقى');
        }
        isPlaying = !isPlaying;
    });
    
    // Show wishes button
    $('.wishes-btn').click(function() {
        $('.wishes-modal').fadeIn();
    });
    
    // Close wishes button
    $('.close-btn').click(function() {
        $('.wishes-modal').fadeOut();
    });
    
    // Close when clicking outside modal
    $(window).click(function(e) {
        if ($(e.target).hasClass('wishes-modal')) {
            $('.wishes-modal').fadeOut();
        }
    });
});