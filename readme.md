## HP Technical Test

Hi, thank you for taking the time to read through my technical test.<br>

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

## Task 2

My solution for task 2 is visible in the root folder labelled `refactor.ts`.

<b>Step 1:</b>

<b>What do you think is wrong with the code, if anything?</b>

Currently, I don't think the function would even return the desired result, if the developer is looking for a json response they're not actually returning it. It's also extremely messy with plenty of room for type errors, unexpected if statement results and poor error reporting. Generally this implementation lacks rigidity and would be prone to bugs in any application size. General good practice hasn't been followed with the use of var for values that we'd want to remain constant.

<b>Can you see any potential problems that would lead to exeptions?</b>

Yes, function needs to verify that `invitationBody` and other elements exist before it can evaluate them or their properties like `status`. The use of indexOf in evaluations could also cause errors if were not 100% sure on the type of `shop.invitations`.

<b>How would you refactor this code to:</b>

<b>Make it easier to read:</b>

Break the function down into smaller functions and utilise a switch case to manage error/response status'. I'd also break down some of the comparators/if statement comparisons into their own boolean values defined at the top of the function to make them easier to read.

<b>Increase code reusability:</b>

The act of splitting the method down into smaller more re-useable functions should allow us to utilise them again in the future. An example of this is to break `User.findOneAndUpdate` into it's own function `createUser`.

<b>Improve the stability of the system</b>

The use of export will allow us to use these functions anywhere in our application, smaller more re-useable methods will also allow us to maintain purity and utilise them in further requests or posts we may want to add to our application.

<b>Improve the testability of the code</b>

Generally better type safety with the addition of `TypeScript` will make testing these methods much easier. Knowing what to expect and easily being able to mock data will enable us to effectively test these methods in isolation.

<b>How might you use the latest JavaScript features to refactor the code?</b>

- Removing the use of function and replacing with a shorthand expression `() => {}` to improve readability.
- Adding stronger type safety with the use of custom interfaces and Enums.
- Exporting the inviteUser function using es6 exports.
- Replace the use of `indexOf` with `includes` to make some of the logic more robust.
- Store values that can be constant as constant variables.
- Use ternary operators `?` to simplify logic and make it easier to read.
- Avoid passing raw strings/values as parameters and assign them to re-usable `const` values.
- Add null checks to ensure the required parameters are valid.
