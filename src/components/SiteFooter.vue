<script setup>
import { ArrowUpRight, Github } from 'lucide-vue-next'
const year = new Date().getFullYear()
</script>
<template><footer class="site-footer section-container">
<div style="display:flex; flex-direction:row;">
   <img src="../assets/k.jpg" style="height:5ch; width:5ch; border-radius:12px;" alt="Kennedy K logo" />
<a class="footer-brand" href="#home">KENNEDY<span>.</span></a>
</div>
<p>Designed & built with curiosity in Rwanda.</p><div class="footer-links"><a href="https://github.com/codeman6699" target="_blank" rel="noreferrer" aria-label="GitHub"><Github :size="17"/></a><a href="#home" aria-label="Back to top"><ArrowUpRight :size="17"/></a></div><small>© {{ year }} Ineza Nzeyimana Elie Kennedy. All rights reserved.</small></footer></template>
