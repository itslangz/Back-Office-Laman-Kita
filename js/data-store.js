/**
 * BOLATA - Static Data Store (Read-Only Preview)
 * Data dummy bersifat statis dan permanen (tidak dapat di-CRUD) agar fokus pada tampilan mockup/demo.
 */

const BolataStore = (function() {
    // Bersihkan storage lama jika pernah ada perubahan data
    try {
        localStorage.removeItem('bolata_static_data_v1');
    } catch (e) {}

    const SESSION_KEY = 'bolata_static_session_v1';

    // Data dummy paten / permanen sesuai seeder resmi BOLATA
    const staticData = Object.freeze({
        users: [
            { id: 1, name: 'Admin BOLATA', email: 'admin@bolata.test', role: 'admin', team_id: null },
            { id: 2, name: 'Budi Santoso', email: 'budi@bolata.test', role: 'pegawai', team_id: 1 },
            { id: 3, name: 'Siti Rahayu', email: 'siti@bolata.test', role: 'pegawai', team_id: 2 },
            { id: 4, name: 'Ahmad Fauzi', email: 'ahmad@bolata.test', role: 'pegawai', team_id: 3 }
        ],
        teams: [
            { id: 1, name: 'Tim Teknologi Informasi', description: 'Mengelola infrastruktur digital, sistem informasi, dan dukungan teknis kantor.' },
            { id: 2, name: 'Tim Keuangan', description: 'Mengelola anggaran, pembukuan, dan laporan keuangan kantor.' },
            { id: 3, name: 'Tim Sumber Daya Manusia', description: 'Mengelola kepegawaian, kesejahteraan, dan pengembangan karyawan.' }
        ],
        links: [
            { id: 1, team_id: 1, title: 'Google Workspace', url: 'https://workspace.google.com', description: 'Email dan dokumen kolaborasi kantor.' },
            { id: 2, team_id: 1, title: 'Sistem Kepegawaian', url: 'https://example.com/kepegawaian', description: 'Portal data pegawai terpadu.' },
            { id: 3, team_id: 2, title: 'e-Budgeting', url: 'https://example.com/ebudgeting', description: 'Perencanaan dan pelaporan anggaran.' },
            { id: 4, team_id: 2, title: 'Aplikasi Kas', url: 'https://example.com/kas', description: 'Pencatatan kas harian.' },
            { id: 5, team_id: 3, title: 'Portal HRD', url: 'https://example.com/hrd', description: 'Pengajuan cuti, izin, dan kesejahteraan.' },
            { id: 6, team_id: 3, title: 'Jadwal Pelatihan', url: 'https://example.com/pelatihan', description: 'Kalender pelatihan dan pengembangan.' }
        ],
        innovationLinks: [
            { id: 1, title: 'Portal Inovasi', url: 'https://example.com/inovasi', description: 'Wadah berbagi ide inovasi antar pegawai.' },
            { id: 2, title: 'Ide & Saran', url: 'https://forms.gle/example', description: 'Formulir pengumpulan ide dan saran.' }
        ]
    });

    // Session Management (Hanya untuk simulasi login/ganti role tanpa mengubah data)
    function getCurrentUser() {
        try {
            const sess = localStorage.getItem(SESSION_KEY);
            if (sess) {
                const parsed = JSON.parse(sess);
                const found = staticData.users.find(u => u.id === parsed.id || u.email === parsed.email);
                if (found) return found;
            }
        } catch (e) {}
        return staticData.users[0]; // Default: Admin
    }

    function setCurrentUser(user) {
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        } catch (e) {}
    }

    function login(email) {
        const found = staticData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        const user = found || staticData.users[0];
        setCurrentUser(user);
        return user;
    }

    function logout() {
        try {
            localStorage.removeItem(SESSION_KEY);
        } catch (e) {}
    }

    // Getters Read-Only
    function getUsers() {
        return JSON.parse(JSON.stringify(staticData.users));
    }

    function getUser(id) {
        return getUsers().find(u => u.id == id);
    }

    function getTeams() {
        const teams = JSON.parse(JSON.stringify(staticData.teams));
        const users = staticData.users;
        const links = staticData.links;

        return teams.map(t => {
            const teamLinks = links.filter(l => l.team_id == t.id);
            const teamUsers = users.filter(u => u.team_id == t.id);
            return {
                ...t,
                links: teamLinks,
                links_count: teamLinks.length,
                users_count: teamUsers.length
            };
        });
    }

    function getTeam(id) {
        return getTeams().find(t => t.id == id);
    }

    function getLinks() {
        const links = JSON.parse(JSON.stringify(staticData.links));
        const teams = staticData.teams;
        return links.map(l => {
            const team = teams.find(t => t.id == l.team_id);
            return {
                ...l,
                team: team || { id: null, name: '-' }
            };
        });
    }

    function getLink(id) {
        return getLinks().find(l => l.id == id);
    }

    function getInnovationLinks() {
        return JSON.parse(JSON.stringify(staticData.innovationLinks));
    }

    function getInnovationLink(id) {
        return getInnovationLinks().find(l => l.id == id);
    }

    function getStats() {
        return {
            users: staticData.users.length,
            teams: staticData.teams.length,
            links: staticData.links.length,
            innovationLinks: staticData.innovationLinks.length
        };
    }

    // Fungsi dummy CRUD (tidak mengubah data paten sama sekali)
    function addUser() { return true; }
    function updateUser() { return true; }
    function deleteUser() { return true; }
    function addTeam() { return true; }
    function updateTeam() { return true; }
    function deleteTeam() { return true; }
    function addLink() { return true; }
    function updateLink() { return true; }
    function deleteLink() { return true; }
    function addInnovationLink() { return true; }
    function updateInnovationLink() { return true; }
    function deleteInnovationLink() { return true; }

    return {
        getCurrentUser,
        setCurrentUser,
        login,
        logout,
        getUsers,
        getUser,
        addUser,
        updateUser,
        deleteUser,
        getTeams,
        getTeam,
        addTeam,
        updateTeam,
        deleteTeam,
        getLinks,
        getLink,
        addLink,
        updateLink,
        deleteLink,
        getInnovationLinks,
        getInnovationLink,
        addInnovationLink,
        updateInnovationLink,
        deleteInnovationLink,
        getStats
    };
})();
