// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Add animation classes to elements
  addAnimations()

  // Setup event listeners
  setupEventListeners()

  // Initialize counters
  animateCounters()

  // Setup live badge animation
  animateLiveBadge()

  // Setup menu interaction
  setupMenuInteraction()
}

function addAnimations() {
  // Add fade-in animation to main sections
  const sections = document.querySelectorAll(
    ".description-section, .stats-section, .services-section, .winners-section",
  )
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add("fade-in")
    }, index * 200)
  })

  // Add slide-up animation to cards
  const cards = document.querySelectorAll(".service-card, .winner-card")
  cards.forEach((card, index) => {
    setTimeout(
      () => {
        card.classList.add("slide-up")
      },
      500 + index * 100,
    )
  })
}

function setupEventListeners() {
  // Service buttons
  const serviceButtons = document.querySelectorAll(".service-btn")
  serviceButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      handleServiceBooking(this)
    })
  })

  // Winner buttons
  const winnerButtons = document.querySelectorAll(".winner-btn")
  winnerButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      handleWinnerDetails(this)
    })
  })

  // Add hover effects to cards
  const allCards = document.querySelectorAll(".service-card, .winner-card")
  allCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.transition = "transform 0.3s ease"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

function handleServiceBooking(button) {
  const card = button.closest(".service-card")
  const serviceTitle = card.querySelector(".service-title").textContent

  // Add loading state
  const originalText = button.textContent
  button.textContent = "جاري التحميل..."
  button.disabled = true

  // Simulate booking process
  setTimeout(() => {
    showSuccessMessage(`تم حجز ${serviceTitle} بنجاح! سيتم التواصل معك قريباً.`)
    button.textContent = originalText
    button.disabled = false
  }, 2000)
}

function handleWinnerDetails(button) {
  const card = button.closest(".winner-card")
  const winnerTitle = card.querySelector(".winner-title").textContent
  const winnerAmount = card.querySelector(".winner-amount").textContent

  showInfoMessage(`تفاصيل ${winnerTitle}:\nالجائزة: ${winnerAmount}\nمبروك للفائز!`)
}

function animateCounters() {
  const statNumber = document.querySelector(".stat-number")
  if (statNumber) {
    const targetNumber = 50000
    let currentNumber = 0
    const increment = targetNumber / 100
    const duration = 2000 // 2 seconds
    const stepTime = duration / 100

    const timer = setInterval(() => {
      currentNumber += increment
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber
        clearInterval(timer)
      }
      statNumber.textContent = `# ${Math.floor(currentNumber).toLocaleString("ar-SA")}`
    }, stepTime)
  }
}

function animateLiveBadge() {
  const liveBadge = document.querySelector(".live-badge")
  if (liveBadge) {
    setInterval(() => {
      liveBadge.style.opacity = "0.5"
      setTimeout(() => {
        liveBadge.style.opacity = "1"
      }, 500)
    }, 2000)
  }
}

function setupMenuInteraction() {
  const menuIcon = document.querySelector(".menu-icon")

  menuIcon.addEventListener("click", function () {
    this.classList.toggle("active")

    // Add rotation animation to menu lines
    const spans = this.querySelectorAll("span")
    if (this.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      spans.forEach((span) => {
        span.style.transform = "none"
        span.style.opacity = "1"
      })
    }
  })
}

// Show success message
function showSuccessMessage(message) {
  const messageDiv = createMessageDiv(message, "success")
  document.body.appendChild(messageDiv)

  setTimeout(() => {
    messageDiv.remove()
  }, 3000)
}

// Show info message
function showInfoMessage(message) {
  const messageDiv = createMessageDiv(message, "info")
  document.body.appendChild(messageDiv)

  setTimeout(() => {
    messageDiv.remove()
  }, 3000)
}

// Create message div
function createMessageDiv(message, type) {
  const messageDiv = document.createElement("div")
  messageDiv.textContent = message
  messageDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: ${type === "success" ? "#10b981" : "#3b82f6"};
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    z-index: 2000;
    animation: slideInRight 0.5s ease-out;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    white-space: pre-line;
  `

  // Add animation keyframes
  if (!document.querySelector("#message-animations")) {
    const style = document.createElement("style")
    style.id = "message-animations"
    style.textContent = `
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `
    document.head.appendChild(style)
  }

  return messageDiv
}

// Add smooth scrolling and parallax effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const background = document.querySelector(".background-image")

  if (background) {
    background.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Handle window resize
window.addEventListener("resize", () => {
  // Adjust card position on mobile
  const isMobile = window.innerWidth < 768
  const contentContainer = document.querySelector(".content-container")

  if (isMobile) {
    contentContainer.style.padding = "80px 15px 30px"
  } else {
    contentContainer.style.padding = "100px 20px 50px"
  }
})

// Add touch support for mobile devices
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device")

  // Add touch feedback for buttons
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("touchstart", function () {
      this.style.opacity = "0.7"
    })

    button.addEventListener("touchend", function () {
      this.style.opacity = "1"
    })
  })
}

// Smooth scroll for card content
const mainCard = document.querySelector(".main-card")
if (mainCard) {
  mainCard.addEventListener("wheel", (e) => {
    e.preventDefault()
    mainCard.scrollTop += e.deltaY * 0.5
  })
}
