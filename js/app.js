// DOM Elements
const videoWrapper = document.getElementById("videoWrapper");
const video = document.getElementById("lessonVideo");
const quiz = document.getElementById("quiz");
const buttons = document.querySelectorAll(".lesson-btn");
const homeBackground = document.getElementById("homeBackground");
const homeObjects = document.querySelectorAll(".home-object");

let currentAudio = null;

// Stop all audio playback
function stopAllAudio() {
  const allAudios = document.querySelectorAll('audio');
  allAudios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
  currentAudio = null;
}

// Hide home view (background + overlay objects)
function hideHomeView() {
  homeBackground.style.display = 'none';
  homeObjects.forEach(obj => obj.style.display = 'none');
}

// Show home view (background + overlay objects)
function showHomeView() {
  homeBackground.style.display = 'block';
  homeObjects.forEach(obj => obj.style.display = 'block');
  video.style.display = 'none';
  quiz.classList.add('hidden');
}

// Play audio when clicking home overlay objects
function playHomeObjectAudio(objElement) {
  const audioId = objElement.getAttribute('data-audio');
  const audioElement = document.getElementById(audioId);

  if (audioElement) {
    stopAllAudio();
    currentAudio = audioElement;
    audioElement.currentTime = 0;
    audioElement.play().catch(e => console.log("Audio play error:", e));
  }
}

// Main function to handle lesson button clicks
function playLesson(videoSource, clickedBtn, quizType = false, audioSource = null) {
  hideHomeView();
  
  video.pause();
  video.currentTime = 0;
  video.muted = true;
  video.src = "";

  stopAllAudio();

  quiz.classList.add("hidden");

  // Update button states
  buttons.forEach(btn => btn.src = btn.dataset.default);
  clickedBtn.src = clickedBtn.dataset.active;

  // Button #4: Object with Letter Quiz
  if (quizType === 'object') {
    video.style.display = 'none';
    quiz.className = "quiz object-with-letter";
    quiz.innerHTML = `
      <audio id="introAudio" src="https://peblix.libxr.app/blob/app/intro.mp3"></audio>
      <audio id="appleAudio" src="https://peblix.libxr.app/blob/app/apple.mp3"></audio>
      <audio id="antAudio" src="https://peblix.libxr.app/blob/app/ant.mp3"></audio>
      <audio id="aeroplaneAudio" src="https://peblix.libxr.app/blob/app/aeroplane.mp3"></audio>
      <audio id="hookAudio" src="https://abbasismartwing.com/Smartwings_2025_1/English_Playgroup/Letter_a/ar/973537.mp3"></audio>
      <audio id="aeroAudio" src="https://peblix.libxr.app/blob/app/aero.mp3"></audio>

      <img src="images/aeroplane.png" class="quiz-corner-img quizImg" data-audio="aeroplaneAudio" onclick="playImageAudio(this)">
      <img src="images/ant.png" class="quiz-corner-img quizImg" data-audio="antAudio" onclick="playImageAudio(this)">
      <div class="apple">
      <img src="images/apple.png" class="quiz-corner-img apple-img" data-audio="appleAudio" onclick="playImageAudio(this)">
      </div>
      <img src="images/hook.png" class="quiz-corner-img quizImg" data-audio="hookAudio" onclick="playImageAudio(this)">
       <img src="images/aero.png" class="quiz-corner-img quizImg arrow" data-audio="aeroAudio" onclick="playImageAudio(this)">
     
    `;

    // Play intro audio after 100ms
    setTimeout(() => {
      const introAudio = document.getElementById("introAudio");
      if (introAudio) {
        stopAllAudio();
        currentAudio = introAudio;
        introAudio.currentTime = 0;
        introAudio.play().catch(e => console.log("Audio play error:", e));
      }
    }, 100);
  } 
  // Button #5: Letter Activity Quiz
  else if (quizType === 'activity') {
    video.style.display = 'none';
    quiz.className = "quiz letter-activity";
    quiz.innerHTML = `
      <audio id="questionAudio" src="https://abbasismartwing.com/Smartwings_2025_1/English_Playgroup/Letter_a/ar/973522.mp3"></audio>
      <audio id="correctDuckAudio" src="https://abbasismartwing.com/Smartwings_2025_1/English_Playgroup/Letter_a/ar/976561.mp3"></audio>
      <audio id="wrongAppleAudio" src="https://abbasismartwing.com/Smartwings_2025_1/English_Playgroup/Letter_a/ar/976555.mp3"></audio>
      <audio id="wrongAeroAudio" src="https://abbasismartwing.com/Smartwings_2025_1/English_Playgroup/Letter_a/ar/976558.mp3"></audio>
      <audio id="wrongAntAudio" src="https://abbasismartwing.com/Smartwings_2025_1/English_Playgroup/Letter_a/ar/976552.mp3"></audio>

      <div class="apple">
      <img src="images/apple.png" class="quiz-activity-img" data-name="apple" data-correct="false" onclick="checkAnswer(this)">
      </div>
      <img src="images/duck.png" class="quiz-activity-img" data-name="duck" data-correct="true" onclick="checkAnswer(this)">
      <img src="images/aero.png" class="quiz-activity-img img-arrow" data-name="aero" data-correct="false" onclick="checkAnswer(this)">
      <img src="images/ant.png" class="quiz-activity-img" data-name="ant" data-correct="false" onclick="checkAnswer(this)">
    `;

    // Play question audio after 100ms
    setTimeout(() => {
      const questionAudio = document.getElementById("questionAudio");
      if (questionAudio) {
        stopAllAudio();
        currentAudio = questionAudio;
        questionAudio.currentTime = 0;
        questionAudio.play().catch(e => console.log("Audio play error:", e));
      }
    }, 100);
  } 
  // Regular video lessons (Buttons #1, #2, #3, #6)
  else {
    video.style.display = 'block';
    quiz.classList.add("hidden");

    video.src = videoSource;
    video.muted = false;
    video.load();
    
    // Button #6: Play video with separate audio track
    if (audioSource) {
      const videoAudio = new Audio(audioSource);
      videoAudio.play().catch(e => console.log("Video audio play error:", e));
      currentAudio = videoAudio;
      
      video.addEventListener('ended', () => {
        videoAudio.pause();
        videoAudio.currentTime = 0;
      }, { once: true });
    }
    
    video.play();
  }
}

