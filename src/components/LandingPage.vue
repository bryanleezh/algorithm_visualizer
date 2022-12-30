<template>
      
  <div id="first" class="d-flex">
      <h1 id="bigheader">
        <span style="text-decoration:underline">Ace</span> Computational <br> Thinking with <br>
        <img src="../assets/styling/logo.png" class="img-fluid">
      </h1>
  </div>
  
  <div id="features" >
      <div class="row justify-content-center w-100">
          <div class="col-lg-3 col-md-6">
              <p id="homedescription"> 
                👀 Visualise Algorithms </p>
          </div>
          <div class="col-lg-3 col-md-6">
              <p id="homedescription"> 
                🧮 Access Class Content </p>
          </div>
          <div class="col-lg-3 col-md-6">
              <p id="homedescription">  
                📝 Practice Questions </p>
          </div>
      </div>
  </div>
  
  <div class="intro row container-fluid">
    <div class="col-lg-2 col-md-1"></div>
    <div class="col-lg-8 col-md-10">
      <video id='mariovid' controls autoplay muted loop>
          <!-- <source src="../assets/styling/homepage.mp4" type="video/mp4"> -->
          <source src="../assets/styling/mario2.mp4" type="video/mp4">
      </video>
    </div>
    <div class="col-lg-2 col-md-1"></div>
  </div>
  
  </template>
  
  <script>
  export default {
      name: "LandingPage",
      data() {
        return {
          total: 0,
          review: [],
          name: {},
          msg: {}, 
          rating: {},
          stars: {}
        }
      },
      methods: {
        
        }, 
      created() {
      },
      }
  </script>
  
  <style @scoped>
    @import '@/assets/styling/algoStyler.css';
  
  </style>