/**
 * 上海爱斯利嘉半导体科技有限公司 - 科技感交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initPage();
    
    // 绑定导航事件
    bindNavigation();
    
    // 绑定滚动效果
    bindScrollEffects();
    
    // 绑定表单提交
    bindFormSubmit();
    
    // 绑定页脚链接
    bindFooterLinks();
    
    // 初始化科技感特效
    initTechEffects();
    
    // 绑定鼠标跟随效果
    bindMouseEffects();
});

/**
 * 初始化页面
 */
function initPage() {
    // 默认显示首页
    showSection('home');
    updateActiveLink(document.querySelector('nav.navbar a[data-target="home"]'));
    
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 初始化数字增长动画
    initNumberAnimation();
}

/**
 * 初始化科技感特效
 */
function initTechEffects() {
    // 添加打字机效果到标题
    initTypewriterEffect();
    
    // 初始化粒子系统
    initParticleSystem();
    
    // 初始化视差滚动
    initParallaxEffect();
}

/**
 * 打字机效果
 */
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-section h2');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // 移除光标
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // 延迟开始打字效果
    setTimeout(typeWriter, 500);
}

/**
 * 粒子系统
 */
function initParticleSystem() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // 随机初始位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = (index * 0.5) + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    });
}

/**
 * 视差滚动效果
 */
function initParallaxEffect() {
    const glowOrbs = document.querySelectorAll('.glow-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        glowOrbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/**
 * 鼠标跟随效果
 */
function bindMouseEffects() {
    const cards = document.querySelectorAll('.tech-item, .solution-card, .service-card, .about-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 计算旋转角度
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

/**
 * 数字增长动画
 */
function initNumberAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(num => observer.observe(num));
}

function animateNumber(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 16);
}

/**
 * 绑定导航事件
 */
function bindNavigation() {
    document.querySelectorAll('nav.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            showSection(target);
            updateActiveLink(this);
            
            // 在移动设备上，点击导航链接后关闭侧边栏
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
            
            // 滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * 显示指定部分
 */
function showSection(sectionId) {
    // 隐藏所有部分
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标部分
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // 添加进入动画
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            targetSection.style.transition = 'all 0.5s ease';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 50);
    }
}

/**
 * 更新活动链接
 */
function updateActiveLink(activeLink) {
    document.querySelectorAll('nav.navbar a').forEach(link => {
        link.classList.remove('active');
    });
    
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

/**
 * 绑定滚动效果
 */
function bindScrollEffects() {
    // 导航栏滚动效果
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 26, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 212, 255, 0.1)';
        } else {
            header.style.background = 'rgba(10, 10, 26, 0.8)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // 元素进入视口动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有卡片
    document.querySelectorAll('.tech-item, .solution-card, .service-card, .about-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

/**
 * 绑定表单提交
 */
function bindFormSubmit() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 模拟提交
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('感谢您的留言！我们会尽快与您联系。');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

/**
 * 绑定页脚链接
 */
function bindFooterLinks() {
    document.querySelectorAll('.footer-section a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = href.substring(1);
                showSection(target);
                
                // 更新导航栏活动状态
                document.querySelectorAll('nav.navbar a').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('data-target') === target) {
                        navLink.classList.add('active');
                    }
                });
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 切换侧边栏（移动端）
 */
function toggleSidebar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

/**
 * 关闭侧边栏
 */
function closeSidebar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.remove('active');
}

// 添加一些额外的交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 为所有按钮添加点击波纹效果
    document.querySelectorAll('button, .submit-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(0, 212, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
