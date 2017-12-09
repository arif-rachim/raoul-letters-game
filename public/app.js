/**
 * Created by arif on 12/8/2017.
 */

let {html,htmlCollection} = new Context();
let render = yalla.render;
const repaintPage = () => {
    render(html`
    <style>
        body{
            font-family: 'Lato', sans-serif;
            margin: 0px;
            padding: 0px;
        }
        .raul-pic{
            height: 70vh;
            
        }
        .center{
            text-align: center;
        }
        .start-button{
            margin-top: 20px;
            font-size: 2em;
        }
        
        
        
        .btn {
            border: none;
            font-family: 'Lato', sans-serif;
            color: #ffffff;
            font-size: 28px;
            background: #3498db;
            padding: 10px 20px 10px 20px;
            text-decoration: none;
        }
        
        
    </style>
    <div class="container">
        <div class="center">
            <img src="assets/raoul.jpg" class="raul-pic" alt="Responsive image">
        </div>
        <div class="center">
            <button class="btn start-button animated bounceIn " onclick="${e => startPlay()}">Start</button>
        </div>
    </div>
    `,document.body);
};

const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const letterAudios = letters.map(letter => new Audio(`./assets/audio/${letter}.mp3`));
const audioFromLetter = (letter) => letterAudios[letters.indexOf(letter)];
const notRightAudio = new Audio('./assets/audio/notright.mp3');
const goodjob1Audio = new Audio('./assets/audio/good-job-1.mp3');
const goodjob2Audio = new Audio('./assets/audio/good-job-2.mp3');
const goodjob3Audio = new Audio('./assets/audio/good-job-3.mp3');
const goodjob4Audio = new Audio('./assets/audio/good-job-4.mp3');

let score = localStorage.getItem('score') || 0;
let strike = localStorage.getItem('strike') || 0;
score = parseInt(score);
strike = parseInt(strike);

const startPlay = () => {
    startChallange.play();
    startChallange.letter = generateLetter();
    let audio = audioFromLetter(startChallange.letter);
    debugger;
    audio.play();
    audio.pause();
};

const generateLetter = () => {
    let letter = letters[Math.round(Math.random()* letters.length)];
    return letter ? letter : generateLetter();
};

const openNextPage = (nextLetter) => {
    let questions = [nextLetter];
    while(questions.length<4){
        let falseLetter = generateLetter();
        if(questions.indexOf(falseLetter)<0){
            questions.push(falseLetter);
        }
    }
    shuffle(questions);
    audioFromLetter(nextLetter).play();
    render(html`
    <style>
        
        body{
            margin: 0px;
            padding: 0px;
        }
        
        h1{
            font-weight: 100;
            font-size: 4em;
            color : #666;
            bottom : 3px;
            right : 10px;
            margin : 0px;
            position : absolute;
            display: inline-block;
        }
        table{
            text-align: center;
        }
        img {
            width: calc( (100vw - 148px) / 2);
            height: 25vh;
        }
        
        .background-color {
            background: #f2f6ff;
            background: -moz-linear-gradient(top, #f2f6ff 2%, #f4f4eb 100%);
            background: -webkit-linear-gradient(top, #f2f6ff 2%,#f4f4eb 100%);
            background: linear-gradient(to bottom, #f2f6ff 2%,#f4f4eb 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2f6ff', endColorstr='#f4f4eb',GradientType=0 );
        }
        
        .shadow {
            -webkit-box-shadow: -1px 1px 35px -3px rgba(0,0,0,0.64);
            -moz-box-shadow: -1px 1px 35px -3px rgba(0,0,0,0.64);
            box-shadow: -1px 1px 35px -3px rgba(0,0,0,0.64);
        }
        
        .header{
            text-align: right;
            padding : 10px;
            height : 60px;
            position : relative;
        }
        
        .hidden{
            display: none;
        }
        
        .button {
            padding: 15px 25px;
            text-align: center;
            cursor: pointer;
            outline: none;
            color: #fff;
            border: 1px solid #CCC;
            border-radius: 15px;
            box-shadow: 0 9px #CCC;
        }
        
        .button:active {
            box-shadow: 0 5px #BBB;
            transform: translateY(4px);
        }
        
    </style>
    <div class="background-color header shadow" id="header" ></div>
    </div>
    <table>
        <tr >
            <td style="text-align:center">
            <table style="margin-top: 20px;" cellspacing="10px" >
                <tr>
                    <td onclick="${e => questions[0] == nextLetter ? correctAnswer() : wrongAnswer()}" >
                        <div style="position: relative" class="button">
                        <img src="assets/${questions[0]}.jpg" >
                        <label style="font-size: 4em;opacity: 0.1;position: absolute;bottom: 10px;right: 10px;color: #333">${questions[0].toUpperCase()}</label>
                        </div>
                    </td>
                    <td onclick="${e => questions[1] == nextLetter ? correctAnswer() : wrongAnswer()}" >
                        <div style="position: relative" class="button">
                        <img src="assets/${questions[1]}.jpg" >
                        <label style="font-size: 4em;opacity: 0.1;position: absolute;bottom: 10px;right: 10px;color: #333">${questions[1].toUpperCase()}</label>
                        </div>
                        
                    </td>
                </tr>
                <tr>
                    <td onclick="${e => questions[2] == nextLetter ? correctAnswer() : wrongAnswer()}">
                        <div style="position: relative" class="button">
                        <img src="assets/${questions[2]}.jpg" >
                        <label style="font-size: 4em;opacity: 0.1;position: absolute;bottom: 10px;right: 10px;color: #333">${questions[2].toUpperCase()}</label>
                        </div>
                    </td>
                    <td onclick="${e => questions[3] == nextLetter ? correctAnswer() : wrongAnswer()}">
                        <div style="position: relative" class="button">
                        <img src="assets/${questions[3]}.jpg" >
                        <label style="font-size: 4em;opacity: 0.1;position: absolute;bottom: 10px;right: 10px;color: #333">${questions[3].toUpperCase()}</label>
                        </div>
                    </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
    <button onclick="${e => resetScore()}" style="border: none;font-family: 'Lato';font-weight: 300;font-size:1em;color: white;background-color: red;position: absolute;bottom: 10px;left: 10px;">Reset</button>
    
`,document.body).then(() => {
        setTimeout(() => render(html`<h1 class="">${score}</h1>`,document.getElementById('header')),1000);
    });
};

