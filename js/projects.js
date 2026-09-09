(() => {
  const PER_PAGE = 10;
  const gridEl = document.getElementById('projectsGrid');
  const pageButtonsEl = document.getElementById('page-buttons');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const gotoInput = document.getElementById('goto-input');
  const gotoBtn = document.getElementById('goto-btn');

  if (!gridEl) return;

  function collectProjects() {
    const nodes = Array.from(gridEl.querySelectorAll('.project-card'));
    const projects = nodes.map(node => {
      const titleEl = node.querySelector('.project-content h3');
      const title = titleEl ? titleEl.textContent.trim() : '';
      return { title, node };
    });
    return projects;
  }

  function sortProjects(projects) {
    return projects.slice().sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
    );
  }

  let projects = sortProjects(collectProjects());
  let totalPages = Math.max(1, Math.ceil(projects.length / PER_PAGE));
  let currentPage = 1;

  function renderPage(page) {
    gridEl.innerHTML = '';
    const start = (page - 1) * PER_PAGE;
    const chunk = projects.slice(start, start + PER_PAGE);
    if (chunk.length === 0) {
      gridEl.innerHTML = '<div class="project-card"><div class="project-content"><h3>No projects</h3><p>Add projects to see them here.</p></div></div>';
      return;
    }
    const frag = document.createDocumentFragment();
    chunk.forEach(p => {
      frag.appendChild(p.node);
    });
    gridEl.appendChild(frag);
    updatePaginationUI();
    updateNavState();
    try { history.replaceState(null, '', `#page=${page}`); } catch(e){}
  }

  function updatePaginationUI() {
    pageButtonsEl.innerHTML = '';
    totalPages = Math.max(1, Math.ceil(projects.length / PER_PAGE));
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
      btn.textContent = `${i}`;
      btn.dataset.page = i;
      if (i === currentPage) btn.setAttribute('aria-current', 'page');
      btn.addEventListener('click', () => {
        if (currentPage === i) return;
        currentPage = i;
        renderPage(currentPage);
        gridEl.scrollIntoView({behavior:'smooth', block:'start'});
      });
      pageButtonsEl.appendChild(btn);
    }
  }

  function setDisabled(el, disabled) {
    if (!el) return;
    if (disabled) {
      el.classList.add('disabled');
      el.setAttribute('aria-disabled','true');
    } else {
      el.classList.remove('disabled');
      el.removeAttribute('aria-disabled');
    }
  }

  function updateNavState() {
    setDisabled(prevBtn, currentPage <= 1);
    setDisabled(nextBtn, currentPage >= totalPages);
  }

  prevBtn && prevBtn.addEventListener('click', () => {
    if (currentPage <= 1) return;
    currentPage--;
    renderPage(currentPage);
  });
  nextBtn && nextBtn.addEventListener('click', () => {
    if (currentPage >= totalPages) return;
    currentPage++;
    renderPage(currentPage);
  });
  gotoBtn && gotoBtn.addEventListener('click', () => {
    const val = parseInt(gotoInput.value, 10);
    if (Number.isInteger(val) && val >= 1 && val <= totalPages) {
      currentPage = val;
      renderPage(currentPage);
    } else {
      gotoInput.classList.add('invalid');
      setTimeout(() => gotoInput.classList.remove('invalid'), 400);
      gotoInput.focus();
    }
  });
  gotoInput && gotoInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') gotoBtn && gotoBtn.click();
  });

  (function openFromHash() {
    const m = location.hash.match(/page=(\d+)/i);
    if (m) {
      const n = parseInt(m[1],10);
      if (!isNaN(n) && n >=1) currentPage = n;
    }
  })();

  window.__projectsPagination = {
    refresh: () => {
      projects = sortProjects(collectProjects());
      totalPages = Math.max(1, Math.ceil(projects.length / PER_PAGE));
      currentPage = Math.min(currentPage, totalPages);
      renderPage(currentPage);
    },
    goTo: (n) => {
      if (n >=1 && n <= totalPages) {
        currentPage = n;
        renderPage(currentPage);
      }
    }
  };

  projects = sortProjects(projects);
  totalPages = Math.max(1, Math.ceil(projects.length / PER_PAGE));
  currentPage = Math.min(Math.max(1, currentPage), totalPages);
  renderPage(currentPage);
})();
