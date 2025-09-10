import Api from "./api.js";

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light";
    this.init();
  }

  init() {
    document.documentElement.setAttribute("data-theme", this.theme);
    this.updateThemeIcon();
    this.bindEvents();
  }

  toggle() {
    this.theme = this.theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", this.theme);
    localStorage.setItem("theme", this.theme);
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const icon = document.querySelector("#theme-toggle i");
    if (icon) {
      icon.className = this.theme === "light" ? "fas fa-moon" : "fas fa-sun";
    }
  }

  bindEvents() {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggle());
    }
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// Form Enhancement
class FormManager {
  constructor() {
    this.form = document.getElementById("contactform");
    this.messageDiv = document.getElementById("message-div");
    this.init();
  }

  init() {
    if (this.form) {
      this.bindEvents();
      this.setupCharacterCount();
    }
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  setupCharacterCount() {
    const textarea = document.getElementById("contents");
    const charCount = document.querySelector(".char-count");

    if (textarea && charCount) {
      textarea.addEventListener("input", () => {
        const count = textarea.value.length;
        charCount.textContent = `${count}/1000`;

        if (count > 900) {
          charCount.style.color = "#ef4444";
        } else if (count > 700) {
          charCount.style.color = "#f59e0b";
        } else {
          charCount.style.color = "#6b7280";
        }
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const submitBtn = this.form.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(this.form);
      const response = await fetch(this.form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        this.showMessage(
          "Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.",
          "success"
        );
        this.form.reset();
        document.querySelector(".char-count").textContent = "0/1000";
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      this.showMessage(
        "Sorry, there was an error sending your message. Please try again or contact me directly.",
        "error"
      );
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  showMessage(message, type) {
    this.messageDiv.textContent = message;
    this.messageDiv.className = `form-message ${type}`;
    this.messageDiv.style.display = "block";

    setTimeout(() => {
      this.messageDiv.style.display = "none";
    }, 5000);
  }
}

// Use existing Api class from api.js - no need to redeclare

// Portfolio Manager
class PortfolioManager {
  constructor() {
    this.featuredContainer = document.getElementById("featured-project");
    this.projectsGrid = document.getElementById("projects-grid");
    this.init();
  }

  async init() {
    console.log("=== PortfolioManager initializing ===");

    try {
      const projectData = await Api.getProjects();
      console.log("API Response received:", projectData);

      // API returns array directly or object with results
      const projects = Array.isArray(projectData) ? projectData : (projectData?.results || []);
      console.log(`Loaded ${projects.length} projects:`, projects);

      // Always hide loading states first
      this.hideLoadingStates();

      if (projects.length > 0) {
        // Sort projects by ID (newest first - higher ID = latest project)
        const sortedProjects = projects.sort((a, b) => {
          return b.id - a.id; // Newest first (highest ID first)
        });
        
        console.log("Rendering featured project...");
        this.renderFeaturedProject(sortedProjects[0]); // Latest project as featured
        console.log("Rendering projects grid...");
        this.renderProjectsGrid(sortedProjects.slice(1)); // Rest of projects in descending order
        console.log("Projects rendering completed");
      } else {
        console.log("No projects found");
        this.showError();
      }
    } catch (error) {
      console.error("Portfolio loading failed:", error);
      this.hideLoadingStates();
      this.showError();
    }
  }

  renderFeaturedProject(project) {
    if (!this.featuredContainer || !project) {
      console.log("No featured container or project:", this.featuredContainer, project);
      return;
    }

    console.log("Rendering featured project:", project.title);

    const techBadges = (project.technologies || [])
      .map((tech) => `<span class="tech-badge">${tech.name || tech}</span>`)
      .join("");

    const liveLink = project.link_to_live_version
      ? `<a href="${project.link_to_live_version}" target="_blank" class="featured-link primary">
           <i class="fas fa-external-link-alt"></i> Live Demo
         </a>`
      : "";

    const sourceLink = project.link_to_source
      ? `<a href="${project.link_to_source}" target="_blank" class="featured-link secondary">
           <i class="fab fa-github"></i> Source Code
         </a>`
      : "";

    const featuredHTML = `
      <div class="featured-content">
        <div class="featured-image">
          <img src="${project.image || 'assets/img/project-placeholder.png'}" alt="${project.title}" onerror="this.src='assets/img/project-placeholder.png'">
          <div class="featured-overlay">
            ${liveLink}
            ${sourceLink}
          </div>
        </div>
        <div class="featured-info">
          <span class="project-category">Featured Project</span>
          <h3>${project.title}</h3>
          <p>${this.truncateText(project.description, 300)}</p>
          <div class="featured-tech">
            ${techBadges}
          </div>
          <div class="featured-links">
            ${liveLink}
            ${sourceLink}
          </div>
        </div>
      </div>
    `;

    console.log("Setting featured container innerHTML");
    this.featuredContainer.innerHTML = featuredHTML;
    console.log("Featured project rendered successfully");
  }

  renderProjectsGrid(projects) {
    // Check for work-card-container first (original structure)
    const workCardContainer = document.getElementById("work-card-container");
    const projectsGrid = document.getElementById("projects-grid");
    
    const targetContainer = workCardContainer || projectsGrid;
    
    if (!targetContainer || !projects.length) {
      console.log("No container or projects to render:", targetContainer, projects.length);
      return;
    }

    console.log("Rendering projects grid with", projects.length, "projects");

    // Use original main.js structure
    let htmlCard = "";
    
    for (let index = 0; index < projects.length; index++) {
      const project = projects[index];
      
      let techStackHTML = "";
      (project.technologies || []).forEach((tech) => {
        techStackHTML += `<li class="t-stack"><a type="button" class="btn-tech-stacks">${tech.name || tech}</a></li>`;
      });

      htmlCard += `<div class="card-container">
        <div class="work-card">
          <div class="work-card-image">
            <img src="${project.image || 'assets/img/project-placeholder.png'}" alt="${project.title}" onerror="this.src='assets/img/project-placeholder.png'">
          </div>
          <div class="work-card-body">
            <h1>${project.title}</h1>
            <p class="work-description">
              ${this.truncateText(project.description, 150)}
            </p>
            <div class="work-tech-stack">
              <div class="tech-scroll-container">
                <ul class="ul-links tech-slider">
                  ${techStackHTML}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="work-card-footer">
          <button value="${project.id}" type="button" class="footer-btn" data-project='${JSON.stringify(project).replace(/'/g, "&apos;")}'>
            View Project Details
          </button>
        </div>
      </div>`;
    }

    console.log("Setting container innerHTML");
    targetContainer.innerHTML = htmlCard;
    
    // Add event listeners to project buttons
    this.addProjectButtonListeners(projects);
    
    console.log("Projects grid rendered successfully");
  }

  addProjectButtonListeners(projects) {
    const buttons = document.querySelectorAll('.footer-btn');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const projectId = parseInt(e.target.value);
        const project = projects.find(p => p.id === projectId);
        if (project) {
          this.showProjectModal(project);
        }
      });
    });
  }

  showProjectModal(project) {
    const modal = document.getElementById("project-modal");
    const title = document.getElementById("title");
    const description = document.getElementById("work-description");
    const image = document.getElementById("project-image");
    const liveLink = document.getElementById("live-link");
    const sourceLink = document.getElementById("work-source");
    const techStackContainer = document.querySelector(".work-details-tech-stack");

    if (title) title.textContent = project.name || project.title;
    if (description) description.textContent = project.description;
    if (image) {
      image.src = project.image || 'assets/img/project-placeholder.png';
      image.onerror = () => image.src = 'assets/img/project-placeholder.png';
    }
    if (liveLink) {
      liveLink.href = project.link_to_live_version || "#";
      liveLink.style.display = project.link_to_live_version ? 'flex' : 'none';
    }
    if (sourceLink) {
      sourceLink.href = project.link_to_source || "#";
      sourceLink.style.display = project.link_to_source ? 'flex' : 'none';
    }

    // Add tech stack to modal
    if (techStackContainer && project.technologies) {
      const techHTML = project.technologies.map(tech => 
        `<li class="t-stack"><button type="button" class="btn-tech-stacks">${tech.name || tech}</button></li>`
      ).join('');
      techStackContainer.innerHTML = `<ul class="work-details-items">${techHTML}</ul>`;
    }

    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  truncateText(text, maxLength) {
    if (!text) return "No description available";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  showError() {
    console.log("Showing error state");
    if (this.featuredContainer) {
      this.featuredContainer.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Unable to load projects. Please try again later.</p>
        </div>
      `;
    }
    
    if (this.projectsGrid) {
      this.projectsGrid.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Unable to load projects. Please try again later.</p>
        </div>
      `;
    }
  }

  hideLoadingStates() {
    // Hide loading spinners
    const loadingElements = document.querySelectorAll('.featured-loading, .projects-loading');
    loadingElements.forEach(el => {
      if (el) el.style.display = 'none';
    });
  }
}

// Intersection Observer for animations
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document
      .querySelectorAll(
        ".skill-category, .project-card, .about-highlights, .contact-method"
      )
      .forEach((el) => {
        observer.observe(el);
      });
  }
}

// Mobile Menu Handler
class MobileMenu {
  constructor() {
    this.init();
  }

  init() {
    const hamburger = document.querySelector(".hamburger-mobile-icon");
    const mobileMenu = document.querySelector(".mobile-icon-menu");

    if (hamburger) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        if (mobileMenu) {
          mobileMenu.classList.toggle("active");
        }
      });
    }
  }
}

