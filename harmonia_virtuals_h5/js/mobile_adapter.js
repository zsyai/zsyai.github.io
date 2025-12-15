(function() {
    // Prevent duplicate top bar
    if (document.getElementById('mobile-top-bar')) return;

    // Create Top Bar
    const topBar = document.createElement('div');
    topBar.id = 'mobile-top-bar';
    
    // We use a combination of standard CSS and env() for safe area support.
    // The height includes the base 60px plus the safe area inset.
    // Padding top ensures the content (back button, etc.) starts below the notch.
    topBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px; /* Fallback */
        height: calc(60px + env(safe-area-inset-top));
        background-color: #1e293b; /* Dark slate */
        z-index: 99999;
        display: flex;
        align-items: center;
        padding: 0 16px; /* Fallback */
        padding: env(safe-area-inset-top) 16px 0 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        box-sizing: border-box;
    `;

    // Back Button
    const backBtn = document.createElement('button');
    backBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
    `;
    backBtn.style.cssText = `
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        margin-right: 16px;
    `;
    
    // Back Logic
    backBtn.onclick = function() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback: If no history, try to go to index or home
            // Check if we are in a sub-page
            const path = window.location.pathname;
            if (!path.endsWith('index.html') && !path.endsWith('/')) {
                window.location.href = 'index.html';
            }
        }
    };
    
    // Spacer
    const spacer = document.createElement('div');
    spacer.style.flexGrow = '1';

    // Right side buffer for the "fixed button"
    // User requested a bar to avoid conflict. 
    // We reserve space but don't need to put anything there.
    const rightBuffer = document.createElement('div');
    rightBuffer.style.width = '80px'; // Reserve 80px on the right
    rightBuffer.style.height = '100%';

    // Do not show back button on index page
    const path = window.location.pathname;
    if (!path.endsWith('index.html') && !path.endsWith('/')) {
        topBar.appendChild(backBtn);
    }
    
    topBar.appendChild(spacer);
    topBar.appendChild(rightBuffer);

    document.body.prepend(topBar);

    // Adjust Layout
    const currentPadding = parseInt(window.getComputedStyle(document.body).paddingTop) || 0;
    
    // Special handling for intranet.html which has h-screen and hidden overflow
    const appContainer = document.querySelector('.h-screen');
    if (appContainer) {
         // This is likely intranet.html or similar app-like layout
         appContainer.style.height = 'calc(100vh - 60px)'; // Fallback
         appContainer.style.height = 'calc(100vh - (60px + env(safe-area-inset-top)))';
         
         appContainer.style.marginTop = '60px'; // Fallback
         appContainer.style.marginTop = 'calc(60px + env(safe-area-inset-top))';
    } else {
        // Standard flow pages
        // We add our bar height to the existing padding
        if (currentPadding === 0) {
             document.body.style.paddingTop = '60px'; // Fallback
             document.body.style.paddingTop = 'calc(60px + env(safe-area-inset-top))';
        } else {
             document.body.style.paddingTop = (currentPadding + 60) + 'px'; // Fallback
             document.body.style.paddingTop = `calc(${currentPadding}px + 60px + env(safe-area-inset-top))`;
        }
    }

    // Fix for other fixed/sticky headers and elements (like toasts)
    // We push them down so they sit below our top bar
    const fixedElements = document.querySelectorAll('.fixed, .sticky');
    fixedElements.forEach(el => {
        if (el.id === 'mobile-top-bar' || el.classList.contains('hidden')) return;
        // Skip full-screen modals to avoid pushing them down if they are centered
        if (el.classList.contains('inset-0') || (el.style.top === '0px' && el.style.bottom === '0px')) return;
        
        // Skip header
        if (el.tagName.toLowerCase() === 'header') return;

        const style = window.getComputedStyle(el);
        const topVal = parseInt(style.top);
        
        // If top is effectively 0 or small (e.g. < 50px), push it down
        // We check for "auto" which parses to NaN often, or the actual pixel value
        if (style.top !== 'auto' && !isNaN(topVal) && topVal < 50) {
             el.style.top = (topVal + 60) + 'px'; // Fallback
             el.style.top = `calc(${topVal}px + 60px + env(safe-area-inset-top))`;
        } else if (style.top === '0px') {
             el.style.top = '60px'; // Fallback
             el.style.top = 'calc(60px + env(safe-area-inset-top))';
        }
    });

})();