import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/web';


// toggle off/on

function example1 (responses) {
  let requests = {
    DOM: responses.DOM.get('input', 'change')
      .map( ev => ev.target.checked )
      .startWith(false)
      .map(toggled =>
        h('div', [
          h('input', {type: 'checkbox'}), 'Toggle Me',
          h('p', toggled ? 'ON' : 'OFF')
          ])
        )
  }
  return requests;
}

let drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(example1, drivers);


// Counter increment and decrement


function example2({DOM}) {
  const action$ = Cycle.Rx.Observable.merge(
    DOM.get('.decrement', 'click').map( ev => -1 ),
    DOM.get('.increment', 'click').map( ev => +1 ),
  );

  const count$ = action$
    .startWith(0).scan((total, change) => total+ change)

  let requests = {
    DOM: count$.map(count =>
      h('div', [
        h('button.decrement', 'DECREASE'),
        h('button.increment', 'INCREASE'),
        h('p', `Counter: ${count}`)
        ])
      )
  }

  return requests; 
}

let drivers2 = {
  DOM: makeDOMDriver('#app2')
};


Cycle.run(example2, drivers2)