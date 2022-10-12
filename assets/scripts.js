const adviceInfo = document.getElementById('adviceInfo');
const adviceBtn = document.getElementById('adviceBtn');

window.addEventListener('DOMContentLoaded', () => {

    initApp();

})

const initApp = () => {

    adviceBtn.addEventListener('click', getAdvice);

}

const getAdviceSpinner = () => {

    const spinnerContainer = document.createElement('div');
    spinnerContainer.classList.add('spinner__container');

    const spinner = document.createElement('div');
    spinner.classList.add('lds-ellipsis');

    const firstDiv = document.createElement('div');
    const secondDiv = document.createElement('div');
    const thirdDiv = document.createElement('div');
    const fourthDiv = document.createElement('div');

    spinner.appendChild(firstDiv);
    spinner.appendChild(secondDiv);
    spinner.appendChild(thirdDiv);
    spinner.appendChild(fourthDiv);

    spinnerContainer.appendChild(spinner);

    return spinnerContainer;

}

const getAdviceTitle = (id = 0) => {

    const adviceTitle = document.createElement('h1');
    adviceTitle.classList.add('advice__title');
    adviceTitle.textContent = 'Advice ';

    const adviceNumber = document.createElement('span');
    adviceNumber.classList.add('advice__number');
    adviceNumber.textContent = `#${id}`;
    
    adviceTitle.appendChild(adviceNumber);

    return adviceTitle;

}

const getAdviceQuote = (advice = "") => {

    const adviceQuote = document.createElement('blockquote');
    adviceQuote.classList.add('advice__blockquote');
    adviceQuote.textContent = advice;

    return adviceQuote;

}

const getAdvice = async () => {

    while (adviceInfo.firstElementChild) {
        adviceInfo.removeChild(adviceInfo.firstElementChild);
    }

    const spinnerContainer = getAdviceSpinner();    
    adviceInfo.appendChild(spinnerContainer);

    try {

        const response = await fetch('https://api.adviceslip.com/advice',  { cache: "no-cache" });
        const { slip: { id, advice } } = await response.json();

        spinnerContainer.remove();

        const adviceTitle = getAdviceTitle(id);
        const adviceQuote = getAdviceQuote(advice);

        adviceInfo.appendChild(adviceTitle);
        adviceInfo.appendChild(adviceQuote);
        
    
    } catch (error) {
    
        console.log(error);

    }


}