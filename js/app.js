/**
 * BOLATA - Common Application Logic (Static UI)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Toggle (Admin Layout)
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggle = document.getElementById('sidebar-toggle');

    if (toggle && sidebar && overlay) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        });
    }

    // 2. Form Confirmations
    document.querySelectorAll('form[data-confirm], [data-confirm-action]').forEach((el) => {
        el.addEventListener('submit', (event) => {
            const msg = el.dataset.confirm || el.dataset.confirmAction || 'Yakin ingin melanjutkan tindakan ini?';
            if (!window.confirm(msg)) {
                event.preventDefault();
            }
        });
    });

    // 3. Auto Dismiss Alerts
    document.querySelectorAll('[data-auto-dismiss]').forEach((alert) => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-6px)';
            setTimeout(() => alert.remove(), 400);
        }, 4000);
    });

    // 4. Pegawai Topbar Mobile Nav
    const userNavToggle = document.getElementById('user-nav-toggle');
    const userNav = document.getElementById('user-nav');

    if (userNavToggle && userNav) {
        userNavToggle.addEventListener('click', () => {
            userNav.classList.toggle('open');
        });

        userNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                userNav.classList.remove('open');
            });
        });
    }

    // 5. Pegawai Scrollspy
    const userNavLinks = document.querySelectorAll('.user-nav-link');
    if (userNavLinks.length) {
        const spyTargets = [];

        userNavLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const el = document.querySelector(href);
                if (el) {
                    spyTargets.push({ id: href.slice(1), el });
                }
            }
        });

        const updateActive = () => {
            let current = spyTargets.length ? spyTargets[0].id : '';
            const offset = window.scrollY + 120;

            spyTargets.forEach((target) => {
                if (target.el.offsetTop <= offset) {
                    current = target.id;
                }
            });

            userNavLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        };

        window.addEventListener('scroll', updateActive, { passive: true });
        updateActive();
    }

    // 6. Scroll Effects (Topbar & Back-to-top)
    const topbar = document.getElementById('user-topbar');
    const backToTop = document.getElementById('back-to-top');

    if (topbar || backToTop) {
        const onScroll = () => {
            if (topbar) {
                topbar.classList.toggle('scrolled', window.scrollY > 45);
            }
            if (backToTop) {
                backToTop.classList.toggle('show', window.scrollY > 400);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // 7. Counter Animation
    const counterValues = document.querySelectorAll('.feature-item-value[data-count]');
    if ('IntersectionObserver' in window && counterValues.length) {
        const animateCount = (el) => {
            const target = parseInt(el.dataset.count, 10) || 0;
            const duration = 900;
            const start = performance.now();

            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased);
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        };

        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        counterValues.forEach((el) => counterObserver.observe(el));
    }

    // 8. Logout Form Action in Static Mock
    document.querySelectorAll('.logout-btn, form[action*="logout"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof BolataStore !== 'undefined') {
                BolataStore.logout();
            }
            window.location.href = 'index.html';
        });
    });

    // 9. Sync Topbar/Sidebar Current User Information
    if (typeof BolataStore !== 'undefined') {
        const user = BolataStore.getCurrentUser();
        if (user) {
            const initial = (user.name || 'U').charAt(0).toUpperCase();
            const roleName = user.role === 'admin' ? 'Admin' : 'Pegawai';

            document.querySelectorAll('.avatar:not(.user-logo)').forEach(av => {
                if (!av.classList.contains('static-avatar')) {
                    av.textContent = initial;
                }
            });
            document.querySelectorAll('.sidebar-user-name, .topbar-user-name').forEach(el => {
                el.textContent = user.name;
            });
            document.querySelectorAll('.sidebar-user-role, .topbar-user-role').forEach(el => {
                el.textContent = roleName;
            });
        }
    }
});
