<script setup>
import { Compass, Lightbulb, MonitorSmartphone } from 'lucide-vue-next'
const values = [
  { icon: Compass, title: 'Purposeful work', text: 'I focus on building interfaces that solve a clear problem and make information easy to use.' },
  { icon: MonitorSmartphone, title: 'Responsive by design', text: 'I consider different screen sizes and make experiences feel natural on desktop and mobile.' },
  { icon: Lightbulb, title: 'Always learning', text: 'I grow through practical projects, experimentation and improving the details of my code.' }
]
</script>
<template>
  <section id="about" class="section-container section-block">
    <div class="section-heading"><p class="eyebrow">01 / GET TO KNOW ME</p><h2>Curious by nature.<br/><span>Developer by passion.</span></h2></div>
    <div class="about-layout">
      <div class="about-story">
        <p class="lead-copy">I enjoy turning ideas into useful, intuitive and well-crafted web experiences.</p>
        <p>My work is centred on frontend development—bringing structure, visual design and interaction together to create websites people can use with confidence.</p>
        <p>I'm developing my skills through hands-on projects, including a movie and series platform, a community information concept and a school dashboard. Each project gives me a chance to learn, solve problems and build better.</p>
        <a class="inline-link" href="https://github.com/codeman6699" target="_blank" rel="noreferrer">Explore my GitHub <span>↗</span></a>
      </div>
      <div class="value-list">
        <article v-for="value in values" :key="value.title" class="value-card"><div class="value-icon"><component :is="value.icon" :size="20"/></div><div><h3>{{ value.title }}</h3><p>{{ value.text }}</p></div></article>
      </div>
    </div>
  </section>
</template>
