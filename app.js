const schedule = [
  {
    title: 'Знакомство с Git',
    lecturer: 'Никита Рыданов',
    difficulty: 1,
    club: 'rand()',
    organisation: 'ORB Intelligence',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    title: 'Введение в реверс-инжиниринг',
    lecturer: 'Данила Григорьев',
    difficulty: 3,
    club: 'КБ',
    organisation: null,
    startTime: '12:05',
    endTime: '13:35',
  },
  {
    title: 'Основы React',
    lecturer: 'Евгений Мангасарян',
    difficulty: 1,
    club: 'rand()',
    organisation: 'ORB Intelligence',
    startTime: '13:45',
    endTime: '15:45',
  },
  {
    title: 'Typescript для строгого фронтенда',
    lecturer: 'Роберт Толстов',
    difficulty: 2,
    club: 'Web',
    organisation: null,
    startTime: '15:35',
    endTime: '16:35',
  },
];

const getCurrentLecture = (lectures) => {
  const now = new Date(); // new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 0, 0);
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
  const now = new Date(); // new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 0, 0);
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
          <span class="bi bi-star-fill"></span>
          <span class="bi bi-${currentLecture.difficulty < 2 ? 'star' : 'star-fill'}"></span>
          <span class="bi bi-${currentLecture.difficulty < 3 ? 'star' : 'star-fill'}"></span>
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
          <span class="bi bi-star-fill"></span>
          <span class="bi bi-${lecture.difficulty < 2 ? 'star' : 'star-fill'}"></span>
          <span class="bi bi-${lecture.difficulty < 3 ? 'star' : 'star-fill'}"></span>
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

document.addEventListener('DOMContentLoaded', () => {
  displayLectures();
});