// Resume Download Handler
class ResumeManager {
  constructor() {
    this.init();
  }

  init() {
    const resumeButtons = document.querySelectorAll(
      "#download-resume, #get-resume, .btn-get-my-resume"
    );
    resumeButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.downloadResume();
      });
    });
  }

  downloadResume() {
    alert("Resume download will be available soon!");
  }
}

// Mobile Menu Manager
class MobileMenuManager {
  constructor() {
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("nav-menu");
    this.init();
  }

  init() {
    if (this.hamburger) {
      this.hamburger.addEventListener("click", () => {
        this.hamburger.classList.toggle("active");
        if (this.navMenu) {
          this.navMenu.classList.toggle("active");
        }
      });
    }

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.hamburger.classList.remove("active");
        if (this.navMenu) {
          this.navMenu.classList.remove("active");
        }
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("=== Portfolio Website Initializing ===");

  // Initialize all managers
  new ThemeManager();
  new FormManager();
  new PortfolioManager();
  new AnimationManager();
  new MobileMenuManager();

  // Resume download handler
  const resumeBtn = document.getElementById("download-resume");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Resume download will be available soon!");
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Handle modal close
document.addEventListener("click", (e) => {
  const modal = document.getElementById("project-modal");
  if (e.target.classList.contains("close") || e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Handle escape key for modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("project-modal");
    if (modal && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }
});

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
