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

# If it was a professional app I would
* Integrate a state management library to manage different users/cars and save the app's state
* Cache retrieved data and history to be available also offline
* Implement tests to ensure every component is working correctly
* Implement endpoint tests to ensure endpoints are working correctly
* Replace every string with an i18n alias to support different languages
* Improve the Details page to show more details about the charger in a nicer layout
* Improve the layout and define classes/alias to keep the design persistent and simplify theme management
* Add alias definitions to simplify the path in imports
* Following the Atomic design guidelines, I would redefine also the basic component to automate default functionalities and simplify library update/dismission
* More robust error handling should be added to handle various edge cases
* Implement authentication for the backend API
* Encode the key file so that it's not readable decompiling the final app (possibly move the key on the backend)


# Change Log
* Login screen to set Username and Car ID dynamically
* Chargers list integrated in a BottomSheet on the Map page
* Style definition in the component file instead of separate files
* Improved layout
* Removed Redux and Axios integration to simplify the code
