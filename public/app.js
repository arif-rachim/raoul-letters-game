/**
 * Created by arif on 12/8/2017.
 */

let {html,htmlCollection} = new Context();

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
const audiosArray = letters.map(letter => new Audio(`./assets/audio/${letter}.mp3`));
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
    audiosArray.forEach(audio => {
        audio.play();
        audio.pause();
    });
}

const openNextPage = () => {
    let generateLetter = () => {
        let letter = letters[Math.round(Math.random()* letters.length)];
        return letter ? letter : generateLetter();
    };

    let answer = generateLetter();
    let questions = [answer];
    while(questions.length<4){
        let falseLetter = generateLetter();
        if(questions.indexOf(falseLetter)<0){
            questions.push(falseLetter);
        }
    }
    shuffle(questions);
    audiosArray[letters.indexOf(answer)].play();
    render(html`
    <style>
        body{
            margin: 0px;
            padding: 0px;
        }
        h1{
            font-weight: 100;
            font-size: 3em;
        }
        table{
            text-align: center;
        }
        img {
            width: 48vw;
            height: 30vh;
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
            padding: 10px;
        }
        
        .hidden{
            display: none;
        }
        
    </style>
    <div class="background-color header shadow" id="header" style="height: 50px"></div>
    </div>
    <table>
        <tr >
            <td>
            <table style="margin-top: 20px">
                <tr>
                    <td style="position: relative">
                        <img src="assets/${questions[0]}.jpg" onclick="${e => questions[0] == answer ? correctAnswer() : wrongAnswer()}">
                        <label style="font-size: 4em;opacity: 0.1;position: absolute;bottom: 0px;right: 0px">${questions[0].toUpperCase()}</label>
                    </td>
                    <td style="position: relative">
                        <img src="assets/${questions[1]}.jpg" onclick="${e => questions[1] == answer ? correctAnswer() : wrongAnswer()}">
                        <label style="font-size: 4em;opacity: 0.1;position: absolute;bottom: 0px;right: 0px">${questions[1].toUpperCase()}</label>
                    </td>
                </tr>
                <tr>
                    <td style="position: relative">
                        <img src="assets/${questions[2]}.jpg" onclick="${e => questions[2] == answer ? correctAnswer() : wrongAnswer()}">
                        <label style="font-size: 4em;opacity: 0.1;position: absolute;bottom: 0px;right: 0px">${questions[2].toUpperCase()}</label>
                    </td>
                    <td style="position: relative">
                        <img src="assets/${questions[3]}.jpg" onclick="${e => questions[3] == answer ? correctAnswer() : wrongAnswer()}">
                        <label style="font-size: 4em;opacity: 0.1;position: absolute;bottom: 0px;right: 0px">${questions[3].toUpperCase()}</label>
                    </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
    <button onclick="${e => resetScore()}" style="border: none;font-family: 'Lato';font-weight: 300;font-size:1em;color: white;background-color: red;position: absolute;bottom: 10px;left: 10px;">Reset</button>
    
`,document.body).then(function(){
        setTimeout(function(){
            render(html`<h1 style="margin: 0px;display: inline-block" class="">${score}</h1>`,document.getElementById('header'));
        },1000);
    });
};

const resetScore = () => {
    let x = window.confirm('Are you sure you want to reset the score ?');
    if(x){
        score = 0;
        strike = 0;
        localStorage.setItem('score',score);
        localStorage.setItem('strike',strike);
        render(html`<h1 style="margin: 0px;display: inline-block" class="animated bounceIn">${score}</h1>`,document.getElementById('header'));
        setTimeout(function(){
            render(html`<h1 style="margin: 0px;display: inline-block">${score}</h1>`,document.getElementById('header'));
        },1000)
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
    render(html`<h1 style="margin: 0px;display: inline-block" class="animated bounceIn">${score}</h1>`,document.getElementById('header'));
    setTimeout(function(){
        render(html`<h1 style="margin: 0px;display: inline-block">${score}</h1>`,document.getElementById('header'));
    },1000)
}

const correctAnswer = () => {
    strike++;
    let multiply = 1;
    if(score < 20){
        multiply = 4;
    }else if(score < 50){
        multiply = 3;
    }else if(score < 100){
        multiply = 2;
    }
    score = score + multiply;
    localStorage.setItem('score',score);
    localStorage.setItem('strike',strike);
    audiosArray.forEach(audio => {
        audio.play();
        audio.pause();
    });
    if(strike % 10 == 0){
        goodjob4Audio.play();
    }else if(strike == 7 ){
        goodjob3Audio.play();
    }else if(strike == 5){
        goodjob2Audio.play();
    }else if(strike % 3 == 0 ){
        goodjob1Audio.play();
    }else{
        openNextPageNow();
    }
}

const openNextPageNow = () => {
    render(html`<h1 style="margin: 0px;display: inline-block" class="animated bounceIn">${score}</h1>`,document.getElementById('header')).then(function(){
        openNextPage();
    });
}
// AUDIOS
let startChallange = new Audio('./assets/audio/challange-whichone.mp3');
const openPageAfterSometime = function(){
    openNextPage();
};
startChallange.onended = openNextPage;
goodjob1Audio.onended = openNextPageNow;
goodjob2Audio.onended = openNextPageNow;
goodjob3Audio.onended = openNextPageNow;
goodjob4Audio.onended = openNextPageNow;




repaintPage();
