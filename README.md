LinkedIn Coding Challenge: Mastermind by Jonathan Huang

Access: https://jh-mastermind.herokuapp.com/

Engineering Journal: https://docs.google.com/document/d/1JyQ3Eyu3MqS2GyJzZrtf9tyEaCOkCt3miRh1uOXnUxg/edit

Figma Design: https://www.figma.com/file/bnDqczK2FdzlNVdaBXh6Fp/Mastermind?node-id=0%3A1

App Summary:
To access the application, visit the link above next to "Access:". After the page has loaded, you will be greeted with the Home Page of the Mastermind App. The Engineering Journal tracked my progress over the last week as well as any thoughts or reflections during the process. The Figma link showcased my rough design process and was used in guiding some of the front end development.

Home Page:
The home page hosts four buttons: start, games, rules, and login/logout.

start:
Clicking on start will start a game. From there you will have 10 opportunities to figure out the 4-digit combination. Clicking back will end the game and return you to the home screen. Your game will not be saved or submitted. Clicking guesses will show your guesses for that game and their corresponding results. Only games completed (losing via exceeding 10 guesses or winning within 10 guesses) will be added to the database.

login:
Clicking on login will open a popup window.
This window will query the user on their login or registration credentials. You may then login or create a user. You will need to log in after creating a user in order to be logged in. Once logged in, the games button will only show the games which that user has played.

games:
Clicking on games will open a popup window.
This window will show a grid of buttons representing games played and ordered by the date they were completed. Players not logged in will be able to see all public games played. Clicking on a game will show further game details.

---