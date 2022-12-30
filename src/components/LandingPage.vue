<template>

  <audio class = audio autoplay>
      <!-- <source src="../assets/styling/mario_theme_song.mp3" type="audio/mp3"> -->
  </audio>
      
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
  
  <div class="reviewDisp">
      <h3 id="second">Hear from our users</h3>
  
      <div class="row justify-content-center" style="border-right:20px; border-left:100px;">
        <!-- <div class="col-1"></div> -->
        <div class="col-lg-3 col-md-6 col-sm-8 mx-sm-2 container-fluid content-row" v-for="item in review" :key="item" 
          style="padding:10px; text-align: center">
          
            <br>
            <div class="card h-100">
              <div class="card-body">
                  <h5 class="card-title" style="font-family: 'mario';">{{item.name}}</h5>
                <hr>
                <p class="card-text">{{item.msg}}</p>
                  <img v-for="n in item.rating" :key="n" 
                  src="../assets/styling/yellowStar.png" class="star2">
              </div>
            </div>
        </div>
      </div>
        <!-- <div class="col-1"></div> -->
  
  </div>
  
  <div id="review" style="text-align: center;">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" 
    data-bs-whatever="@getbootstrap" id="reviewBtn">Leave a Review</button>
      
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="reviewHead" 
              style="text-align:center;margin:auto;">Leave a Review</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="margin-left:0"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label" style="text-weight: bold; color: black;">👦🏻 Tell us your name 👧🏻</label>
                  <input type="text" class="form-control" id="nameField">
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Add your review 💬</label>
                  <textarea class="form-control" id="messageField" style="height: auto"></textarea>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Rate Mario Univer-CT 💯</label>
  
                  <!-- <h2>Star Rating</h2> -->
                  <div id="divContainer">
                    <img v-for="(star, indx) of this.stars" :key="indx" class="star" hpsace="5" 
                    :src="`${star.src}`" @click="addStar(`${indx}`)" style="width: 50px;">
                  </div>
  
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button id="submit" class="btn btn-primary" @click="addReview">Send</button>
            </div>
          </div>
        </div>
      </div>
  
  </div>
  
  </template>
  
  <script>
  import { db } from '../../firebase/index.js'
  import { collection, getDocs, doc, addDoc } from 'firebase/firestore';
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
        addStar(star) {
            const img1 = require('@/assets/styling/yellowStar.png')
            const img2 = require('@/assets/styling/star-empty.svg')
            for (let i=0; i<5; i++) {
              if (i <= star){
                this.stars[i].src = img1
              }
              else {
                this.stars[i].src = img2
              }
            }
            
            this.total = Number(star) + 1
            console.log(this.total)
            },
  
        addReview() {
          var name = document.getElementById('nameField').value;
          var msg = document.getElementById('messageField').value;
  
          addDoc(collection(db, "review"), {
            name: name,
            message: msg,
            star: this.total
          });
          // alert('Review added')
  
          document.getElementById('nameField').value = ''
          document.getElementById('messageField').value = ''
          this.addStar(-1)
        }
        }, 
        created() {
          for (let i = 0; i < 5; i++){
            const img = require("@/assets/styling/star-empty.svg")
            const star = {src: img}
            this.stars[i] = star
          }
          // console.log(this.stars)
  
          const querySnapshot = getDocs(collection(db, "review"))
          querySnapshot.then((result) => {
            result.forEach((doc) => {
              var data = {
                name: doc.data().name,
                msg: doc.data().message, 
                rating: doc.data().star
              };
  
              this.review.push(data);
              console.log(this.review)
            }
            )
          })
        },
      }
  </script>
  
  <style @scoped>
    @import '@/assets/styling/algoStyler.css';
  
  </style>