let simulate = document.querySelector('.simulatebtn');
let restart = document.querySelector('.backtopage1');
restart.addEventListener('click', hidepage2);
simulate.addEventListener('click', (e)=> {
    e.preventDefault();
    let floorinput=document.querySelector('#floornum').value;
    let liftinput=document.querySelector('#liftnum').value;
    if(floorinput=="" || liftinput==""){
        alert('please enter the value')
    }
    else if(floorinput>=10){
        alert('maximum number 9 floors')
    }
        else if (window.innerWidth <= 500 && +liftinput > 4) {
            alert("This screen size can't have more than 4 lifts");
        }
        else if (window.innerWidth > 500 && window.innerWidth <= 768 && +liftinput > 5) {
            alert("This screen size can't have more than 5 lifts");
        }
        else if (window.innerWidth > 500 && window.innerWidth <= 1024 && +liftinput > 7) {
            alert("This screen size can't have more than 7 lifts");
        }
        else{
            document.querySelector('.page1-container').style.display = 'none';
            document.querySelector('.page2').style.display = 'block';
            creatingfloors();
        }
});
    function hidepage2() {
        document.querySelector('.page2').style.display = 'none';
        document.querySelector('.page1-container').style.display ='block'
    } 
    function creatingfloors(){
        let floorin = document.querySelector('#floornum').value;
        let liftin = document.querySelector('#liftnum').value;
        for (let i = floorin; i > 0; i--) {
            let box = document.createElement('div');
            box.className = 'box';
            let btnlift = document.createElement('div');
            btnlift.className = 'btnlift';
            let buttons = document.createElement('div');
            buttons.className = 'buttons';
            let button1 = document.createElement("button");
            let text1 = document.createTextNode("Up");
            button1.className = "up";
            button1.appendChild(text1);
            let button2 = document.createElement("button");
            let text2 = document.createTextNode("Down");
            button2.className = "down";
            button2.appendChild(text2);
            buttons.appendChild(button1);
            buttons.appendChild(button2);
            btnlift.appendChild(buttons);
            box.appendChild(btnlift);
            let floors = document.createElement('div');
            floors.className = 'floors';
            let hr = document.createElement('hr');
            let spanfloorno = document.createElement('span');
            spanfloorno.innerText = `Floor ${i}`;
            floors.appendChild(hr);
            floors.appendChild(spanfloorno);
            box.appendChild(floors);
            document.querySelector('.page2').appendChild(box);
            if(i==floorin){
                button1.style.display ='none';
            }
            if(i==1){
                button2.style.display='none'
            }
        }
        // let apartment = document.querySelector('.apart');
        // apartment.appendChild(box);
        // apartment.appendChild(buttons);
        let mainLift = document.createElement('div');
        mainLift.className = 'mainLift';
        for (let j = 1; j <= liftin; j++){
            let lift = document.createElement('div');
            lift.className = 'lift';
            lift.setAttribute('id', `lift${j}`);
            lift.setAttribute('flag', `free`);
            let gates = document.createElement('div');
            gates.className = 'gates';
            gates.setAttribute('id', `gates`);
            let gate1 = document.createElement('div');
            gate1.className = 'gate1';
            gates.appendChild(gate1);
            // let gate2 = document.createElement('div');
            // gate2.className = 'gate2';
            // gates.appendChild(gate2);
            lift.appendChild(gates);
            mainLift.appendChild(lift);
        }
        const mainliftbtn = document.querySelectorAll('.btnlift');
        const endbox = mainliftbtn[mainliftbtn.length - 1];
        endbox.appendChild(mainLift);
        let all_lift = document.querySelectorAll('.lift');
        let up = document.querySelectorAll('.up');
        let down = document.querySelectorAll('.down');
        let nUp = up.length;
        let prev = 0;
        let oldfloorarray=[];
        for(let i=0;i<all_lift.length;i++){
            oldfloorarray.push(1)
        }
        up.forEach((e, i) => {
            e.addEventListener('click', () => {
                let floorvalue = nUp - i;
                for (let i = 0; i <all_lift.length; i++){
                    if (all_lift[i].getAttribute('flag') === 'free') {
                        all_lift[i].setAttribute('flag', 'busy');
                        moveLift(all_lift[i], floorvalue,oldfloorarray[i]);
                        oldfloorarray[i]=floorvalue;
                        break;
                    }
                }
            })
        })
        down.forEach((e, i) => {
            e.addEventListener('click', () => {
                let floorvalue = nUp - i;
                for (let i = 0; i <all_lift.length; i++){
                    if (all_lift[i].getAttribute('flag') === 'free') {
                        all_lift[i].setAttribute('flag', 'busy');
                        moveLift(all_lift[i], floorvalue,oldfloorarray[i]);
                        oldfloorarray[i]=floorvalue;
                        break;
                    }
                }
            })
        })
    
}
function moveLift(liftno, floorno,oldfloor) {
    liftno.style.transform = `translateY(${-118 * (floorno - 1)}px)`;
    let prev= `${1.3 * Math.abs(floorno - oldfloor)}s`
    liftno.style.transitionDuration = prev;
    setTimeout(() => {
        
        gateopenclose(liftno);
        setTimeout(() =>{
            liftno.setAttribute('flag', 'free')
        },4000);
        console.log(liftno.getAttribute('flag'))
    }, 1 * Math.abs(floorno - oldfloor) * 1000)
 
} 
function gateopenclose(liftno) {
    let gates=liftno.firstChild; 
    let gate1 = document.querySelector('.gate1');
    // let gate2 = document.querySelector('.gate2');
    setTimeout(() => {
        gates.children[0].style.width = '2px';
        // gates.children[1].style.width = '3px';
    }, 1000);
    setTimeout(() => {
        gates.children[0].style.width = '50px';
        // gates.children[1].style.width = '25px';
    }, 3000)
}