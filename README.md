# mhfu-kitchen-app
a quick run at creating a simple way to help when playing the game Monster Hunter Freedom Unite


## why
In the game, there is the option to create a meal for your character to eat by combining two food ingredients that are randomly chosen from a list.
The combinations that are valid are not known to the player, and can only be discovered by trying the combinations one at a time over time. Charts already exist
on the internet for determining what combinations are effective, but due to the nature of the system in the game, it requires picking general categories of ingredient
and referencing that against what you actually have. In an attempt to try something outside of the format of a static chart, I attempted this 'app'.

## how
The user checks off the ingredients they have from the lists provided, and confirms the number of chefs they have, as the valid recipes change depending on how many
chefs the player has making the food. The list of beneficial recipes is then displayed at the bottom right automatically as they select each ingredient.

## what
This was created with relatively simple client-side JavaScript. React was used as a framework to assist with the real-time updating.
