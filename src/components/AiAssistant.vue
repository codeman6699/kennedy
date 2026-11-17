<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import {
  Bot,
  X,
  Send,
  Sparkles,
  UserRound,
  RotateCcw,
  MessageCircle
} from 'lucide-vue-next'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'update:open'])

const API_URL =
  import.meta.env.VITE_AI_API_URL ||
  'http://localhost:3001/api/ai/chat'

const input = ref('')
const busy = ref(false)
const error = ref('')
const scrollArea = ref(null)

const welcomeMessage = {
  role: 'assistant',
  text: "Hello! I'm Kennedy's AI portfolio assistant. 👋 Ask me anything about Kennedy's skills, projects, technologies, development approach or collaboration opportunities."
}

const messages = ref([{ ...welcomeMessage }])

const suggestions = [
  'Who is Kennedy Dev?',
  'What is his full name?',
  'What technologies does he use?',
  'Tell me about Stream.store',
  'Can I work with Kennedy?'
]

const quickReplies = computed(() =>
  messages.value.length === 1 ? suggestions : []
)

async function scrollToBottom() {
  await nextTick()

  if (scrollArea.value) {
    scrollArea.value.scrollTo({
      top: scrollArea.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

async function sendMessage(value = input.value) {
  const question = value.trim()

  if (!question || busy.value) return

  error.value = ''

  messages.value.push({
    role: 'user',
    text: question
  })

  input.value = ''
  busy.value = true

  await scrollToBottom()

  try {
    const conversation = messages.value
      .slice(-13)
      .map(({ role, text }) => ({ role, content: text }))

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: conversation
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'The assistant could not respond.')
    }

    if (!data.reply) {
      throw new Error('The assistant returned an empty response.')
    }

    messages.value.push({
      role: 'assistant',
      text: data.reply
    })
  } catch (err) {
    error.value = err.message

    messages.value.push({
      role: 'assistant',
      text: "I'm having trouble connecting to my AI service right now. Please try again in a moment."
    })
  } finally {
    busy.value = false
    await scrollToBottom()
  }
}

function resetChat() {
  if (busy.value) return

  messages.value = [{ ...welcomeMessage }]
  input.value = ''
  error.value = ''
  scrollToBottom()
}

function closeAssistant() {
  emit('update:open', false)
  emit('close')
}

watch(
  () => props.open,
  value => {
    if (value) scrollToBottom()
  }
)
</script>

<template>
  <div
    v-if="open"
    class="ai-backdrop"
    @click.self="closeAssistant"
  >
    <section
      class="ai-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-title"
    >
      <header class="ai-header">
        <div class="ai-avatar">
          <Bot :size="21" />
        </div>

        <div class="ai-heading">
          <strong id="ai-title">Kennedy's AI Assistant</strong>
          <span>
            <i></i>
            AI portfolio assistant
          </span>
        </div>

        <button
          type="button"
          aria-label="Reset conversation"
          title="New conversation"
          :disabled="busy"
          @click="resetChat"
        >
          <RotateCcw :size="16" />
        </button>

        <button
          type="button"
          aria-label="Close assistant"
          title="Close"
          @click="closeAssistant"
        >
          <X :size="19" />
        </button>
      </header>

      <div ref="scrollArea" class="ai-messages" aria-live="polite">
        <div class="ai-welcome">
          <Sparkles :size="15" />
          <span>Ask me anything about Kennedy Dev</span>
        </div>

        <div
          v-for="(message, index) in messages"
          :key="index"
          class="chat-row"
          :class="message.role"
        >
          <div class="chat-avatar">
            <Bot
              v-if="message.role === 'assistant'"
              :size="16"
            />
            <UserRound
              v-else
              :size="16"
            />
          </div>

          <div class="chat-bubble">
            <p>{{ message.text }}</p>
          </div>
        </div>

        <div v-if="busy" class="chat-row assistant">
          <div class="chat-avatar">
            <Bot :size="16" />
          </div>

          <div class="chat-bubble typing-bubble">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div v-if="quickReplies.length" class="ai-suggestions">
          <span>YOU CAN ASK</span>

          <button
            v-for="suggestion in quickReplies"
            :key="suggestion"
            type="button"
            @click="sendMessage(suggestion)"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <div v-if="error" class="ai-error">
        {{ error }}
      </div>

      <form
        class="ai-input-area"
        @submit.prevent="sendMessage()"
      >
        <textarea
          v-model="input"
          aria-label="Ask Kennedy's AI assistant"
          placeholder="Ask me anything about Kennedy..."
          rows="1"
          :disabled="busy"
          @keydown.enter.exact.prevent="sendMessage()"
        ></textarea>

        <button
          type="submit"
          :disabled="!input.trim() || busy"
          aria-label="Send message"
          title="Send message"
        >
          <Send :size="17" />
        </button>
      </form>

      <p class="ai-disclaimer">
        <Sparkles :size="12" />
        Powered by AI · Answers are based on Kennedy's portfolio information
      </p>
    </section>
  </div>

  <button
    v-else
    class="ai-launcher"
    type="button"
    aria-label="Open Kennedy's AI assistant"
    @click="emit('update:open', true)"
  >
    <MessageCircle :size="19" />
    <span>Ask my AI</span>
    <i></i>
  </button>
</template>