const esc = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const page = document.getElementById('project-page');
const id = new URLSearchParams(window.location.search).get('id');
document.getElementById('year').textContent = new Date().getFullYear();

fetch('data/projects.json').then(response => response.json()).then(data => {
  const project = data.projects.find(item => item.id === id);
  if (!project) throw new Error('Not found');
  document.title = `${project.title} — Nicolas Berredo`;
  const image = project.image ? `<img class="project-hero-image" src="${esc(project.image)}" alt="${esc(project.imageAlt)}" />` : '<div class="project-hero-art" aria-hidden="true"></div>';
  const sections = project.sections.length ? project.sections.map(section => `<section class="project-detail"><h2>${esc(section.heading)}</h2><p>${esc(section.body)}</p></section>`).join('') : '<p class="project-empty">This project page is ready for its process, visuals, and outcomes.</p>';
  const external = project.externalUrl ? `<a class="text-link" href="${esc(project.externalUrl)}" target="_blank" rel="noreferrer">${esc(project.externalLabel || 'Visit project')} <span aria-hidden="true">↗</span></a>` : '';
  const links = (project.links || []).map(link => `<a class="project-resource" href="${esc(link.url)}" target="_blank" rel="noreferrer">${esc(link.label)} <span aria-hidden="true">↗</span></a>`).join('');
  const gallery = (project.gallery || []).length ? `<section class="project-gallery" aria-label="${esc(project.title)} gallery">${project.gallery.map(item => `<figure><img src="${esc(item.src)}" alt="${esc(item.alt)}" /><figcaption>${esc(item.caption)}</figcaption></figure>`).join('')}</section>` : '';
  page.innerHTML = `<a class="back-link" href="index.html#work">← All projects</a><section class="project-hero"><div><p class="eyebrow">${project.tags.map(esc).join(' · ')}</p><h1>${esc(project.title)}</h1><p class="lede">${esc(project.summary)}</p>${external}${links ? `<div class="project-resources">${links}</div>` : ''}</div>${image}</section><section class="project-details"><p class="eyebrow">Project notes</p>${sections}</section>${gallery}`;
}).catch(() => { page.innerHTML = '<section class="project-not-found"><p class="eyebrow">Project not found</p><h1>This project is not in the current list.</h1><a class="text-link" href="index.html#work">Back to projects</a></section>'; });
