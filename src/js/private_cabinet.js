function togglePassword(id) {
    const input = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');

    if (!input || !icon) return;

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    }
}

(function () {
    const rules = {
        'r-len': value => value.length >= 12 && value.length <= 25,
        'r-upper': value => /[A-Z]/.test(value),
        'r-lower': value => /[a-z]/.test(value),
        'r-digit': value => /[0-9]/.test(value),
        'r-sym': value => /[^A-Za-z0-9]/.test(value)
    };

    function setRule(id, ok) {
        const element = document.getElementById(id);
        if (!element) return;

        element.className = 'pw-rule ' + (ok ? 'ok' : 'fail');
        element.querySelector('i').className = ok
            ? 'fa-regular fa-circle-check'
            : 'fa-regular fa-circle-xmark';
    }

    function resetRules() {
        Object.keys(rules).forEach(id => {
            const element = document.getElementById(id);
            if (!element) return;

            element.className = 'pw-rule';
            element.querySelector('i').className = 'fa-regular fa-circle';
        });
    }

    function checkMatch() {
        const password = document.getElementById('password')?.value ?? '';
        const confirmation = document.getElementById('password2')?.value ?? '';
        const message = document.getElementById('pw-match-msg');

        if (!message) return;

        if (!confirmation) {
            message.textContent = '';
            message.className = 'pw-match-msg';
            return;
        }

        const ok = password === confirmation;
        message.textContent = ok ? 'Şifrələr uyğundur' : 'Şifrələr uyğun deyil';
        message.className = 'pw-match-msg ' + (ok ? 'ok' : 'fail');
    }

    function validatePassword() {
        const value = document.getElementById('password')?.value ?? '';
        const bar = document.getElementById('pw-sbar');

        if (!value) {
            resetRules();
            if (bar) {
                bar.style.width = '0';
                bar.style.background = '';
            }
            checkMatch();
            return;
        }

        let score = 0;
        Object.keys(rules).forEach(id => {
            const ok = rules[id](value);
            setRule(id, ok);
            if (ok) score++;
        });

        if (bar) {
            bar.style.width = (score / 5 * 100) + '%';
            bar.style.background = score <= 2 ? '#E24B4A'
                : score === 3 ? '#EF9F27'
                    : score === 4 ? '#378ADD'
                        : '#1D9E75';
        }

        checkMatch();
    }

    document.getElementById('password')?.addEventListener('input', validatePassword);
    document.getElementById('password2')?.addEventListener('input', checkMatch);
})();