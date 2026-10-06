/**
 * BOLATA - Global Demo Navigator Dock
 * Menyediakan navigasi instan antar 15 view dan switcher role di GitHub Pages
 */

(function() {
    function initDemoDock() {
        if (document.getElementById('bolata-demo-dock')) return;

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const user = (typeof BolataStore !== 'undefined') ? BolataStore.getCurrentUser() : { role: 'admin', name: 'Admin BOLATA' };

        const dockContainer = document.createElement('div');
        dockContainer.id = 'bolata-demo-dock';
        dockContainer.className = 'bolata-demo-dock';

        const viewSections = [
            {
                title: 'Halaman Publik & Pegawai',
                icon: '🌐',
                links: [
                    { title: 'Halaman Login', file: 'index.html', badge: 'Auth' },
                    { title: 'Dashboard Pegawai (Single Page)', file: 'user-dashboard.html', badge: 'Pegawai' }
                ]
            },
            {
                title: 'Admin - Dashboard & User',
                icon: '🛡️',
                links: [
                    { title: 'Dashboard Admin', file: 'admin-dashboard.html', badge: 'Admin' },
                    { title: 'Kelola User (Tabel)', file: 'admin-users.html', badge: 'CRUD' },
                    { title: 'Tambah User (Form)', file: 'admin-user-create.html', badge: 'Form' },
                    { title: 'Edit User (Form)', file: 'admin-user-edit.html', badge: 'Form' }
                ]
            },
            {
                title: 'Admin - Kelola Tim',
                icon: '🏢',
                links: [
                    { title: 'Kelola Tim (Tabel)', file: 'admin-teams.html', badge: 'CRUD' },
                    { title: 'Tambah Tim (Form)', file: 'admin-team-create.html', badge: 'Form' },
                    { title: 'Edit Tim (Form)', file: 'admin-team-edit.html', badge: 'Form' }
                ]
            },
            {
                title: 'Admin - Link Tim',
                icon: '🔗',
                links: [
                    { title: 'Link Tim (Tabel)', file: 'admin-links.html', badge: 'CRUD' },
                    { title: 'Tambah Link Tim (Form)', file: 'admin-link-create.html', badge: 'Form' },
                    { title: 'Edit Link Tim (Form)', file: 'admin-link-edit.html', badge: 'Form' }
                ]
            },
            {
                title: 'Admin - Link Inovasi',
                icon: '💡',
                links: [
                    { title: 'Link Inovasi (Tabel)', file: 'admin-innovation-links.html', badge: 'CRUD' },
                    { title: 'Tambah Link Inovasi (Form)', file: 'admin-innovation-link-create.html', badge: 'Form' },
                    { title: 'Edit Link Inovasi (Form)', file: 'admin-innovation-link-edit.html', badge: 'Form' }
                ]
            }
        ];

        let linksHtml = '';
        viewSections.forEach(section => {
            linksHtml += `<div class="dock-section-title"><span>${section.icon}</span> ${section.title}</div><div class="dock-view-list">`;
            section.links.forEach(l => {
                const isActive = (currentPath === l.file || (currentPath === '' && l.file === 'index.html'));
                linksHtml += `
                    <a href="${l.file}" class="dock-link-item ${isActive ? 'active' : ''}">
                        <span class="dock-link-left">
                            <span>${isActive ? '👉' : '•'}</span>
                            <span>${l.title}</span>
                        </span>
                        <span class="dock-link-badge">${l.badge}</span>
                    </a>
                `;
            });
            linksHtml += `</div>`;
        });

        const activeRole = user.role || 'admin';
        const isUserPegawai = activeRole === 'pegawai';

        dockContainer.innerHTML = `
            <div class="dock-panel" id="dock-panel">
                <div class="dock-header">
                    <div class="dock-title-group">
                        <div class="dock-logo-mini">
                            <img src="images/logobps.png" alt="BPS">
                        </div>
                        <div>
                            <h4 class="dock-title">BOLATA Preview Dock</h4>
                            <span class="dock-subtitle">Semua 15 Tampilan Tersedia</span>
                        </div>
                    </div>
                    <button type="button" class="dock-close-btn" id="dock-close-btn" title="Tutup">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div class="dock-body">
                    <div class="dock-role-switcher">
                        <div class="dock-current-user">
                            <span class="avatar">${(user.name || 'U').charAt(0).toUpperCase()}</span>
                            <div class="dock-user-desc">
                                <strong>${user.name || 'Admin BOLATA'}</strong>
                                <span>Role: <b style="color: ${activeRole === 'admin' ? '#F7941D' : '#00AEEF'}">${activeRole.toUpperCase()}</b></span>
                            </div>
                        </div>
                        <div class="dock-role-options">
                            <button type="button" class="dock-role-btn ${activeRole === 'admin' ? 'active' : ''}" data-role-switch="admin">
                                🛡️ Admin
                            </button>
                            <button type="button" class="dock-role-btn ${isUserPegawai && user.email === 'budi@bolata.test' ? 'active' : ''}" data-role-switch="budi">
                                👤 Budi (TI)
                            </button>
                            <button type="button" class="dock-role-btn ${isUserPegawai && user.email === 'siti@bolata.test' ? 'active' : ''}" data-role-switch="siti">
                                👤 Siti (Keu)
                            </button>
                        </div>
                    </div>

                    ${linksHtml}
                </div>
                <div class="dock-footer">
                    <span style="font-size: 11px; color: #94A3B8; display: inline-flex; align-items: center; gap: 5px;">
                        <span>🔒</span> <span>Data Paten (Read-Only)</span>
                    </span>
                    <span class="dock-gh-badge">GitHub Pages</span>
                </div>
            </div>

            <button type="button" class="dock-trigger-btn" id="dock-trigger-btn">
                <span class="dock-pulse-dot"></span>
                <span>⚡ Demo Navigator</span>
            </button>
        `;

        document.body.appendChild(dockContainer);

        const trigger = document.getElementById('dock-trigger-btn');
        const panel = document.getElementById('dock-panel');
        const closeBtn = document.getElementById('dock-close-btn');

        trigger.addEventListener('click', () => {
            panel.classList.toggle('show');
        });

        closeBtn.addEventListener('click', () => {
            panel.classList.remove('show');
        });

        // Close on outer click
        document.addEventListener('click', (e) => {
            if (!dockContainer.contains(e.target)) {
                panel.classList.remove('show');
            }
        });

        // Role switch handling
        dockContainer.querySelectorAll('[data-role-switch]').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.roleSwitch;
                if (typeof BolataStore !== 'undefined') {
                    if (target === 'admin') {
                        BolataStore.login('admin@bolata.test');
                        window.location.href = 'admin-dashboard.html';
                    } else if (target === 'budi') {
                        BolataStore.login('budi@bolata.test');
                        window.location.href = 'user-dashboard.html';
                    } else if (target === 'siti') {
                        BolataStore.login('siti@bolata.test');
                        window.location.href = 'user-dashboard.html';
                    }
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDemoDock);
    } else {
        initDemoDock();
    }
})();
