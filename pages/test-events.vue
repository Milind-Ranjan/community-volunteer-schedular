<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Events Test Page</h1>
    
    <div class="space-y-4">
      <button @click="testFetch" class="bg-blue-500 text-white px-4 py-2 rounded">
        Test Fetch Events
      </button>
      
      <div v-if="loading" class="text-blue-500">Loading...</div>
      <div v-if="error" class="text-red-500">Error: {{ error }}</div>
      
      <div v-if="result" class="bg-gray-100 p-4 rounded">
        <h3 class="font-bold">Result:</h3>
        <p>Found {{ result.length }} events</p>
        <pre class="mt-2 text-sm overflow-auto">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const loading = ref(false)
const error = ref('')
const result = ref(null)

const testFetch = async () => {
  loading.value = true
  error.value = ''
  result.value = null
  
  try {
    console.log('🔍 Testing direct Supabase query...')
    
    const { data, error: fetchError } = await supabase
      .from('events')
      .select('*')
    
    if (fetchError) {
      error.value = fetchError.message
      console.error('❌ Supabase error:', fetchError)
    } else {
      result.value = data
      console.log('✅ Direct query successful:', data)
    }
  } catch (err) {
    error.value = err.message
    console.error('❌ Catch error:', err)
  } finally {
    loading.value = false
  }
}
</script> 