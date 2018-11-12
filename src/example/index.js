const { interval } = require('rxjs');
const { map, filter, reduce, take } = require('rxjs/operators');

const array = ['1','1','lola','2','3','4','itequia','13','7'];
interval(400)
    .pipe(
        take(array.length),
        map(i => parseInt(array[i])),
        map(item => parseInt(item)),
        filter(item => !isNaN(item)),
        reduce((a, b) => a+b)
    ).subscribe(item => console.log(item))

const draw = brush => map(num => num *65)

const stream = interval(TICK).pipe(take(LENGTH))