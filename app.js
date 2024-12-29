const schedule = [];

const getCurrentLecture = (lectures) => {
  const now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 0, 0);
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  return lectures.find((lecture) => {
    const [startHours, startMinutes] = lecture.startTime.split(':').map(Number);
    const [endHours, endMinutes] = lecture.endTime.split(':').map(Number);

    const lectureStartTime = startHours * 60 + startMinutes;
    const lectureEndTime = endHours * 60 + endMinutes;

    return currentTimeInMinutes >= lectureStartTime && currentTimeInMinutes < lectureEndTime;
  });
};

const getUpcomingLectures = (lectures) => {
  const now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 0, 0);
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  return lectures.filter((lecture) => {
    const [startHours, startMinutes] = lecture.startTime.split(':').map(Number);

    const lectureStartTime = startHours * 60 + startMinutes;

    return currentTimeInMinutes < lectureStartTime;
  });
};

const displayLectures = () => {
  const currentLecture = getCurrentLecture(schedule);
  const upcomingLectures = getUpcomingLectures(schedule);

  const currentRef = document.getElementById('current');
  const upcomingRef = document.getElementById('upcoming');

  currentRef.innerHTML = '';
  upcomingRef.innerHTML = '';

  if (currentLecture) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>
          <div class="credentials">
            <span>${currentLecture.title}</span>
            <span>${currentLecture.club}</span>
          </div>
        </td>
        <td>
          <div class="credentials">
            <span>${currentLecture.lecturer}</span>
            ${currentLecture.organisation ? `<span>${currentLecture.organisation}</span>` : ''}
          </div>
        </td>
        <td>
          <div class="time">
            <span>${currentLecture.startTime}</span>
            <span>${currentLecture.endTime}</span>
          </div>
        </td>
    `;

    currentRef.appendChild(row);
  } else {
    currentRef.innerHTML = '<tr><td>Перерыв...</td></tr>';
  }

  if (upcomingLectures.length === 0) {
    upcomingRef.innerHTML = '<tr><td>Завершение...</td></tr>';
  } else {
    upcomingLectures.forEach((lecture) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>
          <div class="credentials">
            <span>${lecture.title}</span>
            <span>${lecture.club}</span>
          </div>
        </td>
        <td>
          <div class="credentials">
            <span>${lecture.lecturer}</span>
            ${lecture.organisation ? `<span>${lecture.organisation}</span>` : ''}
          </div>
        </td>
        <td>
          <div class="time">
            <span>${lecture.startTime}</span>
            <span>${lecture.endTime}</span>
          </div>
        </td>
      `;

      upcomingRef.appendChild(row);
    });
  }
};

const addLectureForm = document.getElementById('addLectureForm');

addLectureForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newCourse = {
    title: document.getElementById('title').value,
    lecturer: document.getElementById('lecturer').value,
    club: document.getElementById('club').value,
    organisation: document.getElementById('organisation').value || null,
    startTime: document.getElementById('startTime').value,
    endTime: document.getElementById('endTime').value,
  };

  schedule.push(newCourse);
  displayLectures();

  addLectureForm.reset();
});


document.addEventListener('DOMContentLoaded', () => {
  displayLectures();
});
