const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then(res => res.json()) // promise of json data
    .then((json) => displayLesson(json.data));
}

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons);
  lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
}

/* {
  "word": "Diligent",
    "meaning": "পরিশ্রমী",
      "pronunciation": "ডিলিজেন্ট",
        "level": 5,
          "sentence": "He is a diligent student who studies every day.",
            "points": 5,
              "partsOfSpeech": "adjective",
                "synonyms": [
                  "hardworking",
                  "industrious",
                  "persistent"
                ],
                  "id": 4
} */
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
}
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div class="">
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div class="">
          <h2 class="font-bold">Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div class="">
          <h2 class="font-bold">Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div class="">
          <h2 class="font-bold">Synonyms</h2>
          <span class="btn">Syn1</span>
          <span class="btn">Syn1</span>
          <span class="btn">Syn1</span>
        </div>
  `;

  document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
     <div class="text-center col-span-full rounded-xl py-6 space-y-5 font-bangla">
      <img src="./assets/alert-error.png" alt="" class="mx-auto">
      <p class="text-[16px] font-medium text-[#79716b] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bold text-4xl font-bangla">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    return;
  }

  // {
  //   "id": 82,
  //    "level": 1,
  //    "word": "Car",
  //     "meaning": "গাড়ি",
  //     "pronunciation": "কার"
  // }

  words.forEach(word => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl">${word.word ? word : "শব্দ পাওয়া যায়নি"}</h2>
      <p class="font-semibold">Meaning /Pronounciation</p>

      <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
      } /  ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"
      }"</div>
      <div class="flex justify-between items-center mt-12">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF20] border-none hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF20] border-none hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    `;
    wordContainer.append(card);
  })
}

const displayLesson = (lessons) => {
  // 1. get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. get into every lessons
  for (let lesson of lessons) {

    // 3. create element
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                  <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                  </button>
    `
    // 4. append into container
    levelContainer.append(btnDiv);
  };
};

loadLessons();