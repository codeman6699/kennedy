<script setup>
import { ref } from 'vue'
import { Copy, Github, Mail, MapPin, Send, CheckCircle2 } from 'lucide-vue-next'
const form = ref({name:'',email:'',message:''})
const status = ref('')
const busy = ref(false)
async function copyEnquiry() {
  if (!form.value.name.trim() || !form.value.email.trim() || !form.value.message.trim()) { status.value='Please complete all fields before preparing your message.'; return }
  const text = `Portfolio enquiry\nName: ${form.value.name}\nEmail: ${form.value.email}\n\n${form.value.message}`
  try {
    await navigator.clipboard.writeText(text)
    status.value='Your message has been copied. You can paste it into your email or preferred messaging app.'
  } catch {
    status.value='Clipboard access is unavailable in this browser. Please select and copy your message manually.'
  }
}
</script>
<template>
  <section id="contact" class="section-container section-block contact-section">
    <div class="contact-panel"><div class="contact-copy"><p class="eyebrow">05 / LET'S CONNECT</p><h2>Have an idea?<br/><span>Let's make it real.</span></h2><p>I'm interested in learning, collaborating and building useful digital experiences. Send a message and tell me what you're working on.</p><div class="contact-links"><a href="https://github.com/codeman6699" target="_blank" rel="noreferrer"><Github :size="17"/> github.com/codeman6699</a><div><MapPin :size="17"/> Nyamagabe, Rwanda</div><div><Mail :size="17"/> Contact details can be added here</div></div></div>
      <form class="contact-form" @submit.prevent="copyEnquiry"><div class="form-heading"><span>START A CONVERSATION</span><Send :size="17"/></div><label for="contact-name">Your name</label><input id="contact-name" v-model="form.name" autocomplete="name" placeholder="How should I address you?" required/><label for="contact-email">Your email</label><input id="contact-email" v-model="form.email" type="email" autocomplete="email" placeholder="you@example.com" required/><label for="contact-message">Your message</label><textarea id="contact-message" v-model="form.message" rows="4" placeholder="Tell me a little about your idea..." required></textarea><button class="button button-primary form-submit" type="submit"><Copy :size="16"/> Prepare & copy message</button><p v-if="status" class="form-status" role="status"><CheckCircle2 :size="15"/> {{ status }}</p><p class="form-note">This form prepares your message locally; it does not send or store personal data.</p></form>
    </div>
  </section>
</template>
