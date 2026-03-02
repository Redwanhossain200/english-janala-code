const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then(res => res.json()) // promise of json data
    .then((json) => displayLesson(json.data));
}

const displayLesson = (lessons) => {
  // 1. get the container & empty

  // 2. get into every lessons

  // 3. create element

  // 4. append into container
};

loadLessons();