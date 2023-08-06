<template>
  <div class="container" v-if="loggedIn">
    <!-- Display the user name if it exists -->
    <h1 class="center-text" v-if="user.name">Welcome {{ user.name }}</h1>
    <!-- Display a fallback message if the user name is not available -->
    <h1 class="center-text" v-else>Welcome User</h1>
    <h2 class="center-text">Your email is {{ user.email }}</h2>
    <h3 class="center-text">
      You can use this application to write text and submit it. It will appear underneath.
    </h3>
    <h3 class="center-text">
      You can also log out if you no longer wish to input text. You will be redirected to the log-in
      page.
    </h3>
    <button class="logout-button" @click="logout">Logout</button>
    <div class="text-entry-container">
      <h3 class="center-text">You can use this box to type and submit text. It will appear underneath.</h3>
      <input type="text" class="textbox" v-model="inputText" @keyup.enter="submitText"
        placeholder="Type your text here..." />
      <button class="submit-button" @click="submitText">Submit</button>
    </div>
    <div v-if="submittedTexts.length > 0" class="comments">
      <div v-for="(item, index) in submittedTexts" :key="index" class="comment">
        <div class="comment-header">
          <div class="comment-name">{{ item.userName }}</div>
          <div class="comment-date">{{ formatTimestamp(item.timestamp) }}</div>
        </div>
        <div class="comment-content">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="center-text" style="text-align: center;">
      <h1>Hello! Please log in to use this application.</h1><br>
      <GoogleLogin :callback="callback" prompt auto-login />
    </div>
  </div>
</template>

<script>
import { decodeCredential, googleLogout } from 'vue3-google-login';

export default {
  mounted() {
    // Fetch the texts when the webpage loads or reloads
    this.fetchTexts();
  },
  data() {
    return {
      loggedIn: false,
      user: null,
      inputText: '',
      submittedTexts: [],
      callback: (response) => {
        console.log('logged in');
        this.loggedIn = true;
        console.log(response);
        this.user = decodeCredential(response.credential);
      },
    };
  },
  methods: {

    logout() {
      googleLogout();
      this.loggedIn = false;
    },

    async submitText() {
      if (this.inputText.trim() !== '') {
        try {
          const payload = {
            text: this.inputText,
            userName: this.user.name,
          };

          await this.$http.post('/addText', payload);
          this.submittedTexts.push({
            text: this.inputText,
            timestamp: new Date(),
            userName: this.user.name,
          });
          this.inputText = '';
        } catch (error) {
          console.log("Error")
        }
      }
    },

    async fetchTexts() {
      try {
        const response = await this.$http.get('/getTexts');
        this.submittedTexts = response.data.map((item) => ({
          text: item.text,
          timestamp: new Date(item.timestamp),
          userName: item.userName,
        }));
      } catch (error) {
        console.log('Error fetching texts:', error);
      }
    },

    formatTimestamp(timestamp) {
      const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(timestamp).toLocaleString('en-US', options);
    },
  },
};
</script>
