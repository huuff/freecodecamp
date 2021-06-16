## Debug
* Change any value directly in the window. Wouldn't it be cool?
* Collapse fetch responses by default and allow expanding them

## Alert

## QoL
* Repeat button, for when you miss a quote
* Use nix

## Aesthetics
* Change arrow icon when debug is uncollapsed

## Twitter
* Add bootstrap popover to twitter when trying to tweet something longer than 140 characters

## Bugs
* The first quote appears weirdly, fix it.
* When an error triggers and then the quote is changed, the text "this shouldn't appear anywhere" appears in the alert. Fix that liar.

## Questions
* Currently the refresh time is repeated in 3 different places, find some way to DRY it. Note: It seems like it's real easy to share a variable between javascript and sass, however, I can't do it. Maybe I could define the animations using css and share it so?
* Is babel configuration needed both in webpack config and in babel config?
* Find a way to get the quote box to have some minimum height
* Maybe dispatching the effects (setting show to true, then to false) using a thunk is not the correct way and a hack? Maybe I should do it by wrapping the dispatcher in some custom function?

## Testing
* Test the fade transition? Is it even possible? (I'm now sure it is possible)
* I don't know if I should test the debug

## Refactoring

## Features
* Add quotes to favorites
* Add sentiment analysis to check if quote is happy or not and change background accordingly
* Make my own backend for it or maybe use the one from quotable but deploy it locally