// Play audio for clicked quiz images (Button #4)
function playImageAudio(imgElement) {
  const audioId = imgElement.getAttribute('data-audio');
  const audioElement = document.getElementById(audioId);

  if (audioElement) {
    stopAllAudio();
    currentAudio = audioElement;
    audioElement.currentTime = 0;
    audioElement.play().catch(e => console.log("Audio play error:", e));
  }
}

// Check answer for Letter Activity quiz (Button #5)
function checkAnswer(imgElement) {
  const isCorrect = imgElement.getAttribute('data-correct') === 'true';
  const imageName = imgElement.getAttribute('data-name');
  
  stopAllAudio();

  // Play correct answer audio (duck)
  if (isCorrect) {
    const correctAudio = document.getElementById("correctDuckAudio");
    if (correctAudio) {
      currentAudio = correctAudio;
      correctAudio.currentTime = 0;
      correctAudio.play().catch(e => console.log("Audio play error:", e));
    }
  } 
  // Play wrong answer audio with specific image name
  else {
    let wrongAudio = null;
    
    if (imageName === 'apple') {
      wrongAudio = document.getElementById("wrongAppleAudio");
    } else if (imageName === 'ant') {
      wrongAudio = document.getElementById("wrongAntAudio");
    } else if (imageName === 'aero') {
      wrongAudio = document.getElementById("wrongAeroAudio");
    }
    
    if (wrongAudio) {
      currentAudio = wrongAudio;
      wrongAudio.currentTime = 0;
      wrongAudio.play().catch(e => console.log("Audio play error:", e));
    }
  }
}

// Toggle sound on/off for all audio elements
function toggleSound() {
  video.muted = !video.muted;

  const allAudios = document.querySelectorAll('audio');
  allAudios.forEach(audio => {
    audio.muted = video.muted;
  });
}

// Close video/quiz and return to home view
function closeVideo() {
  video.pause();
  video.currentTime = 0;
  video.src = "";

  stopAllAudio();

  showHomeView();

  buttons.forEach(btn => btn.src = btn.dataset.default);

  // Reset quiz to default state
  quiz.className = "quiz hidden object-with-letter";
  quiz.innerHTML = `
    <audio id="introAudio" src="https://peblix.libxr.app/blob/app/intro.mp3"></audio>
    <audio id="appleAudio" src="https://peblix.libxr.app/blob/app/apple.mp3"></audio>
    <audio id="antAudio" src="https://peblix.libxr.app/blob/app/ant.mp3"></audio>
    <audio id="aeroplaneAudio" src="https://peblix.libxr.app/blob/app/aeroplane.mp3"></audio>
    <audio id="hookAudio" src="https://abbasismartwing.com/Smartwings_2025_1/English_Playgroup/Letter_a/ar/973537.mp3"></audio>
    <audio id="aeroAudio" src="https://peblix.libxr.app/blob/app/aero.mp3"></audio>
     
    <img src="images/aeroplane.png" class="quiz-corner-img" data-audio="aeroplaneAudio" onclick="playImageAudio(this)">
    <img src="images/ant.png" class="quiz-corner-img" data-audio="antAudio" onclick="playImageAudio(this)">
    <div class="apple">
    <img src="images/apple.png" class="quiz-corner-img" data-audio="appleAudio" onclick="playImageAudio(this)">
    </div>
    <img src="images/hook.png" class="quiz-corner-img" data-audio="hookAudio" onclick="playImageAudio(this)">

    <img src="images/aero.png" class="arrow" data-audio="aeroAudio" onclick="playImageAudio(this)">
  `;
}