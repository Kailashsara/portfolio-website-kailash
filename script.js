document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Rotating role titles ---------------- */
  const roles = ['Azure Administrator', 'Cloud Engineer', 'DevOps Engineer'];
  const roleEl = document.getElementById('hero-role-text');
  let ri = 0;
  if (roleEl && !prefersReduced) {
    setInterval(() => {
      ri = (ri + 1) % roles.length;
      roleEl.textContent = roles[ri];
    }, 2400);
  }

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------------- Broken image graceful fallback ---------------- */
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const wrap = img.parentElement;
      img.remove();
      const span = document.createElement('span');
      span.className = 'badge-fallback';
      span.textContent = img.dataset.fallback;
      wrap.appendChild(span);
    });
  });

  /* =========================================================
     TERMINAL MODE
  ========================================================= */
  const tmodeSwitch = document.getElementById('tmodeSwitch');
  const terminalOverlay = document.getElementById('terminalOverlay');
  const terminalClose = document.getElementById('terminalClose');
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  const resumeLink = document.getElementById('resumeLink');

  const RESUME_URL = resumeLink ? resumeLink.getAttribute('href') : 'assets/resume-kailash-saravanan.pdf';
  const GITHUB_URL = 'https://github.com/Kailashsara';
  const LINKEDIN_URL =
'https://www.linkedin.com/in/kailash-saravanan-627963213/';

  const commands = {
    help: () =>
      [
        'Available commands:',
        '',
        '  help            show this list',
        '  about           short bio',
        '  skills          technical skill categories',
        '  experience      work history',
        '  projects        project list',
        '  certifications  certifications earned',
        '  hackathon       hackathon participation',
        '  resume          download resume',
        '  github          open GitHub profile',
        '  linkedin        open LinkedIn profile',
        '  contact         contact details',
        '  clear           clear the screen',
      ].join('\n'),

    about: () =>
      [
        'Kailash Saravanan — Azure Administrator | Cloud Engineer | DevOps Engineer',
        '',
        'Cloud and DevOps professional with hands-on experience in Microsoft Azure,',
        'Linux administration, Infrastructure as Code, Docker, GitHub Actions, VMware,',
        'and cloud operations. AZ-900 and AZ-104 certified.',
      ].join('\n'),

    skills: () =>
      [
        'Cloud:      Microsoft Azure, AWS, Azure Storage, Azure Networking, Azure RBAC,',
        '            Azure Monitor, Azure Container Apps',
        'DevOps:     Docker, Terraform, Git, GitHub Actions, CI/CD, IaC',
        'OS/Platform:Linux, Windows Server, VMware, Kubernetes Fundamentals',
        'Programming:Python, Flask, Bash, PowerShell',
        'Identity:   Azure Key Vault, Microsoft Entra ID, IAM, RBAC',
        'ITSM:       ServiceNow, Incident/Problem/Change Management, RCA',
      ].join('\n'),

    experience: () =>
      [
        'Birlasoft — Infrastructure / Cloud Engineer          Aug 2025 – Present',
        '  Enterprise infrastructure migrations, VMware migrations, Azure',
        '  deployments, Windows & Linux administration, ServiceNow operations,',
        '  incident management, root cause analysis, stakeholder coordination.',
        '',
        'Cholamandalam Investment & Finance Ltd — AWS Cloud Intern   Jun–Jul 2024',
        '  EC2, S3, IAM, Route53, VPC, Auto Scaling, monitoring, Linux admin.',
      ].join('\n'),

    projects: () =>
      [
        'CloudOps Service Desk',
        '  Flask + Docker + Terraform + Azure Container Apps + GitHub Actions',
        '  + Key Vault + RBAC + Application Insights. REST APIs, CI/CD, IaC,',
        '  secret management, monitoring.',
        '  github.com/Kailashsara/azure-devops-sre-project',
        '',
        'Linux Monitoring Dashboard',
        '  Python/Flask dashboard for CPU, memory, disk usage, host info.',
        '',
        'Portfolio Website',
        '  Personal cloud engineer portfolio, hosted in Azure.',
        '',
        'Disaster Alert Mobile Application',
        '  AWS Lambda, DynamoDB, GPS tracking, SOS broadcasting.',
        '',
        'Personalized Book Recommendation System',
        '  JavaScript, HTML, CSS, Supabase full-stack recommendation platform.',
      ].join('\n'),

    certifications: () =>
      [
        'AZ-104   Microsoft Azure Administrator Associate',
        'AZ-900   Microsoft Azure Fundamentals',
      ].join('\n'),

    hackathon: () =>
      [
        'Microsoft Agentic AI Hackathon',
        '  Participated exploring Azure AI technologies, agentic workflows,',
        '  and next-generation AI-powered solutions.',
        '',
        'Also: Star Performer Internship Award (Birlasoft, 2025)',
        '      Appreciation Award (Birlasoft, 2025)',
      ].join('\n'),

    contact: () =>
      [
        'Email:     kailashsaravanan8@gmail.com',
        'LinkedIn:  ' + LINKEDIN_URL,
        'GitHub:    ' + GITHUB_URL,
        'Location:  Chennai, Tamil Nadu, India',
      ].join('\n'),

    github: () => {
      window.open(GITHUB_URL, '_blank', 'noopener');
      return 'Opening GitHub profile in a new tab…';
    },

    linkedin: () => {
      window.open(LINKEDIN_URL, '_blank', 'noopener');
      return 'Opening LinkedIn profile in a new tab…';
    },

    resume: () => {
      const a = document.createElement('a');
      a.href = RESUME_URL;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      a.remove();
      return 'Downloading resume — if nothing happens, add the PDF at ' + RESUME_URL;
    },
  };

  function printLine(html, cls) {
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    printLine('<span class="prompt-label">kailash@azure</span>:~$ ' + escapeHtml(raw), 'line-cmd');
    if (!cmd) return;
    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }
    if (commands[cmd]) {
      printLine(escapeHtml(commands[cmd]()), 'line-out');
    } else {
      printLine(escapeHtml(`command not found: ${cmd} — type "help" for a list of commands`), 'line-out');
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  function openTerminal() {
    terminalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (!terminalBody.dataset.booted) {
      printLine(escapeHtml('Welcome to kailash@azure — type "help" to see available commands.'), 'line-out');
      terminalBody.dataset.booted = '1';
    }
    terminalInput.focus();
  }

  function closeTerminal() {
    terminalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (tmodeSwitch) tmodeSwitch.setAttribute('aria-pressed', 'false');
  }

  if (tmodeSwitch) {
    tmodeSwitch.addEventListener('click', () => {
      const pressed = tmodeSwitch.getAttribute('aria-pressed') === 'true';
      tmodeSwitch.setAttribute('aria-pressed', String(!pressed));
      if (!pressed) openTerminal(); else closeTerminal();
    });
  }
  if (terminalClose) terminalClose.addEventListener('click', closeTerminal);
  if (terminalOverlay) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && terminalOverlay.classList.contains('active')) closeTerminal();
    });
  }
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        runCommand(val);
      }
    });
  }
});
