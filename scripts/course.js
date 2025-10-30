const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const allBtn = document.getElementById('allcourses');
const wddBtn = document.getElementById('wddcourses');
const cseBtn = document.getElementById('csecourses');




createCourseCard(courses);


function createCourseCard(courses) {
    document.querySelector('.classes').innerHTML = "";
    courses.forEach(course => {
        let card = document.createElement('section');       
        let para = document.createElement('p');
        let paraTwo = document.createElement('p');
        let markSpan = document.createElement('span')

        let sub = course.subject;
        let num = course.number;
        let title = course.title;
        let mark = course.completed;
        let cred = course.credits
        
       
        if (mark === true) {
            markSpan.innerHTML = `✔`;
            markSpan.style.color = '#238080';
        }
        else if (mark === false) {
            markSpan.textContent = '✘';
            markSpan.style.color = 'darkred';
        }

        para.setAttribute('class', 'classnum');
        para.textContent = ` ${sub} ${num}`;
        paraTwo.textContent = `${title}`;
            
        card.appendChild(markSpan);
        card.appendChild(para);
        card.appendChild(paraTwo);
        document.querySelector('.classes').appendChild(card);

    
       
    })
   
}




allBtn.addEventListener("click", () => {
    createCourseCard(courses);
})

const wddCourses = courses.filter(course => course.subject === 'WDD');
const cseCourses = courses.filter(course => course.subject === 'CSE');

wddBtn.addEventListener('click', () => {
    createCourseCard(wddCourses);
})

cseBtn.addEventListener('click', () => {
    createCourseCard(cseCourses);
})

