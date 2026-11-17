<script setup>
import { Search, DraftingCompass, Code2, RefreshCw } from 'lucide-vue-next'
const steps = [
  {n:'01',title:'Understand',text:'Clarify the purpose, audience and problem before choosing a solution.',icon:Search},
  {n:'02',title:'Plan the experience',text:'Organise content, layout and component structure into a clear direction.',icon:DraftingCompass},
  {n:'03',title:'Build with care',text:'Develop responsive interfaces with reusable components and clean code.',icon:Code2},
  {n:'04',title:'Test & improve',text:'Check behaviour across screens, refine details and keep learning.',icon:RefreshCw}
]
</script>
<template>
  <section class="process-section section-block"><div class="section-container"><div class="section-heading"><p class="eyebrow">04 / HOW I APPROACH WORK</p><h2>Simple process.<br/><span>Thoughtful outcomes.</span></h2></div><div class="process-grid"><article v-for="step in steps" :key="step.n" class="process-card"><div class="process-top"><span>{{ step.n }}</span><component :is="step.icon" :size="19"/></div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></article></div></div></section>
</template>
