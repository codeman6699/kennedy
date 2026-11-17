<script setup>
import { ref } from 'vue'
import { ArrowUpRight, Download, Sparkles } from 'lucide-vue-next'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import AiAssistant from './components/AiAssistant.vue'
const assistantOpen = ref(false)
function downloadProfile() {
  const profile = `INEZA NZEYIMANA ELIE KENNEDY\nFrontend Developer | Nyamagabe, Rwanda\n\nPROFILE\nFrontend developer focused on building clean, responsive and useful web interfaces with Vue.js and modern web technologies.\n\nTECHNICAL TOOLKIT\nVue.js, JavaScript, HTML5, CSS3, responsive design, Lucide icons, Git and GitHub.\n\nSELECTED PROJECTS\nStream.store — movie and series platform project (in development).\nKitabi Sector — community information platform concept.\nCollege de Bethel — school dashboard concept (in development).\n\nGITHUB\nhttps://github.com/codeman6699\n\nLocation: Nyamagabe, Rwanda\n\nNote: Add verified email, phone, education and work history before using this as a formal job application CV.`
  const blob = new Blob([profile], {type:'text/plain;charset=utf-8'})
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href=url; link.download='Ineza-Kennedy-Profile.txt'; link.click()
  URL.revokeObjectURL(url)
}
</script>
<template>
  <div class="app-shell">
    <SiteHeader/>
    <main>
      <HeroSection @open-ai="assistantOpen=true"/>
      <AboutSection/>
      <SkillsSection/>
      <ProjectsSection/>
      <ProcessSection/>
      <ContactSection/>
    </main>
    <SiteFooter/>
    <button class="resume-button" type="button" @click="downloadProfile"><Download :size="15"/> Profile <ArrowUpRight :size="13"/></button>
    <AiAssistant v-model:open="assistantOpen" @close="assistantOpen=false"/>
  </div>
</template>
