(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
