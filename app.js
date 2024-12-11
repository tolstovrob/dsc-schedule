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
  const now = new Date();
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
  const now = new Date();
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
  const mainRef = document.getElementsByTagName('main')[0];

  if (schedule.length === 0) {
    mainRef.innerHTML = '<h1>std::cout << На сегодня нет лекций :( << std::endl;</h1>';
    return;
  }

  currentRef.innerHTML = '';
  upcomingRef.innerHTML = '';

  if (currentLecture) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${currentLecture.title}</td>
      <td>${currentLecture.club}</td>
      <td>
        <div class="credentials">
          <span>${currentLecture.lecturer}</span>
          ${currentLecture.organisation ? `<span>${currentLecture.organisation}</span>` : ''}
        </div>
      </td>
      <td>${currentLecture.difficulty}</td>
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
    upcomingRef.innerHTML = '<tr><td>На сегодня лекций нет</td></tr>';
  } else {
    upcomingLectures.forEach((lecture) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${lecture.title}</td>
        <td>${lecture.club}</td>
        <td>
          <div class="credentials">
            <span>${lecture.lecturer}</span>
            ${lecture.organisation ? `<span>${lecture.organisation}</span>` : ''}
          </div>
        </td>
        <td>${lecture.difficulty}</td>
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
