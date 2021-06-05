## Debug
* Change any value directly in the window. Wouldn't it be cool?
* Collapse fetch responses by default and allow expanding them
* Change arrow icon when uncollapsed

## Alert

## QoL
* Repeat button, for when you miss a quote
* Use nix

## Twitter
* Add bootstrap popover to twitter when trying to tweet something longer than 140 characters

## Bugs
* The first quote appears weirdly, fix it.
* When an error triggers and then the quote is changed, the text "this shouldn't appear anywhere" appears in the alert. Fix that liar.

## Questions
* Currently the refresh time is repeated in 3 different places, find some way to DRY it. Note: It seems like it's real easy to share a variable between javascript and sass, however, I can't do it. Maybe I could define the animations using css and share it so?
* Is babel configuration needed both in webpack config and in babel config?
* Find a way to get the quote box to have some minimum height
* Maybe I don't need babel-polyfill anymore

## Testing
* Test the fade transition? Is it even possible?
* Test that the alert appears when two quotes are equal
* Test that the alert appears on any error
* Test that the alert can be closed (when I implement it)

## Refactoring
* Remove all `store.dispatch` and similar and use more idiomatic Redux

## Features
* Add quotes to favorites
* Add sentiment analysis to check if quote is happy or not and change background accordingly
* Make my own backend for it or maybe use the one from quotable but deploy it locally
