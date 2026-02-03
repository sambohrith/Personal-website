/**
 * 上海爱斯利嘉半导体科技有限公司 - 前端交互脚本
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

/**
 * 绑定滚动效果
 */
function bindScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        // 头部滚动效果
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 元素进入视口动画
        animateOnScroll();
    });
    
    // 初始检查
    animateOnScroll();
}

/**
 * 元素进入视口时的动画
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-card, .about-card, .solution-card, .service-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

/**
 * 绑定表单提交
 */
function bindFormSubmit() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 模拟提交
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // 显示成功消息
                showNotification('感谢您的咨询！我们会尽快与您联系。', 'success');
                
                // 重置表单
                form.reset();
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
    document.querySelectorAll('footer a[data-target]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            showSection(target);
            updateActiveLink(document.querySelector(`nav.navbar a[data-target="${target}"]`));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

/**
 * 显示通知消息
 */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    // 添加关闭按钮样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .notification-close:hover { opacity: 1; }
    `;
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 绑定关闭事件
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // 自动关闭
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * 汉堡菜单切换函数
 */
function toggleSidebar() {
    const nav = document.querySelector('nav.navbar');
    const hamburger = document.querySelector('.hamburger');
    
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

/**
 * 关闭侧边栏
 */
function closeSidebar() {
    const nav = document.querySelector('nav.navbar');
    const hamburger = document.querySelector('.hamburger');
    
    nav.classList.remove('active');
    hamburger.classList.remove('active');
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
        
        // 重新触发滚动动画
        setTimeout(() => {
            animateOnScroll();
        }, 100);
    }
}

/**
 * 更新活动链接样式
 */
function updateActiveLink(clickedLink) {
    document.querySelectorAll('nav.navbar a').forEach(link => {
        link.classList.remove('active');
    });
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

/**
 * 数字增长动画
 */
function animateNumber(element, target, duration = 2000) {
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
 * 统计数字动画触发
 */
function triggerStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        stat.textContent = '0+';
        animateNumber(stat, target);
    });
}

// 当首页显示时触发统计动画
document.addEventListener('sectionChanged', function(e) {
    if (e.detail.section === 'home') {
        triggerStatsAnimation();
    }
});

// 监听页面可见性变化，优化性能
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停动画
        document.body.classList.add('paused');
    } else {
        // 页面可见时恢复动画
        document.body.classList.remove('paused');
    }
});
