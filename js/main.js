document.addEventListener("DOMContentLoaded", function () {
  // Feature Cards Animation
  const featureObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("feature-fade-in")) {
            entry.target.style.animation = "fadeIn 0.8s ease forwards";
            entry.target.style.opacity = "1";
          } else {
            entry.target.style.animation = "fadeInUp 0.6s ease forwards";
            entry.target.style.opacity = "1";
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  document.querySelectorAll(".feature-card").forEach((card, index) => {
    card.style.transitionDelay = index * 100 + "ms";
    featureObserver.observe(card);
  });

  document.querySelectorAll(".feature-fade-in").forEach((element) => {
    featureObserver.observe(element);
  });

  // Work Steps Animation
  const workSteps = document.querySelectorAll('.work-step');
  
  // Set initial state for all work steps
  workSteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(32px)';
    step.style.transition = 'all 0.6s ease-out';
  });
  
  const workObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a small delay based on the step index for staggered animation
        const stepIndex = Array.from(workSteps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, stepIndex * 150); // 150ms delay between each step
        
        // Update progress bar if it exists
        const progress = document.querySelector(".work-progress");
        if (progress) {
          setTimeout(() => {
            progress.style.width = (stepIndex + 1) * (100 / 6) + "%";
            progress.style.transition = "width 0.6s ease";
          }, stepIndex * 150);
        }
      } else {
        // Reset animation when out of view (optional - for re-triggering)
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(32px)';
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  
  workSteps.forEach((step, index) => {
    workObserver.observe(step);
  });

  // FAQ Accordion
  const faqButtons = document.querySelectorAll(".faq-button");
  faqButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector(".faq-icon");
      if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        icon.classList.remove("ri-add-line");
        icon.classList.add("ri-subtract-line");
      } else {
        content.classList.add("hidden");
        icon.classList.remove("ri-subtract-line");
        icon.classList.add("ri-add-line");
      }
    });
  });

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
      // Deactivate all in this group
      tabPanes.forEach(pane => pane.classList.remove('active'));
      tabButtons.forEach(button => button.classList.remove('active'));

      // Activate the target
      const targetPane = tabContent.querySelector(`#${targetId}`);
      const targetButton = container.querySelector(`[data-tab="${targetId}"]`);

      if (targetPane && targetButton) {
        targetPane.classList.add('active');
        targetButton.classList.add('active');
      }
    };

    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = button.getAttribute('data-tab');
        switchTab(tabId);
      });
    });
  }

  initializeTabGroup('#why-yas');
  initializeTabGroup('#policies-models');
  // --- END NEW UNIFIED TAB SYSTEM ---

  // AI Assistant Chatbot
  const knowledgeBase = {
    'ما هي مدة تنفيذ مشروع تطوير موقع إلكتروني؟': 'تختلف مدة تنفيذ المشروع حسب حجمه وتعقيده، ولكن بشكل عام تتراوح مدة تطوير موقع إلكتروني بسيط من 2-4 أسابيع، بينما قد تستغرق المواقع المتوسطة والكبيرة من 6-12 أسبوع. نقوم بتحديد جدول زمني دقيق بعد دراسة متطلبات المشروع.',
    'هل تقدمون خدمات الصيانة والدعم الفني بعد إطلاق الموقع؟': 'نعم، نقدم خدمات صيانة ودعم فني شاملة بعد إطلاق الموقع. لدينا باقات دعم فني مختلفة تشمل تحديثات دورية، إصلاح الأخطاء، تحسينات الأداء، والمساعدة الفنية على مدار الساعة. نضمن استمرارية عمل موقعك بكفاءة وأمان.',
    'كيف يمكنني قياس نجاح حملات التسويق الرقمي؟': 'نقدم تقارير تحليلية دورية مفصلة تتضمن مؤشرات الأداء الرئيسية مثل عدد الزيارات، معدل التحويل، معدل الارتداد، تكلفة الاستحواذ على العميل، والعائد على الاستثمار. نستخدم أدوات تحليلية متقدمة لقياس أداء الحملات وتقديم رؤى قيمة لتحسينها باستمرار.',
    'ما هي مميزات الحلول السحابية التي تقدمونها؟': 'تتميز حلولنا السحابية بالمرونة العالية، حيث يمكن توسيعها أو تقليصها حسب احتياجات عملك. توفر مستوى عالٍ من الأمان مع تشفير البيانات ونسخ احتياطية منتظمة. كما أنها توفر إمكانية الوصول من أي مكان وأي جهاز، وتقلل من تكاليف البنية التحتية وتحسن الأداء والكفاءة.',
    'هل يمكنكم تطوير حلول مخصصة حسب احتياجات شركتنا؟': 'نعم، نحن متخصصون في تطوير حلول مخصصة تلبي الاحتياجات الفريدة لكل عميل. نبدأ بتحليل متطلبات عملك وتحدياته، ثم نصمم ونطور حلولاً مبتكرة تناسب طبيعة نشاطك وأهدافك. سواء كنت تحتاج إلى نظام إدارة مخصص، تطبيق جوال، أو منصة متكاملة، يمكننا تقديم الحل المناسب لك.',
    'ما هي خدماتكم؟': 'نقدم مجموعة متنوعة من الخدمات تشمل: تطوير تطبيقات الجوال، تطوير المواقع والأنظمة، تطوير الأنظمة الخلفية، خدمات التكامل، تصميم واجهات المستخدم، والدعم والاستشارات.',
    'كيف يمكنني التواصل معكم؟': 'يمكنك التواصل معنا عبر:\nالبريد الإلكتروني: yascontact@gmail.com\nالهاتف: <span dir="ltr">+966 50 195 0787</span>\nأو يمكنك ملء نموذج التواصل في موقعنا وسنعاود الاتصال بك.',
    'ما هي تكلفة الخدمات؟': 'تختلف التكلفة حسب نوع وحجم المشروع. يمكنك التواصل معنا للحصول على عرض سعر مفصل يناسب احتياجاتك ومتطلبات مشروعك.',
    'هل تقدمون خدمات للشركات الناشئة؟': 'نعم، نحن ندعم الشركات الناشئة في رحلة نموها التقني ونقدم حلولاً مخصصة تناسب ميزانياتها واحتياجاتها مع نماذج عمل مرنة.',
    'ما هي نماذج العمل في YAS؟': 'نقدم 5 نماذج عمل: التنفيذ الكامل بدون التزام مستقبلي، التنفيذ والدعم الفني المستمر، شراكة تشغيلية مع مشاركة الأرباح، شراكة ستراتيجية بملكية مشتركة، واستثمار مباشر من YAS بملكية مسيطرة.',
    'خدمات': 'نقدم خدمات: تطوير تطبيقات الجوال، تطوير المواقع والأنظمة، تطوير الأنظمة الخلفية، خدمات التكامل، تصميم واجهات المستخدم، والدعم والاستشارات.',
    'تواصل': 'يمكنك التواصل معنا عبر:\nالبريد الإلكتروني: yascontact@gmail.com\nالهاتف: <span dir="ltr">+966 50 195 0787</span>',
    'سعر': 'تختلف التكلفة حسب نوع وحجم المشروع. تواصل معنا للحصول على عرض سعر مفصل.',
    'وقت': 'المدة تختلف حسب حجم المشروع: المواقع البسيطة 2-4 أسابيع، والمتوسطة 6-12 أسبوع.',
    'دعم': 'نقدم دعم فني شامل 24/7 يشمل الصيانة والتحديثات وحل المشاكل.'
  };

  const toggleChat = document.getElementById('toggle-chat');
  const closeChat = document.getElementById('close-chat');
  const chatWindow = document.getElementById('chat-window');
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendMessage = document.getElementById('send-message');

  // Debug logging
  console.log('🤖 Chatbot Debug Info:');
  console.log('toggleChat element:', toggleChat);
  console.log('chatWindow element:', chatWindow);
  console.log('chatMessages element:', chatMessages);

  function addMessage(message, isUser = false) {
    if (!chatMessages) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
    messageDiv.innerHTML = `
      <div class="max-w-[80%] ${isUser ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'} rounded-lg px-4 py-2">
        ${message.split('\n').join('<br>')}
      </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function processUserInput(input) {
    const question = input.trim();
    let answer = 'عذراً، لم أجد إجابة محددة لسؤالك. يمكنك التواصل معنا مباشرة عبر نموذج الاتصال أو الهاتف: <span dir="ltr">+966 50 195 0787</span> للحصول على المساعدة المطلوبة.';
    
    // Check for exact matches or partial matches
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (question.toLowerCase().includes(key.toLowerCase()) ||
          key.toLowerCase().includes(question.toLowerCase()) ||
          containsKeywords(question, key)) {
        answer = value;
        break;
      }
    }
    
    addMessage(question, true);
    setTimeout(() => addMessage(answer), 500);
  }

  function containsKeywords(userInput, faqQuestion) {
    const userWords = userInput.toLowerCase().split(' ');
    const faqWords = faqQuestion.toLowerCase().split(' ');
    
    // Check if at least 2 key words match
    let matchCount = 0;
    for (const word of userWords) {
      if (word.length > 2 && faqWords.some(faqWord => faqWord.includes(word) || word.includes(faqWord))) {
        matchCount++;
      }
    }
    return matchCount >= 2;
  }

  // Event listeners with null checks
  if (toggleChat && chatWindow) {
    console.log('✅ Adding click event listener to toggle button');
    toggleChat.addEventListener('click', function() {
      console.log('🖱️ Toggle button clicked!');
      chatWindow.classList.toggle('hidden');
      console.log('Chat window hidden class:', chatWindow.classList.contains('hidden'));
    });
  } else {
    console.log('❌ Toggle button or chat window not found');
    console.log('Available elements with IDs:', document.querySelectorAll('[id]'));
  }
  
  if (closeChat && chatWindow) {
    closeChat.addEventListener('click', () => chatWindow.classList.add('hidden'));
  }
  
  if (sendMessage && userInput) {
    sendMessage.addEventListener('click', () => {
      const message = userInput.value.trim();
      if (message) {
        processUserInput(message);
        userInput.value = '';
      }
    });
  }

  if (userInput) {
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && userInput.value.trim()) {
        processUserInput(userInput.value);
        userInput.value = '';
      }
    });
  }

  // Add welcome message
  setTimeout(() => {
    addMessage('مرحباً! أنا المساعد الذكي لشركة YAS. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن خدماتنا، مدة التنفيذ، التكلفة، أو أي استفسار آخر.');
  }, 1000);

  // Manual test function accessible from console
  window.testChatbot = function() {
    console.log('🧪 Testing chatbot manually...');
    const btn = document.getElementById('toggle-chat');
    const window = document.getElementById('chat-window');
    if (btn && window) {
      btn.click();
      console.log('✅ Chatbot test successful!');
    } else {
      console.log('❌ Chatbot elements not found');
    }
  };

  console.log('💡 You can test the chatbot manually by typing: testChatbot() in the console');

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