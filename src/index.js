import { fromEvent, combineLatest } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { filter, switchMap, map, debounceTime } from 'rxjs/operators'

const output = document.querySelector('output')
const input = document.querySelector('input')
const select = document.querySelector('select')

const API_URL = `https://jsonplaceholder.typicode.com/albums`

const id$ = fromEvent(input, 'input').pipe(
	map(e => e.target.value),
	filter(id => id>0 && id<10),
	debounceTime(3000)
)

const resourceType$ = fromEvent(select, 'change').pipe(
	map(e => e.target.value)
)

combineLatest(id$, resourceType$).pipe(
	switchMap(getAlbums)
).subscribe(render)

function getAlbums([id, resource]) {
	return ajax(`https://jsonplaceholder.typicode.com/${resource}?userId=${id}`)
}

function render(data) {
	output.textContent = JSON.stringify(data.response)
}