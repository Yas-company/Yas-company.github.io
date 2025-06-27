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
        // Clear the stored service after using it
        sessionStorage.removeItem('selectedService');
      }
    }
  });
}); 