## Vue iTunes clone

Stack:<br>
`Vue`<br/>
`Express`<br/>
`TypeScript`<br/>
`Jest`<br/>
`Sass`<br/>

## Getting Started

First, run the backend express and frontend servers concurrently with:

```bash
npm run dev
# or
yarn dev
```

## Backend Server

Load `localhost:8081` in your browser to view the api response<br>
You can use parameters like `album/oasis` to search the itunes api.

## Frontend Server

Load `localhost:8080` with your initial search as parameters<br>
i.e `localhost:8080/album/oasis`. The route and data is updated with each call<br> to the backend server.<br>

To search for new content, you can use the search bar UI or enter the parameters<br>in your browsers address bar. Your also not limited to searching albums only, any valid media type will return the relevant search results i.e `podcast/changelog`.

## Testing

```bash
npm run test
# or
yarn test
```
