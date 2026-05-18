// function togglePassword(id) {
//     const input = document.getElementById(id);
//     const icon = document.getElementById(id + '-icon');
//     if (input.type === 'password') {
//         input.type = 'text';
//         icon.classList.replace('fa-eye-slash', 'fa-eye');
//     } else {
//         input.type = 'password';
//         icon.classList.replace('fa-eye', 'fa-eye-slash');
//     }
// }

function togglePassword(id) {
    const input = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    }
}

// ===== ŞİFRƏ VALİDASİYASI =====
(function () {
    const rules = {
        'r-len':   v => v.length >= 12 && v.length <= 25,
        'r-upper': v => /[A-Z]/.test(v),
        'r-lower': v => /[a-z]/.test(v),
        'r-digit': v => /[0-9]/.test(v),
        'r-sym':   v => /[^A-Za-z0-9]/.test(v)
    };

    function setRule(id, ok) {
        const el = document.getElementById(id);
        if (!el) return;
        el.className = 'pw-rule ' + (ok ? 'ok' : 'fail');
        el.querySelector('i').className = ok
            ? 'fa-regular fa-circle-check'
            : 'fa-regular fa-circle-xmark';
    }

    function checkMatch() {
        const v1  = document.getElementById('password')?.value ?? '';
        const v2  = document.getElementById('password2')?.value ?? '';
        const msg = document.getElementById('pw-match-msg');
        if (!msg) return;
        if (!v2) { msg.textContent = ''; msg.className = 'pw-match-msg'; return; }
        const ok = v1 === v2;
        msg.textContent = ok ? '✓ Şifrələr uyğundur' : '✗ Şifrələr uyğun deyil';
        msg.className   = 'pw-match-msg ' + (ok ? 'ok' : 'fail');
    }

    function validate() {
        const v   = document.getElementById('password')?.value ?? '';
        const bar = document.getElementById('pw-sbar');

        if (!v) {
            Object.keys(rules).forEach(id => {
                const el = document.getElementById(id);
                if (el) { el.className = 'pw-rule'; el.querySelector('i').className = 'fa-regular fa-circle'; }
            });
            if (bar) { bar.style.width = '0'; bar.style.background = ''; }
            checkMatch();
            return;
        }

        let score = 0;
        Object.keys(rules).forEach(id => {
            const ok = rules[id](v);
            setRule(id, ok);
            if (ok) score++;
        });

        if (bar) {
            bar.style.width      = (score / 5 * 100) + '%';
            bar.style.background = score <= 2 ? '#E24B4A'
                                 : score === 3 ? '#EF9F27'
                                 : score === 4 ? '#378ADD'
                                 :               '#1D9E75';
        }
        checkMatch();
    }

    document.getElementById('password')?.addEventListener('input', validate);
    document.getElementById('password2')?.addEventListener('input', checkMatch);
})();
// ===== ŞİFRƏ VALİDASİYASI SONU =====