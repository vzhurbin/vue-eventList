new Vue({

  // We want to target the div with an id of 'events'
  el: '#events',

  data: {
    event: { name: '', description: '', date: '' },
    events: []
  },

  // Anything within the ready function will run when the application loads
  mounted() {
    this.fetchEvents();
  },

  // Methods we want to use in our application are registered here
  methods: {

    // We dedicate a method to retrieving and setting some data
    fetchEvents() {
      const events = [];
      this.$http.get('/api/events').then(response =>
        this.events = response.body,
        err => console.log(err)
      );
    },

    // Adds an event to the existing events array
    addEvent() {
      if (this.event.name) {
        this.$http.post('/api/events', this.event).then(response => {   
          this.events.push(this.event);
          this.event = { name: '', description: '', date: '' };
        }, err => console.log(err)
        );
      }
    },

    deleteEvent(index) {
      if (confirm("Are you sure you want to delete this event?")) {
        this.$http.delete('api/events/').then(response => {
          this.events.splice(index, 1)
        }, err => console.log(err)
        );
      }
    },

  },

});
