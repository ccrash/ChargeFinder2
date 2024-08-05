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
* Displays the open chargers available in your area based on your position.
* Move the location of the map to refresh and display the chargers in that area.
* The list of chargers is displayed at the bottom of the map inside a BottomSheet component.
* Clicking on the list selects the relative marker on the map.
* If the list is fully expanded, it redirects straight to the details page.
* If charging your vehicle, you cannot leave the details page until you stop charging.
* Supports both iOS and Android.

# If it were a professional app I would
* Integrate a state management library to manage different users/cars and save the app's state.
* Cache retrieved data and history to be available offline as well.
* Implement more tests to ensure every component is working correctly.
* Replace every string with an i18n alias to support different languages.
* Improve the Details page to show more details about the charger in a nicer layout.
* Improve the layout and define classes/aliases to keep the design consistent and simplify theme management.
* Add alias definitions to simplify the path in imports.
* Add more robust error handling to handle various edge cases.
* Implement authentication for the backend API.
* Encode the key file so that it is not readable by decompiling the final app (possibly move the key to the backend).

# Change Log
* Login screen to set Username and Car ID dynamically.
* Chargers list integrated into a BottomSheet on the Map page.
* Style definition in the component file instead of separate files.
* Improved layout.
* Removed Redux and Axios integration to simplify the code.