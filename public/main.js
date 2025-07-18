document.addEventListener("DOMContentLoaded", function () {
  // --- START NEW UNIFIED TAB SYSTEM ---
  function initializeTabGroup(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const tabButtons = container.querySelectorAll('[data-tab]');
    const tabContent = container.querySelector('.tab-content');
    
    if (!tabContent) return;
    const tabPanes = tabContent.querySelectorAll('.tab-pane');

    if (tabButtons.length === 0 || tabPanes.length === 0) return;

    const switchTab = (targetId) => {
      // Only deactivate tabs within THIS specific container
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        pane.style.display = 'none';
      });
      
      tabButtons.forEach(button => {
        button.classList.remove('active');
        // Reset button styles based on section - preserve existing classes
        if (containerSelector === '#why-yas') {
          // Reset Why YAS button styles
          button.className = "tab-button px-6 py-3 rounded-xl bg-accent/10 text-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-accent/20";
        } else if (containerSelector === '#policies-models') {
          // Reset Policies button styles - preserve existing classes
          button.classList.remove("text-primary", "border-primary", "active");
          button.classList.add("text-gray-500", "border-transparent");
          // Reset inline styles
          button.style.color = "#6b7280";
          button.style.borderColor = "transparent";
          button.style.backgroundColor = "";
        }
      });

      // Activate the target within THIS container only
      const targetPane = tabContent.querySelector(`#${targetId}`);
      const targetButton = container.querySelector(`[data-tab="${targetId}"]`);

      if (targetPane && targetButton) {
        targetPane.classList.add('active');
        targetPane.style.display = 'block';
        targetButton.classList.add('active');
        
        // Apply section-specific active styles
        if (containerSelector === '#why-yas') {
          // Why YAS active button styles
          targetButton.className = "tab-button active px-6 py-3 rounded-xl bg-primary text-background shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300";
        } else if (containerSelector === '#policies-models') {
          // Policies active button styles - preserve existing classes
          targetButton.classList.remove("text-gray-500", "border-transparent");
          targetButton.classList.add("text-primary", "border-primary", "active");
          // Apply inline styles for visibility
          targetButton.style.color = "#00CCFF";
          targetButton.style.borderColor = "#00CCFF";
          targetButton.style.backgroundColor = "rgba(0, 204, 255, 0.05)";
        }
      }
    };

    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = button.getAttribute('data-tab');
        switchTab(tabId);
      });
    });

    // Initialize the first tab as active for each section
    if (tabButtons.length > 0) {
      const firstTabId = tabButtons[0].getAttribute('data-tab');
      switchTab(firstTabId);
    }
  }

  // Initialize each tab group independently
  initializeTabGroup('#why-yas');
  initializeTabGroup('#policies-models');
  // --- END NEW UNIFIED TAB SYSTEM ---

  // Service Selection Functionality
  document.querySelectorAll('a[data-service]').forEach(button => {
    button.addEventListener('click', function(e) {
      const serviceValue = this.getAttribute('data-service');
      
      // Store the selected service in sessionStorage to persist it
      if (serviceValue) {
        sessionStorage.setItem('selectedService', serviceValue);
      }
      
      // Small delay to ensure the page has scrolled to the form
      setTimeout(() => {
        const serviceDropdown = document.getElementById('service');
        if (serviceDropdown && serviceValue) {
          serviceDropdown.value = serviceValue;
          
          // Trigger validation for the service field
          if (window.validateServiceField) {
            window.validateServiceField(serviceValue);
          }
          
          // Update submit button state
          if (window.updateSubmitButton) {
            window.updateSubmitButton();
          }
          
          // Trigger change event to notify any other listeners
          const changeEvent = new Event('change', { bubbles: true });
          serviceDropdown.dispatchEvent(changeEvent);
          
          // Add a visual indication that the service was selected
          serviceDropdown.style.borderColor = '#00CCFF';
          serviceDropdown.style.boxShadow = '0 0 0 2px rgba(0, 204, 255, 0.2)';
          
          // Reset the visual indication after 2 seconds
          setTimeout(() => {
            serviceDropdown.style.borderColor = '';
            serviceDropdown.style.boxShadow = '';
          }, 2000);
        }
      }, 100);
    });
  });

  // Check if there's a stored service selection when page loads
  window.addEventListener('load', () => {
    const storedService = sessionStorage.getItem('selectedService');
    if (storedService) {
      const serviceDropdown = document.getElementById('service');
      if (serviceDropdown) {
        serviceDropdown.value = storedService;
        
        // Trigger validation for the service field
        if (window.validateServiceField) {
          window.validateServiceField(storedService);
        }
        
        // Update submit button state
        if (window.updateSubmitButton) {
          window.updateSubmitButton();
        }
        
        // Trigger change event
        const changeEvent = new Event('change', { bubbles: true });
        serviceDropdown.dispatchEvent(changeEvent);
        
        // Clear the stored service after using it
        sessionStorage.removeItem('selectedService');
      }
    }
  });

  // Modal State Management
  window.modalState = {
    open(title, message, type = 'success') {
      const modal = document.getElementById('status-modal');
      if (!modal) return;

      // Get Alpine.js component instance
      const modalComponent = Alpine.evaluate(modal, 'isOpen');
      if (!modalComponent) return;

      // Update modal content
      const contentDiv = modal.querySelector('#modal-content');
      if (contentDiv) {
        contentDiv.innerHTML = `
          <div class="mb-4" id="status-icon">
            ${type === 'success' ? '<i class="ri-checkbox-circle-line text-4xl text-green-500"></i>' : '<i class="ri-error-warning-line text-4xl text-red-500"></i>'}
          </div>
          <h3 class="text-2xl font-bold mb-2" id="status-title">${title}</h3>
          <p class="text-gray-300" id="status-message">${message}</p>
        `;
      }

      // Show modal using Alpine.js state
      modal.__x.$data.isOpen = true;
      modal.style.display = 'flex';
    },

    close() {
      const modal = document.getElementById('status-modal');
      if (!modal) return;

      // Hide modal using Alpine.js state
      modal.__x.$data.isOpen = false;
      setTimeout(() => {
        modal.style.display = 'none';
      }, 200); // Match the transition duration
    }
  };

  // Initialize modal close button
  document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => window.modalState.close());
    }
  });
}); 

document.addEventListener('DOMContentLoaded', function() {
  // Helper function to get all computed styles
  function getComputedStylesInfo(element) {
    const computed = window.getComputedStyle(element);
    return {
      background: computed.background,
      backgroundImage: computed.backgroundImage,
      backgroundColor: computed.backgroundColor,
      opacity: computed.opacity,
      color: computed.color
    };
  }

  // Debug specific elements
  const heroSection = document.querySelector('section');
  const gradientElements = document.querySelectorAll('[class*="gradient"], [class*="bg-"]');
  
  console.group('🎨 Hero Gradient Debug');
  console.log('Hero Section Styles:', getComputedStylesInfo(heroSection));
  
  gradientElements.forEach((el, index) => {
    console.group(`Element ${index + 1}`);
    console.log('Classes:', el.className);
    console.log('Computed Styles:', getComputedStylesInfo(el));
    console.groupEnd();
  });
  console.groupEnd();
});