<script setup>
import { computed, ref } from 'vue'
import { ArrowUpRight, Clapperboard, Globe2, GraduationCap, Layers3 } from 'lucide-vue-next'
const activeFilter = ref('All')
const filters = ['All', 'Web applications', 'Dashboards']
const projects = [
  { id:'stream', name:'Stream.store', category:'Web applications', type:'Movie & series platform', description:'A streaming-inspired platform concept for discovering movies and series, with browsing navigation, search, category filters and personal-list ideas.', stack:['Vue.js','JavaScript','Express / MySQL concepts'], icon:Clapperboard, theme:'blue', stage:'In development', focus:'Media discovery' },
  { id:'kitabi', name:'Kitabi Sector', category:'Web applications', type:'Community information platform', description:'A digital information concept designed to bring local institutions, public services and useful community information into one searchable experience.', stack:['Vue.js','JavaScript','Responsive UI'], icon:Globe2, theme:'green', stage:'Concept & development', focus:'Community services' },
  { id:'bethel', name:'College de Bethel', category:'Dashboards', type:'School dashboard', description:'A school-focused dashboard concept with structured navigation, school information, clear content hierarchy and a consistent purple visual identity.', stack:['Vue.js','Lucide icons','CSS'], icon:GraduationCap, theme:'violet', stage:'In development', focus:'Education dashboard' }
]
const visibleProjects = computed(() => activeFilter.value === 'All' ? projects : projects.filter(p => p.category === activeFilter.value))
</script>
<template>
  <section id="projects" class="section-container section-block projects-section">
    <div class="section-heading heading-row"><div><p class="eyebrow">03 / SELECTED WORK</p><h2>Projects built<br/><span>to solve problems.</span></h2></div><a class="inline-link github-all" href="https://github.com/codeman6699" target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight :size="16"/></a></div>
    <div class="project-toolbar"><p>Selected concepts and development work</p><div class="project-filters" role="group" aria-label="Filter projects"><button v-for="filter in filters" :key="filter" type="button" :class="{active:activeFilter===filter}" :aria-pressed="activeFilter===filter" @click="activeFilter=filter">{{ filter }}</button></div></div>
    <div class="project-grid"><article v-for="(project,index) in visibleProjects" :key="project.id" class="project-card" :class="project.theme">
      <div class="project-art"><div class="project-art-top"><span>PROJECT / 0{{ projects.indexOf(project)+1 }}</span><span>KENNEDY.DEV</span></div><div class="project-art-center"><div class="project-icon"><component :is="project.icon" :size="34" :stroke-width="1.5"/></div><strong>{{ project.name }}</strong><small>{{ project.focus }}</small></div><div class="project-art-bottom"><span>DESIGN + DEVELOPMENT</span><Layers3 :size="14"/></div></div>
      <div class="project-content"><p class="project-type">{{ project.type }}</p><div class="project-title"><h3>{{ project.name }}</h3><a href="https://github.com/codeman6699" target="_blank" rel="noreferrer" :aria-label="`Open GitHub profile for ${project.name}`"><ArrowUpRight :size="18"/></a></div><p class="project-description">{{ project.description }}</p><div class="project-tags"><span v-for="tag in project.stack" :key="tag">{{ tag }}</span></div><div class="project-stage"><span></span>{{ project.stage }}</div></div>
    </article></div>
    <p class="project-footnote">Project cards describe work and concepts discussed in this portfolio. Individual live demos and repository links can be added when available.</p>
  </section>
</template>