const resetScore = () => {
    let x = window.confirm('Are you sure you want to reset the score ?');
    if(x){
        score = 0;
        strike = 0;
        localStorage.setItem('score',score);
        localStorage.setItem('strike',strike);
        render(html`<h1 class="animated bounceIn">${score}</h1>`,document.getElementById('header'));
        setTimeout(() => render(html`<h1 >${score}</h1>`,document.getElementById('header')),1000);
    }
}

const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

const wrongAnswer = () => {
    strike = 0;
    score = score - 1;
    if(score<0){
        score = 0;
    }
    localStorage.setItem('score',score);
    localStorage.setItem('strike',strike);
    notRightAudio.play();
    render(html`<h1 class="animated bounceIn">${score}</h1>`,document.getElementById('header'));
    setTimeout(() => render(html`<h1 >${score}</h1>`,document.getElementById('header')),1000)
}

const correctAnswer = () => {
    strike++;
    let multiply = 1;
    if(score < 20){
        multiply = 2;
    }else if(score < 50){
        multiply = 1;
    }
    score = score + multiply;
    localStorage.setItem('score',score);
    localStorage.setItem('strike',strike);
    let nextLetter = generateLetter();
    let nextAudio = audioFromLetter(nextLetter);
    try{
        nextAudio.play();
        nextAudio.pause();
    }catch(err){
        console.log(err);
    }
    if(strike % 10 == 0){
        goodjob4Audio.letter = nextLetter;
        goodjob4Audio.play();
    }else if(strike == 7 ){
        goodjob3Audio.letter = nextLetter;
        goodjob3Audio.play();
    }else if(strike == 5){
        goodjob2Audio.letter = nextLetter;
        goodjob2Audio.play();
    }else if(strike % 3 == 0 ){
        goodjob1Audio.letter = nextLetter;
        goodjob1Audio.play();
    }else{
        openNextPageNow({target : {letter : nextLetter}});
    }
}

const openNextPageNow = (e) => {
    let letter = e.target.letter;
    render(html`<h1 style="margin: 0px;display: inline-block" class="animated bounceIn">${score}</h1>`,document.getElementById('header')).then(() => openNextPage(letter));
}
// AUDIOS
let startChallange = new Audio('./assets/audio/challange-whichone.mp3');
startChallange.onended = (e) => openNextPage(e.target.letter);
goodjob1Audio.onended = openNextPageNow;
goodjob2Audio.onended = openNextPageNow;
goodjob3Audio.onended = openNextPageNow;
goodjob4Audio.onended = openNextPageNow;




repaintPage();
