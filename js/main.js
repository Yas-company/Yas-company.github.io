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

 // AI Assistant Chatbot - Yas Company
const knowledgeBase = {
  // 🧱 الخدمات العامة
  'ما هي خدماتكم؟': 'نقدم مجموعة شاملة من الخدمات الرقمية تشمل: تطوير تطبيقات الجوال، تطوير المواقع الإلكترونية، برمجة الأنظمة الخلفية، حلول التكامل بين الأنظمة، تصميم واجهات المستخدم وتجربة المستخدم (UI/UX)، الدعم الفني والاستشارات التقنية.',
  'خدمات': 'تشمل خدمات YAS: تصميم وتطوير المواقع، برمجة تطبيقات الجوال، تطوير الأنظمة الخلفية، خدمات الـ API والتكامل، تحسين تجربة المستخدم، وخدمات ما بعد الإطلاق مثل الدعم الفني والصيانة.',
  'هل تقدمون خدمات تصميم واجهات المستخدم؟': 'نعم، نمتلك فريق تصميم متخصص يقدم تجارب مستخدم فريدة وتصميمات احترافية تتماشى مع هوية عملك وتحقق سهولة الاستخدام.',

  // 📱 التطبيقات
  'هل تطورون تطبيقات جوال؟': 'نعم، نقوم بتطوير تطبيقات مخصصة تعمل على أنظمة iOS وAndroid باستخدام تقنيات حديثة مثل Flutter وReact Native وSwift. نحن نهتم بجودة الأداء وتجربة المستخدم.',
  'هل تدعمون نشر التطبيقات على المتاجر؟': 'نعم، نحن نقدم خدمة رفع التطبيقات على متجري App Store وGoogle Play بما يشمل تجهيز الملفات، إعداد الإعلانات، وضمان توافق التطبيق مع سياسات المتاجر.',
  
  // 🌐 المواقع والأنظمة
  'هل تصممون مواقع متجاوبة؟': 'بالتأكيد، جميع المواقع التي نقوم بتطويرها متجاوبة بالكامل مع شاشات الجوال والأجهزة اللوحية لضمان أفضل تجربة للمستخدم.',
  'هل تبرمجون لوحات تحكم خاصة؟': 'نعم، نصمم ونطور لوحات تحكم مخصصة حسب احتياجات العميل، مع واجهات سهلة الاستخدام وإمكانيات متقدمة لإدارة المحتوى أو النظام.',
  
  // ☁️ الحلول السحابية والتكامل
  'ما هي مميزات الحلول السحابية التي تقدمونها؟': 'حلول YAS السحابية توفر أمان عالي، نسخ احتياطي، مرونة في التوسع، وصول من أي مكان، وتكلفة أقل من البنية التحتية التقليدية.',
  'هل يمكنكم دمج الأنظمة مع أنظمة خارجية؟': 'نعم، نقدم خدمات التكامل مع الأنظمة الأخرى مثل أنظمة ERP، CRM، بوابات الدفع، أو أنظمة الجهات الحكومية، عبر API وخدمات ربط مخصصة.',
  
  // 📊 التسويق والتحليل
  'كيف يمكنني قياس نجاح حملات التسويق الرقمي؟': 'نستخدم أدوات تحليلية متقدمة لتقديم تقارير شاملة تشمل معدل التحويل، عدد الزيارات، تكلفة الاكتساب، العائد على الاستثمار، وغيرها.',
  'هل تقدمون خدمات تسويق رقمي؟': 'نعم، نقدم خدمات تسويق رقمي متكاملة تشمل إدارة الحملات الإعلانية، تحسين محركات البحث SEO، التسويق عبر وسائل التواصل، وإنشاء المحتوى الإبداعي.',
  
  // ⚙️ التخصيص والدعم
  'هل يمكنكم تطوير حلول مخصصة حسب احتياجات شركتنا؟': 'نعم، نحن متخصصون في تقديم حلول برمجية مخصصة تناسب طبيعة عمل كل عميل، سواء كان نظامًا داخليًا، منصة إلكترونية، أو تطبيق خاص.',
  'هل تقدمون خدمات للشركات الناشئة؟': 'ندعم الشركات الناشئة بنماذج عمل مرنة وخطط تطوير تتماشى مع الميزانية وتساعد على الانطلاق التقني السريع وتحقيق الأهداف.',
  'هل تقدمون باقات دعم فني؟': 'نعم، لدينا باقات دعم فني متنوعة تشمل صيانة دورية، إصلاح مشاكل فورية، مراقبة الأداء، واستشارات فنية مستمرة.',
  'دعم': 'دعمنا الفني متاح 24/7 ويشمل التحديثات الأمنية، إصلاح الأعطال، الاستجابة السريعة، والاستشارات التقنية.',
  
  // 💼 نماذج العمل والأسعار
  'ما هي نماذج العمل في YAS؟': 'نقدم 5 نماذج عمل: (1) تنفيذ المشروع بدون التزام مستقبلي، (2) تنفيذ مع دعم فني مستمر، (3) شراكة تشغيلية مقابل نسبة من الأرباح، (4) شراكة استراتيجية بملكية مشتركة، (5) استثمار مباشر من YAS مع ملكية مسيطرة.',
  'ما هي تكلفة الخدمات؟': 'التكلفة تعتمد على متطلبات المشروع. نوفر عروض أسعار شفافة حسب المدة، التقنيات المطلوبة، وحجم العمل. تواصل معنا للحصول على عرض مفصل.',
  'سعر': 'تختلف أسعار مشاريع YAS حسب حجم العمل، التقنيات المطلوبة، والمدة الزمنية. قدم لنا تفاصيل مشروعك لنرسل لك تسعيرة دقيقة.',
  
  // ⏳ الجدول الزمني
  'ما هي مدة تنفيذ مشروع تطوير موقع إلكتروني؟': 'مدة تطوير الموقع تعتمد على مدى تعقيده. المواقع الصغيرة تستغرق 2-4 أسابيع، المتوسطة 6-8 أسابيع، والمشاريع الكبرى تصل إلى 12 أسبوع أو أكثر.',
  'كم يستغرق تنفيذ تطبيق جوال؟': 'تطوير تطبيق جوال عادةً يستغرق بين 6 إلى 12 أسبوع حسب التعقيد والوظائف المطلوبة. بعض التطبيقات المخصصة قد تأخذ وقت أطول.',
  'وقت': 'الوقت يختلف حسب حجم وتعقيد المشروع. المشاريع الصغيرة قد تستغرق أسابيع قليلة، أما الأنظمة الأكبر فقد تحتاج من شهرين إلى ثلاثة.',
  
  // 📞 التواصل
  'كيف يمكنني التواصل معكم؟': 'يمكنك التواصل معنا عبر:\n📧 البريد الإلكتروني: yascontact@gmail.com\n📞 الهاتف: +966 50 195 0787\n🌐 أو عبر نموذج التواصل على موقعنا الرسمي وسنرد خلال 24 ساعة.',
  'تواصل': 'راسلنا على yascontact@gmail.com أو اتصل على +966 50 195 0787، أو عبر نموذج التواصل على موقعنا.',
  
  // ℹ️ أسئلة عامة
  'من هي YAS؟': 'YAS هي شركة تقنية سعودية متخصصة في تطوير الحلول الرقمية المبتكرة للشركات والجهات الحكومية والناشئة. نركز على الجودة، السرعة، والمرونة.',
  'أين يقع مقر YAS؟': 'مقر YAS الرئيسي في المملكة العربية السعودية، مع إمكانية تقديم الخدمات للعملاء في جميع أنحاء الخليج والعالم.',
  'هل تعملون مع جهات حكومية؟': 'نعم، لدينا خبرة في العمل مع الجهات الحكومية ونلتزم بجميع المعايير الأمنية والتنظيمية المطلوبة.'
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