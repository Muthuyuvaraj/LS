/* =========================
   LOAD HEADER - Loads header component into all pages
   ========================= */

async function loadHeader() {
  try {
    // Determine the correct path to components based on current page location
    const pathSegments = window.location.pathname.split('/').filter(segment => segment);
    let headerPath = '/components/header.html';
    
    // Adjust path if we're in a subdirectory
    if (pathSegments.length > 1 && pathSegments[0] === 'pages') {
      if (pathSegments[1] === 'services') {
        headerPath = '../../components/header.html';
      } else {
        headerPath = '../components/header.html';
      }
    }
    
    const response = await fetch(headerPath);
    if (!response.ok) throw new Error('Failed to load header');
    
    const headerHTML = await response.text();
    
    // Insert header at the beginning of body
    const body = document.body;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerHTML;
    
    // Extract elements in order
    const header = tempDiv.querySelector('header.top-header');
    const nav = tempDiv.querySelector('nav.nav');
    const overlay = tempDiv.querySelector('.panel-overlay');
    const aside = tempDiv.querySelector('aside.mobile-panel');
    
    // Insert in correct order: header first, then nav, then overlay, then aside
    if (header) body.insertBefore(header, body.firstChild);
    if (nav) body.insertBefore(nav, body.firstChild.nextSibling);
    if (overlay) body.insertBefore(overlay, body.firstChild.nextSibling.nextSibling);
    if (aside) body.insertBefore(aside, body.firstChild.nextSibling.nextSibling.nextSibling);
    
    // Insert any remaining elements
    while (tempDiv.firstChild) {
      body.insertBefore(tempDiv.firstChild, body.firstChild);
    }
    
    // Initialize header functionality after loading
    if (typeof initializeHeader === 'function') {
      initializeHeader();
    }
  } catch (error) {
    console.error('Error loading header:', error);
  }
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  loadHeader();
}
