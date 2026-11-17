<script setup>
import { ref } from 'vue'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'
import logo from '../assets/kennedy-mark.svg'
const menuOpen = ref(false)
const links = [
  { label: 'Home', href: '#home' }, { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#skills' }, { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
]
function closeMenu() { menuOpen.value = false }
</script>
<template>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="Kennedy portfolio home" @click="closeMenu">
      <img :src="logo" alt="Kennedy K logo" />
      <span style="font-weight: 900;"><strong><i>Kennedy</i></strong><small>FRONTEND DEVELOPER</small></span>
    </a>
    <button class="mobile-menu-button" type="button" :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'" @click="menuOpen = !menuOpen">
      <X v-if="menuOpen" :size="21"/><Menu v-else :size="21"/>
    </button>
    <nav class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Main navigation">
      <a v-for="link in links" :key="link.href" :href="link.href" @click="closeMenu">{{ link.label }}</a>
      <a class="nav-contact" href="#contact" @click="closeMenu">Let's talk <ArrowUpRight :size="15"/></a>
    </nav>
  </header>
</template>
