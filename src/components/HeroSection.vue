<script setup>
import { ArrowDown, ArrowUpRight, Github, MapPin, Sparkles } from 'lucide-vue-next'
const emit = defineEmits(['open-ai'])
</script>
<template>
  <section id="home" class="hero section-container">
    <div class="hero-copy">
      <div class="availability"><span class="status-dot"></span> OPEN TO LEARNING & COLLABORATION</div>
      <p class="eyebrow">HELLO, I'M KENNEDY</p>
      <h1>I create <span>digital</span><br/>experiences that<br/>feel effortless.</h1>
      <p class="hero-summary">I'm <strong>Ineza Nzeyimana Elie Kennedy</strong>, a frontend developer from Nyamagabe, Rwanda. I build clean, responsive interfaces with Vue.js and modern web technologies.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="#projects">Explore my work <ArrowUpRight :size="17"/></a>
        <button class="button button-outline" type="button" @click="emit('open-ai')"><Sparkles :size="16"/> Ask my AI assistant</button>
      </div>
      <div class="hero-meta"><span><MapPin :size="15"/> Nyamagabe, Rwanda</span><a href="https://github.com/codeman6699" target="_blank" rel="noreferrer"><Github :size="15"/> GitHub profile</a></div>
    </div>
    <div class="hero-visual" aria-label="Decorative code editor illustration">
      <div class="visual-glow"></div>
      <div class="editor-card">
        <div class="editor-bar"><div class="window-dots"><i></i><i></i><i></i></div><span>kennedy / portfolio.js</span><span class="editor-lock">●</span></div>
        <div class="editor-code">
          <p><i>01</i><b class="syntax-purple">const</b> developer = {</p>
          <p><i>02</i><span class="indent"></span>name: <b class="syntax-green">'Kennedy'</b>,</p>
          <p><i>03</i><span class="indent"></span>role: <b class="syntax-green">'Frontend Developer'</b>,</p>
          <p><i>04</i><span class="indent"></span>location: <b class="syntax-green">'Rwanda'</b>,</p>
          <p><i>05</i><span class="indent"></span>stack: [<b class="syntax-green">'Vue'</b>, <b class="syntax-green">'JS'</b>],</p>
          <p><i>06</i><span class="indent"></span>curiosity: <b class="syntax-blue">Infinity</b></p>
          <p><i>07</i>}</p><p class="code-gap"><i>08</i></p>
          <p><i>09</i><b class="syntax-purple">function</b> <b class="syntax-yellow">buildIdeas</b>() {</p>
          <p><i>10</i><span class="indent"></span><b class="syntax-purple">return</b> <b class="syntax-green">'Make it useful.'</b></p>
          <p><i>11</i>}</p>
          <div class="code-caret"></div>
        </div>
      </div>
      <div class="tech-float float-vue"><span>V</span> Vue.js</div>
      <div class="tech-float float-js"><span>JS</span> JavaScript</div>
      <div class="hero-orbit orbit-a"></div><div class="hero-orbit orbit-b"></div>
      <div class="visual-caption">THOUGHTFUL DESIGN <b>·</b> SOLID CODE</div>
    </div>
    <a class="scroll-indicator" href="#about"><ArrowDown :size="15"/> SCROLL TO DISCOVER</a>
  </section>
</template>
