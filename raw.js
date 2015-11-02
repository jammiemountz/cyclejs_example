import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/web';

function main (responses) {
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

Cycle.run(main, drivers);