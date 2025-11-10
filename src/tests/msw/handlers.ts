
import { rest } from 'msw';

const characters = [
  { id: '1', name: 'Luke Skywalker', gender: 'male', birth_year: '19BBY', films: ['1', '2'] },
  { id: '2', name: 'Leia Organa', gender: 'female', birth_year: '19BBY', films: ['1'] }
];


const films = {
  '1': { id: '1', title: 'A New Hope', starships: ['10'] },
  '2': { id: '2', title: 'The Empire Strikes Back', starships: ['11'] }
};


const starships = {
  '10': { id: '10', name: 'X-wing' },
  '11': { id: '11', name: 'Millennium Falcon' }
};


export const handlers = [
  rest.get('https://sw-api.starnavi.io/people', (req, res, ctx) => {
    return res(ctx.json({ results: characters }));
  }),


  rest.get('https://sw-api.starnavi.io/people/:id', (req, res, ctx) => {
    const { id } = req.params as any;
    const c = characters.find(x => x.id === id);
    if (!c) return res(ctx.status(404));
    return res(ctx.json(c));
  }),


  rest.get('https://sw-api.starnavi.io/films/:id', (req, res, ctx) => {
    const { id } = req.params as any;
    const f = films[id as keyof typeof films];
    if (!f) return res(ctx.status(404));
    return res(ctx.json(f));
  }),


  rest.get('https://sw-api.starnavi.io/starships/:id', (req, res, ctx) => {
    const { id } = req.params as any;
    const s = starships[id as keyof typeof starships];
    if (!s) return res(ctx.status(404));
    return res(ctx.json(s));
  })
];