new Vue({

  // We want to target the div with an id of 'events'
  el: '#events',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    event: { name: '', description: '', date: '' },
    events: []
  },

  // Anything within the ready function will run when the application loads
  mounted() {
    // When the application loads, we want to call the method that initializes
    // some data
    this.fetchEvents();
  },

  // Methods we want to use in our application are registered here
  methods: {

    // We dedicate a method to retrieving and setting some data
    fetchEvents() {
      const events = [];

      // const events = [
      //   {
      //     id: 1,
      //     name: 'TIFF',
      //     description: 'Toronto International Film Festival',
      //     date: '2018-09-10'
      //   },
      //   {
      //     id: 2,
      //     name: 'The Martian Premiere',
      //     description: 'The Martian comes to theatres.',
      //     date: '2018-10-02'
      //   },
      //   {
      //     id: 3,
      //     name: 'SXSW',
      //     description: 'Music, film and interactive festival in Austin, TX.',
      //     date: '2018-03-11'
      //   }
      // ];

      // Set the collection of events
      // this.events = events;

      this.$http.get('/api/events')
        .then(
          response => this.events = response.body,
          err => console.log(err)
        );
    },

    // Adds an event to the existing events array
    addEvent() {
      if (this.event.name) {

        this.$http.post('/api/events', this.event)
          .then(
            response => {   
              this.events.push(this.event);
              this.event = { name: '', description: '', date: '' };
            }, err => console.log(err)
          );
      }
    },

    deleteEvent(index) {
      if (confirm("Are you sure you want to delete this event?")) {
        this.$http.delete('api/events/')
          .then(
            response => this.events.splice(index, 1),
            err => console.log(err)
          );
      }
    },

  },

});
