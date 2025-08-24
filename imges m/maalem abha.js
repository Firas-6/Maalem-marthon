// Page navigation functions
function showPage1() {
  document.getElementById("page1").style.display = "block"
  document.getElementById("page2").style.display = "none"

  // Smooth scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function showPage2() {
  document.getElementById("page1").style.display = "none"
  document.getElementById("page2").style.display = "block"

  // Smooth scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add smooth scrolling for internal links
document.addEventListener("DOMContentLoaded", () => {
  // Add click animations to cards
  const cards = document.querySelectorAll(".card, .race-card")
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // Add hover effects to buttons
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })

  // Add parallax effect to hero images
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroImages = document.querySelectorAll(".city-image, .marathon-image")

    heroImages.forEach((image) => {
      const rate = scrolled * -0.5
      image.style.transform = `translateY(${rate}px)`
    })
  })

  // Add loading animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  })

  // Observe all cards for animation
  const animatedElements = document.querySelectorAll(".card, .race-card, .description, .about")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
    observer.observe(el)
  })
})

// Add touch gestures for mobile
let startX = 0
let startY = 0

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX
  startY = e.touches[0].clientY
})

document.addEventListener("touchend", (e) => {
  if (!startX || !startY) return

  const endX = e.changedTouches[0].clientX
  const endY = e.changedTouches[0].clientY

  const diffX = startX - endX
  const diffY = startY - endY

  // Horizontal swipe detection
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) {
      // Swipe left - next page
      if (document.getElementById("page1").style.display !== "none") {
        showPage2()
      }
    } else {
      // Swipe right - previous page
      if (document.getElementById("page2").style.display !== "none") {
        showPage1()
      }
    }
  }

  startX = 0
  startY = 0
})

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    if (document.getElementById("page1").style.display !== "none") {
      showPage2()
    }
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    if (document.getElementById("page2").style.display !== "none") {
      showPage1()
    }
  }
})

// Add registration form handling
function handleRegistration(planType) {
  alert(`تم اختيار خطة ${planType}. سيتم توجيهك لصفحة التسجيل.`)
  // Here you would typically redirect to a registration form
}

// Add smooth transitions between pages
function smoothPageTransition(showPageFunc) {
  document.body.style.opacity = "0.8"
  setTimeout(() => {
    showPageFunc()
    document.body.style.opacity = "1"
  }, 200)
}
