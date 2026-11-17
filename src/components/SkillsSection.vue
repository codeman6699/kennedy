<script setup>
import { Braces, Code2, PanelsTopLeft, Smartphone, GitBranch, Palette, Database, Layers3 } from 'lucide-vue-next'
const groups = [
  { title: 'Frontend development', description: 'Building the structure and behaviour of web interfaces.', items: [{name:'Vue.js',icon:Layers3},{name:'JavaScript',icon:Braces},{name:'HTML5',icon:Code2},{name:'CSS3',icon:Palette}] },
  { title: 'Interface craft', description: 'Creating accessible, responsive and consistent experiences.', items: [{name:'Responsive design',icon:Smartphone},{name:'Component-based UI',icon:PanelsTopLeft},{name:'Lucide icons',icon:Layers3}] },
  { title: 'Developer workflow', description: 'Tools and practices for building and maintaining projects.', items: [{name:'Git & GitHub',icon:GitBranch},{name:'REST API concepts',icon:Database}] }
]
</script>
<template>
  <section id="skills" class="skills-section section-block">
    <div class="section-container">
      <div class="section-heading heading-row"><div><p class="eyebrow">02 / WHAT I WORK WITH</p><h2>Tools for making<br/><span>ideas work.</span></h2></div><p class="heading-aside">My current toolkit is focused on modern frontend development, clean component structure and responsive user interfaces.</p></div>
      <div class="skill-groups"><article v-for="group in groups" :key="group.title" class="skill-group"><div class="skill-group-head"><span class="group-index">0{{ groups.indexOf(group)+1 }}</span><h3>{{ group.title }}</h3><p>{{ group.description }}</p></div><div class="skill-chips"><div v-for="item in group.items" :key="item.name" class="skill-chip"><component :is="item.icon" :size="17"/><span>{{ item.name }}</span></div></div></article></div>
      <p class="skills-note"><span></span> Skills shown reflect my current learning and project experience.</p>
    </div>
  </section>
</template>
