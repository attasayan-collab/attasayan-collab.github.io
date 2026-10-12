const publications = [
  {year:2026,type:'preprint',selected:true,title:'Closing the H₂S/NO Signaling Loop: Nitric Oxide Regeneration by a Synthetic Zn²⁺ Persulfide via Transnitrosation and Nitrite Reduction',authors:'Atta, S.; Li, K.; Bender, A. L.; Zakharov, L. N.; Champagne, P. A.; Pluth, M. D.',venue:'ChemRxiv · 2026',doi:'10.26434/chemrxiv.15004564/v1',note:'Preprint; not peer reviewed.'},
  {year:2026,type:'journal',selected:true,title:'Reduction of Nitrite to Nitric Oxide by Tetranuclear Iron(II)-Polychalcogenides: Direct Reduction by Iron(II) vs the Reaction of Nitrite with Coordinated Polychalcogenides',authors:'Mandal, A.; Atta, S.; Majumdar, A.',venue:'Inorganic Chemistry · 65 (1), 320–340',doi:'10.1021/acs.inorgchem.5c04413',note:'A. Mandal and S. Atta contributed equally.'},
  {year:2025,type:'journal',selected:true,title:'Functional Nonheme Diiron(II) Complexes Catalyze the Direct Reduction of Nitrite to Nitric Oxide in Relevance to the Diiron Protein YtfE',authors:'Atta, S.; Mandal, A.; Patra, S.; Majumdar, A.',venue:'Inorganic Chemistry · 64 (15), 7726–7745',doi:'10.1021/acs.inorgchem.5c00753'},
  {year:2025,type:'journal',selected:false,title:'A Mononitrosyl Diiron(II) Compound Catalyzes the Reduction of Nitrite to Nitric Oxide',authors:'Mandal, A.; Atta, S.; Majumdar, A.',venue:'Inorganic Chemistry · 64 (35), 17792–17808',note:'A. Mandal and S. Atta contributed equally.'},
  {year:2024,type:'journal',selected:false,title:'Generation of Thiosulfate, Selenite, Dithiosulfite, Perthionitrite, Nitric Oxide, and Reactive Chalcogen Species by Binuclear Zinc(II)-Chalcogenolato/-Polychalcogenido Complexes',authors:'Atta, S.; Mandal, A.; Majumdar, A.',venue:'Inorganic Chemistry · 63, 15161–15176'},
  {year:2024,type:'journal',selected:true,title:'Reduction of nitrite to nitric oxide and generation of reactive chalcogen species by mononuclear Fe(II) and Zn(II) complexes of thiolate and selenolate',authors:'Atta, S.; Mandal, A.; Saha, R.; Majumdar, A.',venue:'Dalton Transactions · 53, 949–965',doi:'10.1039/D3DT03768A',note:'Dalton Transactions HOT Article (as listed in CV).'},
  {year:2024,type:'journal',selected:false,title:'Kinetic isotope effect offers selectivity in CO₂ reduction',authors:'Patra, S.; Atta, S.; Ghosh, S.; Majumdar, A.; Dey, A.',venue:'Chemical Communications · 60, 4826–4829',note:'S. Patra and S. Atta contributed equally.'},
  {year:2024,type:'journal',selected:false,title:'Nonheme binuclear transition metal complexes with hydrosulfide and polychalcogenides',authors:'Hossain, K.; Atta, S.; Chakraborty, A. B.; Karmakar, S.; Majumdar, A.',venue:'Chemical Communications · 60, 4979–4998'},
  {year:2024,type:'journal',selected:false,title:'Single crystal synthesis and characterization of proposed eight-fold degenerate topological material Bi₂PdO₄',authors:'Routh, S.; Atta, S.; Bhowmik, T. K.',venue:'Physica B: Condensed Matter · 679, 415791',doi:'10.1016/j.physb.2024.415791'},
  {year:2023,type:'journal',selected:false,title:'Redox Convergent Synthesis and Reactivity of a Cobalt(III)-Pentasulfido Compound',authors:'Atta, S.; Majumdar, A.',venue:'Chemistry – A European Journal · 29, e202203579'},
  {year:2020,type:'journal',selected:false,title:'Cp*Co(III)-Catalyzed C-7 C–C Coupling of Indolines with Aziridines: Merging C–H Activation and Ring Opening',authors:'De, P. B.; Atta, S.; Pradhan, S.; Banerjee, S.; Shah, T. A.; Punniyamurthy, T.',venue:'The Journal of Organic Chemistry · 85, 4785–4794'}
];
const list = document.querySelector('#publication-list');
const search = document.querySelector('#publication-search');
const count = document.querySelector('#publication-count');
let filter = 'journal';
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function renderPublications() {
  const query = search.value.trim().toLowerCase();
  const entries = publications.filter(p =>
    (filter === 'all' || (filter === 'selected' ? p.selected : p.type === filter)) &&
    `${p.title} ${p.authors} ${p.venue} ${p.year} ${p.doi || ''}`.toLowerCase().includes(query)
  );
  list.replaceChildren();
  count.textContent = `${entries.length} ${entries.length === 1 ? 'publication' : 'publications'}${query ? ' matching your search' : ''}`;
  entries.forEach(p => {
    const article = element('article', 'publication');
    article.append(element('span', 'publication-year', String(p.year)));
    const content = element('div');
    const title = element('h3');
    const titleLink = element('a', '', p.title);
    const url = p.doi ? `https://doi.org/${p.doi}` : `https://scholar.google.com/scholar?q=${encodeURIComponent(p.title)}`;
    titleLink.href = url; titleLink.target = '_blank'; titleLink.rel = 'noopener noreferrer';
    title.append(titleLink); content.append(title);
    content.append(element('p', '', p.authors));
    content.append(element('p', 'journal-name', p.venue));
    if(p.note) content.append(element('span', 'paper-note', p.note));
    const link = element('a', 'paper-link', p.doi ? `DOI: ${p.doi}` : 'Find on Google Scholar');
    link.href = url;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${p.doi ? 'Read' : 'Find'} ${p.title} (opens in a new tab)`);
    content.append(link); article.append(content); list.append(article);
  });
  if(!entries.length) list.append(element('p', 'empty-state', 'No matching publications. Try another search or select All.'));
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(b => {
    const active = b === button;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
  renderPublications();
}));
search.addEventListener('input', renderPublications);
document.querySelector('#year').textContent = new Date().getFullYear();
renderPublications();
