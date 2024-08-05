#  Charger Finder 2
> A revisited/cleaner version of ChargeFinder (https://github.com/ccrash/ChargerFinder), a simple app to find an EV charger near you

# Setup a local development environment

* Clone the repository in your favourite folder.
* If you don't have an Open Charge API key, register an account and create a new one at https://openchargemap.org/
* Edit the file in `settings/keys.ts` to contain your Open Charge API key

```js
export const OpenChargeApiKey = "Insert your personal API Key here"
```

* Install all the dependencies

```js
npx expo install 
```

* Run the project

```js
npx expo start 
```

# Features
* Displays the open chargers available in your area based on your position
* Move the location of the map to refresh and display the charger in that area
* List of chargers displayed at the bottom of the map inside a BottomSheet component
* Clicking on the list selects the relative marker in the map
* If the list is fully expanded redirects straight to the details page
* If charging your vehicle you can not leave the detils page till you stop charging
* Supports both IOS and Android

# If it was a professional app I would
* Integrate a state management library to manage different users/cars and save the app's state
* Cache retrieved data and history to be available also offline
* Implement more tests to ensure every component is working correctly
* Replace every string with an i18n alias to support different languages
* Improve the Details page to show more details about the charger in a nicer layout
* Improve the layout and define classes/alias to keep the design persistent and simplify theme management
* Add alias definitions to simplify the path in imports
* More robust error handling should be added to handle various edge cases
* Implement authentication for the backend API
* Encode the key file so that it's not readable decompiling the final app (possibly move the key on the backend)


# Change Log
* Login screen to set Username and Car ID dynamically
* Chargers list integrated in a BottomSheet on the Map page
* Style definition in the component file instead of separate files
* Improved layout
* Removed Redux and Axios integration to simplify the code
