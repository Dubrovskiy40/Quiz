// Объявляем основные переменные All aswer options
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

// All pur options
const optionElements = document.querySelectorAll('.option');
console.log(optionElements); // проверяем коллекцию

const question = document.getElementById('question'); // сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'); // номер вопроса
const numberOfAllQuestions = document.getElementById('number-of-all-questions'); //количество всех вопросов

let indexOfQuestion; // индекс текущего вопроса
let indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // обертка для трекера (круги)
const btnNext = document.getElementById('btn-next'); // кнопка далее

let score = 0; // итоговый результат викторины
const correctAnswer = document.getElementById('correct-answer'); // количество правильных ответов
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'); // количество всех вопросов в модальном окне
const btnTryAgain = document.getElementById('btn-try-again'); //кнопка "начать викторину заново"

const questions = [
    {
        question: 'У какого бытового прибора среднестатистический расход электроэнергии за месяц больше, чем у других?',
        options: [
            'Компьютер',
            'Холодильник',
            'Телевизор',
            'Стиральная машина'
        ],
        rightAnswer: 1
    },
    {
        question: 'Главным с точки зрения энергоэффективности при покупке автомобиля для вас должен стать вопрос:',
        options: [
            'В каком году произведен автомобиль?',
            'На каком топливе работает автомобиль?',
            'Какова марка автомобиля?',
            'Сколько топлива потребляет автомобиль?'
        ],
        rightAnswer: 3
    },
    {
        question: 'Примерно 40% потерь тепла в домах происходит через:',
        options: [
            'Вентиляцию',
            'Дверные щели',
            'Окна',
            'Стены'
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая лампа наиболее энергоэффективная?',
        options: [
            'Светодиодная',
            'Лампа накаливания',
            'Люминисцентная',
            'Паяльная'
        ],
        rightAnswer: 0
    },
    {
        question: 'Сколько процентов электроэнергии используется впустую, если зарядное устройство для сотового телефона оставлять включенным в сеть?',
        options: [
            '0%',
            '35%',
            '65%',
            '95%'
        ],
        rightAnswer: 3
    },
    {
        question: 'Какие виды электросчетчиков выгоднее использовать в быту?',
        options: [
            'однотарифные',
            'двухтарифные',
            'трехтарифные',
            'не использовать вообще'
        ],
        rightAnswer: 1
    },
    {
        question: 'Сколько процентов солнечного света поглощают грязные окна?',
        options: [
            '30%',
            '40%',
            '50%',
            '90%'
        ],
        rightAnswer: 0
    },
    {
        question: 'Накипь в электрочайнике увеличивает расход электроэнергии:',
        options: [
            'на 10%',
            'на 20%',
            'на 30%',
            'на 50%'
        ],
        rightAnswer: 1
    },
    {
        question: 'Заполненный мешок для сбора пыли в пылесосе дает увеличение расхода электроэнергии:',
        options: [
            'на 20%',
            'на 30%',
            'на 40%',
            'на 50%'
        ],
        rightAnswer: 2
    },
    {
        question: 'Во сколько раз энергосберегающие лампы могут снизить энергопотребление в квартире:',
        options: [
            'в 1,5 раза',
            'в 2 раза',
            'в 3 раза',
            'в 5 раза'
        ],
        rightAnswer: 1
    }
];

numberOfAllQuestions.innerHTML = questions.length; // выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

    // мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
    indexOfPage++; // увеличение индекса страницы
};

let completedAnswers = []; // массив с уже заданными вопросами

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length); // случайный вопрос из массива
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов

    if (indexOfPage == questions.length) {
        quizOver(); //функция на конец игры
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach (item => { // перебираем все элементы массива
                if (item == randomNumber) { // если элемент массива равен randomNumber значит этот вопрос уже был
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) { //если true
                randomQuestion(); // заново вызываем функцию и генерируем число с вопросом
            } else { // если не true
                indexOfQuestion = randomNumber; // 
                load(); // запускаем функцию
            }
        }
        if (completedAnswers.length == 0) { // проверка
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion); // заполняем массив вопросами, которые уже были
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) { // если ответ верный
        el.target.classList.add('correct'); // добавить класс correct
        updateAnswerTracker('correct'); // заполняем класс у tracker в соответствиис указанным ответом
        score++;
    } else { // иначе
        el.target.classList.add('wrong'); // добавить класс wrong
        updateAnswerTracker('wrong'); // заполняем класс у tracker в соответствиис указанным ответом
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => { // при ответе, сделать остальные кнопки не активными
    optionElements.forEach (item => {
        item.classList.add('disabled'); // каждому элементу массива добавляем класс disabled
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) { // при правильном ответе
            item.classList.add('correct'); // добавляем класс correct
        }
    })
}

// Удаление всех классов со всех ответов для следующего вопроса
const enableOptions = () => {
    optionElements.forEach (item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => { // проходим по массиву вопросов
    questions.forEach (() => { // каждый элемент
        const div = document.createElement('div'); // создаем элемент
        answersTracker.appendChild(div); // добавляем созданный элемент
    }) 
}

const updateAnswerTracker = status => { // обновляем и заполняем tracker, добавлением классов в соответствии с вариантом ответа
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`); // при обращении к дочерним элементам answersTracker добавляем класс
}

// Функции не позволит перейти к следующему вопросу, если не указаны ответы на текущий вопрос
const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) { // если нет класса disabled, т.е ответ не выбран
        // alert('Вам необходимо выбрать один из вариантов ответа'); // выводим сообщение
        chooseAnswer();
    } else { // иначе при нажатии кнопки next запускаем функции
        randomQuestion(); // генерируем новый вопрос
        enableOptions(); // зачищаем классы
    }
}

const chooseAnswer = () => { // запиускается, если не выбран один из ответов на вопрос
    document.querySelector('.quiz-over-modal-choose').classList.add('active');
    console.log('Необходимо выбрать правильный ответ');
}

const quizOver = () => { // при завершении игры показать модальное окно
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score; // добавляем переменную 
    numberOfAllQuestions2.innerHTML = questions.length;
    console.log('Конец игры');
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => { // пока не загрузилась страница, функции не запускаются
    randomQuestion();
    answerTracker();
});