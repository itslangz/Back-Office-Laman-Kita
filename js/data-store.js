/**
 * BOLATA - Client-side Data Store (LocalStorage)
 * Digunakan untuk demo statis di GitHub Pages agar fitur CRUD & Ganti Akun tetap interaktif.
 */

const BolataStore = (function() {
    const STORAGE_KEY = 'bolata_static_data_v1';
    const SESSION_KEY = 'bolata_static_session_v1';

    const defaultData = {
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
    };

    function loadData() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            saveData(defaultData);
            return JSON.parse(JSON.stringify(defaultData));
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            return JSON.parse(JSON.stringify(defaultData));
        }
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // Session Management
    function getCurrentUser() {
        const sess = localStorage.getItem(SESSION_KEY);
        if (sess) {
            try { return JSON.parse(sess); } catch (e) {}
        }
        // Default to Admin
        const users = getUsers();
        return users[0] || defaultData.users[0];
    }

    function setCurrentUser(user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }

    function login(email) {
        const users = getUsers();
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (found) {
            setCurrentUser(found);
            return found;
        }
        // Fallback default
        const fallback = users[0];
        setCurrentUser(fallback);
        return fallback;
    }

    function logout() {
        // Keep current session or reset to admin
        localStorage.removeItem(SESSION_KEY);
    }

    // Reset Data
    function resetData() {
        saveData(defaultData);
        setCurrentUser(defaultData.users[0]);
    }

    // Users
    function getUsers() {
        return loadData().users || [];
    }

    function getUser(id) {
        return getUsers().find(u => u.id == id);
    }

    function addUser(userData) {
        const data = loadData();
        const newId = data.users.length ? Math.max(...data.users.map(u => u.id)) + 1 : 1;
        const newUser = { id: newId, ...userData };
        data.users.push(newUser);
        saveData(data);
        return newUser;
    }

    function updateUser(id, userData) {
        const data = loadData();
        const idx = data.users.findIndex(u => u.id == id);
        if (idx !== -1) {
            data.users[idx] = { ...data.users[idx], ...userData };
            saveData(data);
            return data.users[idx];
        }
        return null;
    }

    function deleteUser(id) {
        const data = loadData();
        data.users = data.users.filter(u => u.id != id);
        saveData(data);
    }

    // Teams
    function getTeams() {
        const data = loadData();
        const teams = data.teams || [];
        const users = data.users || [];
        const links = data.links || [];

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

    function addTeam(teamData) {
        const data = loadData();
        const newId = data.teams.length ? Math.max(...data.teams.map(t => t.id)) + 1 : 1;
        const newTeam = { id: newId, ...teamData };
        data.teams.push(newTeam);
        saveData(data);
        return newTeam;
    }

    function updateTeam(id, teamData) {
        const data = loadData();
        const idx = data.teams.findIndex(t => t.id == id);
        if (idx !== -1) {
            data.teams[idx] = { ...data.teams[idx], ...teamData };
            saveData(data);
            return data.teams[idx];
        }
        return null;
    }

    function deleteTeam(id) {
        const data = loadData();
        data.teams = data.teams.filter(t => t.id != id);
        data.links = (data.links || []).filter(l => l.team_id != id);
        (data.users || []).forEach(u => {
            if (u.team_id == id) u.team_id = null;
        });
        saveData(data);
    }

    // Team Links
    function getLinks() {
        const data = loadData();
        const teams = data.teams || [];
        return (data.links || []).map(l => {
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

    function addLink(linkData) {
        const data = loadData();
        const newId = data.links.length ? Math.max(...data.links.map(l => l.id)) + 1 : 1;
        const newLink = { id: newId, ...linkData };
        data.links.push(newLink);
        saveData(data);
        return newLink;
    }

    function updateLink(id, linkData) {
        const data = loadData();
        const idx = data.links.findIndex(l => l.id == id);
        if (idx !== -1) {
            data.links[idx] = { ...data.links[idx], ...linkData };
            saveData(data);
            return data.links[idx];
        }
        return null;
    }

    function deleteLink(id) {
        const data = loadData();
        data.links = data.links.filter(l => l.id != id);
        saveData(data);
    }

    // Innovation Links
    function getInnovationLinks() {
        return loadData().innovationLinks || [];
    }

    function getInnovationLink(id) {
        return getInnovationLinks().find(l => l.id == id);
    }

    function addInnovationLink(linkData) {
        const data = loadData();
        const newId = data.innovationLinks.length ? Math.max(...data.innovationLinks.map(l => l.id)) + 1 : 1;
        const newLink = { id: newId, ...linkData };
        data.innovationLinks.push(newLink);
        saveData(data);
        return newLink;
    }

    function updateInnovationLink(id, linkData) {
        const data = loadData();
        const idx = data.innovationLinks.findIndex(l => l.id == id);
        if (idx !== -1) {
            data.innovationLinks[idx] = { ...data.innovationLinks[idx], ...linkData };
            saveData(data);
            return data.innovationLinks[idx];
        }
        return null;
    }

    function deleteInnovationLink(id) {
        const data = loadData();
        data.innovationLinks = data.innovationLinks.filter(l => l.id != id);
        saveData(data);
    }

    // Stats
    function getStats() {
        const data = loadData();
        return {
            users: (data.users || []).length,
            teams: (data.teams || []).length,
            links: (data.links || []).length,
            innovationLinks: (data.innovationLinks || []).length
        };
    }

    return {
        getCurrentUser,
        setCurrentUser,
        login,
        logout,
        resetData,
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
