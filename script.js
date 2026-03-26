document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.getElementById('hero-content');
    const scrollContainer = document.getElementById('hero-scroll-container');
    const heroSticky = document.getElementById('hero-sticky');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // The total scroll distance before the Hero un-pins
        let maxScroll = scrollContainer.offsetHeight - window.innerHeight; 
        
        if (scrollY <= maxScroll) {
            // Progress goes from 0 to 1 as you scroll
            let progress = scrollY / maxScroll; 
            
            // Exponential scale for that "fly-through" tunnel feeling (1x up to 8x)
            let scaleValue = 1 + Math.pow(progress, 2) * 7; 
            
            // Opacity stays solid, then fades out rapidly towards the end
            let opacityValue = 1 - Math.pow(progress, 2.5) * 1.5; 
            if (opacityValue < 0) opacityValue = 0; 
            
            heroContent.style.transform = `scale(${scaleValue})`;
            heroContent.style.opacity = opacityValue;
            
            if (opacityValue > 0) {
                heroContent.style.visibility = 'visible';
                heroSticky.style.pointerEvents = 'auto'; // Enable clicks on Hero
            } else {
                heroContent.style.visibility = 'hidden';
                heroSticky.style.pointerEvents = 'none'; // Let clicks pass through to About Me
            }
        } else {
            heroContent.style.visibility = 'hidden';
            heroSticky.style.pointerEvents = 'none';
        }
    }, { passive: true });
});