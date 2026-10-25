const esc = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const pathFor = id => `project.html?id=${encodeURIComponent(id)}`;

function card(project, number) {
  const tags = project.tags.map(esc).join(' · ');
  const content = `<div class="project-content"><p class="project-type">${tags}</p><h3>${esc(project.title)}</h3><span class="project-link">View project</span></div>`;
  const image = project.image ? `<img src="${esc(project.image)}" alt="${esc(project.imageAlt)}" />` : '';
  return `<a class="project project-${esc(project.accent)} ${project.image ? 'image-card' : ''}" href="${pathFor(project.id)}"><span class="project-number">${String(number).padStart(2, '0')}</span>${image}${content}</a>`;
}

function featured(project) {
  const visual = project.image
    ? `<div class="featured-visual image-feature"><img src="${esc(project.image)}" alt="${esc(project.imageAlt)}" /></div>`
    : '<div class="featured-visual" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>';
  return `<article class="featured-project">${visual}<div class="featured-copy"><p class="project-type">${project.tags.map(esc).join(' · ')}</p><h3>${esc(project.title)}</h3><p>${esc(project.summary)}</p><a class="coming-soon" href="${pathFor(project.id)}">Read project <span aria-hidden="true">↗</span></a></div></article>`;
}

async function renderProjects() {
  const index = document.getElementById('project-index');
  if (!index) return;
  try {
    const data = await fetch('data/projects.json').then(response => {
      if (!response.ok) throw new Error('Project data was not found.');
      return response.json();
    });
    let number = 1;
    index.innerHTML = data.siteSections.map((section, sectionIndex) => {
      const projects = data.projects.filter(project => project.section === section.id);
      if (!projects.length) return '';
      const label = `<div class="collection-label"><span>${String(sectionIndex + 1).padStart(2, '0')}</span> ${esc(section.label)}</div>`;
      if (section.id === 'featured') return label + featured(projects[0]);
      const cards = projects.map(project => card(project, number++)).join('');
      return `${label}<div class="project-grid ${esc(section.id)}-grid">${cards}</div>`;
    }).join('');
  } catch (error) {
    index.innerHTML = '<p class="project-error">Project list unavailable. Please reload the page.</p>';
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
renderProjects();
