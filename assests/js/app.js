document.addEventListener("DOMContentLoaded", function () {
  // Create stars
  const createStars = () => {
    const starsContainer = document.getElementById("stars");
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;

      const opacity = Math.random() * 0.5 + 0.5;
      star.style.opacity = opacity;

      starsContainer.appendChild(star);
    }
  };

  createStars();

  // Settaggio Data Odierna
  const formattaData = (data) => {
    const giorno = String(data.getDate()).padStart(2, "0");
    const mese = String(data.getMonth() + 1).padStart(2, "0");
    const anno = data.getFullYear();

    return `${giorno} / ${mese} / ${anno}`;
  };

  const dataDaFormattare = new Date();
  const dataFormattata = formattaData(dataDaFormattare);

  document.querySelector("#data-odierna").textContent = dataFormattata;

  // Timer functionality
  const TOTAL_TIME = 15 * 60; // 15 minutes in seconds
  let timer;
  let timeLeft = TOTAL_TIME;
  let isRunning = false;
  let startTime = null;
  let endTime = null;

  const minutesDisplay = document.getElementById("minutes");
  const secondsDisplay = document.getElementById("seconds");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  const progressBar = document.getElementById("progress-bar");
  const endMessage = document.getElementById("end-message");
  const closeMessageBtn = document.getElementById("close-message-btn");
  // const timeInfo = document.getElementById("time-info");
  const startTimeDisplay = document.getElementById("start-time");
  const endTimeDisplay = document.getElementById("end-time");

  // Funzione per formattare l'ora
  const formatTime = (date) => {
    return date.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Funzione per calcolare l'ora di fine
  const calculateEndTime = (start) => {
    const end = new Date(start.getTime() + TOTAL_TIME * 1000);
    return end;
  };

  // Funzione per calcolare e mostrare gli orari attuali
  const calculateCurrentTimes = () => {
    const now = new Date();
    const endNow = new Date(now.getTime() + TOTAL_TIME * 1000);
    
    startTimeDisplay.textContent = formatTime(now);
    endTimeDisplay.textContent = formatTime(endNow);
  };

  const updateDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");

    const progressPercentage = (timeLeft / TOTAL_TIME) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  };

  const updateTimeDisplay = () => {
    if (startTime && endTime) {
      // Se il timer è stato avviato, mostra gli orari effettivi
      startTimeDisplay.textContent = formatTime(startTime);
      endTimeDisplay.textContent = formatTime(endTime);
    } else {
      // Se il timer non è stato avviato, mostra gli orari attuali
      calculateCurrentTimes();
    }
  };

  const showEndMessage = () => {
    endMessage.classList.add("show");
  };

  const hideEndMessage = () => {
    endMessage.classList.remove("show");
  };

  const startTimer = () => {
    if (!isRunning) {
      isRunning = true;
      startBtn.textContent = "Pausa";

      // Imposta l'ora di inizio solo se non è già impostata
      if (!startTime) {
        startTime = new Date();
        endTime = calculateEndTime(startTime);
        updateTimeDisplay();
      }

      timer = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
          clearInterval(timer);
          timeLeft = 0;
          isRunning = false;
          startBtn.textContent = "Inizia";
          showEndMessage();
        }

        updateDisplay();
      }, 1000);
    } else {
      clearInterval(timer);
      isRunning = false;
      startBtn.textContent = "Riprendi";
    }
  };

  const resetTimer = () => {
    clearInterval(timer);
    timeLeft = TOTAL_TIME;
    isRunning = false;
    startTime = null;
    endTime = null;
    startBtn.textContent = "Inizia";
    updateDisplay();
    updateTimeDisplay(); // Questo ora mostrerà gli orari aggiornati all'ora attuale
  };

  // Event listeners
  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  closeMessageBtn.addEventListener("click", hideEndMessage);

  // Initialize
  updateDisplay();
  updateTimeDisplay();

  // Aggiorna gli orari ogni secondo anche quando il timer non è attivo
  setInterval(() => {
    if (!startTime) {
      calculateCurrentTimes();
    }
  }, 1000);

});
