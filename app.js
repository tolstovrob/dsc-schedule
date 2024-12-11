export const schedule = [
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
    club: 'клуб КБ',
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
    title: 'Typescript для строго фронтенда',
    lecturer: 'Роберт Толстов',
    difficulty: 2,
    club: 'клуб Web-разработки',
    organisation: null,
    startTime: '15:35',
    endTime: '16:35',
  },
];


const getCurrentLecture = (lectures) => {
  const now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12, 50, 0); // new Date();
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
  const now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12, 50, 0); // new Date();
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  return lectures.filter((lecture) => {
    const [startHours, startMinutes] = lecture.startTime.split(':').map(Number);
    
    const lectureStartTime = startHours * 60 + startMinutes;

    return currentTimeInMinutes < lectureStartTime; // Лекции, которые еще не начались
  });
};

const displayLectures = () => {
  const currentLecture = getCurrentLecture(schedule);
  const upcomingLectures = getUpcomingLectures(schedule);

  // Ссылки на элементы DOM
  const currentRef = document.getElementById('current');
  const upcomingRef = document.getElementById('upcoming');

  currentRef.innerHTML = '';
  upcomingRef.innerHTML = '';

  // Отображение текущей лекции
  if (currentLecture) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${currentLecture.title}</td>
      <td>${currentLecture.lecturer}</td>
      <td>${currentLecture.difficulty}</td>
      <td>${currentLecture.club}</td>
      <td>${currentLecture.organisation || 'Нет'}</td>
      <td>${currentLecture.startTime} - ${currentLecture.endTime}</td>
    `;
    
    currentRef.appendChild(row);
  } else {
    currentRef.innerHTML = '<tr><td>Перерыв...</td></tr>';
  }

  // Отображение предстоящих лекций
  if (upcomingLectures.length === 0) {
    upcomingRef.innerHTML = '<tr><td>На сегодня лекций нет</td></tr>';
  } else {
    upcomingLectures.forEach((lecture) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${lecture.title}</td>
        <td>${lecture.lecturer}</td>
        <td>${lecture.difficulty}</td>
        <td>${lecture.club}</td>
        <td>${lecture.organisation || 'Нет'}</td>
        <td>${lecture.startTime} - ${lecture.endTime}</td>
      `;

      upcomingRef.appendChild(row);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  displayLectures();
});